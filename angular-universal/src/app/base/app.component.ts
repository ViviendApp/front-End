import {Component} from '@angular/core';
import { Router } from '@angular/router';
import { MenuComponent } from '../menu/menu.component';
import { FooterComponent} from '../footer/footer.component';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private router : Router, ){
   // this.serviceUniandes.init(config);
  }
  ngOnInit(){
    //this.serviceUniandes.handleWindowCallback();
  }
}
