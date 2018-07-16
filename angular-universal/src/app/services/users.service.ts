import { Injectable } from '@angular/core';
import { IUser } from '../structures/users';
import { Observable } from '../../../node_modules/rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '../../../node_modules/angularfire2/firestore';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

    /**
     * Coleccion de los usuarios registrados en la base de datos
     */
    private users : AngularFirestoreCollection<IUser>;

    constructor(private afs:AngularFirestore){
        
        this.users = afs.collection<IUser>('users');

    }

    /**
     * Anade usuario a la base de datos
     * @param user 
     */
    add(user: IUser):Promise<void>{
        return this.users.doc(user.uid).set(user).catch(console.log);
    }
    
}