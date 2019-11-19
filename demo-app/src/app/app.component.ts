import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  template: `
    <top-nav-bar></top-nav-bar>
    <router-outlet></router-outlet>
  `
})
export class AppComponent {
  constructor(private authService: AuthService){ }

  ngOnInit(){
    this.authService.refreshAuthData();
  }
}
