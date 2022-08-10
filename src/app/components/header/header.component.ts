import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [UserService]
})
export class HeaderComponent implements OnInit {

  public identity;
  public token;

  constructor(
    private _userService: UserService
  ){
    this.identity = this._userService.getIdentity();
    this.token    = this._userService.getToken();
  }

  ngOnInit(): void {

  }

}
