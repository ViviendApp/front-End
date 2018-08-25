import { Component, OnInit } from '@angular/core';
import { MsalService } from '@azure/msal-angular'
import { AuthService } from '../services/auth.service'




@Component({
  selector: 'student-login-component',
  templateUrl: './studentValid.component.html',
  styleUrls: ['./studentValid.component.css']
})
export class studentValidComponent implements OnInit{
  

  constructor(private authS : AuthService, private msalSrv: MsalService) {
    
  }

  ngOnInit(){
    
      this.authS.getUserObservable.subscribe(user=>{
        console.log("getUser() value has changed");
        console.log(user.uid);
        if(!user.isStudent && this.msalSrv.getUser()!=null){
          this.authS.validarEstudiante(user.uid);
        }
      })
    
  }
  public login(){
   
   this.msalSrv.loginRedirect();

  }
  // Logout Method
  public logout() {
   // this.adalSvc.logout()
  }
}
