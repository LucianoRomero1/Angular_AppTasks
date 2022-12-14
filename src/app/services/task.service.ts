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

    update(token, task, id){
        //Esto se hace para pasarlo a JSON y poder manejar los datos
        let json = JSON.stringify(task);
        let params = "json="+json+"&&authorization="+token;

        let headers = new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded'
        });

        return this._http.post(this.url+'/task/edit/'+id, params, {headers: headers});
    }

    search(token, search = null, filter = null, order = null){
        //El search es por URL
        let url: string;
        let params = "authorization="+token+"&&filter="+filter+"&&order="+order;        
        
        let headers = new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded'
        });

        if(search == null){
            url = this.url + '/task/search';
        }else{
            url = this.url + '/task/search/'+search;
        }

        return this._http.post(url, params, {headers: headers});
    }

    deleteTask(token, id){
        let params = "authorization="+token;
        let headers = new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded'
        });

        return this._http.post(this.url+'/task/delete/'+id, params, {headers: headers});
    }
}