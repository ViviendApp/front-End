import { Injectable } from '@angular/core';
import { AngularFireAuth} from 'angularfire2/auth';

import { IUser } from '../structures/users';

import * as firebase from 'firebase/app';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/filter';
import { Observable } from '../../../node_modules/rxjs';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  
  constructor(private afAuth : AngularFireAuth, private usersS : UsersService) { }
 
  /**
   * Da el usuario que tiene sesion iniciada
   */
  getUser():Observable<IUser>{
    return this.afAuth.authState
    .take(1)
    .filter(user=>!!user)
    .map((user:firebase.User)=>{
      return (user) as IUser;
    });
   }

   /**
    * Inicia sesion
    */
  login():Promise<void>{
   return  this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
    .then(result=>{
      console.log(result.user);
    }).catch(console.log);
  }

  /**
   * Devuelve el usuario que inicio sesion, solo usar si se sabe que ha iniciado sesion un usuario
   */
  getUserObject() : IUser{
    return {name: this.afAuth.auth.currentUser.displayName, uid: this.afAuth.auth.currentUser.uid, email: this.afAuth.auth.currentUser.email, isStudent:false}
  }
  
  
  

}
