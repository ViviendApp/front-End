import {Component} from '@angular/core';
import { Router } from '@angular/router';
import { MenuComponent } from '../menu/menu.component';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent {

  constructor(private router : Router){

  }
  ngOnInit(){
    
  }
}
