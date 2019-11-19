import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  name: string = '';

  constructor(public authService: AuthService) { }

  ngOnInit() {
    var tokenData = this.authService.getToken();
    this.name = tokenData ? tokenData.nickName : '';
  }

}
