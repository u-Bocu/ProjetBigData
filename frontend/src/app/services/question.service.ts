import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../environnement";

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http: HttpClient) { }

  public getQuestionsByQuiz(idQuiz: number): Observable<any> {
    const url = '/questions/' + idQuiz;
    return  this.http.get(
      environment.API_URL + url,
      {headers: environment.HEADERS}
    );
  }
}
