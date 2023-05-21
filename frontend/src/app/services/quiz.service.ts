import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../environnement";

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private http: HttpClient) { }

  public getQuizzes(idTheme?: number): Observable<any> {
    const url = idTheme ? ('/quiz/' + idTheme) : '/quiz';
    return  this.http.get(
      environment.API_URL + url,
      {headers: environment.HEADERS}
    );
  }

  public getBestQuiz(idUser?: number): Observable<any> {
    const url = '/quiz/best_quiz/' + idUser;
    return  this.http.get(
      environment.API_URL + url,
      {headers: environment.HEADERS}
    );
  }

  public getWorseQuiz(idUser?: number): Observable<any> {
    const url = '/quiz/worse_quiz/' + idUser;
    return  this.http.get(
      environment.API_URL + url,
      {headers: environment.HEADERS}
    );
  }
}
