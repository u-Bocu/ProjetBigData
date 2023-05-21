import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {environment} from "../environnement";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ResultatService {

  constructor(private http: HttpClient) { }

  public postResultatQuiz(idQuiz: number, idUser: number | null, score: number, satisfaction: number): Observable<any> {
    return this.http.post(
      environment.API_URL + '/resultats',
      {
        id_quiz: idQuiz,
        id_user: idUser,
        score: score,
        satisfaction: satisfaction
      },
      {headers: environment.HEADERS}
    );
  }
}
