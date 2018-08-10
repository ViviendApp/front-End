import {Component, OnInit} from '@angular/core';
import { AlertService } from '../services/alert.service';
import { InmueblesCardComponent } from '../card-inmueble/inmueble-card.component';
import { InmueblesService }from '../services/inmuebles.service';
import { Observable } from 'rxjs';
import { IInmueble } from '../models/inmueble';
import { InmueblesComponent } from '../inmuebles/inmuebles.component';
import { SliderImgComponent } from '../slider-img/slider-img.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls:['home.component.css']
})
export class HomeComponent implements OnInit {
  
  public publicaciones : Observable<IInmueble[]>;

  constructor(private alertService: AlertService, private inmueblesS : InmueblesService) { }

  ngOnInit() {
    this.inmueblesS.updatePosts();
    this.publicaciones = this.inmueblesS.posts;
   
  }
  success(message: string) { 
    this.alertService.success(message);
  }

  error(message: string) {
    this.alertService.error(message);
  }

  info(message: string) {
    this.alertService.info(message);
  }

  warn(message: string) {
    this.alertService.warn(message);
  }

  clear() {
    this.alertService.clear();
  }
}
