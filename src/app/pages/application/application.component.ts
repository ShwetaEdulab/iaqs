
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../@core/data/users.service';
import { ApiService } from '../../shared/api.service';
import { HeaderComponent } from '../../@theme/components/header/header.component';
import { NbDateService , NbDialogService, NbStepperComponent } from '@nebular/theme';
import { NbAuthService, NbAuthJWTToken } from '@nebular/auth';
import { OnlineTestPaymentdialog } from '../../pages/application/applicationsteps/dialog/onlinetestpaymentdialog';
import { config } from '../../../../config';

@Component({
  selector: 'application',
  styleUrls: ['./application.component.scss'],
  templateUrl: './application.component.html',
  providers:[HeaderComponent],
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

  constructor(
    private router : Router,
    private apiservice : ApiService,
    private userService: UserService,
    private comp: HeaderComponent,
    private dialogService: NbDialogService,
    private authService: NbAuthService,
  ) {

  }
  async ngOnInit() {
    this.apiservice.getTheme();
    this.userService.onUserChange()
    .subscribe(
      (user: any) => {
        this.id = user['id'];
      });

      var getMyApplicationrsp = await  this.apiservice.getMyApplication(this.id);
      getMyApplicationrsp.subscribe(
        data => {
          this.status = data['status'];
          if(this.status == '400'){
          }else if(this.status == '200'){
            this.applications =  data['data']['userApplications'];
            this.paymentDetails = data['data']['onlineTestPayment'];
            this.applicationID = this.applications[0]['application']['id'];
            this.courseID = this.applications[0]['application']['course_id'];
            this.Userdata = data['data']['User'];
            if(this.Userdata.acturial_test == null){
              this.testradio = null ;
            }else if(this.Userdata.acturial_test == 'true' && this.applications[0].application.acturial_document==null){
              this.testradio = this.Userdata.acturial_test ;
              this.showupload = true;
            }else{
              this.testradio = this.Userdata.acturial_test ;
              this.showbutton = true;
            }
          }
          
      },
      error => {
          console.error("Error in wishlist :", error);
      });
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
    var saveacturialtest = this.apiservice.saveacturial(this.Dropdownvar);
      saveacturialtest.subscribe(
        data => {
          this.status = data['status'];
          if(this.status == '400'){
          }else if(this.status == '200'){
            if(this.Dropdownvar == "true"){
              this.showupload = true;
              this.showbutton = true;
            }else if(this.Dropdownvar == "false"){
              this.showbutton = true;
            } 
          }
      },
      error => {
          console.error("Error in wishlist :", error);
      });
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
     // var json = JSON.parse(event.xhr.response);
     // console.log("jsonjson========>"+json);
     // var yourData = json.Data; // or json["Data"]
      //var yourStatus = json.status; // or json["Data"]
      //var yourMessage = json.message; // or json["Data"]
      //if(yourStatus == 200){
        this.showupload = false;
        this.showbutton = true; 
      //}
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
  

}