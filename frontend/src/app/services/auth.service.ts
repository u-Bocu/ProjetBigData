import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../environnement";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  public signup(username : string, password : string, mail : string, age: number, sexe: string) : Observable<any> {
    return this.http.post(
      environment.API_URL + '/auth/sign-up',
      { username: username , password: password, mail: mail, age: age, sexe: sexe},
      {headers: environment.HEADERS}
    );
  }

  public login(username : string, password : string) : Observable<any>
  {
    return this.http.post(
      environment.API_URL + '/auth/login',
      { username : username, password : password},
      {headers : environment.HEADERS}
    );
  }

  public forgotPassword(mail : string) : Observable<any>
  {
    return this.http.post(
      environment.API_URL + '/auth/forgotpassword',
      { mail : mail },
      {headers : environment.HEADERS}
    );
  }

  public resetPassword(token : string, password : string) : Observable<any>
{
  return this.http.post(
    environment.API_URL + '/auth/resetpassword',
    { token : token, password : password },
    {headers : environment.HEADERS}
  );
}
}



















