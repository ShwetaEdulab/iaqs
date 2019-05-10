
import { Component, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../shared/api.service';
import { FormBuilder, FormGroup,Validators} from '@angular/forms';
import { NbToastrService} from '@nebular/theme';

@Component({
  selector: 'nb-reset-password',
  templateUrl: './reset-password.component.html',
})
export class resetPasswordComponent {
  validation_messages;
  alertflag = 0;
  messagealertflag=0;

  @Input() userPassword:string;
  @Input() userConfirmPassword:string;

  changePasswordForm: FormGroup;
  

  readonly passwordValidate = /^[A-Za-z0-9!@#$%^&*()_]{6,}$/;
  email: string;
  
    constructor(
        private router : Router,
        protected api : ApiService,
        private fb: FormBuilder,
        private route : ActivatedRoute,
        private toastrService: NbToastrService) {
      }
      ngOnInit() {
        this.email = this.route.snapshot.queryParamMap.get('email');    
        this.changePasswordForm = this.fb.group({

        passwordCtrl:['',[Validators.required, Validators.minLength(6),Validators.pattern(this.passwordValidate)]],
        repasswordCtrl:['',[Validators.required, Validators.pattern(this.passwordValidate)]],

        });

      }

      onSubmit(duration,position){
        this.changePasswordForm.controls.passwordCtrl.markAsDirty();
        this.changePasswordForm.controls.repasswordCtrl.markAsDirty();

        var userPassword= this.changePasswordForm.controls.passwordCtrl.value;
        var userConfirmPassword= this.changePasswordForm.controls.repasswordCtrl.value;


        if(userPassword =='' || userConfirmPassword ==''){
          this.alertflag = 1;
          this.validation_messages =  "Your form is not filled please fill completely";

        }else if (!(userPassword == userConfirmPassword)){
              this.alertflag = 2;
              this.validation_messages =  "Password doesn't match!";
        }
        else{
            if(userPassword.length<6 && userConfirmPassword.length<6){
                this.alertflag = 4;
                this.validation_messages =  "Use 6 or more characters,numbers or symbols ";
            }else{
                
                var resetPasswordvalue={
                    userPassword:this.changePasswordForm.controls.passwordCtrl.value,
                    userConfirmPassword:this.changePasswordForm.controls.repasswordCtrl.value,
                    email:this.email
                }
    
                
                this.alertflag = 5;
                this.validation_messages =  "Your password and confirm password successfully match";

                this.api.resetPasswordValues(resetPasswordvalue)
                .subscribe((data: any) => {
                    if(data['status'] == 200){
                      this.toastrService.show(
                        `Password Reset Successfully ! `,{duration},{position}
                    );
                    this.messagealertflag = 1;
                    this.alertflag = 0;                  
                    this.router.navigate(['auth/login']);
                    }else if(data['status'] ==400){
                    this.messagealertflag = 0; 
                    }else{

                    }
                    err => console.error(err)
                });
            }
        }
    }

      close() {
        this.alertflag = 0;
      }

      onClose() {
        this.messagealertflag = 0;
      }
}