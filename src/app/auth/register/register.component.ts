/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import {  Component } from '@angular/core';
import {MessageService} from 'primeng/api';
import { UserService } from '../../@core/data/users.service';
import { ApiService } from '../../shared/api.service';
import { CountriesService } from '../../@core/data/countries.service';
import { FormBuilder, FormGroup,Validators} from '@angular/forms';
import { NbDateService,NbDialogService,NbToastrService } from '@nebular/theme';
import { TermsComponent } from './terms.component';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'nb-register',
  styleUrls: ['./register.component.scss'],
  templateUrl: './register.component.html',
  providers: [MessageService]
})
export class RegisterComponent{
	email:any;
	RegisterForm: FormGroup;
	Countries: any [];
	alertflag = 0;
	messgealertflag = 0;
	messages;
	validation_messages;
	permCountry;
	selectedGender;
	selectedCategory;
	selectedSource;
	Country;
	max;
	date;
	captcha;
	country_id;
	profile_info;
	countryValidation = false;
  	selectedCountry;
	svg:SafeHtml;
 	captchaText;
 	values = '';
  

  readonly emailValidate = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  readonly charValidate = /^[.a-zA-Z ]*$/;
  readonly nationalValidate = /^(?![0-9]*$)[A-Za-z0-9 ]+$/;
  readonly passportValidate = /^[a-zA-Z0-9]*$/;
  readonly postalValidate = /^[a-zA-Z0-9 ]+$/;
  readonly mobileValidate =/^[6-9]\d{9}$/;
readonly passwordValidate = /^[A-Za-z0-9!@#$%^&*()_]{6,}$/;
 
  constructor(private userService: UserService,
    private fb: FormBuilder,
    protected dateService: NbDateService<Date>,
    protected api : ApiService,
    protected countries :CountriesService,
     private dialogService: NbDialogService,
     private messageService: MessageService,
     private toastrService: NbToastrService,
     private sanitizer: DomSanitizer
    )
     {  
    this.Countries = this.countries.getData();
    
    }

    ngOnInit() {

      this.buildForm1();     
     
      this.RegisterForm = this.fb.group({
        firstNameCtrl: [ '', [ Validators.required, Validators.maxLength(70),Validators.minLength(3)]],
       LastNameCtrl: ['', [ Validators.pattern(this.charValidate), Validators.required, Validators.maxLength(70),Validators.minLength(3)]],
        emailCtrl: ['', [ Validators.required, Validators.pattern(this.emailValidate)]], // Validators.pattern("^[0-9]*$")
        passwordCtrl:['',[Validators.required, Validators.pattern(this.passwordValidate)]],
        repasswordCtrl:['',[Validators.required, Validators.pattern(this.passwordValidate)]],
        //AddCtrl:['', [ Validators.required, Validators.maxLength(250),Validators.minLength(3)]],
        //genderCtrl: [ '', [ Validators.required]],
        //categoryCtrl: [ '', [ Validators.required]],
        //CityCtrl:['', [ Validators.required, Validators.maxLength(30),Validators.minLength(2)]],
        //StateCtrl:['', [ Validators.required, Validators.maxLength(30),Validators.minLength(2)]],
        //PostCodeCtrl:['', [ Validators.required, Validators.pattern(this.postalValidate), Validators.maxLength(10),Validators.minLength(5)]],
        //dobCtrl:['', Validators.required],
        phonecodeCtrl:[''],
        phoneCtrl:['', [ Validators.required, Validators.pattern(this.mobileValidate)]],
				captchaCtrl:['', Validators.required],
				sourInfoCtrl:[ '', [ Validators.required]],
      });
    }
              
    private buildForm1() : void{
      this.api.getCaptcha()
      .subscribe(
        (data: any) => {  
          this.captchaText = data['data']['captchaText'];
          this.captcha =  data['data']['captchadata'];
          this.svg = this.sanitizer.bypassSecurityTrustHtml(this.captcha);         
        err => console.error(err)
      });
    }
	
    onKeyPress(event: any) {
		// this.values = event.target.value;		
		this.api.emailValues(this.RegisterForm.controls.emailCtrl.value)
                            .subscribe(
                                (data: any) => {
                                if(data['status'] == 200){                                    
                                    
                                

                                }else if(data['status'] == 400){
									this.toastrService.show(
										status || 'Success',       
										`Email Already Exist ! ! `, 
									  );
                                }else{

                                }       
                                     err => console.error(err)
                        });

    };

  	checkcaptcha(duration,status){
		if(!(this.RegisterForm.controls.captchaCtrl.value == this.captchaText)){		
			this.toastrService.show(       
				`checkcaptcha doesn't match ! ! `, {duration},{status}
      		);
			this.validation_messages =  "checkcaptcha doesn't match!";
			this.RegisterForm.controls.captchaCtrl.markAsDirty();
			
		}
	}

	reloadcaptcha(){
		this.api.getCaptcha()
		.subscribe(
			(data: any) => {  
				this.captchaText = data['data']['captchaText'];
				this.captcha =  data['data']['captchadata'];
				this.svg = this.sanitizer.bypassSecurityTrustHtml(this.captcha);         
			err => console.error(err)
		});
	}

	checkpassword(duration,status){
		if(this.RegisterForm.controls.passwordCtrl.value != this.RegisterForm.controls.repasswordCtrl.value){		

			this.toastrService.show(       
				`Password doesn't match ! ! `, {duration},{status}
      		);
			this.validation_messages =  "Password doesn't match!";
			this.RegisterForm.controls.passwordCtrl.markAsDirty();
		}
	}
    onSubmit(duration,status){
		var check_validation;
    //this.RegisterForm.controls.genderCtrl.markAsDirty();     
		this.RegisterForm.controls.emailCtrl.markAsDirty();
		this.RegisterForm.controls.passwordCtrl.markAsDirty();
		this.RegisterForm.controls.repasswordCtrl.markAsDirty();
		this.RegisterForm.controls.firstNameCtrl.markAsDirty();
		this.RegisterForm.controls.LastNameCtrl.markAsDirty();
		//this.RegisterForm.controls.categoryCtrl.markAsDirty();
		this.RegisterForm.controls.sourInfoCtrl.markAsDirty();
		//this.RegisterForm.controls.AddCtrl.markAsDirty();
		//this.RegisterForm.controls.CityCtrl.markAsDirty();
		//this.RegisterForm.controls.StateCtrl.markAsDirty();
		//this.RegisterForm.controls.PostCodeCtrl.markAsDirty();		
		//this.RegisterForm.controls.dobCtrl.markAsDirty();    
		this.RegisterForm.controls.phoneCtrl.markAsDirty();
    //this.RegisterForm.controls.phonecodeCtrl.markAsDirty();
    this.RegisterForm.controls.captchaCtrl.markAsDirty();
		if(this.RegisterForm.controls.passwordCtrl.value == this.RegisterForm.controls.repasswordCtrl.value){
			if(this.RegisterForm.valid){	
				if(this.RegisterForm.controls.captchaCtrl.value == this.captchaText){	
					check_validation = true;
					this.alertflag = 0;
				}else{
					this.toastrService.show(       
						`checkcaptcha doesn't match ! ! `, {duration},{status}
					  );	
				}			
			}else{
				check_validation = false;
				this.alertflag = 1;
				this.validation_messages =  "Fill in the all required details !";
			}
		}else{
			this.alertflag = 1;
			this.toastrService.show(       
				`Password doesn't match ! ! `, {duration},{status}
      		);
			this.validation_messages =  "Password doesn't match!";

		}
		if(check_validation){
			this.alertflag = 0;
				this.dialogService.open(TermsComponent, {
					closeOnBackdropClick : false,
					context: {
						userName : this.RegisterForm.controls.firstNameCtrl.value,
						Surname: this.RegisterForm.controls.LastNameCtrl.value,
						userPassword : this.RegisterForm.controls.passwordCtrl.value,
						//Gender : this.RegisterForm.controls.genderCtrl.value,
						//userDob : this.RegisterForm.controls.dobCtrl.value,
						userEmail : this.RegisterForm.controls.emailCtrl.value,
						//student_category : this.RegisterForm.controls.categoryCtrl.value,
						userCountryCode : '91',
						userContactNo : this.RegisterForm.controls.phoneCtrl.value,
						//userAddress : this.RegisterForm.controls.AddCtrl.value,
						//userCity: this.RegisterForm.controls.CityCtrl.value,
						//userState : this.RegisterForm.controls.StateCtrl.value,
						//postal_code : this.RegisterForm.controls.PostCodeCtrl.value,
						sourInfo : this.RegisterForm.controls.sourInfoCtrl.value,
					},
				});
		  }else{
			this.alertflag = 1;
			if(this.validation_messages != null){
			  this.messages = this.validation_messages;
			}else{
			  this.messages = "Your form is not filled please fill completely";
			}
		  }
     

    }
  
  onClose(){
    this.messgealertflag = 0;

  }
  close() {
    this.alertflag = 0;
  }
  showResponse(event) {
    this.messageService.add({severity:'info', summary:'Succees', detail: 'User Responded', sticky: true});
}


onValueChange(event){
  
	var phonecode;
	var permittedValues = this.Countries.map(function(value) {
	  if(value.id == event){
	   phonecode = value.phonecode;
	  }
	 });
	 if(phonecode!=null || phonecode!=undefined ){
	   this.profile_info = phonecode;
	 }
	 
	 
   }
   


}
