import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from "@angular/common/http";
import { AuthService } from "./auth.service";
import { Observable } from "rxjs";
import { tap } from 'rxjs/operators';
import { Injectable } from "@angular/core";

@Injectable()
export class TokenInterceptor implements HttpInterceptor{
    constructor(private authService: AuthService){ }

    intercept(request: HttpRequest<any>, next: HttpHandler):Observable<HttpEvent<any>>{
        return next.handle(request).pipe(tap((event:HttpEvent<any>) => {
            //Do nothing
        }, (err:any) =>{
            if (err instanceof HttpErrorResponse){
                if (err.status === 401){
                    this.authService.logout();
                    window.location.href = '/';
                }
            }
        }))
    }
}