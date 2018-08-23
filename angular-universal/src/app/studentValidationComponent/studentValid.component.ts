import { Component, OnInit } from '@angular/core';
import { MsAdalAngular6Service } from 'microsoft-adal-angular6';
import { AuthService } from '../services/auth.service'




@Component({
  selector: 'student-login-component',
  templateUrl: './studentValid.component.html',
  styleUrls: ['./studentValid.component.css']
})
export class studentValidComponent implements OnInit{
  

  constructor( private adalSvc: MsAdalAngular6Service,private authS : AuthService) {
    
  }

  ngOnInit(){
      // Handle callback if this is a redirect from Azure
    this.adalSvc.handleCallback()
    console.log(this.adalSvc.userInfo)
    // Check if the user is authenticated. If not, call the login() method
    if(this.adalSvc.userInfo!=null){
      //Logica para agregar valor como estudiante :p
    }else{
      
    }


  }
  public login(){
    this.adalSvc.login()
  }
  // Logout Method
  public logout() {
    this.adalSvc.logout()
  }
}
