import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { InmueblesService } from '../services/inmuebles.service';
import { IInmueble } from '../models/inmueble';
import { Observable } from 'rxjs';
import { IUser } from '../models/users';

@Component({
    selector: 'profile-component',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
  })
  export class ProfileComponent implements OnInit{
    public user:any;

    public inmuebles:Promise<IInmueble[]>;
    public usuario: Observable<IUser>;
    public userId: string;
    
    constructor(public auth:AuthService, public router : Router, private inmueblesS : InmueblesService){ 

     }

    ngOnInit(){ 
      this.inmuebles=this.inmueblesS.setInmueblesUsuario();
      this.usuario=this.auth.getUserObservable

      this.auth.getUserObservable.subscribe((us)=>{
        this.userId=us.uid;
      })
    }
    eliminarPerfil(){
        this.confirmarEliminarPerfil();
    }
    confirmarEliminarPerfil(){
        //Elimina inmuebles
        this.inmuebles.then((i)=>{
          i.forEach(element => {
           this.inmueblesS.deletePost(element).catch((v)=>{
              console.log(v)
           }) 
          });
        })
        console.log('borrando perfil')
        //Elimina perfil
        this.auth.deleteProfile(this.userId).then(()=>{this.auth.logout().then(()=>{this.router.navigate(["/"])})}).catch(console.log);
        

    }
    
  }