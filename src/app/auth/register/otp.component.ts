import { Component, Input } from '@angular/core';
import { NbDialogRef,NbToastrService } from '@nebular/theme';
import { Router } from '@angular/router';
import { ApiService } from '../../shared/api.service';

@Component({
    selector: 'nb-dialog',
    template: `
    <nb-card class="col-md-12">
      <nb-card-header id="header">Verify Otp Here</nb-card-header>
      <nb-card-body>
        <div class="row">
			<input [(ngModel)]="otp" id="otp" style="visibility: visible;" nbInput type="text" placeholder="Enter Otp Here"  class="form-control"> 
			<span *ngIf="otpValidation===false" style="color:red;">Please enter OTP</span> 
			<span *ngIf="otpSent===false" style="color:red;">Please check your mobile for the OTP</span> 
			<input *ngIf="resend_input===false" [(ngModel)]="phone_code" id="resendcode" style="visibility: visible;margin-top:50px;" nbInput type="text" placeholder="Enter Phone Code Here"  class="form-control"> 
			<input *ngIf="resend_input===false" [(ngModel)]="mobile" id="resend" style="visibility: visible;margin-top:50px;" nbInput type="text" placeholder="Enter Mobile Number Here"  class="form-control"> 
			<span *ngIf="resend_input_validation===false" style="color:red;">Please enter OTP</span> 
		</div>         
		<div *ngIf="alert == 200">
		<h2>Otp Verified Successfully.</h2>	  
		</div>
		<div *ngIf="alert == 400">
			<h3 style="color:red;">Please Enter Valid OTP. </h3>
		</div>   
      </nb-card-body>
	  <nb-card-footer>
		<div class="row">
			<div class="col-md-3"></div>
			<div class="col-md-3"></div>
			<div class="col-md-3"></div>
			<div class="col-md-3">
				<a  style="cursor:pointer;color: #034c83;" (click)="resend_input_open()"  >Resend SMS</a>
			</div>
    	</div>
   		<div class="row">
        	<div class="col-lg-6"><button nbButton *ngIf="resend_input===false" (click)="update_number_otp()" hero status="primary" id="resend" style="visibility: visible;margin-top:10px;" >Update & Send</button></div>
    	</div>
	  
		<div class="row">
		<div class="col-lg-3"><button nbButton outline status="primary" (click)="verify(3000,'bottom-end')" >Verify</button></div>           
	 
		</div>          
        </nb-card-footer>
    </nb-card>
    `,
    })

export class OtpComponent {
@Input() email:string;
@Input()  password:string;
@Input()  userCountryCode:string;
@Input()    userContactNo :string;
@Input()    user_id :string;
otp;
alertflag=0;
otpalertflag=0;
alert;
otpSent:boolean = true;
resend;
resend_input_validation:boolean = true;
resend_input:boolean = true;
contact ;
mobile;
phone_code;
otpValidation;

    constructor(protected ref: NbDialogRef<OtpComponent>,
      private router : Router,
			protected api : ApiService,
			private toastrService: NbToastrService,) {
    }

    verify(duration,position){
        var register_data={
         email:this.email,
         password:this.password,
					otp:this.otp,
					type:'register'
		}

		if(this.otp != undefined){

			this.api.Otpvalue(register_data)
			.subscribe(
			  (data: any) => {
	
				if(data['status'] == 200){
				  this.alert=data['status'] ;
					this.toastrService.show(
						`Otp Verified Successfully ! `,{duration},{position}
					);
					this.router.navigate(['auth/login'])
					this.ref.close();
							this.alertflag=1;        
		
				  }
				  else if(data['status'] == 400){
					this.alert=data['status'] ;
				  }
	
	
			  });
		}
		
	

    }
	ok(){
		this.router.navigate(['auth/login'])
		this.ref.close();
	}
    close()
    {
        this.alertflag=0; 

    }
    dismiss() {
       
        this.ref.close();
        
		}
	
		update_number_otp(){
			var data={
				phone_code: this.phone_code,
				mobile:this.mobile,
				user_id :this.user_id
			}

			this.api.UpdateNumberOTP(data)
			.subscribe(
			  (data: any) => {
		
			  if(data['status'] == 200){
				this.resend_input = true;
				this.otpSent = true;
			  }
			  else if(data['status'] == 400){
				this.resend_input = true;
			  }
			
			});
		  }
		  
		  resend_input_open(){
			this.mobile=this.userContactNo;
			this.phone_code=this.userCountryCode;
			this.resend_input = false;
		  }
		   
    
}