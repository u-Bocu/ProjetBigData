import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../environnement";
import {Quiz} from "../models/quiz";
import {Question} from "../models/question";
import {LocalStorageService} from "./local-storage.service";

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService
  ) { }

  public getQuizzes(idTheme?: number): Observable<any> {
    const url = idTheme ? ('/quiz/' + idTheme) : '/quiz';
    return  this.http.get(
      environment.API_URL + url,
      {headers: environment.HEADERS}
    );
  }

  public postQuiz(quiz: Quiz, questions: Question[]): Observable<any> {
    const userId = parseInt(this.localStorageService.getData('user_id'));
    const url = '/quiz';
    return  this.http.post(
      environment.API_URL + url,
      {
        quiz: quiz,
        questions: questions,
        id_user: userId
      },
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
