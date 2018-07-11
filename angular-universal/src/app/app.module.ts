import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
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
import { UsersService } from './services/users.service';
import { AuthGuard } from './guards/auth.guard.service';
import { InmuebleComponent } from './inmueble/inmueble.component';
import { FormsModule } from "@angular/forms";
import { NuevoInmuebleComponent } from './nuevo-inmueble/nuevo-inmueble.component';
import { InmueblesService } from './services/inmuebles.service';
import { InmueblesComponent } from './inmuebles/inmuebles.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    InmuebleComponent,
    NuevoInmuebleComponent,
    InmueblesComponent,
    MenuComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'my-app'}),
    RouterModule.forRoot(routes),
    TransferHttpCacheModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    FormsModule
  ],
  providers: [AuthService,UsersService, AuthGuard, InmueblesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
