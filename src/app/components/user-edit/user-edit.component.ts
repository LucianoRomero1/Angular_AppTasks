import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
  providers: [UserService]
})
export class UserEditComponent implements OnInit {

  public title: string;
  public user: User;
  public status;
  public identity;
  public token;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService
  ){
    this.title    = "Update user";
    this.identity = this._userService.getIdentity();
    this.token    = this._userService.getToken();
  }

  ngOnInit(): void { 
    if(this.identity == null || !this.identity.sub){
      this._router.navigate(['/login']);
    }else{
      this.user = new User(
        this.identity.sub,
        this.identity.role,
        this.identity.name,
        this.identity.surname,
        this.identity.email,
        this.identity.password
      );
    }
  }

  onSubmit(){
    this._userService.update_user(this.user).subscribe(
      {
        next: (response) => {
          //Con este IF valido el response status y code
          if(Object.values(response)[0] != "error" || Object.values(response)[1] != "400"){
            this.status = "success";
            localStorage.setItem('identity', JSON.stringify(this.user));
          }else{
            this.status = "error";
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
