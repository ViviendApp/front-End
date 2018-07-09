import { Injectable } from '@angular/core';
import { IUser } from '../structures/users';
import { Observable } from '../../../node_modules/rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '../../../node_modules/angularfire2/firestore';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

    private users : AngularFirestoreCollection<IUser>;

    constructor(private afs:AngularFirestore){

    }

    add(user: IUser):Promise<void>{
        return this.users.doc(user.uid).set(user).catch(console.log);
    }
    
}