import { Component, OnInit, Input } from '@angular/core';
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

    // Main task 
  task: AngularFireUploadTask;

  // Progress monitoring
  percentage: Observable<number>;

  snapshot: Observable<any>;

  // Download URL
  downloadURL: Observable<string>;

  // State for dropzone CSS toggling
  isHovering: boolean;
    constructor(private inmueblesS: InmueblesService,private storage: AngularFireStorage){    }

        toogleHover(event:boolean){
            this.isHovering = event;
        }

        startUpload(event:FileList){
            
            this.task=this.inmueblesS.startUploadImg(event,this.idInmueble);

            
            // Progress monitoring
            this.percentage = this.task.percentageChanges();
            this.snapshot   = this.task.snapshotChanges()

            // The file's download URL
            //this.snapshot.pipe(finalize(() => this.downloadURL = this.storage.ref(path).getDownloadURL())).subscribe();
        }
         // Determines if the upload task is active
            isActive(snapshot) {
                return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes
            }
}