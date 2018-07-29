import { Component, OnInit } from '@angular/core';
import { InmueblesService } from '../services/inmuebles.service';
import { Observable } from 'rxjs';
import { IInmueble } from '../models/inmueble';
import{ InmueblesCardComponent } from '../card-inmueble/inmueble-card.component';
/**
 * Se visualizan todos los inmuebles 
 */
@Component({
  selector: 'app-inmuebles',
  templateUrl: './inmuebles.component.html',
  styleUrls: ['./inmuebles.component.css']
})
export class InmueblesComponent implements OnInit {


  public publicaciones : Observable<IInmueble[]>;

  constructor(public inmueblesS : InmueblesService) { 
    
  }

  ngOnInit() {
    this.inmueblesS.updatePosts();
    this.publicaciones = this.inmueblesS.posts;
   
  }

}
