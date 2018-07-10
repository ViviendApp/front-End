import { Component, OnInit } from '@angular/core';
import { InmueblesService } from '../services/inmuebles.service';
/**
 * Se visualizan todos los inmuebles 
 */
@Component({
  selector: 'app-inmuebles',
  template: './inmuebles.component.html',
  styles: []
})
export class InmueblesComponent implements OnInit {

  constructor(private inmueblesS : InmueblesService) { }

  ngOnInit() {
  
  }

}
