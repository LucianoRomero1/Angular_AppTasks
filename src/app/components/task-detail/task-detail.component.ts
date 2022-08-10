import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Task } from 'src/app/models/task.model';
import { TaskService } from 'src/app/services/task.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css'],
  providers: [UserService, TaskService],
})
export class TaskDetailComponent implements OnInit {

  public identity;
  public token;
  public task: Task;
  public loading;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _taskService: TaskService
  ){
    this.identity  = this._userService.getIdentity();
    this.token      = this._userService.getToken();
  }

  ngOnInit(): void {
    if(this.identity && this.identity.sub){
      this.getTask();
    }else{
      this._router.navigate(['/login']);
    }
  }

  getTask(){
    this.loading = 'show';
    //Obtengo los parametros de la URL
    this._route.params.forEach((params: Params) => {
      //Convierto con el + a un entero
      let id = +params['id'];

      this._taskService.getTask(this.token, id).subscribe({
        next: (response) => {
          if(Object.values(response)[0] != "error" || Object.values(response)[1] != "400"){
            //Si bien la lista que traigo ya es unicamente de nuestro usuario, tengo que validarlo por aca tambien
            if(Object.values(response)[2].user.id == this.identity.sub){
              this.task = Object.values(response)[2];      
              this.loading = 'hide';        
            }else{
              this._router.navigate(['/'])
            }
          }else{
            this._router.navigate(['/login'])
          }
        },
        error: (error) => {          
          console.log(<any>error);
        }, 
      })
    })
  }

}
