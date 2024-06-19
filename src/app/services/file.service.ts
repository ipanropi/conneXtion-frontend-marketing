import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { saveAs } from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  private apiUrl = `${environment.apiUrl}/file`;
  constructor(
    private http: HttpClient
  ) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  uploadFile(file: File, type) {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    formData.append('type', type);

    return this.http.post<any>(`${this.apiUrl}`, formData);
  }

  uploadFileWithProgress(file: File) {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);

    const request = new HttpRequest('POST', `${this.apiUrl}`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(request);

  }

  downloadFile(path, ext = '') {
    return this.http.post(`${this.apiUrl}/download`, { path }, { responseType: 'blob' });
  }

  openFile(protectedUrl) {
    return this.http.get(protectedUrl, { responseType: 'blob' });
  }


  // uploadMultipleFile(files: FileList) {
  //   const formData: FormData = new FormData();
  //   formData.append('files', files);

  //   return this.http.post<any>(`${this.apiUrl}/multiple`, formData);
  // }
}
