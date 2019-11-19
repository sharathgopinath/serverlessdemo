import { Component, OnInit } from "@angular/core";
import { AuthService } from "../auth/auth.service";

@Component({
    selector: 'app-auth-callback',
    template: `<p>Loading...</p>`
})

export class CallbackComponent implements OnInit{
    constructor(private auth: AuthService){ }

    ngOnInit(){
        this.auth.handleLoginCallback();
    }
}