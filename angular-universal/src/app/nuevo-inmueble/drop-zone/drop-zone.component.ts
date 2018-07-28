import { Component, OnInit } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { Observable } from 'rxjs/Observable';
import { finalize } from 'rxjs/operators';
import { DropZoneDirective }from '../../directives/drop-zone.directive';


@Component({
    selector:'drop-zone-component',
    templateUrl:'drop-zone.component.html',
    styleUrls:['drop-zone.component.css']
})
export class DropZoneComponent {


    // Main task 
  task: AngularFireUploadTask;

  // Progress monitoring
  percentage: Observable<number>;

  snapshot: Observable<any>;

  // Download URL
  downloadURL: Observable<string>;

  // State for dropzone CSS toggling
  isHovering: boolean;
    constructor(private storage: AngularFireStorage){    }

        toogleHover(event:boolean){
            this.isHovering = event;
        }

        startUpload(event:FileList){
            // The File object
            const file = event.item(0)

            // Client-side validation example
            if (file.type.split('/')[0] !== 'image') { 
            console.error('unsupported file type :( ')
            return;
            }

            // The storage path
            const path = `test/${new Date().getTime()}_${file.name}`;

            // Totally optional metadata
            const customMetadata = { app: 'My AngularFire-powered PWA!' };

            // The main task
            this.task = this.storage.upload(path, file, { customMetadata })

            // Progress monitoring
            this.percentage = this.task.percentageChanges();
            this.snapshot   = this.task.snapshotChanges()

            // The file's download URL
            this.snapshot.pipe(finalize(() => this.downloadURL = this.storage.ref(path).getDownloadURL())).subscribe();
        }
         // Determines if the upload task is active
            isActive(snapshot) {
                return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes
            }
}