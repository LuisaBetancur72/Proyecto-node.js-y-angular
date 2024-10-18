import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = 'http://localhost:3800/api/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'login', {
      email,
      password
    }, httpOptions);
  }

  register(name_user: string, lastname:string, document_type:string, number_document:string, email:string, password:string): Observable<any> {
    return this.http.post(AUTH_API + 'create', {
      name_user, 
      lastname, 
      document_type, 
      number_document,
      email,
      password
    }, httpOptions);
  }
}
