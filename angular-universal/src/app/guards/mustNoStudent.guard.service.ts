import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { Observable } from "rxjs";
import { AngularFireAuth } from "angularfire2/auth";

import * as firebase from 'firebase';
import 'rxjs/add/operator/do';
import { AuthService } from "../services/auth.service";

@Injectable()
export class MustNoStudentGuard implements CanActivate{

    constructor(private authS : AuthService, private router : Router){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>{
        return this.authS.getUserObservable.map((user)=>{
            if(user!=null)if(user.isStudent) this.router.navigate(["/profile"])
            return !user.isStudent;
        })
         
    }
}
