import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Task } from 'src/app/models/task.model';
import { TaskService } from 'src/app/services/task.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.css'],
  providers: [UserService, TaskService]
})
export class DefaultComponent implements OnInit {

  public title: string;
  public identity;
  public token;
  public tasks: Array<Task>;
  //Variables para el tema de paginacion
  public pages;
  public pagePrev;
  public pageNext;
  public loading;

  
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _taskService: TaskService
  ) { 
    this.title = 'Task List';
    this.identity = this._userService.getIdentity();
    this.token    = this._userService.getToken();
  }

  ngOnInit(): void {
    this.getAllTasks();
  }

  getAllTasks(){
    this._route.params.forEach((params: Params) => {
      //Convierte a int el parametro que le llega por url llamado page
      let page = +params['page'];
      if(!page){
        page = 1;
      }

      //Efecto de cargando
      this.loading = "show";

      this._taskService.getTasks(this.token, page).subscribe({
        next: (response) => {
          //Con este IF valido el response status y code
          if(Object.values(response)[0] != "error" || Object.values(response)[1] != "400"){
            //Ese array en la posicion 7 tengo la lista de tasks, porque es segun lo que devuelvo en el back
            this.tasks      = Object.values(response)[7];
            this.loading    = "hide";
            
            //Total de páginas
            let total_pages = Object.values(response)[6];
            this.pages      = [];
            for (let index = 0; index < total_pages; index++) {
              this.pages.push(index);
            }
            
            //Pagina anterior
            if(page >= 2){
              this.pagePrev = page - 1;
            }else{
              this.pagePrev = page;
            }

            //Pagina siguiente
            if(page < total_pages){
              this.pageNext = ( page + 1 );
            }else{
              this.pageNext = page;
            }
          }
        },
        error: (error) => {          
          console.log(<any>error);
        }, 
      })
    });
  }

}
