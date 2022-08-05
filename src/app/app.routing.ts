import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule, Route } from "@angular/router";
import { DefaultComponent } from "./components/default/default.component";

import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { UserEditComponent } from "./components/user-edit/user-edit.component";

//Defino todas las rutas 
const appRoutes: Routes = [
    //Ruta vacía
    {path: '', component: DefaultComponent},
    //Rutas definidas
    {path: 'login', component: LoginComponent},
    //Sirve para vaciar el local storage
    {path: 'login/:id', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'user-edit', component: UserEditComponent},
    //Ruta que da error por defecto cargar login, tengo que ponerlo último, sino no funciona
    {path: '**', component: LoginComponent},

];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<Route> = RouterModule.forRoot(appRoutes);

