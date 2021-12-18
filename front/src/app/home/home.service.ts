import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { properties } from './home.component';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) { }
  
  postProblem(problem : properties) : Observable<any>{
    return this.http.post<any>("http://localhost:8080/postProblem",JSON.stringify(problem), httpOptions);
  }
}