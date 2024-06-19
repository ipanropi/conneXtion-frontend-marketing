import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError, of, EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class ErrorInterceptor implements HttpInterceptor {
    constructor(
        private authenticationService: AuthenticationService,
        private router: Router) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            catchError(
                err => {
                    if (err.status === 401) {
                        // auto logout if 401 response returned from api
                        this.authenticationService.logout();
                        this.router.navigate(['/login']);
                    }

                    if (err.status === 400) {
                        // this.authenticationService.logout();
                        // location.reload(true);
                        // return Observable.of('Hello');
                        // return EMPTY;
                    }
            // const error = err.error.desc || err.error.err.desc || err.error.message || err.statusText;
            return throwError(err.error);
        }));
    }
}
