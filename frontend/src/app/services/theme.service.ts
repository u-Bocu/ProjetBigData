import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { environment } from "../environnement";
import { HttpClient } from "@angular/common/http"

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  constructor(private http: HttpClient) { }

  public getThemes(): Observable<any> {
    return this.http.get(
      environment.API_URL + '/themes',
      {headers: environment.HEADERS}
    );
  }

  public getBestTheme(idUser?: number): Observable<any> {
    const url = '/themes/best_theme/' + idUser;
    return  this.http.get(
      environment.API_URL + url,
      {headers: environment.HEADERS}
    );
  }

  public getWorseTheme(idUser?: number): Observable<any> {
    const url = '/themes/worse_theme/' + idUser;
    return  this.http.get(
      environment.API_URL + url,
      {headers: environment.HEADERS}
    );
  }
}
