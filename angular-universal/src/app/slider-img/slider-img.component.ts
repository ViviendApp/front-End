import {Component, OnInit, Input} from '@angular/core';
import { NguCarousel } from '@ngu/carousel'

@Component({
    selector: 'slider-img-component',
    templateUrl: './slider-img.component.html',
    styleUrls:['./slider-img.component.css']
})
export class SliderImgComponent implements OnInit{
    @Input() imgs:string[];

    public carouselOne: NguCarousel;


    constructor(){

    }
    ngOnInit(){
            console.log(this.imgs)
            this.carouselOne = {
                grid: {xs: 1, sm: 1, md: 1, lg: 1, all: 0},
                slide: 1,
                loop:true,
                point: {
                  visible: false
                },
                load: 2,
                touch: true,
                custom: 'banner'
              }
        
        
    }
}