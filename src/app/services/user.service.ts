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

        return this._http.post(this.url + '/login', params, {headers: headers});
    }

}