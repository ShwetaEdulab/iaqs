import { Component , OnInit , ViewChild } from '@angular/core';
import { Router , ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../shared/api.service';
import { CountriesService } from '../../../@core/data/countries.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDateService , NbDialogService, NbStepperComponent } from '@nebular/theme';
import { NbAuthService, } from '@nebular/auth';
import { UserService } from '../../../@core/data/users.service';
import { saveAs } from 'file-saver';
import { Secondpaymentdialog } from './dialog/Secondpaymentdialog';
import { Thirdpaymentdialog } from './dialog/Thirdpaymentdialog';
import { uploadreceiptdialog } from './dialog/uploadreceiptdialog';
import { uploadthirdreceiptdialog } from './dialog/uploadthirdreceiptdialog';
import { config } from '../../../../../config';
import { HeaderComponent } from '../../../@theme/components/header/header.component';
import {ConfirmationService} from 'primeng/api';
import { SocketService } from '../../../shared/socket.service';


@Component({
  selector: 'applicationsteps',
  styleUrls: ['./applicationsteps.component.scss'],
  templateUrl: './applicationsteps.component.html',
  providers:[HeaderComponent,ConfirmationService],
})
export class ApplicationStepsComponent implements OnInit {
  @ViewChild('stepper') stepper: NbStepperComponent;
  serverUrl = config.serverUrl;
  Countries: any [];
  applicationId;
  id : any;
  courseID;
  country_birth;
  OnlineEntranceForm : FormGroup;
  PersonalInterviewForm : FormGroup;
  MarksForm : FormGroup;
  CoursePayForm : FormGroup;
  min: Date;
  max: Date;
  OnlinePersonaldetails: any;
  tabcheck1;
  tabcheck2;
  tabcheck3;
  tabcheck4;
  Marksdetails: any;
  loading = false;
  alertflag = 0;
  message;
  application_status_value;
  user_data: any;
  amount: any;
  course_name: any;
  upload_location;
  amountpay: any;
  user_id: any;
  specialization;
  accept_value: any;

  constructor(private router: Router,
    private route: ActivatedRoute,
    protected api : ApiService,
    protected countries :CountriesService,
    private formBuilder: FormBuilder,
    protected dateService: NbDateService<Date>,
    private authService: NbAuthService,
    private userService: UserService,
    private dialogService: NbDialogService,
    private comp: HeaderComponent,
    private confirmationService: ConfirmationService,
    private socket : SocketService,
  ) {
    this.min = this.dateService.today();
    this.max = this.dateService.today();
  }

  ngOnInit() {
    if(parseInt(this.route.snapshot.queryParamMap.get('selectedIndex')) == 0 || parseInt(this.route.snapshot.queryParamMap.get('selectedIndex')) == 2 || parseInt(this.route.snapshot.queryParamMap.get('selectedIndex')) == 3 || parseInt(this.route.snapshot.queryParamMap.get('selectedIndex')) == 4){
      this.stepper.selectedIndex = parseInt(this.route.snapshot.queryParamMap.get('selectedIndex'));
    }else{
      this.stepper.selectedIndex = 0;
    }
    this.api.getTheme();
    this.Countries = this.countries.getData();
    this.applicationId = this.route.snapshot.queryParamMap.get('appId');
    this.courseID = this.route.snapshot.queryParamMap.get('courseID');
    this.userService.onUserChange()
    .subscribe(
      (user: any) => {
        this.id = user['id'];
        this.country_birth = user['country_birth'];
    });
    this.OnlinePersonalTest();
    this.marksDetail();
    this.secondpayment();
    var checkTabs = this.api.myApplicationCheckTabs(this.applicationId)
    .subscribe(
    (data: any) => {
      this.tabcheck1 = data.data.tab1;
			this.tabcheck2 = data.data.tab2;
      this.tabcheck3 = data.data.tab3;
      this.tabcheck4 = data.data.tab4;
      if(data.data.tab1 == false){
				setTimeout(()=>{
					this.checktabs(0,this.tabcheck1,this.tabcheck2,this.tabcheck3,this.tabcheck4);
				  },1500);
			}else if(data.data.tab2 == false){
				setTimeout(()=>{
					this.checktabs(1,this.tabcheck1,this.tabcheck2,this.tabcheck3,this.tabcheck4);
				  },1500);
			}else if(data.data.tab3 == false){
				setTimeout(()=>{
					this.checktabs(2,this.tabcheck1,this.tabcheck2,this.tabcheck3,this.tabcheck4);
				  },1500);
      }else if(data.data.tab4 == false){
        setTimeout(()=>{
					this.checktabs(3,this.tabcheck1,this.tabcheck2,this.tabcheck3,this.tabcheck4);
				  },1500);
      }
    });
  }

  private OnlinePersonalTest() : void{
    this.OnlineEntranceForm = this.formBuilder.group({
      testDateCtrl : ['', Validators.required],
      testTimeCtrl : ['', Validators.required],
      PersonalExamCtrl : ['', Validators.required],
    });
    this.PersonalInterviewForm = this.formBuilder.group({
      interviewDateCtrl : ['', Validators.required],
      interviewTimeCtrl : ['', Validators.required],
      MarksExamCtrl : ['', Validators.required],
    });
    this.CoursePayForm = this.formBuilder.group({
      examStatusCtrl : ['', Validators.required],
      stuNameCtrl : ['', Validators.required],
      stuAddCtrl: ['', Validators.required],
      stuCityCtrl: ['', Validators.required],
      stuStateCtrl: ['', Validators.required],
      stuZipCtrl: ['', Validators.required],
      stuTelCtrl: ['', Validators.required],
      stuEmailCtrl: ['', Validators.required],
      stuAmountCtrl: ['', Validators.required],
    });
    this.api.getenrollmentdetails('onlinedetail',this.route.snapshot.queryParamMap.get('appId'))
    .subscribe(
      (data: any) => {
        this.OnlinePersonaldetails = data['data'];
        this.specialization = data['data']['specialization'];
        if(this.OnlinePersonaldetails.application_status=="accept"){
          this.application_status_value = this.OnlinePersonaldetails.application_status;
          this.accept_value = this.OnlinePersonaldetails.application_status;
        }else if(this.OnlinePersonaldetails.application_status=="reject"){
          this.application_status_value = this.OnlinePersonaldetails.application_status;
        }else{
          this.application_status_value = null;
        }
      },
      error => {
        console.error("Error", error);
      }
    );
  }

  private marksDetail() : void{
    this.MarksForm = this.formBuilder.group({
      totalMarksCtrl : ['', Validators.required],
      examStatusInMarkCtrl: ['', Validators.required],
    });
    this.api.getenrollmentdetails('marksdetail',this.route.snapshot.queryParamMap.get('appId'))
    .subscribe(
      (data: any) => {
        this.Marksdetails = data['data'];
      },
      error => {
        console.error("Error", error);
      }
    );
  }

  private secondpayment(){
    this.api.getenrollmentdetails('second_payment',this.route.snapshot.queryParamMap.get('appId'))
      .subscribe(
        (data: any) => {  
          this.user_data =  data['data']['user'];
          this.amount = data['data']['fees'];
          this.course_name = data['data']['specialization'];
          this.upload_location = data['data']['upload_challan_location'];
          this.amountpay = data['data']['amountpay'];
          err => console.log(err)
      });
  }

  async paysecondpayment(){
    this.applicationId = this.route.snapshot.queryParamMap.get('appId');
    this.courseID = this.route.snapshot.queryParamMap.get('courseID');
    this.confirmationService.confirm({
      message: 'Are You Sure to want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      rejectVisible:false,
      acceptLabel :'OK',
      accept: () => {
        this.api.secondpaymentrequest(this.applicationId,this.courseID)
        .subscribe(
          data => {
            this.secondpayment();
          },
          error => {
            console.log("Error", error);
          }
        ); 
      },
      reject: () => {
        //this.ngOnInit();
      }
    })
  }
  

  examresult(result){
    if(result=='Pass'){
      this.dialogService.open(Secondpaymentdialog, {
        context: {
        title: 'This is a title passed to the dialog component',
        },
      }).onClose
      .subscribe(
        (data: any) => {
          err => console.error(err)
        })
    }else if(result=='Fail'){
      this.alertflag = 1;
      this.message = "You have not cleared the examination. You could re-apply for the online entrance test and give one more shot!";
    }else if(result=='new'){
      this.alertflag = 1;
      this.message = "Your Application is under process.";
    }else{
      this.alertflag = 1;
      this.message = "There is something went wrong.";
    }
  }

  onClose(){		  		
    this.alertflag = 0;		
  }

  public checktabs(tab_index,tab1,tab2,tab3,tab4){
    if(this.OnlinePersonaldetails.online_test_date!='' && this.OnlinePersonaldetails.online_test_time!=''){
			this.tabcheck1 = true;
		}else{
			this.tabcheck1 = false;
		}

		if(this.OnlinePersonaldetails.pi_test_date!='' && this.OnlinePersonaldetails.pi_test_time!=''){
			this.tabcheck2 = true;
		}else{
			this.tabcheck2 = false;
    }
    
		if(this.Marksdetails.total_marks!=''){
			this.tabcheck3 = true;
		}else{
			this.tabcheck3 = false;
    }

    if(tab4){
      this.tabcheck4 = true;
		}else{
			this.tabcheck4 = false;
    }
    
     if(tab_index == 0){
       if(tab_index<1){
         this.stepper.selectedIndex = tab_index;
       }else{
         if(tab1 == false){
           this.stepper.selectedIndex = 0;
         } else {
           this.stepper.selectedIndex = tab_index;
         }
       }	
     }else if(tab_index == 1){
       if(tab_index<2){
          if(tab1 == false){
            this.stepper.selectedIndex = 0;
          }else if(tab2 == false){
            this.stepper.selectedIndex = 0;
          }
       }else{
         if(tab2 == false){
           this.stepper.selectedIndex = 0;
         }else if(tab3 == false){
           this.stepper.selectedIndex = 1;
         }
       }	
     }else if(tab_index == 2){
       if(tab_index<3){
         if(tab1 == false){
           this.stepper.selectedIndex = 0;
         }else if(tab2 == false){
           this.stepper.selectedIndex = 0;
         }else if(tab3 == false) {
           this.stepper.selectedIndex = 1;
         }
       }else{
         if(tab2 == false){
           this.stepper.selectedIndex = 0;
         }else if(tab3 == false){
           this.stepper.selectedIndex = 1;
         }
       }	
     }else if(tab_index == 3){
      if(tab_index<4){
        if(tab1 == false){
          this.stepper.selectedIndex = 0;
        }else if(tab2 == false){
          this.stepper.selectedIndex = 0;
        }else if(tab3 == false) {
          this.stepper.selectedIndex = 1;
        }else if(tab4 == false && (this.application_status_value=='reject' || this.application_status_value=='new' || this.application_status_value=='' || this.application_status_value==null)){
          this.stepper.selectedIndex = 2;
        }else if(tab4 == false && this.application_status_value=='accept'){
          this.stepper.selectedIndex = 3;
        }
      }else{
        if(tab2 == false){
          this.stepper.selectedIndex = 0;
        }else if(tab3 == false){
          this.stepper.selectedIndex = 1;
        }else if(tab4 == false && (this.application_status_value=='reject' || this.application_status_value=='new' || this.application_status_value=='' || this.application_status_value==null)){
          this.stepper.selectedIndex = 2;
        }else if(tab4 == false && this.application_status_value=='accept'){
          this.stepper.selectedIndex = 3;
        }
      }	
    }
  }

  uploadsecondpaymentreceipt(){
    this.dialogService.open(uploadreceiptdialog, {
        closeOnBackdropClick : false,
        context: {
        title: 'This is a title passed to the dialog component',
        },
    }).onClose
    .subscribe(
      (data: any) => {
        this.secondpayment();
        err => console.error(err)
      })
   }

   reapply(appId,courseID){
     this.confirmationService.confirm({
      message: 'Are You Sure to want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      rejectVisible:false,
      acceptLabel :'OK',
      accept: () => {
        this.api.find_intake(courseID).subscribe(data => {
          var profileCompleteness = data['data'];
          if(data['status'] == 200){
            if(profileCompleteness == 100){
              this.api.getDegree(courseID).subscribe(data =>{
                if(data['status'] ==200){
                  this.api.addtoCart(courseID).subscribe(
                    data => {
                      this.user_id = data['data']['user_id'];
                      this.socket.getCartvalue(this.user_id);
                      this.router.navigateByUrl('/pages/cart');
                    },
                    error => {
                      console.log("Error", error);
                    }
                  ); 
                }else{
                  this.router.navigate(['pages/profile'],{queryParams:{courseId:courseID}});
                }
              })
            }else{
              this.router.navigate(['pages/profile'],{queryParams:{courseId:courseID}});
            }
          }else if(data['status'] ==300){
            this.alertflag = 1;
            this.message = "You have already applied for this course!!!!";
          }else if(data['status'] ==400){
            this.alertflag = 1;
            this.message = "Seats are not available  for " +this.specialization+". Kindly apply to another course!!!!!!";
          }else if(data['status'] == 301){
            this.alertflag = 1;
            this.message = "This course is already in Cart. If you want to apply this course then go to cart and make the payment.";
          }
          error => {
              console.error("Error in cart :", error);
          }
        });
      },
      reject: () => {
        //this.ngOnInit();
      }
    })
   }
}