import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
    selector: 'profile-component',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
  })
  export class ProfileComponent implements OnInit{
    public estaLogueado:boolean;
    constructor(private auth:AuthService, public router : Router){
      
    }

    ngOnInit(){
      //Si esta logueado despliegue profile else router.redirect to /login
      if(this.auth.getUserObject==null)
      { 
        console.log("entro aqui ++")
        this.router.navigate(['/login']);
      }else{
        console.log("entro aqui --");
        this.router.navigate(['/profile']);
      }
    }
  }