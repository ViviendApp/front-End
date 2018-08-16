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
        @Input() img:any;
        @Input() state:string;
        @Input() desc:string;

        


        constructor(){

        }
        getCssImg(){
          if(this.img==null)
            this.img=  "../../assets/img/no_foto/nofoto.jpg";
          if(this.img=='')
            this.img=  "../../assets/img/no_foto/nofoto.jpg";
            

          return {'background':'url('+this.img+')',
          'background-size': 'cover',
          'background-repeat': 'no-repeat',
          'background-position': 'center center'
        
        };
        }
  }