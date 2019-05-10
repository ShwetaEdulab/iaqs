import { Component, OnInit } from '@angular/core';
import { AdminApiService } from '../../shared/adminapi.service';
import { Router,ActivatedRoute } from '@angular/router';
import { NbAuthJWTToken,NbAuthService } from '@nebular/auth';
@Component({
  selector: 'ngx-admin-otp',
  templateUrl: './admin-otp.component.html',
  styleUrls: ['./admin-otp.component.scss']
})
export class AdminOtpComponent {
  otp: any;
  alert: any;
  alertflag: number;
  user_id: any;
  enterOtp:any;
  otpValidation: boolean;
  constructor(private router : Router,
    private route : ActivatedRoute,
    protected adminApi : AdminApiService,
    private authService : NbAuthService,
  ) {
      this.authService.onTokenChange()
				.subscribe((token: NbAuthJWTToken) => {
					if(token.getPayload()['role'] !="admin"){
						this.router.navigate(['auth/logout'])
					}
				});
     }

  ngOnInit() {
    this.adminApi.sendOtp().subscribe(data=>{
      if(data['status'] == 200){
        this.otp = data['data']
      }
    })
  }


  verify(){
    this.enterOtp = (document.getElementById('enterOtp') as HTMLInputElement).value;
    if(this.otp === this.enterOtp){  
        this.adminApi.updateOtp().subscribe(data=>{
          if(data['status'] == 200){
            this.router.navigate(['pages/adminDashboard'])
          }
        })       
    }else{
      this.otpValidation = false;
      
    }
  }
}
