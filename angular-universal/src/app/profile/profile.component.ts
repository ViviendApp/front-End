import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { InmueblesService } from '../services/inmuebles.service';
import { IInmueble } from '../models/inmueble';

@Component({
    selector: 'profile-component',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
  })
  export class ProfileComponent implements OnInit{
    public user:any;

    public inmuebles:Promise<IInmueble[]>;
    constructor(public auth:AuthService, public router : Router, private inmueblesS : InmueblesService){ 

     }

    ngOnInit(){ 
      this.inmuebles=this.inmueblesS.setInmueblesUsuario();
      }
    
  }