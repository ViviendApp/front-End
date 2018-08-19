import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ["login.component.css"]
})
export class LoginComponent implements OnInit {


  constructor(private auth:AuthService, public router : Router) { 

   }


  ngOnInit() {
    //this.auth.getUser().subscribe(console.log);
  }
  login(){
    this.auth.login()
      .catch()
      .then(
        ()=> {
          //this.usersS.add(this.auth.getUserObject());
          this.auth.getUser();
          console.log(8)
          console.log(this.auth.getUser())
          this.router.navigate(["/profile"])
        }
      );

  }

  
}
