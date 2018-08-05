import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { Observable } from 'rxjs/Observable';
import { finalize } from 'rxjs/operators';
import { DropZoneDirective }from '../../directives/drop-zone.directive';
import { InmueblesService } from '../../services/inmuebles.service';


@Component({
    selector:'drop-zone-component',
    templateUrl:'drop-zone.component.html',
    styleUrls:['drop-zone.component.css']
})
export class DropZoneComponent {

    @Input() idInmueble : string;
    @Output() rutaFoto = new EventEmitter<string>();

    // Main task 
  task: AngularFireUploadTask;

  // Progress monitoring
  percentage: Observable<number>;

  snapshot: Observable<any>;

  // Download URL
  downloadURL: Observable<string>;

  // State for dropzone CSS toggling
  isHovering: boolean;

  //Arreglo de imagenes subidas
  images : string[];

    constructor(private inmueblesS: InmueblesService,private storage: AngularFireStorage){    }

        toogleHover(event:boolean){
            this.isHovering = event;
        }

        startUpload(event:FileList){
            // The File object
            
            console.log(event.length);

            for (let index = 0; index < event.length; index++) {
                const file = event.item(index);
                
                // Client-side validation example
                if (file.type.split('/')[0] !== 'image') { 
                console.error('unsupported file type :( ')
                return;
                }
                
                // The storage path
                const path = `posts/${this.idInmueble}/${new Date().getTime()}_${file.name}`;
                
                // Totally optional metadata
                const customMetadata = { app: 'My AngularFire-powered PWA!' };
    
                // Inmuebles service upload the image
                this.task=this.inmueblesS.startUploadImg(event,path,file,customMetadata);
                
                // Progress monitoring
                //El procentaje es el % de fotos que lleva mas el porcentaje de lo que va de la foto actual
                //lo que lleva 
                var lleva= index/event.length;
                this.percentage = this.task.percentageChanges();
                this.snapshot   = this.task.snapshotChanges();
           
                // The file's download URL
                this.snapshot.pipe(finalize(() => {this.downloadURL = this.storage.ref(path).getDownloadURL()
                    
                    this.downloadURL.subscribe(val => {console.log(77777);console.log(val); 
                    
                        //Manda el evento de que se subio una foto
                        this.rutaFoto.emit(val);
                        });
                })).subscribe();
            }




        }
         // Determines if the upload task is active
            isActive(snapshot) {
                return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes
            }
}