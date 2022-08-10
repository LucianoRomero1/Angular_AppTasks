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
export class NewTaskComponent implements OnInit {
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
    this.pageTitle  = "New task";
    this.identity   = this._userService.getIdentity();
    this.token      = this._userService.getToken();
  }

  ngOnInit(): void {
    if(this.identity == null || !this.identity.sub){
      this._router.navigate(["/login"]);
    }else{
      this.task = new Task(1, "", "", "new", null, null);
    }
  }

  onSubmit(){
    this._taskService.create(this.token, this.task).subscribe(
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
  }

}
