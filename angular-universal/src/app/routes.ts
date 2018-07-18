import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";
import { InmuebleComponent } from "./inmueble/inmueble.component";
import { NuevoInmuebleComponent } from "./nuevo-inmueble/nuevo-inmueble.component";
import { AuthGuard } from "./guards/auth.guard.service";
import { InmueblesComponent } from "./inmuebles/inmuebles.component";
import { ErrorNotFoundComponent } from "./error-not-found/error-not-found.component";
import { MustLogOut } from "./guards/mustLogOut.guard.service";

export const routes = [
    { path: '', component: HomeComponent, pathMatch: 'full'},
    { path: 'login', component: LoginComponent, pathMatch: 'full',canActivate:[MustLogOut]},
    { path: 'inmuebles', component: InmueblesComponent, pathMatch: 'full'},  
    { path: 'inmuebles/:id', component: InmuebleComponent, pathMatch: 'full'},  
    { path: 'publicar', component: NuevoInmuebleComponent, pathMatch: 'full',canActivate:[AuthGuard]}, 
    { path: '404', component: ErrorNotFoundComponent, pathMatch: 'full'} 
  ]