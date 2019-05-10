
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Data } from "../../shared/data";
import { ApiService } from '../../shared/api.service';

@Component({
  selector: 'firstsuccess',
  template: `<div class="row">
    <div class="col-xxxl-8 col-xxl-8 col-lg-7 col-md-8">
      <nb-card status="success">
        <nb-card-header>
          <h1>PAYMENT SUCCESSFUL</h1>
        </nb-card-header>
        <nb-card-body>
          <div class="row">
            <h2>
              Thank you! Your transaction is successful
            </h2>
          </div>
          <div class="row">
            <h2>
              Your transaction id is {{ transaction_id }}
            </h2>  
          </div>
          <div class="row">
            <h3>
              <a href="" ng-click="redirect()">Click here</a>
              To proceed further
            </h3>
          </div>
          <div class="row">
            <h3> 
              Payment Details :-
            </h3>
          </div>
          <div class="row">
            <h4>
              Application Id: {{ application_id }}
            </h4>
          </div>
          <div class="row">
            <h4>
              Transaction ID: {{ transaction_id }}
            </h4> 
          </div>
          <div class="row">
            <h4>
              Amount        : {{ payment_amount }}
            </h4>
          </div>
          <div class="row">
            <h4>
              Payment Status: {{ payment_status }}
            </h4>
          </div>
          <div class="row">
            <button nbButton status="primary" (click)="pdfChallan()">Download Online Payment Receipt</button>
          </div>
        </nb-card-body>
      </nb-card>
    </div>
  </div>`,
})
export class FirstSuccessComponent  {
  constructor(private router: Router,
    private route: ActivatedRoute,
    private data: Data,
    protected api : ApiService) {
      
  }
  transaction_id;
  application_id;
  payment_amount;
  payment_status;
  async ngOnInit() {
    this.transaction_id = this.data.storage.transaction_id;
    this.application_id = this.data.storage.application_id;
    this.payment_amount = this.data.storage.payment_amount;
    this.payment_status = this.data.storage.payment_status;
  }

  async pdfChallan(){
    var generatereceipt = await this.api.OnlinePaymentChallan('1',this.data.storage.transaction_id,this.data.storage.payment_amount,this.data.storage.payment_status,this.data.storage.application_id,this.data.storage.payment_date_time,this.data.storage.enrollment_no,this.data.storage.user_id);
    generatereceipt.subscribe(
      data => {
        var value = data['data'].split('/').pop();
        this.api.downloadFiles(value)
          .subscribe(data => {
           saveAs(data, value);
          });

          this.ngOnInit();
      },
      error => {
          console.error("Error", error);
      }
    ); 
  }
  redirect(){
    this.router.navigateByUrl('/pages/application');
  }

}

