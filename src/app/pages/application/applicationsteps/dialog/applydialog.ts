import { Component, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { ApiService } from '../../../../shared/api.service';
import { NbAuthService, NbAuthJWTToken } from '@nebular/auth';
import { FormBuilder, FormGroup,Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { Router , ActivatedRoute } from '@angular/router';
import { UserService } from '../../../../@core/data/users.service';

@Component({
selector: 'nb-dialog',
template: `
<nb-card [style.width.px]="700" [style.height.px]="600" status="success">
  <nb-card-header>
    <div class="row">
      <div class="col-md-12">
        <h3 style="color:#ffffff">Which Course do you want to apply?</h3>
      </div>
    </div>
  </nb-card-header>
  <nb-card-body>
    <div class="row" style="margin-bottom:7px">
      <div class="col-xl-12">
        <h4>Select One of Below :</h4>
      </div>
    </div>
    <div class="row" style="margin-bottom:7px">
      <div class="col-xl-12">
            <label class="radio-inline">
                <h5><input id="rdb1" type="radio" value="BSC" (click)="checkradio('BSC')" />B.Sc. in Actuarial and Quantitative Finance</h5>
            </label>
        </div>
        <div class="col-xl-12">
            <label class="radio-inline">
                <h5><input id="rdb2" type="radio" value="MSC" (click)="checkradio('MSC')"/>M.Sc. in Actuarial and Quantitative Finance</h5>
            </label>
        </div>
    </div>
    <div class="row" style="margin-bottom:7px">
      <div class="col-xl-12">
        <button nbButton hero status="primary" (click)="save()">Save</button>
        <span *ngIf="courseerror == true" style="color: red">Please Select One of above Option</span>
      </div>
    </div>
  </nb-card-body>
  <nb-card-footer>
    <div class="row">
    <div class="col-md-3"></div>
    <div class="col-md-6">
      <button nbButton hero status="primary" (click)="dismiss()">Close</button>
    </div>
    <div class="col-md-3"></div>
    </div>
  </nb-card-footer>
</nb-card>
`,
})
export class Applydialog {
@Input() title: string;
@Input() courseID: string;
@Input() amount: string;
@Input() order_id: string;
id : any;
user_data;
course_name;
  accessCode: any;
  secureUrl: any;
  encRequest: any;
  courseerror = false;
  applicationID: any;
constructor(protected ref: NbDialogRef<Applydialog>,
  protected api : ApiService,
  private authService: NbAuthService,
  private router: Router,
  private route: ActivatedRoute,
  private userService: UserService,) {
  }

  dismiss() {
  this.ref.close();
  }
  ngOnInit() {
    this.userService.onUserChange()
    .subscribe(
      (user: any) => {
        this.id = user['id'];
      });
    
    }

    checkradio(x) {
      this.course_name = x;
    }

    save(){
      var courseid ; 
      if(this.course_name == undefined){
        this.courseerror = true;
      }else{
        if(this.course_name == 'BSC'){
          courseid = 121626;
        }else if(this.course_name == 'MSC'){
          courseid = 121629;
        }
        this.api.find_intake(courseid).subscribe(data => {
          if(data['status'] == 200){
            var firstpayment = this.api.addtoUserCourseApplication(courseid);
            firstpayment.subscribe(
                data => {
                  this.applicationID = data['data'];
                  this.ref.close();
                  //this.router.navigate(['/pages/application/process'],{queryParams:{appId:this.applicationID,courseID:courseid}})
                },
                error => {
                    console.log("Error", error);
                }
            );
          }else if(data['status'] ==300){
            //this.alertflag = 1;
          }else if(data['status'] ==400){
           // this.alertflag = 2;
          }else if(data['status'] == 301){
           // this.alertflag = 3;
          }
          error => {
              console.error("Error in cart :", error);
          }
        });
      }
    }
    // this.api.getenrollmentdetails('second_payment',this.applicationID)
    //   .subscribe(
    //     (data: any) => {  
    //       this.user_data =  data['data']['user'];
    //       //this.amount = "1000";
    //       //this.amount = data['data']['fees'];
    //       this.course_name = data['data']['specialization'];
    //       err => console.log(err)
    //   });

  // async onlinetestpayment(){
  //   var payment = await this.api.paymentrequest(this.applicationID,this.courseID,this.amount);
  //   payment.subscribe(
  //     data => {
  //       this.accessCode = data['data']['accessCode'];
  //       console.log('this.accessCode=============>'+this.accessCode);
  //       this.secureUrl = data['data']['secureUrl'];
  //       console.log('this.secureUrl=============>'+this.secureUrl);
  //       this.encRequest = data['data']['encRequest'];
  //       console.log('this.encRequest=============>'+this.encRequest);
  //       setTimeout(function(){ 
  //        //console.log("Hello");
  //        this.loading = false;
  //         var myForm = <HTMLFormElement>document.getElementById('nonseamless');
  //         //console.log('myForm=============>'+myForm);
  //         myForm.submit();
  //       }, 1000);
  //     },
  //     error => {
  //         console.log("Error", error);
  //     }
  //   ); 
  // }
}
