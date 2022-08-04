import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { UserService } from "src/app/services/user.service";

//Esto se lo conoce como decorador el @ algo
@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  //Incluyo el services en los providers
  providers: [UserService]
})

export class LoginComponent implements OnInit{
  
  public title: string;
  public user;
  public identity;
  public token;

  constructor(
    private _route      : ActivatedRoute,
    private _router     : Router,
    private _userService: UserService
  ){
    this.title  = 'Login';
    this.user   = {
      "email"   : "",
      "password": "",
      //Si pongo en false me devuelve el token, si pongo en true me devuelve los datos del user
      "getHash" : "true"
    };
  }

  ngOnInit(): void {
    console.log("Component login.component has been loaded");
    //Si lo descomento y quiero cambiar de user explota todo
    //console.log(this.user = JSON.parse(localStorage.getItem("identity") || "{}"));
    //console.log(this.user = JSON.parse(localStorage.getItem("token") || "{}"));
  }

  onSubmit(){
    //Suscribe es para suscribirse al observable
    console.log(this.user);
    this._userService.signup(this.user).subscribe(
      {
        next: (response) => {
          this.identity = response;
          if(this.identity.length <= 1){
            console.log("Server error");
          }else{
            //El status solo se devuelve en caso de un error, osea que sino existe entra aca
            if(!this.identity.status){
              localStorage.setItem('identity', JSON.stringify(this.identity));   

              //GET TOKEN
              this.user.getHash = null;
              this._userService.signup(this.user).subscribe(
                {
                  next: (response) => {
                    this.token = response;
                    if(this.identity.length <= 1){
                      console.log("Server error");
                    }else{
                      //El status solo se devuelve en caso de un error, osea que sino existe entra aca
                      if(!this.identity.status){
                        localStorage.setItem('token', JSON.stringify(this.token));         
                      }
                    }          
                  },
                  error: (error) => {          
                    console.log(<any>error);
                  }, 
                }
              );      
            }
          }          
        },
        error: (error) => {          
          console.log(<any>error);
        }, 
      }
    );
  }
  
  //Lo dejo por las dudas, esto está hecho copiandole al del curso, pero estaba obsoleto
  // onSubmit(){
  //   this._userService.signup(this.user).subscribe(
  //     response => {
  //       this.identity = response;
  //       if(this.identity.length <= 1){
  //         console.log("Server error");
  //       }else{
  //         //El status solo se devuelve en caso de un error, osea que sino existe entra aca
  //         if(!this.identity.status){
  //           localStorage.setItem('identity', JSON.stringify(this.identity));         
  //         }
  //       }
  //     },
  //   );
  // }

}
