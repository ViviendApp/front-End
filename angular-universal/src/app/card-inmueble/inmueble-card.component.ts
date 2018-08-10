import { Component,OnInit, Input } from '@angular/core';
import { IInmueble } from '../models/inmueble';
import { SliderImgComponent } from '../slider-img/slider-img.component';



@Component({
    selector: 'inmueble-card-component',
    templateUrl: './inmueble-card.component.html',
    styleUrls: ['./inmueble-card.component.css']
  })
  export class InmueblesCardComponent{
        @Input() title:string;
        @Input() link:string;
        @Input() price:string;
        @Input() place:string;
        @Input() state:string;
        @Input() desc:string;

        


        constructor(){

        }

  }