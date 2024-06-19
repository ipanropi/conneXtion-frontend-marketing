import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class PackagesService {
  private apiUrl = `${environment.apiUrl}/api/package`;

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getAllPackageList() {
    return this.http.get<any>(`${this.apiUrl}/all/list`);
  }

}
