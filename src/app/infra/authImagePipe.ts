import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Pipe, PipeTransform } from '@angular/core';
import { AuthenticationService } from '../services';

@Pipe({
    name: 'authImage'
})
export class AuthImagePipe implements PipeTransform {

    constructor(
        private http: HttpClient,
        private authenticationService: AuthenticationService, // our service that provides us with the authorization token
    ) { }

    async transform(src: string) {
        const currentUser = this.authenticationService.currentUserValue;
        const token = currentUser.token;
        const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
        const imageBlob = await this.http.get(src, { headers, responseType: 'blob' }).toPromise();
        const reader = new FileReader();
        return new Promise((resolve, reject) => {
            reader.onloadend = () => resolve(reader.result as string);
            reader.readAsDataURL(imageBlob);
        });
    }

}
