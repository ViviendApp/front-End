import { Component,OnInit, Input } from '@angular/core';
import { IInmueble } from '../models/inmueble';


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
        @Input() img:any;
        @Input() state:string;
        

        


        constructor(){

        }
        getCssImg(){
          if(this.img==null)
            this.img=  'https://i.ytimg.com/vi/_cgLtcsM8Dk/maxresdefault.jpg';
          if(this.img=='')
            this.img=  'https://i.ytimg.com/vi/_cgLtcsM8Dk/maxresdefault.jpg';
            

          return {'background':'url('+this.img+')'};
        }
  }