import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as auth0 from "auth0-js";
import { environment } from "../environments/environment";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable()
export class AuthService {  
  private auth0 = new auth0.WebAuth({
    clientID: environment.auth.clientID,
    domain: environment.auth.domain,
    responseType: "id_token token",
    redirectUri: environment.auth.redirect,
    scope: environment.auth.scope
  });

  constructor(private router:Router){}

  private loggedInKey = "isLoggedIn";

  // Authentication Navigation
  returnURL = environment.auth.logoutURL;
  onAuthSuccessURL = "/";
  onAuthFailureURL = "/";

  parseHash$ = Observable.create(observer => {
    this.auth0.parseHash((err, authResult) =>{
      if (err){
        observer.error(err);
      }
      else if (authResult && authResult.accessToken){
        observer.next(authResult);
      }
      observer.complete();
    });
  })

  checkSession$ = Observable.create(observer =>{
    this.auth0.checkSession({}, (err, authResult) =>{
      if (err){
        observer.error(err);
      }
      else if(authResult && authResult.accessToken){
        observer.next(authResult);
      }
      observer.complete();
    })
  })

  // Store authentication data
  public tokenData$ = new BehaviorSubject(null);
  userProfile$ = new BehaviorSubject(null);

  refreshAuthData(){
    if (this.isLoggedIn()) {
      this.checkSession$.subscribe({
        next: authResult => this.saveAuthData(authResult),
        error: err => {
          localStorage.removeItem(this.loggedInKey);
          this.router.navigate([this.onAuthFailureURL]);
        }
      });
    }
  }

  login = () => this.auth0.authorize();

  logout = () => {
    localStorage.setItem(this.loggedInKey, JSON.stringify(false));
    this.auth0.logout({
      returnTo: this.returnURL,
      clientID: environment.auth.clientID
    });
  }

  isLoggedIn = (): boolean =>
    JSON.parse(localStorage.getItem(this.loggedInKey));

  handleLoginCallback = () =>{
    if (window.location.hash && !this.isLoggedIn()){
      this.parseHash$.subscribe({
        next: authResult => {
          this.saveAuthData(authResult);

          window.location.hash = "";

          this.router.navigate([this.onAuthSuccessURL]);
        },
        error: err => this.handleError(err)
      });
    }
  }

  handleError = err => {
    if (err.error_description) {
      console.error(`Error: ${err.error_description}`);
    } else {
      console.error(`Error: ${JSON.stringify(err)}`);
    }
  };

  private saveAuthData = authResult =>{
    localStorage.setItem(this.loggedInKey, JSON.stringify(true));

    var tokenData = {
      expiresAt: authResult.expiresIn * 1000 + Date.now(),
      accessToken: authResult.accessToken,
      idToken: authResult.idToken
    };
    localStorage.setItem('tokenData', JSON.stringify(tokenData));

    this.tokenData$.next(tokenData);
    this.userProfile$.next(authResult.idTokenPayload);
  }

  public getToken = () =>{
    return JSON.parse(localStorage.getItem('tokenData'));
  }
}