import { Component, OnInit } from '@angular/core';
import { InmueblesService } from '../services/inmuebles.service';
/**
 * Se visualizan todos los inmuebles 
 */
@Component({
  selector: 'app-inmuebles',
  templateUrl: './inmuebles.component.html',
  styles: []
})
export class InmueblesComponent implements OnInit {

  constructor(public inmueblesS : InmueblesService) { }

  ngOnInit() {
  
  }

}
