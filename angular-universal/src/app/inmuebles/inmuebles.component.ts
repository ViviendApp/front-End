import { Component, OnInit } from '@angular/core';
import { InmueblesService } from '../services/inmuebles.service';
import { Observable } from '../../../node_modules/rxjs';
import { IInmueble } from '../structures/inmueble';
/**
 * Se visualizan todos los inmuebles 
 */
@Component({
  selector: 'app-inmuebles',
  templateUrl: './inmuebles.component.html',
  styles: []
})
export class InmueblesComponent implements OnInit {


  public publicaciones : Observable<IInmueble[]>;

  constructor(public inmueblesS : InmueblesService) { }

  ngOnInit() {
    this.publicaciones = this.inmueblesS.posts;
  }

}
