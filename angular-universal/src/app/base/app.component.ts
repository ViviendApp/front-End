import {Component} from '@angular/core';
import { Router } from '@angular/router';
import { MenuComponent } from '../menu/menu.component';
import { FooterComponent} from '../footer/footer.component';
import { MsalService } from '@azure/msal-angular';
import { AuthService } from '../services/auth.service';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private router : Router,private msalServ:MsalService, private authS:AuthService ){
   
  }
  ngOnInit(){
    this.authS.getUserObservable.subscribe(user=>{
      console.log("getUser() value has changed");
      console.log(user.uid);
      if(!user.isStudent && this.msalServ.getUser()!=null){
        this.authS.validarEstudiante(user.uid);
      }
    })
  }
}
