import { Injectable } from '@angular/core';
import { Roles } from '../models';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private authSvc: AuthenticationService) { }

  public makeUL(array) {
    // Create the list element:
    const div = document.createElement('div');
    const list = document.createElement('ul');
    list.style.listStyleType = 'none';
    for (let i = 0; i < array.length; i++) {
      if (!array[i]) {
        continue;
      }
      // Create the list item:
      const item = document.createElement('li');
      // Set its contents:
      item.appendChild(document.createTextNode(array[i]));
      // Add it to the list:
      list.appendChild(item);
    }
    // Finally, return the constructed list:
    div.append(list);
    return div.innerHTML;
  }

  // public isAdmin() {
  //   const adminRole = [Roles.Admin, Roles.Director, Roles.Supervisor, Roles.Clerk];
  //   const currentUser = this.authSvc.currentUserValue;
  //   return adminRole.some(r => currentUser.user.roles.includes(r));
  // }
}
