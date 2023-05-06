import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { environment } from "../environnement";
import { HttpClient } from "@angular/common/http"

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private http: HttpClient) { }

  public getRole(id: number): Observable<any> {
    return this.http.get(
      environment.API_URL + '/roles/' + id,
      {headers: environment.HEADERS}
    );
  }

  public getRoles(): Observable<any> {
    return this.http.get(
      environment.API_URL + '/roles',
      {headers: environment.HEADERS}
    );
  }
}
