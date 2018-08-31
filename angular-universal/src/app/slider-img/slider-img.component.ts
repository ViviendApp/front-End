import {Component, OnInit, Input} from '@angular/core';
import { NguCarousel, NguCarouselStore, NguCarouselService } from '@ngu/carousel'
import { ActivatedRoute } from '@angular/router';
import { InmueblesService } from '../services/inmuebles.service';


@Component({
    selector: 'slider-img-component',
    templateUrl: './slider-img.component.html',
    styleUrls:['./slider-img.component.css']
})
export class SliderImgComponent implements OnInit{
    @Input() imgs:string[];
    @Input() id:string;
    
    public imagenes:string[];

    public carouselOne: NguCarousel;


    constructor(private route : ActivatedRoute,private inmueblesS : InmueblesService){

    }
    ngOnInit(){
        this.inmueblesS.obtenerInmueble(this.route.snapshot.params.id).subscribe((inmu)=>{
            this.imagenes=inmu.images;
        })
            
        
            setTimeout(()=>{
                console.log('carru');
                console.log(this.id);
                console.log("Cambieee")},3000)
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