import { Component, OnInit } from '@angular/core';
import { IInmueble } from '../models/inmueble';
import { ActivatedRoute, Router } from '@angular/router';
import { InmueblesService } from '../services/inmuebles.service';
import { ThrowStmt } from '@angular/compiler';
import { AuthService } from '../services/auth.service';
import { auth } from 'firebase';
import { Observable } from 'rxjs';
import { IUser } from '../models/users';
import { AlertService } from '../services/alert.service';

/**
 * Se visualiza el inmueble segun el id
 */
@Component({
  selector: 'app-inmueble',
  templateUrl: './inmueble.component.html',
  styleUrls: ['./inmueble.component.css']
})
export class InmuebleComponent implements OnInit {
  public img: string ="../../assets/img/no_foto/nofoto.jpg";
  public inmueble : IInmueble;
  public idInmueble : string;
  /**
   * Indica si se puede visualizar la informacion de contacto
   */
  public verContacto : boolean;
  


  constructor(private router: Router,private route : ActivatedRoute, private inmueblesS : InmueblesService, private authS:AuthService, private alertService:AlertService) { }

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
      this.router.navigate(["/404"])
      if(this.inmueble.images!=null)
      {
        if(this.inmueble.images[0]!=null)
          this.img=this.inmueble.images[0];
      }
    });
  }

  obtenerInmuebleRTD(){
    this.inmueblesS.obtenerInmuebleRTD(this.idInmueble).then(inmu=>{
      this.inmueble=inmu.val();
    });
  }
  solicitarInformacionContacto(){
    
    this.authS.getUser().subscribe((u)=>{
      if(u.isStudent)
      this.verContacto=true;
      else
      this.error('Contenido exclusivo para estudiantes');
     
    })
    
    }
  
    error(message: string) {
      this.alertService.error(message);
    }


    

}
