import {Component} from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { IUser } from '../models/users';

@Component({
    selector: 'menu-component',
    templateUrl: 'menu.component.html',
    styleUrls: ["menu.component.css"]
  })
  export class MenuComponent {

    constructor( private router : Router, private auth : AuthService){    }

    logout(){
        console.log('cerrando sesion');
        this.auth.logout().then(()=>{
        this.router.navigate(["/login"]);
        });
    }
  
    ngOnInit(){

    }
  }