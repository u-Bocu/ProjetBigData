import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../environnement";

@Injectable({
  providedIn: 'root'
})
export class ReponseService {

  constructor(private http: HttpClient) {
  }

  public getReponses(idQuestion?: number): Observable<any> {
    return this.http.get(
      environment.API_URL + '/reponses/' + idQuestion,
      {headers: environment.HEADERS}
    );
  }

  public sendReponseVocale(idQuestion: number, base64File: string): Observable<any> {
    return this.http.post(
      environment.API_URL + '/reponses/' + idQuestion,
      {base64File: base64File},
      {headers: environment.HEADERS}
    );
  }

  public isReponseValid(idReponse?: number, idQuestion?: number): Observable<any> {
    return this.http.post(
      environment.API_URL + '/reponses/' + idReponse + '/isvalid',
      {idQuestion: idQuestion},
      {headers: environment.HEADERS}
    );
  }
}
