import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../environnement";

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private http: HttpClient) { }

  public getQuizzes(): Observable<any> {
    return this.http.get(
      environment.API_URL + '/quiz',
      {headers: environment.HEADERS}
    );
  }
}
