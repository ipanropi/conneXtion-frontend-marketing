import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EnquiryService {
  private apiUrl = `${environment.apiUrl}/api/enquiry`;
  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  insertEnquiry(enquiryDTO) {
    return this.http.post<any>(`${this.apiUrl}`, enquiryDTO, this.httpOptions);
  }
}
