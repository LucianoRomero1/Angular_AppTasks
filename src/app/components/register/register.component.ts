import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [UserService]
})
export class RegisterComponent implements OnInit {
  public title: string;
  public user: User;
  public status;
  public msg: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService
  ){ 
    this.title = "Register";
    //Los datos vacíos los traigo por 2waydatabinding con el form del html
    this.user  = new User(1, "user", "", "", "", "");
  }

  ngOnInit(): void {
    
  }

  onSubmit(){
    this._userService.register(this.user).subscribe(
      {
        next: (response) => {
          if(Object.values(response)[0] != "error" || Object.values(response)[1] != "400"){
            this.status = "success";
            this.user   = new User(1, "user", "", "", "", "");
          }else{
            this.status = "error"
            this.msg    = Object.values(response)[2];        
          }    
        },
        error: (error) => {          
          console.log(<any>error);
          this.status = "error";
        }, 
      }
    );
  }

}
