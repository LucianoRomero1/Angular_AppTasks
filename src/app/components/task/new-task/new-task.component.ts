import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.css'],
  providers: [UserService]
})
export class NewTaskComponent implements OnInit {
  public title: string;
  public identity;

  constructor(
    private _userService: UserService,
    private _route: ActivatedRoute,
    private _router: Router
  ){
    this.title = "New task";
    this.identity = this._userService.getIdentity();
  }

  ngOnInit(): void {
    if(this.identity == null || !this.identity.sub){
      this._router.navigate(["/login"]);
    }else{
      
    }
  }

  onSubmit(){
    
  }

}
