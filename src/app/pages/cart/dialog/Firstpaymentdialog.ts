import { Component, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { ApiService } from '../../../shared/api.service';
import { NbAuthService, NbAuthJWTToken } from '@nebular/auth';
import { FormBuilder, FormGroup,Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { Router , ActivatedRoute } from '@angular/router';
import { Data } from "../../../shared/data";

@Component({
selector: 'nb-dialog',
template: `
<nb-card [style.width.px]="700" [style.height.px]="600" status="success">
  <nb-card-header>
    <div class="row">
      <div class="col-md-3">
      </div>
      <div class="col-md-6">
        <h3 style="color:#ffffff">FIRST PAYMENT</h3>
      </div>
      <div class="col-md-3">
      </div>
    </div>
  </nb-card-header>
  <nb-card-body>
    <div class="row" style="margin-bottom:7px">
      <div class="col-md-3">Name</div>
      <div class="col-md-9"> 
        <input type="text" nbInput fullWidth placeholder="Name" ngModel="{{user_data?.name}}" [readonly]="true">
      </div>
    </div>
    <div class="row" style="margin-bottom:7px">
      <div class="col-md-3">Address</div>
      <div class="col-md-9"> 
        <input type="text" nbInput fullWidth placeholder="Address" ngModel="{{user_data?.address1}}" [readonly]="true">
      </div>
    </div>
    <div class="row" style="margin-bottom:7px">
      <div class="col-md-3">City</div>
      <div class="col-md-9"> 
        <input type="text" nbInput fullWidth  placeholder="City" ngModel="{{user_data?.city}}" [readonly]="true">
      </div>
    </div>
    <div class="row" style="margin-bottom:7px">
      <div class="col-md-3">State</div>
      <div class="col-md-9"> 
        <input type="text" nbInput fullWidth placeholder="State" ngModel="{{user_data?.state}}" [readonly]="true">
      </div>
    </div>
    <div class="row" style="margin-bottom:7px">
      <div class="col-md-3">Zipcode</div>
      <div class="col-md-9"> 
        <input type="text" nbInput fullWidth placeholder="Zipcode" ngModel="{{user_data?.postal_code}}" [readonly]="true">
      </div>
    </div>
    <div class="row" style="margin-bottom:7px">
      <div class="col-md-3">Telephone</div>
      <div class="col-md-9"> 
        <input type="text" nbInput fullWidth placeholder="Telephone" ngModel="{{user_data?.mobile}}" [readonly]="true">
      </div>
    </div>
    <div class="row" style="margin-bottom:7px">
      <div class="col-md-3">Email</div>
      <div class="col-md-9"> 
        <input type="text" nbInput fullWidth placeholder="Email" ngModel="{{user_data?.email}}" [readonly]="true">
      </div>
    </div>
    <div class="row" style="margin-bottom:7px">
      <div class="col-md-3">Amount</div>
      <div class="col-md-9"> 
        <input type="text" nbInput fullWidth placeholder="Amount" ngModel="{{amount}}" [readonly]="true">
      </div>
    </div>
  </nb-card-body>
  <nb-card-footer>
    <div class="row">
    <div class="col-md-3"></div>
    <div class="col-md-6">
      <button nbButton hero status="primary" (click)="dismiss()">Close</button><button nbButton hero status="primary" (click)="firstpayment()">Proceed For Payment</button>
    </div>
    <div class="col-md-3"></div>
    </div>
  </nb-card-footer>
</nb-card>
`,
})
export class Firstpaymentdialog {
@Input() title: string;
@Input() eligibilityFee: string;
user_data;
amount;
applicationId;
courseID;
constructor(protected ref: NbDialogRef<Firstpaymentdialog>,
  protected api : ApiService,
  private authService: NbAuthService,
  private router: Router,
  private route: ActivatedRoute,
  private data: Data) {
  }

  dismiss() {
  this.ref.close();
  }
  ngOnInit() {
    this.api.getProfileValue('Personal')
      .subscribe(
        (data: any) => {  
          this.user_data =  data['data']['user_data'];
          //this.amount = 'INR 3399';
          this.amount = 'INR '+this.eligibilityFee;
          err => console.log(err)
      });
  }

  async firstpayment(){
    //console.log('send req to payment gateway');
    this.applicationId = this.route.snapshot.queryParamMap.get('appId');
    this.courseID = this.route.snapshot.queryParamMap.get('courseID');
    //console.log('this.applicationId====>'+this.applicationId+'@@@@@@@@@this.courseID===========>'+this.courseID);
    //console.log("this.eligibilityFee==========>"+this.eligibilityFee);
    var firstpayment = await this.api.firstpaymentrequest(this.applicationId,this.courseID,this.eligibilityFee);
    firstpayment.subscribe(
        data => {
          //console.log('response url==>'+data['data']['transaction_id']);
          // window.location.assign(data['data']);
          this.ref.close();
          this.data.storage = {
            "transaction_id": data['data']['transaction_id'],
            "payment_amount": data['data']['payment_amount'],
            "payment_status": data['data']['payment_status'],
            "application_id": data['data']['application_id'],
            "payment_date_time": data['data']['payment_date_time'],
            "enrollment_no": data['data']['enrollment_no'],
            "user_id": data['data']['user_id']
          }
          this.router.navigate(['/pages/FirstSuccess'])
        },
        error => {
            console.log("Error", error);
        }
    ); 
  }

  
}
