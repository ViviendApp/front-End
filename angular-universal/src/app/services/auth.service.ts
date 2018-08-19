import { Injectable } from '@angular/core';
import { AngularFireAuth} from 'angularfire2/auth';

import { IUser } from '../models/users';

import * as firebase from 'firebase';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/filter';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private users : AngularFirestoreCollection<IUser>; 

  public usuarios : Observable<IUser[]>;

  public usuarioActual : IUser = null;
  
  constructor(private afAuth : AngularFireAuth,  private afs: AngularFirestore) { 
    this.users = afs .collection<IUser>('users');
    this.usuarios=this.users.snapshotChanges().map(actions=>{
      return actions.map(item=>{
          const data=item.payload.doc.data() as IUser;
          const id =item.payload.doc.id;
      
          //Une al data y al id
          return {...data,id};
        });
    });
    if(this.afAuth.auth.currentUser!=null){
      this.users.doc(afAuth.auth.currentUser.uid).snapshotChanges().map(item=>{
         this.usuarioActual=item.payload.data() as IUser; 
      })
    }

  }
 
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
      this.users.doc(result.user.uid).ref.get().then((val)=>{
        if(!val.exists){
          this.add({name: this.afAuth.auth.currentUser.displayName, uid: this.afAuth.auth.currentUser.uid, email: this.afAuth.auth.currentUser.email, isStudent:false})
          this.usuarioActual={name: this.afAuth.auth.currentUser.displayName, uid: this.afAuth.auth.currentUser.uid, email: this.afAuth.auth.currentUser.email, isStudent:false};
        }
        else{
          const uid = val.id;
          const data= val.data() as IUser;
          this.usuarioActual={...data,uid};
        }
        console.log(this.usuarioActual);
  
      })
    }).catch(console.log);


  }

  /**
   * Devuelve el usuario que inicio sesion, null si no hay.
   */
  getUserObject() : IUser{
    
    if(this.afAuth.auth.currentUser==null)
    return null;

    return {name: this.afAuth.auth.currentUser.displayName, uid: this.afAuth.auth.currentUser.uid, email: this.afAuth.auth.currentUser.email, isStudent:false}
  }
  logout() : Promise<void>{
    this.usuarioActual=null;
    return this.afAuth.auth.signOut()
  }
  
  /**
     * Anade usuario a la base de datos
     * @param user 
     */
    add(user: IUser):Promise<void>{
        return this.users.doc(user.uid).set(user).catch(console.log);
    }

}
