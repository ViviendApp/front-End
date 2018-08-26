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
import { SliderImgComponent } from '../slider-img/slider-img.component'
/**
 * Se visualiza el inmueble segun el id
 */
@Component({
  selector: 'app-inmueble',
  templateUrl: './inmueble.component.html',
  styleUrls: ['./inmueble.component.css']
})
export class InmuebleComponent implements OnInit {
  public img: string[] =["../../assets/img/no_foto/nofoto.jpg"];
  public inmuebleObjeto : IInmueble;
  public inmuebleEditado : IInmueble;
  public idInmueble : string;
  public editando : boolean;
  /**
   * Indica si se puede visualizar la informacion de contacto
   */
  public verContacto : boolean;
  
  public esDeUsuario : Observable<boolean>;

  public inmueble : Observable<IInmueble>;

  public phone : number;
  public email : string;

  constructor(private router: Router,private route : ActivatedRoute, private inmueblesS : InmueblesService, private authS:AuthService, private alertService:AlertService) { }

  ngOnInit() {
    this.editando=false;
    //Obtiene el id de la ruta
    this.idInmueble = this.route.snapshot.params.id;
    this.inmuebleObjeto=null;
    this.verContacto=false;
    // Obtiene el imueble desde la firecloud
    this.obtenerInmuebleFD();
    this.inmueble=this.inmueblesS.obtenerInmueble(this.idInmueble);
    
    
      
     
   

    //Obtiene el imbueble desde la realtime
    // this.obtenerInmuebleRTD();
}
  obtenerInmuebleFD(){
    this.inmueblesS.obtenerInmueble(this.idInmueble).subscribe(inmu=>{
      this.inmuebleObjeto=inmu;
      this.esDeUsuario=this.authS.getUserObservable.map((u)=>{
        if(u.uid==this.inmuebleObjeto.userID) return true;
        else return false
      }) 
      if(this.inmuebleObjeto==null)
      this.router.navigate(["/404"])
      if(this.inmuebleObjeto.images!=null)
      {
        if(this.inmuebleObjeto.images[0]!=null)
          this.img=this.inmuebleObjeto.images;
      }
    });
  }

  obtenerInmuebleRTD(){
    this.inmueblesS.obtenerInmuebleRTD(this.idInmueble).then(inmu=>{
      this.inmuebleObjeto=inmu.val();
    });
  }
  solicitarInformacionContacto(){
    
    this.authS.getUserObservable.subscribe((u)=>{
      if(u.isStudent){
        this.verContacto=true;
        this.authS.obtenerUsuario(this.inmuebleObjeto.userID).then((usr)=>{
          this.email=usr.email;
          this.phone=usr.phone;
        })
      }
      else
        this.error('Contenido exclusivo para estudiantes');
     
    })
    
    }
  
  error(message: string) {
      this.alertService.error(message);
    }

  editar(){
    // Toca asi porque si no tambien se modifica el inmueble al cancelar
    this.inmuebleEditado={
      postID:this.inmuebleObjeto.postID,
      date:this.inmuebleObjeto.date,
      email:this.inmuebleObjeto.email,
      images:this.inmuebleObjeto.images,
      phone:this.inmuebleObjeto.phone,
      place:this.inmuebleObjeto.place,
      price:this.inmuebleObjeto.price,
      sold:this.inmuebleObjeto.sold,
      title:this.inmuebleObjeto.title,
      userID:this.inmuebleObjeto.userID
    }
    
    this.editando=true;

  } 
  cancelarEdicion(){
    this.editando=false;
    console.log(this.inmuebleObjeto)
    console.log(this.inmuebleEditado)
  } 
  confirmarEdicion(){
    this.inmueblesS.addCF(this.inmuebleEditado).then(()=>{
      this.inmuebleObjeto=this.inmuebleEditado;
      this.editando=false;
    }
    ).catch(()=>{
      this.error('No se pudieron efectuar los cambios');
    }
    );
    

  }  
  eliminar(){
    this.confirmarEliminacion();
  }
  confirmarEliminacion(){
    this.inmueblesS.deletePost(this.inmuebleObjeto).then(()=>
    {
      this.router.navigate(["/"])
    }
    );

  }

}
