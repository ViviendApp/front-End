import { Injectable } from "@angular/core";
import { AngularFirestore, AngularFirestoreCollection } from "angularfire2/firestore";
import { AuthService } from "./auth.service";
import { IInmueble } from "../models/inmueble";
import { Observable } from "rxjs";
import { AngularFireDatabase, AngularFireList } from "angularfire2/database"; 
import { DataSnapshot } from "angularfire2/database/interfaces";
import { AngularFireStorage,AngularFireUploadTask } from "../../../node_modules/angularfire2/storage";

@Injectable()
export class InmueblesService {

    /**
     * Id del usuario que ha iniciado sesion
     */
    public uid : string;
    /**
     * Inmuebles del usuario si ha iniciado sesion
     */
    public inmueblesDeUsuario : Promise<IInmueble[]>;
    /**
     * Total de inmuebles en el CloudFirestore
     */
    public inmueblesCF : AngularFirestoreCollection<IInmueble>;

    /**
     * Total de inmuebles en el RealTimeDatabase
     */
    public inmueblesRTD : AngularFireList<IInmueble>;

    public posts : Observable<IInmueble[]>;



    constructor(public afs : AngularFirestore, private auth : AuthService,private dataBase :AngularFireDatabase, private storage: AngularFireStorage ){
        //Si se ha iniciado sesion, se obtiene el id del usuario
        this.auth.getUserObservable.subscribe(user=>{
            this.uid=user.uid;
        });
        //Obtiene la coleccion de la cloudFirestore
        this.inmueblesCF = afs.collection<IInmueble>('posts');

        //Obtiene la lista de inmuebles de la RealTimeDatabase
        // this.inmueblesRTD= dataBase.list('/posts');

        // Actualiza la lista de posts con el cloud fire
        this.posts=this.inmueblesCF.snapshotChanges().map(actions=>{
            return actions.map(item=>{
                const data=item.payload.doc.data() as IInmueble;
                const id =item.payload.doc.id;
            
                //Une al data y al id
                return {...data,id};
            });
        })

        
        //Actualiza la lista de posts con el realtime database
        // this.posts=this.inmueblesRTD.snapshotChanges().map(actions=>{
        //     return actions.map(item=>{
        //         const data=item.payload.val() as IInmueble;
        //         const id =item.payload.key;
        //         return {...data,id};
        //     });
        // })

     }

     /**
      * Anade en el cloud firestore
      * @param inmueble 
      */
     addCF(inmueble : IInmueble) :Promise<void>{
         //ClOUD FIRESTORE:
         console.log(inmueble);
         return this.inmueblesCF.doc(inmueble.postID).set(inmueble).catch(console.log);
     }
     /**
      * Anade en el realtime database
      * @param inmueble 
      */
     addRTD(inmueble : IInmueble) :void{
        //REAL TIME DATABASE:
       // this.inmueblesRTD.push(inmueble);
        this.dataBase.database.ref('posts/'+inmueble.postID).set(inmueble);
    }


    /**
     * Obtiene el inmueble del cloud fire
     * @param postID 
     */
    obtenerInmueble(postID:string) : Observable<IInmueble>{
       return this.inmueblesCF.doc(postID).snapshotChanges().map(item=>{
          const data=item.payload.data() as IInmueble; 
            return data});
    }

    /**
     * Obtiene el inmueble del RealTimeDatabase
     * @param postID 
     */
    obtenerInmuebleRTD(postID:string): Promise<DataSnapshot>{
        return this.dataBase.database.ref('posts/'+postID).once("value");;
    }
    retornarV(res:IInmueble){
        return res;
    }

     /**
      * Actualiza los inmuebles del usuario que tiene sesion iniciada para que pueda editarlos
      */
     setInmueblesUsuario():Promise<IInmueble[]>{
         
          
            
           return  this.inmueblesDeUsuario=
             this.inmueblesCF.ref.where("userID","==",this.auth.idUser()).get().then((value)=>{
                return value.docs
                .map(actions=>{

                    const data=actions.data() as IInmueble;
                    const id =actions.id;
                    
                    //Une al data y al id
                    return {...data,id};

                       
                    });
                });
             ;
         
     }

     
     updatePosts(){
        this.posts=this.inmueblesCF.snapshotChanges().map(actions=>{
            return actions.map(item=>{
                const data=item.payload.doc.data() as IInmueble;
                const id =item.payload.doc.id;
            
                //Une al data y al id
                return {...data,id};
            });
        })
     }



     //STORAGE IMAGENES
     startUploadImg (event:FileList, path : string, file:any , customMetadata: any) : AngularFireUploadTask {
        var task: AngularFireUploadTask;
        
        // The main task
        task = this.storage.upload(path, file, { customMetadata })

        return task;
    }


    deletePost(inmueble : IInmueble) : Promise<void>{
        //Eliminacion de las fotos
        
        inmueble.images.forEach(img => {
            
            this.storage.storage.refFromURL(img).delete().then(
                (v)=>console.log(v))
            
        });
        return this.inmueblesCF.doc(inmueble.postID).delete();
    }
    
    hashear(texto:string) : string{
        var today = new Date();
        var d = today.getDate();
        texto+=today.getHours()+today.getMinutes()+today.getDay()+today.getMilliseconds()+today.getMonth()+today.getFullYear();
        var hash ;
        if (texto.length == 0) {
            return '0';
        }
        for (var i = 0; i < texto.length; i++) {
            var char = texto.charCodeAt(i);
            hash = ((hash<<5)-hash)+char;
            hash = hash & hash; // Convert to 32bit integer
        }
        if(hash<0)
            hash=-hash;
        return hash;
    }
     
}