import { Component, OnInit } from '@angular/core';
import { MsAdalAngular6Service } from 'microsoft-adal-angular6';





@Component({
  selector: 'student-login-component',
  templateUrl: './studentValid.component.html',
  styleUrls: ['./studentValid.component.css']
})
export class studentValidComponent implements OnInit{
  

  constructor( private adalSvc: MsAdalAngular6Service) {
    
  }

  ngOnInit(){
      // Handle callback if this is a redirect from Azure
    this.adalSvc.handleCallback()

    // Check if the user is authenticated. If not, call the login() method



  }
  public login(){
    this.adalSvc.login()
  }
  // Logout Method
  public logout() {
    this.adalSvc.logout()
  }
}
