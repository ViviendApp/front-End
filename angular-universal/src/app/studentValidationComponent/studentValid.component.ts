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
    
    console.log(this.msalSrv.getUser().name)
      // Handle callback if this is a redirect from Azure
    //this.adalSvc.handleCallback()
    // console.log(this.adalSvc.userInfo.profile.name)
    // // Check if the user is authenticated. If not, call the login() method
    // if(this.adalSvc.userInfo!=null){
    //   //Logica para agregar valor como estudiante :p
      
    // }else{
      
    // }


  }
  public login(){
   // this.adalSvc.login()
   this.msalSrv.loginRedirect();
  }
  // Logout Method
  public logout() {
   // this.adalSvc.logout()
  }
}
