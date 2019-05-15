
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../@core/data/users.service';
import { ApiService } from '../../shared/api.service';
import { HeaderComponent } from '../../@theme/components/header/header.component';
import { NbDateService , NbDialogService, NbStepperComponent } from '@nebular/theme';
import { OnlineTestPaymentdialog } from '../../pages/application/applicationsteps/dialog/onlinetestpaymentdialog';

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

  constructor(
    private router : Router,
    private apiservice : ApiService,
    private userService: UserService,
    private comp: HeaderComponent,
    private dialogService: NbDialogService,
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
          }
          
      },
      error => {
          console.error("Error in wishlist :", error);
      });
  }

  loadsteps(applicationID,courseID,paymentDetails){
    if(paymentDetails==false){
      this.dialogService.open(OnlineTestPaymentdialog, {
        closeOnBackdropClick : false,
        context: {
          title: 'This is a title passed to the dialog component',
          applicationID : applicationID,
          courseID : courseID,
          amount : '1000',
          order_id : '1'
        },
      }).onClose
      .subscribe(
        (data: any) => {
          this.ngOnInit();
          err => console.error(err)
      })
    }else{
      this.router.navigate(['/pages/application/process'],{queryParams:{appId:applicationID,courseID:courseID}})
    }
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
  

}