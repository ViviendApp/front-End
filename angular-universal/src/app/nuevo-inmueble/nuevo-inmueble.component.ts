import { Component, OnInit } from '@angular/core';
import { IInmueble } from '../models/inmueble';
import { AuthService } from '../services/auth.service';
import { InmueblesService } from '../services/inmuebles.service';
import { Router } from '@angular/router';
import { AlertService } from '../services/alert.service';

@Component({
  selector: 'app-nuevo-inmueble',
  templateUrl: './nuevo-inmueble.component.html',
  styleUrls: ['./nuevo-inmueble.component.css']
})
export class NuevoInmuebleComponent implements OnInit {

  
  public inmueble : IInmueble;

  constructor(private authS: AuthService, private inmueblesS: InmueblesService, public router : Router,private alertService: AlertService) { }

  ngOnInit() {
    this.authS.getUser();
    
    this.inmueble = {postID:'',date:this.obtenerFecha(),email : this.authS.getUserObject().email, phone : 0, place : '', price : 0, sold : false, title : '', userID : this.authS.getUserObject().uid}
  }

  publicarCF(){
    this.inmueblesS.addCF(this.inmueble).then(
      (e)=>{

      /**
       * router.ir(postID)
       * enviar exito o fracaso de el post en el controlador de alertas
       */
        this.router.navigate(["/"]);
        this.success('Creado Inmueble');
    } 
  );
  }
  publicarRTD(){
    this.inmueblesS.addRTD(this.inmueble);
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









}
