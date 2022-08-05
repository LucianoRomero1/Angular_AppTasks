import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
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
    this.logout();
    this.redirectIfIdentity();
  }

  onSubmit(){
    //Suscribe es para suscribirse al observable
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
                        window.location.href = '/';
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

  logout(){
    this._route.params.forEach((params: Params) => {
      let logout = params['id'];
      if(logout == 1){
        localStorage.removeItem('identity');
        localStorage.removeItem('token');

        this.identity = null;
        this.token    = null;

        window.location.href = '/login';
      }
    });
  }

  //Va a acceder a identity y si existe 
  redirectIfIdentity(){
    let identity = this._userService.getIdentity();
    
    if(identity != null && identity.sub){
      this._router.navigate(['/']);
    }
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
