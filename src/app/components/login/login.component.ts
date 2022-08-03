import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit{
  
  public title: string;

  constructor(
    // private _route: ActivatedRoute,
    // private _router: Router
  ){
    this.title = 'Login component';
  }

  ngOnInit(): void {
    console.log("Component login.component has been loaded");
  }

}
