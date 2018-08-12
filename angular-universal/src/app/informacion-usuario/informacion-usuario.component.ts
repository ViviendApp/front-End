import { Component, OnInit, Input } from '@angular/core';
import { IUser } from '../models/users';

@Component({
  selector: 'app-informacion-usuario',
  templateUrl: './informacion-usuario.component.html',
  styleUrls: ['./informacion-usuario.component.css']
})
export class InformacionUsuarioComponent implements OnInit {

  @Input() email : string;
  @Input() name:string;

  constructor() { }

  ngOnInit() {
  }

}
