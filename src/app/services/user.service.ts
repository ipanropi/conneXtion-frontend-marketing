import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = `${environment.apiUrl}/user`;
  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getUsers(sortBy, sortDir, size, page, userStatus = '') {
    return this.http.get<any>(`${this.apiUrl}/search?page=${page}&sortBy=${sortBy}&sort=${sortDir ? 'ASC' : 'DESC'}&size=${size}&status=${userStatus}`);
  }

  getUserById(id) {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  getSelfProfile() {
    return this.http.get<any>(`${this.apiUrl}`);
  }

  insertUser(user: User) {
    return this.http.post<any>(`${this.apiUrl}`, user, this.httpOptions);
  }

  updateUser(userId, user: User) {
    return this.http.patch<any>(`${this.apiUrl}/${userId}`, user, this.httpOptions);
  }

  updateProfile(payload) {
    return this.http.patch<any>(`${this.apiUrl}/profile`, payload, this.httpOptions);
  }

  forgotPassword(payload) {
    return this.http.post<any>(`${this.apiUrl}/password/forgot`, payload, this.httpOptions);
  }

  resetPasswordVerify(userId, guid) {
    return this.http.get<any>(`${this.apiUrl}/password/reset/verify?userId=${userId}&guid=${guid}`);
  }

  resetPassword(payload) {
    return this.http.post<any>(`${this.apiUrl}/password/reset`, payload, this.httpOptions);
  }

  changePassword(payload) {
    return this.http.post<any>(`${this.apiUrl}/password/change`, payload, this.httpOptions);
  }

  deleteUser(userId) {
    return this.http.delete<any>(`${this.apiUrl}/${userId}`);
  }

  getClients(sortBy, sortDir, page, size, userId, fullName, email, status) {
    return this.http.get<any>(`${this.apiUrl}/client/list?page=${page}&sortBy=${sortBy}&sort=${sortDir ? 'ASC' : 'DESC'}&size=${size}&userId=${userId}&fullName=${fullName
    }&email=${email}&status=${status}`);
  }

  getBdList(sortBy, sortDir, page, size, userId = '', fullName = '', email = '') {
    return this.http.get<any>(`${this.apiUrl}/bd/list?page=${page}&sortBy=${sortBy}&sort=${sortDir ? 'ASC' : 'DESC'}&size=${size}&userId=${userId}&fullName=${fullName
    }&email=${email}`);
  }

  insertEnquiry(payload) {
    return this.http.post<any>(`${this.apiUrl}/contact`, payload, this.httpOptions);
  }
}
