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
    public inmueblesDeUsuario : AngularFirestoreCollection<IInmueble>;
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
        this.auth.getUser().subscribe(user=>{
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
     setInmueblesUsuario(){

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
     startUploadImg (event:FileList, idInmueble : string,) : AngularFireUploadTask {
        var task: AngularFireUploadTask;
        // The File object
        const file = event.item(0)

        // Client-side validation example
        if (file.type.split('/')[0] !== 'image') { 
        console.error('unsupported file type :( ')
        return;
        }

        // The storage path
        const path = `posts/${idInmueble}/${new Date().getTime()}_${file.name}`;

        // Totally optional metadata
        const customMetadata = { app: 'My AngularFire-powered PWA!' };

        // The main task
        task = this.storage.upload(path, file, { customMetadata })

        console.log(this.storage.ref(path).getDownloadURL());
        return task;

        // Progress monitoring
        // this.percentage = this.task.percentageChanges();
        // this.snapshot   = this.task.snapshotChanges()

        // The file's download URL
    }
    
     
}