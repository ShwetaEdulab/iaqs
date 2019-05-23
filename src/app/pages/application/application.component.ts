
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../@core/data/users.service';
import { ApiService } from '../../shared/api.service';
import { HeaderComponent } from '../../@theme/components/header/header.component';
import { NbDateService , NbDialogService, NbStepperComponent } from '@nebular/theme';
import { NbAuthService, NbAuthJWTToken } from '@nebular/auth';
import { OnlineTestPaymentdialog } from '../../pages/application/applicationsteps/dialog/onlinetestpaymentdialog';
import { Applydialog } from '../../pages/application/applicationsteps/dialog/applydialog';
import { config } from '../../../../config';
import {ConfirmationService} from 'primeng/api';
import {
	FormGroup,FormBuilder,Validators,
} from '@angular/forms';

@Component({
  selector: 'application',
  styleUrls: ['./application.component.scss'],
  templateUrl: './application.component.html',
  providers:[HeaderComponent,ConfirmationService],
})
export class ApplicationComponent  {
  id : any;
  status;
  applications = [] ;
  applicationID;
  courseID;
  alertflag = 0;
  paymentDetails: any;
  Dropdownvar: any;
  currenttoken: NbAuthJWTToken;
  uploaderror = false;
  uploaderror1 = false;
  serverUrl = config.serverUrl;
  Userdata: any;
  testradio;
  showupload = false;
  showbutton = false;
  isDisabled = false;
  qatForm: FormGroup;
  applicationdata: any;

  constructor(
    private router : Router,
    private apiservice : ApiService,
    private userService: UserService,
    private comp: HeaderComponent,
    private dialogService: NbDialogService,
    private authService: NbAuthService,
    private confirmationService: ConfirmationService,
    private fb: FormBuilder,
  ) {

  }
  async ngOnInit() {
    this.apiservice.getTheme();
    this.userService.onUserChange()
    .subscribe(
      (user: any) => {
        this.id = user['id'];
      });

      this.qatForm = this.fb.group({
        qatGivenCtrl: ['', [Validators.required]],
      });

      var getQatData = await  this.apiservice.getQatdata(this.id);
      getQatData.subscribe(
        data => {
          this.status = data['status'];
          if(this.status == '400'){
          }else if(this.status == '200'){
            this.Userdata = data['data']['User'];
            this.applicationdata = data['data'];
            if(this.Userdata.acturial_test == null){
              //this.testradio = null ;
              this.qatForm.patchValue({ 
								qatGivenCtrl: null
							});
            }else if(this.Userdata.acturial_test == 'true' && this.Userdata.acturial_document == null){
              this.isDisabled = true;
              //this.testradio = this.Userdata.acturial_test ;
              this.showupload = true;
              this.qatForm.patchValue({ 
								qatGivenCtrl: this.Userdata.acturial_test
							});
            }else if(this.Userdata.acturial_test == 'true' && this.Userdata.acturial_document != null){
              this.isDisabled = true;
              //this.testradio = this.Userdata.acturial_test ;
              this.qatForm.patchValue({ 
								qatGivenCtrl: this.Userdata.acturial_test
							});
            }else if(this.Userdata.acturial_test == 'false'){
              this.isDisabled = true;
              //this.testradio = this.Userdata.acturial_test ;
              this.qatForm.patchValue({ 
								qatGivenCtrl: this.Userdata.acturial_test
							});
            }
          }
          
      },
      error => {
          console.error("Error in wishlist :", error);
      });



      // var getMyApplicationrsp = await  this.apiservice.getMyApplication(this.id);
      // getMyApplicationrsp.subscribe(
      //   data => {
      //     this.status = data['status'];
      //     if(this.status == '400'){
      //     }else if(this.status == '200'){
      //       this.applications =  data['data']['userApplications'];
      //       this.paymentDetails = data['data']['onlineTestPayment'];
      //       this.applicationID = this.applications[0]['application']['id'];
      //       this.courseID = this.applications[0]['application']['course_id'];
      //       this.Userdata = data['data']['User'];
      //       console.log("this.Userdata.acturial_test======>"+this.Userdata.acturial_test)
      //       if(this.Userdata.acturial_test == null){
      //         this.testradio = null ;
      //       }else if(this.Userdata.acturial_test == 'true' && this.applications[0].application.acturial_document==null){
      //         this.testradio = this.Userdata.acturial_test ;
      //         this.showupload = true;
      //       }else{
      //         this.testradio = this.Userdata.acturial_test ;
      //         this.showbutton = true;
      //       }
      //     }
          
      // },
      // error => {
      //     console.error("Error in wishlist :", error);
      // });
  }

  loadsteps(applicationID,courseID){
    // if(paymentDetails==false){
    //   this.dialogService.open(OnlineTestPaymentdialog, {
    //     closeOnBackdropClick : false,
    //     context: {
    //       title: 'This is a title passed to the dialog component',
    //       applicationID : applicationID,
    //       courseID : courseID,
    //       amount : '1000',
    //       order_id : '1'
    //     },
    //   }).onClose
    //   .subscribe(
    //     (data: any) => {
    //       this.ngOnInit();
    //       err => console.error(err)
    //   })
    // }else{

      this.router.navigate(['/pages/application/process'],{queryParams:{appId:applicationID,courseID:courseID}})
    //}
  }

  showalert(){
    this.alertflag = 1;
  }
  openReject(){
    this.alertflag = 2;
  }
  showalert3(){
    this.alertflag = 3;
  }
  onClose(){		  		
    this.alertflag = 0;		
  }

  checkradio(x) {
    var datavalue;
    this.Dropdownvar = x;
    this.confirmationService.confirm({
      message: 'Are You Sure to want to proceed? Once you select one of the option below you cant change in future.',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      rejectVisible:false,
      acceptLabel :'OK',
      accept: () => {
        var saveacturialtest = this.apiservice.saveacturial(this.Dropdownvar);
        saveacturialtest.subscribe(
          data => {
            this.status = data['status'];
            if(this.status == '400'){
            }else if(this.status == '200'){
              this.ngOnInit();
              // if(this.Dropdownvar == "true"){
              //   this.showupload = true;
              //   this.showbutton = true;
              // }else if(this.Dropdownvar == "false"){
              //   this.showbutton = true;
              // } 
            }
        },
        error => {
            console.error("Error in wishlist :", error);
        });
      },
      reject: () => {
        this.qatForm.controls['qatGivenCtrl'].reset();
        this.ngOnInit();
      }
    })


    
    
    
  }

  onBeforeSend(event) {
    this.authService.onTokenChange().subscribe((token: NbAuthJWTToken) => {
      if (token.isValid()) {
       this.currenttoken = token;
        event.xhr.setRequestHeader("Authorization", `Bearer ` +this.currenttoken);
        event.formData.append('token',''+this.currenttoken);
        }
    });
  }

  onUpload(event) {
    const reader = new FileReader();
    if(event.files && event.files.length) {
      const [file] = event.files;
      reader.readAsDataURL(file);
      this.ngOnInit();
    }

  }

  selectedFile: File;

  onSelect($event: any): void {
    var maxFileSize =  2000000;
    var imgArr = $event.files[0].name.split('.');
    var extension = imgArr[imgArr.length - 1].trim();
    
    if(extension!='jpg' && extension!='jpeg' && extension!='png' && extension!='pdf'){
      this.uploaderror1 = true;
    }
    
    if ($event.files[0].size > maxFileSize) {
      this.uploaderror = true;
    }
  }

  applyToQat(appId,course_id){
    if(appId == null || course_id == null){
      this.dialogService.open(Applydialog, {
        closeOnBackdropClick : false,
        context: {
          title: 'This is a title passed to the dialog component',
        },
      }).onClose
      .subscribe(
        (data: any) => {
          this.ngOnInit();
          err => console.error(err)
      })
    }else{
      this.router.navigate(['/pages/application/process'],{queryParams:{appId:appId,courseID:course_id}})
    }
  }
  

}