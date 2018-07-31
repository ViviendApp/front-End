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
        @Input() img:any;
        @Input() state:string;
        

        


        constructor(){

        }
        getCssImg(){
          this.img= 'https://i.ytimg.com/vi/_cgLtcsM8Dk/maxresdefault.jpg';
          return {'background':'url('+this.img+')'};
        }
  }