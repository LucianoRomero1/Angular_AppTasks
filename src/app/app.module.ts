import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from "@angular/forms";

import { routing, appRoutingProviders } from './app.routing';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HeaderComponent } from './components/header/header.component';
import { HttpClientModule, HttpHeaders, HttpResponse } from "@angular/common/http";
import { DefaultComponent } from './components/default/default.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { NewTaskComponent } from './components/task/new-task/new-task.component';
import { TaskDetailComponent } from './components/task-detail/task-detail.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    DefaultComponent,
    UserEditComponent,
    NewTaskComponent,
    TaskDetailComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    routing,
  ],
  providers: [
    appRoutingProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
