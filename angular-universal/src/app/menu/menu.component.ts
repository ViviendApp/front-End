import {Component} from '@angular/core';
import { AngularFireAuth } from '../../../node_modules/angularfire2/auth';
import { Router } from '../../../node_modules/@angular/router';

@Component({
    selector: 'menu-component',
    templateUrl: 'menu.component.html',
    styles: ["menu.component.css"]
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