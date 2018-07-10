import { Component, OnInit } from '@angular/core';
import { IInmueble } from '../structures/inmueble';

@Component({
  selector: 'app-nuevo-inmueble',
  templateUrl: './nuevo-inmueble.component.html',
  styles: []
})
export class NuevoInmuebleComponent implements OnInit {

  
  public inmueble : IInmueble;

  constructor() { }

  ngOnInit() {
    this.inmueble = {id:'',titulo:'',direccion : '', precio:0}
  }

}
