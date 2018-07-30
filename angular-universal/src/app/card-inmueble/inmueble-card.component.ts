import { Component,OnInit, Input } from '@angular/core';


@Component({
    selector: 'inmueble-card-component',
    templateUrl: './inmueble-card.component.html',
    styleUrls: ['./inmueble-card.component.css']
  })
  export class InmueblesCardComponent{
        @Input() title:string;
        @Input() link:string;
        @Input() price:string;
        @Input() directions:string;
        @Input() img:string;
        @Input() state:string;
        




        constructor(){

        }

  }