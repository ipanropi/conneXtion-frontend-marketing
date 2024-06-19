import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private apiUrl = `${environment.apiUrl}/notification`;
  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getNotificationByUserId(userId) {
    return this.http.get<any>(`${this.apiUrl}/user/${userId}`);
  }

  upsertNotificationSummary(payload) {
    return this.http.post<any>(`${this.apiUrl}`, payload, this.httpOptions);
  }
}
