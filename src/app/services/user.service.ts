import { Injectable } from "@angular/core";
import { GLOBAL } from "./global";

import { Observable } from "rxjs"; 
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";

@Injectable()
export class UserService{

    public url: string;
    public identity; 
    public token;

    //Por las dudas para el map
    // .pipe(map(res => res.json())); 

    constructor(private _http: HttpClient){
        this.url = GLOBAL.url
    }

    signup(user_to_login){
        //Convertimos el valor a un JSON 
        let json    = JSON.stringify(user_to_login);
        let params  = "json="+json;
        
        let headers = new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded'
        });

        return this._http.post(this.url+'/login', params, {headers: headers});
    }

    getIdentity(){
        let identity =  JSON.parse(localStorage.getItem("identity") || "{}");
        
        if(Object.keys(identity).length != 0){
            this.identity = identity;
        }else{
            this.identity = null;
        }

        return this.identity;
    }

    getToken(){
        let token =  JSON.parse(localStorage.getItem("token") || "{}");

        if(Object.keys(token).length != 0){
            this.token = token;
        }else{ 
            this.token = null;
        }

        return this.token;
    }

    register(user_to_register){
        let json = JSON.stringify(user_to_register);
        let params = "json="+json;

        let headers = new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded'
        });

        return this._http.post(this.url+'/user/register', params, {headers: headers});
    }

    update_user(user_to_update){
        let json    = JSON.stringify(user_to_update);
        let params  = 'json='+json+'&&authorization='+this.getToken();
        console.log(params);
        
        let headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
        
        return this._http.post(this.url+'/user/edit', params, {headers: headers});
    }

}