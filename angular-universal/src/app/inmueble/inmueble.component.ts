import { Component, OnInit } from '@angular/core';
import { IInmueble } from '../structures/inmueble';
import { ActivatedRoute } from '../../../node_modules/@angular/router';
import { InmueblesService } from '../services/inmuebles.service';

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

  constructor(private route : ActivatedRoute, private inmueblesS : InmueblesService) { }

  ngOnInit() {
    //Obtiene el id de la ruta
    this.idInmueble = this.route.snapshot.params.id;
    console.log(this.idInmueble);
    //Obtiene el imueble desde la firecloud
    this.obtenerInmuebleFD();
    //Obtiene el imbueble desde la realtime
    // this.obtenerInmuebleRTD();
}
  obtenerInmuebleFD(){
    this.inmueblesS.obtenerInmueble(this.idInmueble).subscribe(inmu=>{
      this.inmueble=inmu;
    });
  }

  obtenerInmuebleRTD(){
    this.inmueblesS.obtenerInmuebleRTD(this.idInmueble).then(inmu=>{
      console.log(inmu.val());
      this.inmueble=inmu.val();
    });
    // .then(function(snap){
    //   this.inmueble=snap.val;
    // });
    console.log();
  }

}
