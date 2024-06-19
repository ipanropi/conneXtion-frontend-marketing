import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Role } from '../models';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private apiUrl = `${environment.apiUrl}/role`;
  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getRoles(sortBy, sortDir, size, page) {
    return this.http.get<any>(`${this.apiUrl}/list?page=${page}&sortBy=${sortBy}&sort=${sortDir ? 'ASC' : 'DESC'}&size=${size}&page=${page}`);
  }

  getRoleById(id) {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  getRoleByName(name) {
    return this.http.get<any>(`${this.apiUrl}/name/${name}`);
  }

  getRoleAccessByAssetId(assetId) {
    return this.http.get<any>(`${this.apiUrl}/access/${assetId}`);
  }

  getRoleAccessByCategoryId(categoryId) {
    return this.http.get<any>(`${this.apiUrl}/access/${categoryId}`);
  }

  getRoleAccessByCategoryIdAndRoleId(categoryId, roleId) {
    return this.http.get<any>(`${this.apiUrl}/access/${categoryId}/role/${roleId}`);
  }

  insertRole(role: Role) {
    return this.http.post<any>(`${this.apiUrl}`, role, this.httpOptions);
  }

  updateRole(role: Role) {
    return this.http.patch<any>(`${this.apiUrl}`, role, this.httpOptions);
  }

  deleteRole(id, active: boolean) {
    return this.http.patch<any>(`${this.apiUrl}/status/${id}`, { active }, this.httpOptions);
  }
}
