import { Injectable } from "../../../node_modules/@angular/core";
import { AngularFirestore, AngularFirestoreCollection } from "../../../node_modules/angularfire2/firestore";
import { AuthService } from "./auth.service";
import { IInmueble } from "../structures/inmueble";
import { Observable } from "../../../node_modules/rxjs";

@Injectable()
export class InmueblesService {

    /**
     * Id del usuario que ha iniciado sesion
     */
    public uid : string;
    /**
     * Inmuebles del usuario si ha iniciado sesion
     */
    public inmueblesDeUsuario : AngularFirestoreCollection<IInmueble>;
    /**
     * Total de inmuebles
     */
    public inmuebles : Observable<IInmueble[]>;

    constructor(public afs : AngularFirestore, private auth : AuthService){
        //Si se ha iniciado sesion, se obtiene el id del usuario
        this.auth.getUser().subscribe(user=>{
            this.uid=user.uid;
        });
        //Actualiza la lista de inmuebles
        this.inmuebles=this.afs.collection('inmuebles').snapshotChanges().map(actions=>{
            return actions.map(item=>{
                const data=item.payload.doc.data() as IInmueble;
                const id =item.payload.doc.id;
                //Une al data y al id
                return {...data,id};
            });
        })
     }

     /**
      * Actualiza los inmuebles del usuario que tiene sesion iniciada para que pueda editarlos
      */
     setInmueblesUsuario(){

     }

}