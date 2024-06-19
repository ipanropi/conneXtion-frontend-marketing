import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AppConfigService {
  CoreAPIUrl = environment.apiUrl;
  PhotoMaxUploadSizeBytes: number = 1024 * 500;
  PhotoAllowedFileTypes: string[] = ['.jpg', '.jpeg', '.gif', '.png'];
  MobileScreenSize = 576;
  TabletScreenSize = 768;
  DesktopScreenSize = 992;
  sizeList = [
    10, 50, 100, 200
  ];

  private isSmallScreenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(false);
  private isMediumScreenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(false);
  private hasNotificationSubject: BehaviorSubject<any> = new BehaviorSubject<any>(false);
  private navItemSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  bankTypeList = {
    'CIMB Bank': 'CIMB',
    'Hong Leong Bank': 'HongLeong',
    'Maybank': 'MBB',
    'Public Bank': 'PublicBank',
    'RHB Bank': 'RHB',
    'Others': 'Others',
  };

  tnbTariffMediumVoltage = ['C1', 'C2', 'E1', 'E2', 'E3', 'H1', 'H2'];
  tnbTariffLowVoltage = ['B', 'D', 'H'];
  tnbTariff = [ 'B', 'C1', 'C2', 'D', 'E1', 'E2', 'E3', 'H', 'H1', 'H2' ];

  fuseRating = [
    'Fuse 32A',
    'Fuse 63A',
    'CT 150/5',
    'CT 200/5',
    'CT 300/5',
    'CT 400/5',
    'CT 500/5',
    'CT 600/5',
    'CT 800/5',
    'CT 1000/5',
    'CT 1200/5',
    'CT 1600/5',
  ];

  buildingType = [
    'Warehouse/Factory',
    'Office building/Shoplot',
    'Shopping Mall/Complex',
    'School',
    'Other',
  ];

  companyEntityType = [
    'Branch office',
    'Company Limited by guarantee',
    'Enterprise or Sole Proprietorship',
    'Foreign Companies',
    'Limited Liability Partnership',
    'Partnership',
    'Private Limited Company (Sdn. Bhd.)',
    'Public Limited Company',
  ];

  creditScoreGuide = [
    {
      grading: 'A+',
      description: 'Excellent',
      score: '>=90',
      pod: '0.05 to 0.55%',
      defaultRisk: 'Minimal',
      interestRate: '6.00 to 7.50%',
      action: 'Proceed',
    },
    {
      grading: 'A',
      description: 'Strong',
      score: '80 to <90',
      pod: '0.65 to 1.55%',
      defaultRisk: 'Very Low',
      interestRate: '7.50 to 9.00%',
      action: 'Proceed',
    },
    {
      grading: 'B+',
      description: 'Good',
      score: '70 to <80',
      pod: '1.65 to 2.55%',
      defaultRisk: 'Low',
      interestRate: '9.00 to 10.50%',
      action: 'Likely Proceed w/o Guarantee',
    },
    {
      grading: 'B',
      description: 'Satisfactory',
      score: '60 to <70',
      pod: '2.75 to 4.45%',
      defaultRisk: 'Moderate',
      interestRate: '10.50 to 12.00%',
      action: 'May Proceed w/o Guarantee',
    },
    {
      grading: 'C+',
      description: 'Fair',
      score: '50 to <60',
      pod: '4.85 to 8.45%',
      defaultRisk: 'Substantial',
      interestRate: '12.00 to 13.50%',
      action: 'Only Proceed if Guarantee',
    },
    {
      grading: 'C',
      description: 'Weak',
      score: '40 to <50',
      pod: '8.85 to 12.45%',
      defaultRisk: 'High',
      interestRate: '13.50 to max',
      action: 'Only Proceed if Guarantee',
    },
    {
      grading: 'D+',
      description: 'Poor',
      score: '30 to <40',
      pod: 'N/A',
      defaultRisk: 'N/A',
      interestRate: 'N/A',
      action: 'Only proceed with strong guarantee',
    },
    {
      grading: 'D',
      description: 'Substandard',
      score: '20 to <30',
      pod: 'N/A',
      defaultRisk: 'N/A',
      interestRate: 'N/A',
      action: 'Only proceed with strong guarantee',
    },
    {
      grading: 'F',
      description: 'Bad',
      score: '0 to <20',
      pod: 'N/A',
      defaultRisk: 'N/A',
      interestRate: 'N/A',
      action: 'Usually Reject',
    },
  ];

  getAppLocale() {
    const locale = sessionStorage.getItem('locale');
    // Supported locale 'en' or 'zh' ONLY
    return (locale !== 'zh') ? 'en' : locale;
  }

  public get currentMonth() {
    const dtNow = new Date();
    const currentMonth = moment([dtNow.getFullYear(), dtNow.getMonth()]);
    return currentMonth.format('YYYY-MM-DD');
  }

  public get currentYear() {
    const dtNow = new Date();
    const currentMonth = moment([dtNow.getFullYear()]);
    return currentMonth.format('YYYY-MM-DD');
  }

  public set isSmallScreen(value) {
    this.isSmallScreenSubject.next(value);
  }

  public get isSmallScreen(): any {
    return this.isSmallScreenSubject.value;
  }

  public set isMediumScreen(value) {
    this.isMediumScreenSubject.next(value);
  }

  public get isMediumScreen(): any {
    return this.isMediumScreenSubject.value;
  }

  public set hasNotification(value) {
    this.hasNotificationSubject.next(value);
  }

  public get hasNotification(): any {
    return this.hasNotificationSubject.value;
  }

  public set navItem(value) {
    this.navItemSubject.next(value);
  }

  public get navItem(): any {
    return this.navItemSubject.value;
  }

  constructor() { }
}
