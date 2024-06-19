import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonsModule } from 'ngx-bootstrap/buttons';

import { HomeComponent } from './home.component';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { SwiperModule } from 'swiper/angular';
import { BrowserModule } from '@angular/platform-browser';

import SwiperCore, { Autoplay, Navigation, Pagination } from 'swiper';
import { SharedModule } from '../../shared/shared.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

SwiperCore.use([Navigation, Pagination, Autoplay]);

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HomeRoutingModule,
    SwiperModule,
    SharedModule,
    ButtonsModule.forRoot(),
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  declarations: [ HomeComponent ]
})
export class HomeModule { }
