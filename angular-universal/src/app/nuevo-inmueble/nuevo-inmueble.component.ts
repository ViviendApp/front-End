import { Component,ViewChild,AfterViewInit, OnInit } from '@angular/core';
import { IInmueble } from '../models/inmueble';
import { AuthService } from '../services/auth.service';
import { InmueblesService } from '../services/inmuebles.service';
import { Router } from '@angular/router';
import { AlertService } from '../services/alert.service';

import { DropZoneComponent } from './drop-zone/drop-zone.component'

@Component({
  selector: 'app-nuevo-inmueble',
  templateUrl: './nuevo-inmueble.component.html',
  styleUrls: ['./nuevo-inmueble.component.css']
})
export class NuevoInmuebleComponent implements OnInit, AfterViewInit {

  
  public inmueble : IInmueble;
  public publicable : boolean = false;
  @ViewChild(DropZoneComponent) child: DropZoneComponent;

  constructor(private authS: AuthService, private inmueblesS: InmueblesService, public router : Router,private alertService: AlertService) { }

  ngOnInit() {
    this.authS.getUserObservable.subscribe((user)=>{
      this.inmueble = {images:[],postID:this.inmueblesS.hashear(user.uid)+'',date:this.obtenerFecha(),email : this.authS.getUserObject().email, phone : 0, place : '', price : 0, sold : false, title : '', userID : this.authS.getUserObject().uid}
    });
    
  }

  

  async publicarCF(){
    if(this.publicable){

    
    try {
      await this.inmueblesS
        .addCF(this.inmueble);
      this.router.navigate(["/"]);
      this.success('Creado Inmueble');
    } catch(err) {
      if(err == "FirebaseError: [code=invalid-argument]: Document path must be a non-empty string")
        this.error("Los campos no pueden estar vacios.")
      else 
        this.error('Error creando la publicación: '+err )    
      }
    }else{
      this.error('No se pudo publicar por un error al momento de guardar la imagen en la base de datos.')
    }
  }
  publicarRTD(){
    this.inmueblesS.addRTD(this.inmueble);
  }

  anadirRuta(ev:any){
    this.inmueble.images.push(ev);

  }

  obtenerFecha():string{
    var resp='';
    var today = new Date();
    var d = today.getDate();
    var m = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();
    if(d<10) {
        resp = '0';
    } 
    resp=resp+d+'/';

    if(m<10) {
        resp=resp+'0';
    } 
    resp=resp+m+'/'+yyyy;
    return resp;
  }
  success(message: string) { 
    this.alertService.success(message);
  }

  error(message: string) {
    this.alertService.error(message);
  }

  info(message: string) {
    this.alertService.info(message);
  }

  warn(message: string) {
    this.alertService.warn(message);
  }

  clear() {
    this.alertService.clear();
  }

  ngAfterViewInit() {
    this.publicable = true;
    
  }







}
