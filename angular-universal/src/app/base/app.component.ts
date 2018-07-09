import {Component} from '@angular/core';
import { AngularFireAuth } from '../../../node_modules/angularfire2/auth';
import { Router } from '../../../node_modules/@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent {

  constructor(public afAuth:AngularFireAuth, private router : Router){  }

  logout(){
    console.log('cerrando sesion');
    this.afAuth.auth.signOut().then(()=>{
      this.router.navigate(["/login"]);
    });
  }
}
