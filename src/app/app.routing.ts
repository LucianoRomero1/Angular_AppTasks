import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule, Route } from "@angular/router";

import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";

//Defino todas las rutas 
const appRoutes: Routes = [
    //Ruta vacía
    {path: '', component: LoginComponent},
    //Rutas definidas
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    //Ruta que da error por defecto cargar login, tengo que ponerlo último, sino no funciona
    {path: '**', component: LoginComponent},

];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<Route> = RouterModule.forRoot(appRoutes);

