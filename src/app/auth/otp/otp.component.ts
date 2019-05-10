
import { Component, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../shared/api.service';
import { UserService } from '../../@core/data/users.service';

@Component({
  selector: 'otp',
  templateUrl: './otp.component.html',
})
export class OTPComponent {
  @Input() email:string;
  @Input()  password:string;
  otp;
  otpValidation:boolean = true;
  alertflag=0;
  otpalertflag=0;
  alert;
  mobile = "+";
  otpSent:boolean = true;
  resend;
  user_id;
  resend_input_validation:boolean = true;
  resend_input:boolean = true;
  loggedInUser; 
  update_phone_message :string;

      constructor(
        private router : Router,
        protected api : ApiService,
        private route : ActivatedRoute) {
      }
  
      verify(){
        var register_data = {
          email:this.email,
          password:this.password,
          otp:this.otp,
          user_id : this.user_id
        }
  
      if(this.otp != undefined){
  
        this.api.Otpvalue(register_data)
        .subscribe(
          (data: any) => {
    
          if(data['status'] == 200){
            this.alert=data['status'] ;
            document.getElementById('otp').style.visibility = 'hidden';
            document.getElementById('verify').style.visibility = 'hidden';
            document.getElementById('header').style.visibility = 'hidden';
            this.alertflag=1;        
      
          }
          else if(data['status'] == 400){
              this.alert=data['status'] ;
          }
        
        });
      }else{
        this.otpValidation = false;
        
      }
  
      }

      ngOnInit() {
        var countryCode = this.route.snapshot.queryParamMap.get('c');
        if(countryCode!==null){
          countryCode = this.route.snapshot.queryParamMap.get('c');
        }else{
          countryCode ="";
        }

        var contact = this.route.snapshot.queryParamMap.get('q');
        if(contact!==null){
          var contact = this.route.snapshot.queryParamMap.get('q');
        }else{
          contact ="";
        }

        this.user_id = this.route.snapshot.queryParamMap.get('i');
        this.mobile += countryCode+contact;
      }

      ok(){
        this.router.navigate(['auth/login'])
      }
      close()
      {
        this.alertflag=0; 
    
      }
  
      update_number_otp(){
        var flag = true;
        var update_data = {
          mobile:'',
          phone_code : '',
          user_id : this.user_id
        }
        
        var phone_validation = this.mobile.substring(this.mobile.length - 10, this.mobile.length);
        var plus_symbol_validation = this.mobile.substring(0, 1);
        var phonecode_validation = this.mobile.substring(1, this.mobile.length - 10);
        
        if(!(plus_symbol_validation=="+")){
          flag = false;
          this.resend_input_validation = false;
          this.update_phone_message = " You have missed '+' symbol at start !";
        }else if(phonecode_validation.length === 0 || phonecode_validation === ''){
          
          flag = false;
          this.update_phone_message = "You have missed phonecode !";
          this.resend_input_validation = false;
        }
        else if(this.mobile.length<=11){
          flag = false;
          this.update_phone_message = "You have missed either phonecode or mobile number !";
          this.resend_input_validation = false;
        }else{
          flag = true;
          this.update_phone_message ="";
          update_data.mobile = phone_validation;
          update_data.phone_code = phonecode_validation;
            
        }

       if(flag){
          this.api.UpdateNumberOTP(update_data)
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
      }
    
      resend_input_open(){
        this.resend_input = false;
      }
          
      
  }