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
      <div class="col-md-3">
      </div>
      <div class="col-md-6">
        <h3 style="color:#ffffff">THIRD PAYMENT</h3>
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
      <div class="col-md-3">Country</div>
      <div class="col-md-9"> 
        <input type="text" nbInput fullWidth placeholder="Country" ngModel="{{user_data?.country_id}}" [readonly]="true">
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
        <input type="text" nbInput fullWidth placeholder="Amount" ngModel="{{title}}" [readonly]="true">
      </div>
    </div>
  </nb-card-body>
  <nb-card-footer>
    <div class="row">
    <div class="col-md-3"></div>
    <div class="col-md-6">
      <button nbButton hero status="primary" (click)="dismiss()">Close</button><button nbButton hero status="primary" (click)="thirdpayment()">Proceed For Payment</button>
    </div>
    <div class="col-md-3"></div>
    </div>
  </nb-card-footer>
</nb-card>
`,
})
export class Thirdpaymentdialog {
@Input() title: string;
user_data;
amount;
applicationId;
courseID;
constructor(protected ref: NbDialogRef<Thirdpaymentdialog>,
  protected api : ApiService,
  private authService: NbAuthService,
  private router: Router,
  private route: ActivatedRoute) {
  }

  dismiss() {
  this.ref.close();
  }
  ngOnInit() {
    this.api.getProfileValue('Personal')
      .subscribe(
        (data: any) => {  
          this.user_data =  data['data']['user_data'];
          err => console.log(err)
      });
  }

  async thirdpayment(){
    //console.log('send req to payment gateway');
    this.applicationId = this.route.snapshot.queryParamMap.get('appId');
    this.courseID = this.route.snapshot.queryParamMap.get('courseID');
    this.amount = this.title;
    //console.log('this.applicationId====>'+this.applicationId+'@@@@@@@@@this.courseID===========>'+this.courseID);
    var thirdpayment = await this.api.thirdpaymentrequest(this.applicationId,this.courseID,this.amount)
    thirdpayment.subscribe(
        data => {
          //console.log('response url==>'+data['data']);
          //window.location.assign(data['data']);
          this.ref.close();
        },
        error => {
            console.log("Error", error);
        }
    ); 
  }

  
}
