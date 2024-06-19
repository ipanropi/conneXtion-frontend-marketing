import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { City, State, Country } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ReferenceService {
  private apiUrl = `${environment.apiUrl}/reference`;
  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getCity() {
    return this.http.get<any>(`${this.apiUrl}/cities`);
  }

  getState() {
    return this.http.get<any>(`${this.apiUrl}/states`);
  }

  getCountry() {
    return this.http.get<any>(`${this.apiUrl}/countries`);
  }
}
