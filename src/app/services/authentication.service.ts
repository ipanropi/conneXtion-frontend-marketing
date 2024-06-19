import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of, BehaviorSubject } from 'rxjs';

import { User } from '../models/user';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Router, ActivatedRoute } from '@angular/router';
import { Roles } from '../models';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private apiUrl = `${environment.apiUrl}/auth`;
  private currentUserSubject: BehaviorSubject<User>;
  private currentUser: Observable<User>;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient,
              private route: ActivatedRoute,
              private router: Router) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  register(payload) {
    return this.http.post<any>(`${this.apiUrl}/register`, payload, this.httpOptions);
  }

  login(username: string, password: string) {
    return this.http.post<any>(`${this.apiUrl}/login`, { username, password }, this.httpOptions).pipe(
      map(resp => {
        const user = resp.data;
        if (user) {
          console.log(`resp.data >> ${JSON.stringify(user)}`);
          // console.log(`userObj >> ${JSON.stringify(userObj)}`);
          this.setSession(user);
          this.currentUserSubject.next(user);
        }

        return user;
      }));
  }

  sendOtp(phoneNumber) {
    return this.http.post<any>(`${this.apiUrl}/send/otp`, { phoneNumber }, this.httpOptions);
  }

  verifyOtp(phoneNumber, phoneDialCode, code) {
    return this.http.post<any>(`${this.apiUrl}/verify/otp`, { phoneNumber, phoneDialCode, code }, this.httpOptions);
  }

  sendVerificationEmail(userId) {
    return this.http.post<any>(`${this.apiUrl}/send/email`, { userId }, this.httpOptions);
  }

  verifyEmail(userId, guid) {
    return this.http.get<any>(`${this.apiUrl}/verify/email?userId=${userId}&guid=${guid}`);
  }

  logout() {
    this.clearSession();
    this.router.navigateByUrl('login');
  }

  clearSession() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  public get isClient(): any {
    return this.currentUserValue && this.currentUserValue.user &&
    this.currentUserValue.user.roles && !this.currentUserValue.user.roles.length;
  }

  public get isAdmin(): any {
    return this.currentUserValue && this.currentUserValue.user &&
    this.currentUserValue.user.roles && this.currentUserValue.user.roles.includes(Roles.Admin);
  }

  public get isTeamLead(): any {
    return this.currentUserValue && this.currentUserValue.user &&
    this.currentUserValue.user.roles && this.currentUserValue.user.roles.includes(Roles.TL);
  }

  public get isBD(): any {
    return this.currentUserValue && this.currentUserValue.user &&
    this.currentUserValue.user.roles && this.currentUserValue.user.roles.includes(Roles.BD);
  }

  public get userRoles(): any {
    return this.currentUserValue && this.currentUserValue.user ? this.currentUserValue.user.roles : null;
  }

  public get currentUserId(): number {
    return this.currentUserValue && this.currentUserValue.user ? this.currentUserValue.user.userId : null;
  }

  public get currentUsername(): string {
    return this.currentUserValue && this.currentUserValue.user ? this.currentUserValue.user.username : null;
  }

  private setSession(authResult) {
    console.log(`authResult >> ${JSON.stringify(authResult)}`);
    // const expiresAt = moment().add(authResult.expiresIn, 'second');
    // localStorage.setItem('id_token', authResult.idToken);
    // localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()) );

    localStorage.setItem('currentUser', JSON.stringify(authResult));
  }
}
