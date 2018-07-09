import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";

export const routes = [
    { path: '', component: HomeComponent, pathMatch: 'full'},
    { path: 'login', component: LoginComponent, pathMatch: 'full'} 
  ]