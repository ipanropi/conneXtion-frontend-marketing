import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
import { AuthenticationService } from './services';
import { AppConfigService } from './services/app-config.service';
import { NotificationService } from './services/notification.service';

@Component({
  // tslint:disable-next-line
  selector: 'body',
  template: '<router-outlet></router-outlet>',
  host: {
    '(window:resize)': 'onResize($event)',
  }
})
export class AppComponent implements OnInit {
  constructor(
    private router: Router,
    private deviceService: DeviceDetectorService,
    private authService: AuthenticationService,
    private notificationService: NotificationService,
    public appConfig: AppConfigService) { }

  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }

      console.log(`route change >> ${evt.url}`);
      if (evt.url.includes('/dashboard') && evt.url.includes('searchTerm')) {

      } else {
        window.scrollTo(0, 0);
      }

      if (this.authService.currentUserId) {
        // this.notificationService.getNotificationByUserId(this.authService.currentUserId).subscribe(resp => {

        //   if (resp && resp.data) {
        //     console.log(`notification  summary >> ${JSON.stringify(resp)}`);
        //     const summary = resp.data;
        //     this.appConfig.hasNotification = summary.navBar;
        //   }
        // });
      }
    });

    const windowsWidth = window.innerWidth;
    this.appConfig.isSmallScreen = this.deviceService.isMobile() || windowsWidth < this.appConfig.TabletScreenSize;
    this.appConfig.isMediumScreen = (this.deviceService.isTablet() && windowsWidth < this.appConfig.DesktopScreenSize) ||
      (windowsWidth >= this.appConfig.TabletScreenSize &&
        windowsWidth < this.appConfig.DesktopScreenSize);
  }

  onResize(event) {
    const windowsWidth = event.target.innerWidth;
    // console.log(`event.target.innerWidth >> ${windowsWidth}`); // window width
    this.appConfig.isSmallScreen = this.deviceService.isMobile() || windowsWidth < this.appConfig.TabletScreenSize;
    this.appConfig.isMediumScreen = (this.deviceService.isTablet() && windowsWidth < this.appConfig.DesktopScreenSize) ||
      (windowsWidth >= this.appConfig.TabletScreenSize &&
        windowsWidth < this.appConfig.DesktopScreenSize);
  }

}
