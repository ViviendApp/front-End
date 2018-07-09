import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '../../../node_modules/@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {


  constructor(private auth:AuthService, public router : Router) {  }


  ngOnInit() {
    this.auth.getUser().subscribe(console.log);
  }
  login(){
    this.auth.login().then(()=> this.router.navigate(["/"]));

  }
  
}
