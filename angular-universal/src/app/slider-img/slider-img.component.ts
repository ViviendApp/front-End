import {Component, OnInit} from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NgbCarouselConfig} from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'slider-img-component',
    templateUrl: './slider-img.component.html',
    styleUrls:['./slider-img.component.css'],
    providers: [NgbCarouselConfig]
})
export class SliderImgComponent implements OnInit{
    constructor(){

    }
    ngOnInit(){

    }
}