import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-payment-callback',
  templateUrl: './payment-callback.component.html',
  styleUrls: ['./payment-callback.component.scss']
})
export class PaymentCallbackComponent implements OnInit {
  transactionId;
  transactionPaid;
  transactionStatus;
  constructor(
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      this.transactionId = params.get('billplz[id]');
      this.transactionPaid = params.get('billplz[paid]');
      this.transactionStatus = params.get('billplz[transaction_status]');
    });
  }
}
