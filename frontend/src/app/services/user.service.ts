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
}
