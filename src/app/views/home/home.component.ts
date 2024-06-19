import { trigger, transition, style, animate, query, group } from '@angular/animations';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import SwiperCore, { SwiperOptions } from 'swiper';
import { SwiperComponent } from 'swiper/angular';
import { EnquiryService } from '../../services/enquiry.services';
import { AlertDialogComponent } from '../../shared/dialogs/alert-dialog/alert-dialog.component';
import { PackagesService } from '../../services/package.service';

const right = [
  query(':enter, :leave', style({ position: 'fixed', width: '100%' }), { optional: true }),
  group([
    query(':enter', [style({ transform: 'translateX(100%)' }), animate('.3s ease-out', style({ transform: 'translateX(0%)' }))], {
      optional: true,
    }),
    query(':leave', [style({ transform: 'translateX(0%)' }), animate('.3s ease-out', style({ transform: 'translateX(-100%)' }))], {
      optional: true,
    }),
  ]),
];
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({transform: 'translateY(-100%)'}),
        animate('200ms ease-in', style({transform: 'translateY(0%)'}))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({transform: 'translateY(-100%)'}))
      ])
    ])
  ]

})
export class HomeComponent implements OnInit {

  @ViewChild(SwiperComponent) swiper: SwiperComponent;
  @ViewChild('package', {static: false}) package: SwiperComponent;

  search: string = null;
  messageForm: FormGroup;
  config: SwiperOptions = {
    keyboard: true,
    mousewheel: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    // pagination: { clickable: false },
    autoplay: {
      delay: 6000,
      disableOnInteraction: false,
    },
  };

  leftArrow = false;
  rightArrow = true;
  configPackage: SwiperOptions = {
    keyboard: true,
    mousewheel: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    slidesPerView: 3,
    // on: {
    //   slideChange: function() {
    //     console.log( this.realIndex );
    //   }
    // }
  };
                
  packageList = [];
  totalItem = 0;
  currentCount = 0;
  pagePerView = 0;

  selectedBasic = 12;
  selectedExe = 12;
  selectedPro = 12;
  selectedEnter = 12;

  constructor(
    private formBuilder: FormBuilder,
    public enquiryService: EnquiryService,
    public dialog: MatDialog,
    private router: Router,
    private packagesSvc: PackagesService,
  ) { }

  ngOnInit(): void {
    this.messageForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      message: ['', [Validators.required, Validators.email]],
    });
    this.getPackagesList();
  }

  onSwiper(swiper) {
    // console.log(swiper);
  }
  onSlideChange() {
  }

  swipePrev() {
    this.swiper.swiperRef.slidePrev();
  }
  swipeNext() {
    this.swiper.swiperRef.slideNext();
  }

  swipePrevPackage() {
    this.package.swiperRef.slidePrev();
    this.currentCount -= 1;

    if(this.currentCount <= this.pagePerView) { // pagePerView = 3
      this.leftArrow = false;
      this.rightArrow = true;
    } else if(this.currentCount < (this.totalItem -1)) {
      this.leftArrow = true;
      this.rightArrow = false;
    } else {
      this.leftArrow = true;
      this.rightArrow = true;
    }
  }

  swipeNextPackage() {
    this.package.swiperRef.slideNext();
    this.currentCount += 1;

    if(this.currentCount <= this.pagePerView) { // pagePerView = 3
      this.leftArrow = false;
      this.rightArrow = true;
    } else if(this.currentCount > (this.totalItem -1)) {
      this.leftArrow = true;
      this.rightArrow = false;
    } else {
      this.leftArrow = true;
      this.rightArrow = true;
    }
  }

  public OnSearched(searchTerm: string) {
    // this.search = searchTerm;
  }

  onSubmitForm() {
    const enquiryDTO = {
      Name: this.messageForm.get('name').value,
      Email: this.messageForm.get('email').value,
      Subject: 'Contact Us',
      Message: this.messageForm.get('message').value
    };
    // console.log('enquiryDTO=>', enquiryDTO);

    this.enquiryService.insertEnquiry(enquiryDTO).subscribe(resp => {
      if (resp.data) {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.autoFocus = true;
        dialogConfig.width = '400px',
        dialogConfig.panelClass = '',
        dialogConfig.data = {
          icon: '',
          title: '',
          description: 'Thank you!! Your message has been sent.',
        };

        const modalRef = this.dialog.open(AlertDialogComponent, dialogConfig);

        modalRef.afterClosed().subscribe(result => {
          this.ngOnInit();
        });
      }
    });
  }

  getPackagesList() {
    this.packagesSvc.getAllPackageList().subscribe(res=>{
      // console.log('getPackages res', res.data);
      this.packageList = res.data;

      for(const p of this.packageList) {
        if(p.packageName === 'Basic Package') {
          p.paymentModule = 0;
          p.thirdParty = 0;
        } else if(p.packageName === 'Executive Package') {
          p.paymentModule = 0;
          p.thirdParty = 0;
        } else if(p.packageName === 'Professional Package') {
          p.paymentModule = 1;
          p.thirdParty = 1;
        } else if(p.packageName === 'Enterprise Package') {
          p.paymentModule = 1;
          p.thirdParty = 1;
        } else if (p.packageName === 'Free Trial') {
          p.packageColor = '#608EE9';
          p.packageName = 'Free Trial 14 Days';
        }
      }

      this.totalItem = this.packageList.length;
      this.pagePerView = 3;
      this.currentCount = 3;
      
    });
  }

  onChangeSelected(packageId, duration) {
    if(packageId === 2) {
      this.selectedBasic = duration;
    } else if(packageId === 3) {
      this.selectedExe = duration;
    } else if(packageId === 4) {
      this.selectedPro = duration;
    } else if(packageId === 5) {
      this.selectedEnter = duration;
    }
  }

  redirectToWhatsapp() {
    const link = 'https://api.whatsapp.com/send/?phone=60163968438&text=Hi,+I+am+interested+in+the+Enterprise+Package+for+ConneXtion&type=phone_number&app_absent=0';
    document.location.href = link;
  }

}
