import { Component, OnInit } from '@angular/core';
import moment from 'moment';

@Component({
  selector: 'app-simple-footer',
  templateUrl: './simple-footer.component.html',
  styleUrls: ['./simple-footer.component.scss']
})
export class SimpleFooterComponent implements OnInit {
  currentYear = moment().year();
  constructor() { }

  ngOnInit(): void {
  }

}
