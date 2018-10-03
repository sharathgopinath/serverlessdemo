import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AuthService } from "../auth/auth.service";
import { HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable()
export class HelloService{
    private tokenData:any;
    private todaysQuote:string;

    constructor(private http:HttpClient,
         private authService: AuthService){}

    public getTodaysQuote(){
        var token = this.authService.getToken().idToken;
        var httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': `Bearer ${token}`
        })};
        return this.http.get(environment.helloApi.url, httpOptions);
      }
}