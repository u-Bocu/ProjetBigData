import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { environment } from "../environnement";
import { HttpClient } from "@angular/common/http"

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  public getUser(id: number): Observable<any> {
    return this.http.get(
      environment.API_URL + '/users/' + id,
      {headers: environment.HEADERS}
    );
  }

  public getAvgScore(idUser?: number): Observable<any> {
    const url = '/users/avg_score/' + idUser;
    return  this.http.get(
      environment.API_URL + url,
      {headers: environment.HEADERS}
    );
  }

  public getQuizCreated(idUser?: number): Observable<any> {
    const url = '/users/quiz_created/' + idUser;
    return  this.http.get(
      environment.API_URL + url,
      {headers: environment.HEADERS}
    );
  }

  public getHistoryResult(idUser?: number): Observable<any> {
    const url = '/users/history_result/' + idUser;
    return  this.http.get(
      environment.API_URL + url,
      {headers: environment.HEADERS}
    );
  }

  public getHistoryQuizCreated(idUser?: number): Observable<any> {
    const url = '/users/history_quiz_created/' + idUser;
    return  this.http.get(
      environment.API_URL + url,
      {headers: environment.HEADERS}
    );
  }
}
