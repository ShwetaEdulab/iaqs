import { Component, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { ApiService } from '../../../../shared/api.service';
import { NbAuthService, NbAuthJWTToken } from '@nebular/auth';
import { FormBuilder, FormGroup,Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { Router , ActivatedRoute } from '@angular/router';

@Component({
selector: 'nb-dialog',
template: `
<nb-card [style.width.px]="700" [style.height.px]="600" status="success">
  <nb-card-header>
    <div class="row">
      <div class="col-md-12">
        <h3 style="color:#ffffff">Payment for Online Test ( Course {{course_name}} )</h3>
      </div>
    </div>
  </nb-card-header>
  <nb-card-body>
    <div class="row" style="margin-bottom:7px">
        First You need to pay the fees :
    </div>
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
      <div class="col-md-3">Amount ( In INR )</div>
      <div class="col-md-9"> 
        <input type="text" nbInput fullWidth placeholder="Amount" ngModel="{{amount}}" [readonly]="true">
      </div>
    </div>
  </nb-card-body>
  <nb-card-footer>
    <div class="row">
    <div class="col-md-3"></div>
    <div class="col-md-6">
      <button nbButton hero status="primary" (click)="dismiss()">Close</button><button nbButton hero status="primary" (click)="onlinetestpayment()">Proceed For Payment</button>
    </div>
    <div class="col-md-3"></div>
    </div>
  </nb-card-footer>
</nb-card>
<div>
<form id="nonseamless" method="post" name="redirect" action="{{secureUrl}}"> <input type="hidden" id="encRequest" name="encRequest" value="{{encRequest}}"><input type="hidden" name="access_code" id="access_code" value="{{accessCode}}"></form>
</div>
`,
})
export class OnlineTestPaymentdialog {
@Input() title: string;
@Input() applicationID: string;
@Input() courseID: string;
@Input() amount: string;
@Input() order_id: string;
user_data;
//amount;
//applicationId;
//courseID;
course_name;
  accessCode: any;
  secureUrl: any;
  encRequest: any;
constructor(protected ref: NbDialogRef<OnlineTestPaymentdialog>,
  protected api : ApiService,
  private authService: NbAuthService,
  private router: Router,
  private route: ActivatedRoute) {
  }

  dismiss() {
  this.ref.close();
  }
  ngOnInit() {
    this.api.getenrollmentdetails('second_payment',this.applicationID)
      .subscribe(
        (data: any) => {  
          this.user_data =  data['data']['user'];
          //this.amount = "1000";
          //this.amount = data['data']['fees'];
          this.course_name = data['data']['specialization'];
          err => console.log(err)
      });
  }

  async onlinetestpayment(){
    //this.applicationId = this.route.snapshot.queryParamMap.get('appId');
   // this.courseID = this.route.snapshot.queryParamMap.get('courseID');
    var payment = await this.api.paymentrequest(this.applicationID,this.courseID,this.amount);
    payment.subscribe(
      data => {
        this.accessCode = data['data']['accessCode'];
        console.log('this.accessCode=============>'+this.accessCode);
        this.secureUrl = data['data']['secureUrl'];
        console.log('this.secureUrl=============>'+this.secureUrl);
        this.encRequest = data['data']['encRequest'];
        console.log('this.encRequest=============>'+this.encRequest);
        setTimeout(function(){ 
         //console.log("Hello");
         this.loading = false;
          var myForm = <HTMLFormElement>document.getElementById('nonseamless');
          //console.log('myForm=============>'+myForm);
          myForm.submit();
        }, 1000);
      },
      error => {
          console.log("Error", error);
      }
    ); 
  }
}
