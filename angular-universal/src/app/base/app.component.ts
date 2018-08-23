import {Component} from '@angular/core';
import { Router } from '@angular/router';
import { MenuComponent } from '../menu/menu.component';
import { FooterComponent} from '../footer/footer.component';
import { MsAdalAngular6Service } from 'microsoft-adal-angular6';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private router : Router,private adalSvc: MsAdalAngular6Service ){
   
  }
  ngOnInit(){
  this.adalSvc.handleCallback();
  }
}
