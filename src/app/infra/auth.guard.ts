import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../services';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private router: Router,
              private authService: AuthenticationService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.authService.currentUserValue;
    if (currentUser) {
      console.log(`[auth guard] - currentUser >> ${JSON.stringify(currentUser)}`);
      // console.log(`currentUser.user.username >> ${currentUser.user.username}`);
      console.log(`[auth guard] - route.data.roles >> ${JSON.stringify(route.data.roles)}`);
      console.log(`[auth guard] - currentUser.user.roles >> ${JSON.stringify(currentUser.user.roles)}`);
      if (route.data.roles && !route.data.roles.some(r => currentUser.user.roles.includes(r))) {
        // role not authorised so redirect to home page
        this.authService.logout();
        this.router.navigate(['/home']);
        return false;
      }
      return true;
    }

    this.router.navigate(['/home'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
