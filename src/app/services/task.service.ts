import { Injectable } from "@angular/core";
import { GLOBAL } from "./global";

import { Observable } from "rxjs"; 
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";


@Injectable()
export class TaskService{

    public url: string;
    constructor(
        private _http: HttpClient
    ){
        this.url = GLOBAL.url;
    }

    create(token, new_task){
        let json = JSON.stringify(new_task);
        let params  = 'json='+json+'&&authorization='+token;
        
        let headers = new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded'
        });

        return this._http.post(this.url+'/task/new', params, {headers: headers});
    }

    getTasks(token, page?){
        let params = "authorization="+token;
        let headers = new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded'
        });

        if(page == null){
            page = 1;
        }

        return this._http.post(this.url+'/task/list?page='+page, params, {headers: headers});

    }

    getTask(token, id){
        let params = "authorization="+token;
        let headers = new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded'
        });

        return this._http.post(this.url+'/task/detail/'+id, params, {headers: headers});
    }
}