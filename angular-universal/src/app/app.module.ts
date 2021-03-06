import {BrowserModule} from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {RouterModule} from '@angular/router';

import { AppComponent } from './base/app.component';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';

import {TransferHttpCacheModule} from '@nguniversal/common';

import { environment } from "../environments/environment";
import { AngularFireModule } from "angularfire2";
import { AngularFirestoreModule } from "angularfire2/firestore";
import { AngularFireAuthModule } from "angularfire2/auth";
import { routes } from "./routes";
import { LoginComponent } from './login/login.component';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './guards/auth.guard.service';
import { InmuebleComponent } from './inmueble/inmueble.component';
import { FormsModule } from "@angular/forms";
import { NuevoInmuebleComponent } from './nuevo-inmueble/nuevo-inmueble.component';
import { InmueblesService } from './services/inmuebles.service';
import { InmueblesComponent } from './inmuebles/inmuebles.component';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { ErrorNotFoundComponent } from './error-not-found/error-not-found.component';
import { AlertComponent } from './alert/alert.component';
import { AlertService } from './services/alert.service';
import { MustLogOut } from './guards/mustLogOut.guard.service';
import { DropZoneComponent } from './nuevo-inmueble/drop-zone/drop-zone.component';
import { FileSizePipe } from './pipes/filesize.pipe';
import { AngularFireStorage, AngularFireStorageModule } from 'angularfire2/storage';
import { DropZoneDirective } from './directives/drop-zone.directive';
import { InmueblesCardComponent } from './card-inmueble/inmueble-card.component'
import { ProfileComponent } from './profile/profile.component';
import { FooterComponent } from './footer/footer.component';
import { InformacionUsuarioComponent } from './profile/informacion-usuario/informacion-usuario.component';
import { SliderImgComponent } from './slider-img/slider-img.component';
import { PrivacyComponent } from './about/privacy.component';
import { SlideshowModule } from 'ng-simple-slideshow';
import { studentValidComponent } from './studentValidationComponent/studentValid.component';
import { MsalModule } from '@azure/msal-angular';
import { NguCarouselModule } from '@ngu/carousel';
import { MustNoStudentGuard } from './guards/mustNoStudent.guard.service';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    InmuebleComponent,
    NuevoInmuebleComponent,
    InmueblesComponent,
    MenuComponent,
    ErrorNotFoundComponent,
    AlertComponent,
    DropZoneComponent,
    FileSizePipe,
    DropZoneDirective,
    InmueblesCardComponent,
    ProfileComponent,
    FooterComponent,
    InformacionUsuarioComponent,
    SliderImgComponent,
    PrivacyComponent,
    studentValidComponent
    

  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'my-app'}),
    RouterModule.forRoot(routes),
    TransferHttpCacheModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    FormsModule,
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    SlideshowModule,
    MsalModule.forRoot({
      clientID: '881f0006-33eb-4a72-b392-14f5cd0e1ef1',
      authority: 'https://login.microsoftonline.com/uniandes.onmicrosoft.com'
    }),
    NguCarouselModule

  ],
  providers: [AuthService, AuthGuard, InmueblesService,AlertService,MustLogOut,AngularFireStorage,DropZoneDirective,MustNoStudentGuard],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
],
})
export class AppModule { }
