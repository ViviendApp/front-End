import { Component, OnInit, Input } from '@angular/core';
import { IUser } from '../models/users';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-informacion-usuario',
  templateUrl: './informacion-usuario.component.html',
  styleUrls: ['./informacion-usuario.component.css']
})
export class InformacionUsuarioComponent implements OnInit {

  @Input() email : string;
  @Input() name:string;

  public editando : boolean;
  public user : Observable<IUser>
  public userObject : IUser;
  public userEdit : IUser;

  constructor(private authS : AuthService) { }

  ngOnInit() {
    this.editando=false;
    this.user=this.authS.getUser();
    this.authS.getUser().subscribe((value)=>this.userObject=value)
  }
  editar(){
    this.userEdit={
      name: this.userObject.name,
      uid: this.userObject.uid,
      email: this.userObject.email,
      //bio: this.userObject.bio,
      isStudent: this.userObject.isStudent,
      phone: this.userObject.phone,
    }
    this.editando=true;
  }
  cancelarEdicion(){
    this.editando=false;
  }
  confirmarEdicion(){
    this.authS.add(this.userEdit).then(()=>{
      this.userObject=this.userEdit;
    }).catch(console.log);
    this.editando=false;
  }

}
