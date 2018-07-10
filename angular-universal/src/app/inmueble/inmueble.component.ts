import { Component, OnInit } from '@angular/core';
import { IInmueble } from '../structures/inmueble';
import { ActivatedRoute } from '../../../node_modules/@angular/router';

/**
 * Se visualiza el inmueble segun el id
 */
@Component({
  selector: 'app-inmueble',
  templateUrl: './inmueble.component.html',
  styles: []
})
export class InmuebleComponent implements OnInit {

  public inmueble : IInmueble;
  public idInmueble: string;

  constructor(private route : ActivatedRoute) { }

  ngOnInit() {
    //Obtiene el id de la ruta
    this.idInmueble = this.route.snapshot.params.id;
    console.log(this.idInmueble);
    this.inmueble = {id:'',titulo:'Hermoso apartamento',direccion : 'calle 500 #900-40', precio:0}
  }

}
