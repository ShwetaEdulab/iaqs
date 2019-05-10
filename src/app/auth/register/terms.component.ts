import { Component, Input } from '@angular/core';
import { NbDialogRef,NbDialogService } from '@nebular/theme';
import { Router } from '@angular/router';
import { ApiService } from '../../shared/api.service';
import { RegisteredComponent } from './registered.component';
import { SupportapiService } from '../../shared/supportapi.service';

@Component({
    selector: 'nb-dialog',
    template: `
       <nb-card class="col-md-6 offset-md-3" [style.height.px]="600">
        <nb-card-header id="header">Please review and consider the following before continuing: <nb-action icon="ion-close" (click)="close()"></nb-action></nb-card-header>
           <nb-card-body>
        <nb-alert status="danger" closable (close)="onClose()" *ngIf="messagealertflag == 1">
                Email Already Exists !!!!
        </nb-alert> 
        <div class="row">
            <div class="col-lg-1"></div>
            <div class="col-lg-11">
                <nb-checkbox status="success" value="true">        
                    The colleges that I am considering for application may communicate with me by mail, email, phone or text message prior to submission of my application (you can change this response later within your account settings).
                </nb-checkbox>
            </div>
        </div><br>
        <div class="row">
            <div class="col-lg-1"></div>
            <div class="col-lg-11">
                <nb-checkbox status="success" value="true">
                The Garware Institute may communicate with me by mail, email, phone or text message about my account and other information relevant to the admission application process (you can change this response later within your account settings).
                </nb-checkbox>
            </div>
        </div><br>
        <div class="row">
            <div class="col-lg-1"></div>
            <div class="col-lg-11">
                <nb-checkbox status="success" value="true">
                I declare that information given in this form is true to the best of my knowledge. If selected for the course, I agree to abide by the rules and conditions in force at this institute and laid down by the Institute from time to time.
                </nb-checkbox>
            </div>
        </div><br>
        <div class="row">
            <div class="col-lg-1"></div>
            <div class="col-lg-11">
                <nb-checkbox status="success"  [(ngModel)]="Condition3">
                        By checking this box, I represent that (i) I am age 13 or older and (ii) I have read, understood and agreed to the terms and conditions of the Terms of Use and Privacy Policy (unless I am over the age of 13 but under the age of 18, in which case, my parent or legal guardian has also read, understood and agreed to the terms and conditions of the Privacy Policy and Terms of Use sections).
                </nb-checkbox>
            </div>
            <div class="col-lg-11"*ngIf="alertflag == 1" id ="alert" >
			    <h5 style="color:red">You should agree this term. </h5>
		    </div> 
        </div><br>
        <div class="row">
            <div class="col-lg-1"></div>
            <div class="col-lg-11">
                <nb-checkbox status="success">
                    The Garware Institute website uses small files stored on your computer, known as cookies, that help us remember your settings and ensure the website works properly. By continuing, I am agreeing to The Garware Institute's use of cookies.
                </nb-checkbox>
            </div>
		</div> 		
		  
      </nb-card-body>
	  <nb-card-footer>
	  <div class="row">
	  <div class="offset-lg-4"></div><button nbButton [nbSpinner]="loading" nbSpinnerStatus="danger" nbSpinnerSize="xlarge"  status="success"  (click)="Register()" class="col-lg-4">Register</button>
	  
	 </div>           
        </nb-card-footer>
    </nb-card>
    `,
    })
    export class TermsComponent {
        @Input() userName:string;
        @Input()  Surname:string;
        @Input() userPassword:string;
        @Input()  Gender:string;
        @Input() userDob:string;
        @Input()  userEmail:string;
        @Input() student_category:string;
        @Input()  userCountryCode:string;       
        @Input() userContactNo:string;
        @Input()  userAddress:string;
        @Input() userCity:string;
        @Input()  userState:string;
        @Input()  postal_code:string;
        @Input()  sourInfo:string;
       // @Input()  Country:string;
       // @Input()  CountryOfOrigin:string;


        loading=false;
        Condition;
        Condition3;
        alertflag=0;
        messagealertflag=0;
        alert;
        user_id: any;
            constructor(protected ref: NbDialogRef<TermsComponent>,
              private router : Router,
              private dialogService: NbDialogService,
              protected api : ApiService,
              private supportapi : SupportapiService,) {
            }

            Register(){
               
                this.Condition=this.Condition3;
                var register_data ={
                    userName : this.userName ,
                    Surname: this.Surname,
                    userPassword : this.userPassword,
                    Gender : this.Gender,
                    userDob : this.userDob,
                    userEmail : this.userEmail,
                    student_category : this.student_category,
                    userCountryCode : this.userCountryCode,
                    userContactNo : this.userContactNo,
                    userAddress : this.userAddress,
                    userCity: this.userCity,
                    userState : this.userState,
                    postal_code : this.postal_code,
                    sourInfo : this.sourInfo
                    //Country:this.Country,
                    //CountryOfOrigin:this.CountryOfOrigin,
               }

                if(this.Condition != true){
                     this.alertflag=1
                }else{
                    this.loading = true;
                    this.alertflag=0
                    this.api.RegisterValues(register_data)
                            .subscribe(
                                (data: any) => {
                                if(data['status'] == 200){
                                   // this.supportapi.registerUser(this.userEmail,this.userPassword,this.userPassword,this.userName,this.userEmail).subscribe( anydata => {
                                        this.user_id=data['data'];
                                        this.loading = false;
                                        this.messagealertflag = 0;
                                        this.ref.close();
                                        this.dialogService.open(RegisteredComponent, {
                                        closeOnBackdropClick : false,
                                        context: {
                                        email: this.userEmail,
                                        password:this.userPassword,
                                        userCountryCode: this.userCountryCode,
                                        userContactNo : this.userContactNo,
                                        user_id  : this.user_id
                                        },
                                    });
                                   // });
                                }else if(data['status'] == 400){
                                    this.messagealertflag = 1;                               

                                }else{

                                }       
                                     err => console.error(err)
                        });
                    }
            }

            onClose() {
                this.messagealertflag = 0;
              }
            close(){
                this.ref.close();
              }
        }