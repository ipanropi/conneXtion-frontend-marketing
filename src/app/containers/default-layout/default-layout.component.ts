import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
// import { roleNavMapping } from '../../_nav';
import { AuthenticationService } from '../../services/authentication.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { AppConfigService } from '../../services/app-config.service';
import packageInfo from '../../../../package.json';
import { Roles } from '../../models';
import { MessageService } from '../../services/message.service';
import * as moment from 'moment';
import { NotificationService } from '../../services/notification.service';
@Component({
  selector: 'app-default-layout',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DefaultLayoutComponent implements OnInit {
  @ViewChild('drawer') drawer: ElementRef;
  sidebarList = [];
  drawerMode = 'side';
  opened = true; // localStorage.getItem('drawerOpened') ? localStorage.getItem('drawerOpened')  === '1' : false;
  sidebarMinimized = false;
  navItems: any;
  username = '';
  role = '';
  isClient = false;
  showTopbar = true;
  appBuildVersion = packageInfo.version;
  currentRoute;
  messageList = [];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService,
    public authService: AuthenticationService,
    private notificationService: NotificationService,
    public appConfig: AppConfigService,
  ) {
  }

  ngOnInit() {
    const currentUser = this.authService.currentUserValue;
    if (currentUser) {
      this.username = currentUser.user.fullName;
      this.role = currentUser.user.roles;

      if (this.role.includes(Roles.TL)) {
        // this.appConfig.navItem = roleNavMapping.find(r => r.role === Roles.TL).nav;
      } else if (this.role.includes(Roles.BD)) {
        // this.appConfig.navItem = roleNavMapping.find(r => r.role === Roles.BD).nav;
      } else {
        // this.appConfig.navItem = clientNavItems;
        this.isClient = true;
      }
      console.log(`this.role >> ${JSON.stringify(this.role)}`);
    }

    this.markActiveRoute();

    this.router.events.forEach((event) => {
      if (event instanceof NavigationEnd) {
        this.markActiveRoute();
      }
    });

    this.messageService.getMessages('messageId', 0, 5, 1).subscribe(resp => {
      this.messageList = resp.data.list;
      if (this.messageList && this.messageList.length) {
        for (const c of this.messageList) {
          c.createdAt = moment(c.createdAt).format('DD MMM YYYY, hh:mm A');
        }
      }
    });
  }

  markActiveRoute() {
    this.currentRoute = this.router.url.split('?')[0];
    console.log(`this.currentRoute >> ${this.currentRoute}`);
    if (this.currentRoute.includes('/client')) {
      this.currentRoute = '/client/list';
    } else if (this.currentRoute.includes('/ihs') && this.currentRoute !== '/ihs/create') {
      this.currentRoute = '/ihs/list';
    }
    this.appConfig.navItem.map(n => n.active = false);
    const findNav = this.appConfig.navItem.find(n => n.url === this.currentRoute);
    if (findNav) {
      findNav.active = true;
    }
  }

  onReadNotification() {
    const payload = {
      navBar: false,
    };
    this.notificationService.upsertNotificationSummary(payload).subscribe(resp => {
      console.log(`update notification summary completed..`);
      this.appConfig.hasNotification = false;
    });
  }

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }

  onDrawerToggle() {
    this.opened = !this.opened;
    localStorage.setItem('drawerOpened', this.opened ? '1' : '0');
  }

  onLogout() {
    this.authService.logout();
  }
}
