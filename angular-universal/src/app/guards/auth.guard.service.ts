import { Injectable } from "../../../node_modules/@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "../../../node_modules/@angular/router";
import { Observable } from "../../../node_modules/rxjs";
import { AngularFireAuth } from "../../../node_modules/angularfire2/auth";

import * as firebase from 'firebase/app';
import 'rxjs/add/operator/do';

@Injectable()
export class AuthGuard implements CanActivate{

    constructor(private afAuth : AngularFireAuth, private router : Router){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>{
        return this.afAuth.authState.take(1).map((user: firebase.User)=>{
            return !!user;
        }).do((authenticated : boolean)=>{
            if(!authenticated) this.router.navigate(['/login']);
        })
    }
}