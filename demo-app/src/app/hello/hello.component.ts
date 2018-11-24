import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { HelloService } from './hello.service';

@Component({
  selector: 'app-hello',
  templateUrl: './hello.component.html',
  styleUrls: ['./hello.component.css']
})
export class HelloComponent implements OnInit {
  public welcomeQuote:string;
  @Input() name:string;
  
  constructor(public authService: AuthService,
            private service: HelloService) { }

  ngOnInit() {
    this.service.getTodaysQuote(this.name)
      .subscribe((response: string) =>{
        this.welcomeQuote = response;
      })
  }

}
