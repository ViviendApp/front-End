import {Component} from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';

@Component({
    selector: 'menu-component',
    templateUrl: 'menu.component.html',
    styleUrls: ["menu.component.css"]
  })
  export class MenuComponent {
  
    constructor(public afAuth:AngularFireAuth, private router : Router){  }

    logout(){
        console.log('cerrando sesion');
        this.afAuth.auth.signOut().then(()=>{
        this.router.navigate(["/login"]);
        });
    }
  
    ngOnInit(){

    }
  }