import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Role } from '../models';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private apiUrl = `${environment.apiUrl}/message`;
  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getMessages(sortBy, sortDir, size, page, message = '') {
    return this.http.get<any>(`${this.apiUrl}/list?page=${page}&sortBy=${sortBy
    }&sort=${sortDir ? 'ASC' : 'DESC'}&size=${size}&message=${message}`);
  }
}
