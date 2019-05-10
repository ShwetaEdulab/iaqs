
import {  Component } from '@angular/core';
import {MessageService} from 'primeng/api';
import { UserService } from '../../@core/data/users.service';
import { ApiService } from '../../shared/api.service';
import { FormBuilder, FormGroup,Validators} from '@angular/forms';
import { NbDateService } from '@nebular/theme';
import { NbDialogService } from '@nebular/theme';
import {ResendEmailComponent} from './resend-email.component'

@Component({
  selector: 'nb-forgot-password',
  styleUrls: ['./forgot-password.component.scss'],
  templateUrl: './forgot-password.component.html',
  providers: [MessageService]
})
export class ForgotPasswordComponent{

  readonly emailValidate = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	ForgotPassForm: FormGroup;
	alertFlag:any = 0;
	alertFlag1:any = 0;
	messagealertflag;
 
  constructor(private fb: FormBuilder,
    protected dateService: NbDateService<Date>,
    protected api : ApiService,
		private dialogService: NbDialogService,
    )
     {  
    
    
    }

    ngOnInit() {
				this.ForgotPassForm = this.fb.group({
     		emailaddressCtrl:['',[Validators.required, Validators.pattern(this.emailValidate)]]
       });
    }
     

    onSubmit(){
	
		 var check_validation;
		 var requestemail = this.ForgotPassForm.controls.emailaddressCtrl.value ;
		 this.ForgotPassForm.controls.emailaddressCtrl.markAsDirty();
		 if(this.ForgotPassForm.valid){	
			check_validation = true;
			this.alertFlag = 0;
		 }else{
			check_validation = false;
			this.alertFlag = 1;
		 }
		 if(check_validation){

			this.api.ForgotPassword(requestemail)
			.subscribe(
					(data: any) => {
					if(data['status'] == 200){
							
							this.dialogService.open(ResendEmailComponent, {
							context: {
								email: requestemail,							
							},
					});

					}else if(data['status'] == 400){
						this.alertFlag1=1;
							this.messagealertflag =data['message'];                               

					}else{

					}       
							 err => console.error(err)
			});

		 }
    } 
}
