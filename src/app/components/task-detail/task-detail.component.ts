import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  public indentity;
  public token;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _taskService: TaskService
  ){
    this.indentity  = this._userService.getIdentity();
    this.token      = this._userService.getToken();
  }

  ngOnInit(): void {
    if(this.indentity && this.indentity.sub){
      //Call to services
      //Call to method 
    }else{
      this._router.navigate(['/login']);
    }
  }

}
