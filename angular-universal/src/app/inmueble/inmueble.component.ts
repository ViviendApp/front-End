import { Component, OnInit } from '@angular/core';
import { IInmueble } from '../models/inmueble';
import { ActivatedRoute, Router } from '../../../node_modules/@angular/router';
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
  public idInmueble : string;
  /**
   * Indica si se puede visualizar la informacion de contacto
   */
  public verContacto : boolean;


  constructor(private router: Router,private route : ActivatedRoute, private inmueblesS : InmueblesService) { }

  ngOnInit() {
    //Obtiene el id de la ruta
    this.idInmueble = this.route.snapshot.params.id;
    this.inmueble=null;
    this.verContacto=false;
    // Obtiene el imueble desde la firecloud
    this.obtenerInmuebleFD();
   
     
   

    //Obtiene el imbueble desde la realtime
    // this.obtenerInmuebleRTD();
}
  obtenerInmuebleFD(){
    this.inmueblesS.obtenerInmueble(this.idInmueble).subscribe(inmu=>{
      this.inmueble=inmu;
      if(this.inmueble==null)
      this.router.navigate(["/notfound"])

    });
  }

  obtenerInmuebleRTD(){
    this.inmueblesS.obtenerInmuebleRTD(this.idInmueble).then(inmu=>{
      this.inmueble=inmu.val();
    });
  }
  solicitarInformacionContacto(){
    this.verContacto=true;
  }

}
