import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-home-top-bar',
  templateUrl: './home-top-bar.component.html',
  styleUrls: ['./home-top-bar.component.scss']
})
export class HomeTopBarComponent implements OnInit {
  labelStyle = 'no-label';
  btnStyle = 'cta-btn';
  searchText = '';
  @Output() searched = new EventEmitter<string>();

  constructor( private router: Router, ) { }

  ngOnInit(): void {
  }

  public onSearch(searchTerm: string): void {
    // this.searched.emit(searchTerm);
  }

  onClick() {
    this.labelStyle = 'search-label';
    this.btnStyle = 'cta-btn-search';
  }

  onDashboardLogin() {
    window.location.href = `${environment.webUrl}/login?returnUrl=%2Fdashboard`;
  }

  // @HostListener('window:scroll', ['$event'])
  // onWindowScroll() {
  //   const element = document.querySelector('.top-bar') as HTMLElement;
  //   if (window.pageYOffset > 57) {
  //     element.classList.add('fixed');
  //   } else {
  //     element.classList.remove('fixed');
  //   }
  // }
}
