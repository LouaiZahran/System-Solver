import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { properties } from './home.component';
@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) { }
  postProblem(problem : properties) : Observable<any>{
    return this.http.post<any>("http://localhost:8080/postProblem", problem);
}
}