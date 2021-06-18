import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { tap, catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
	_baseApiUrl = environment.API_URL
	httpOptions = {
		headers: new HttpHeaders({ 
			'Access-Control-Allow-Origin':'*'
		})
	};
	constructor(private http: HttpClient) { }

  get() {
		return this.http.get(this._baseApiUrl).pipe(
			map((resp: any) => {
				if (resp.data) {
          return resp;
				}
			}),
			catchError(err => {
				return throwError(err);
			})
		);
	}
	search(searchData) {
		console.log(searchData);
		return this.http.get(this._baseApiUrl+'/search',{params: searchData}).pipe(
			map((resp: any) => {
				if (resp.data) {
          return resp;
				}
			}),
			catchError(err => {
				return throwError(err);
			})
		);
	}
	create = (reqData) => {
		console.log(reqData);
		return this.http.post<any>(this._baseApiUrl+'/create', reqData,this.httpOptions).pipe(
			map((resp: any) => {
				if (resp.data) {
          return resp;
				}
			}),
			catchError(err => {
				console.log(err);
				return throwError(err);
			})
		);
	}
	update = (data) => {
		return this.http.put(this._baseApiUrl,data).pipe(
			map((resp: any) => {
				if (resp.data) {
          return resp;
				}
			}),
			catchError(err => {
				return throwError(err);
			})
		);
	}
	delete= (id) => {
		return this.http.delete(this._baseApiUrl+'/'+id).pipe(
			map((resp: any) => {
				if (resp.data) {
          return resp;
				}
			}),
			catchError(err => {
				return throwError(err);
			})
		);
	}
  
}
