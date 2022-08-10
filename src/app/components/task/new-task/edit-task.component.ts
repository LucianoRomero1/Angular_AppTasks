import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Task } from 'src/app/models/task.model';
import { TaskService } from 'src/app/services/task.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.css'],
  providers: [UserService, TaskService]
})
export class EditTaskComponent implements OnInit {
  public pageTitle: string;
  public statusMsg;
  public identity;
  public token;
  public task: Task;
  public loading;

  constructor(
    private _userService: UserService,
    private _taskService: TaskService,
    private _route: ActivatedRoute,
    private _router: Router
  ){
    this.pageTitle  = "Edit task";
    this.identity   = this._userService.getIdentity();
    this.token      = this._userService.getToken();
  }

  ngOnInit(): void {
    if(this.identity == null || !this.identity.sub){
      this._router.navigate(["/login"]);
    }else{
      //Aca en vez de inicializarlo vacío lo inicializo con lo que traiga la funcion getTask
      this.getTask();
    }
  }

  //Copio esta funcion porque hago el get de esa tarea para obtener todos sus datos
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
      });
    })
  }

  onSubmit(){
    this._route.params.forEach((params: Params) => {
      let id = +params['id'];
      this._taskService.update(this.token, this.task, id).subscribe(
        {
          next: (response) => {
            //Con este IF valido el response status y code
            if(Object.values(response)[0] != "error" || Object.values(response)[1] != "400"){
              this.statusMsg = "success";
              this.task = Object.values(response)[3];
              setTimeout(() => {
                this._router.navigate(['/']);
              }, 1000);
            }else{
              this.statusMsg = "error";
            }
          },
          error: (error) => {          
            console.log(<any>error);
            this.statusMsg = "error";
          }, 
        }
      );
    });
  }

}
