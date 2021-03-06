import { Component , OnInit , ViewChild } from '@angular/core';
import { Router , ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../shared/api.service';
import { CountriesService } from '../../../@core/data/countries.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDateService , NbDialogService, NbStepperComponent } from '@nebular/theme';
import { NbAuthService, NbAuthJWTToken } from '@nebular/auth';
import { UserService } from '../../../@core/data/users.service';
import { saveAs } from 'file-saver';
import { OnlineTestPaymentdialog } from './dialog/onlinetestpaymentdialog';
import { Secondpaymentdialog } from './dialog/Secondpaymentdialog';
import { Thirdpaymentdialog } from './dialog/Thirdpaymentdialog';
import { uploadreceiptdialog } from './dialog/uploadreceiptdialog';
import { uploadthirdreceiptdialog } from './dialog/uploadthirdreceiptdialog';
import { config } from '../../../../../config';
import { HeaderComponent } from '../../../@theme/components/header/header.component';
import {ConfirmationService} from 'primeng/api';
import { SocketService } from '../../../shared/socket.service';
import { Applydialog } from '../../../pages/application/applicationsteps/dialog/applydialog';


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
  reservedSeatForm : FormGroup;
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
  tabcheck5;
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
  personalFee: any;
  pi_test_date: any;
  onlineTestPayment: any;
  examgiven: any;
  acturial_document_verify: any;
  onlinectrlval: any;
  profilecomplete: any;
  total_marks: any;
  examdates: any;
  date_exam: any;
  showerror = false;
  userId;
  UserData: any;

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
    this.authService.onTokenChange()
      .subscribe((token: NbAuthJWTToken) => {
      this.userId = token.getPayload()['id'];
    });
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
      this.tabcheck5 = data.data.tab5;
      if(data.data.tab1 == false){
				setTimeout(()=>{
					this.checktabs(0,this.tabcheck1,this.tabcheck2,this.tabcheck3,this.tabcheck4,this.tabcheck5);
				  },1500);
			}else if(data.data.tab2 == false){
				setTimeout(()=>{
					this.checktabs(1,this.tabcheck1,this.tabcheck2,this.tabcheck3,this.tabcheck4,this.tabcheck5);
				  },1500);
			}else if(data.data.tab3 == false){
				setTimeout(()=>{
					this.checktabs(2,this.tabcheck1,this.tabcheck2,this.tabcheck3,this.tabcheck4,this.tabcheck5);
				  },1500);
      }else if(data.data.tab4 == false){
        setTimeout(()=>{
					this.checktabs(3,this.tabcheck1,this.tabcheck2,this.tabcheck3,this.tabcheck4,this.tabcheck5);
				  },1500);
      }else if(data.data.tab5 == false){
        setTimeout(()=>{
					this.checktabs(4,this.tabcheck1,this.tabcheck2,this.tabcheck3,this.tabcheck4,this.tabcheck5);
				  },1500);
      }
    });
  }

  private OnlinePersonalTest() : void{
    this.OnlineEntranceForm = this.formBuilder.group({
      testDateCtrl : ['', Validators.required],
      testTimeCtrl : ['', Validators.required],
      onlinepaymentCtrl : ['', Validators.required],
      
    });
    this.reservedSeatForm = this.formBuilder.group({
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
    this.api.getSaturday()
    .subscribe(
      (data: any) => {
        this.examdates = data['data'];
      },
      error => {
        console.error("Error", error);
      }
    
    )

    this.api.getenrollmentdetails('onlinedetail',this.route.snapshot.queryParamMap.get('appId'))
    .subscribe(
      (data: any) => {
        this.OnlinePersonaldetails = data['data'];
        console.log("JSON.stringify()======>"+JSON.stringify(this.OnlinePersonaldetails));
        this.UserData = data['data']['UserData'];
        if(data['data']['onlineTestPayment'] == true){
          this.onlinectrlval = data['data']['onlineTestPayment']
        }else{
          this.onlinectrlval = null;
        }
        if(this.OnlinePersonaldetails.UserData.profile_completeness == '100'){
          this.profilecomplete = this.OnlinePersonaldetails.UserData.profile_completeness;
        }else{
          this.profilecomplete = '';
        }
        this.onlineTestPayment = data['data']['onlineTestPayment'];
        this.examgiven = data['data']['examgiven'];
        this.acturial_document_verify = data['data']['acturial_document_verify'];
        this.personalFee = data['data']['second_payment'];
        this.pi_test_date = data['data']['pi_test_date'];
        this.specialization = data['data']['specialization'];
        if(this.examgiven == true && this.acturial_document_verify == 'true'){
          this.OnlineEntranceForm.controls['testDateCtrl'].setValidators([]); 
          this.OnlineEntranceForm.controls['testDateCtrl'].updateValueAndValidity(); 
          this.OnlineEntranceForm.controls['testTimeCtrl'].setValidators([]); 
          this.OnlineEntranceForm.controls['testTimeCtrl'].updateValueAndValidity();
          this.OnlineEntranceForm.controls['onlinepaymentCtrl'].setValidators([]); 
          this.OnlineEntranceForm.controls['onlinepaymentCtrl'].updateValueAndValidity();
        }
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
      profileCtrl: ['', Validators.required],
    });
    this.api.getenrollmentdetails('marksdetail',this.route.snapshot.queryParamMap.get('appId'))
    .subscribe(
      (data: any) => {
        this.Marksdetails = data['data'];
        if(this.Marksdetails.total_marks=='' || this.Marksdetails.total_marks==null || this.Marksdetails.total_marks==undefined){
          //this.total_marks = null;
        }else{
          this.total_marks = this.Marksdetails.total_marks;
        }
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
          //this.amount = data['data']['fees'];
          if(this.personalFee == true){
            this.amount = '1,80,000';
          }else if(this.personalFee == false){
            this.amount = '2,00,000';
          }
          this.course_name = data['data']['specialization'];
          this.upload_location = data['data']['upload_challan_location'];
          this.amountpay = data['data']['amountpay'];
          err => console.log(err)
      });
  }

  async paythirdpayment(){
    this.applicationId = this.route.snapshot.queryParamMap.get('appId');
    this.courseID = this.route.snapshot.queryParamMap.get('courseID');
    var amount_value;
    if(this.personalFee == true){
      amount_value = '1,80,000';
    }else if(this.personalFee == false){
      amount_value = '2,00,000';
    }
    this.confirmationService.confirm({
      message: 'Are You Sure to want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      rejectVisible:false,
      acceptLabel :'OK',
      accept: () => {
        this.dialogService.open(Thirdpaymentdialog, {
          closeOnBackdropClick : false,
          context: {
            title: 'This is a title passed to the dialog component',
            applicationID : this.applicationId,
            courseID : this.courseID,
            amount : amount_value,
            order_id : '3'
          },
        }).onClose
        .subscribe(
          (data: any) => {
            err => console.error(err)
          }
        ) 
      },
      reject: () => {
      }
    })
  }

  examresult(result){
    if(result=='Pass'){
      
    }else if(result=='Fail'){
      this.dialogService.open(Applydialog, {
        closeOnBackdropClick : false,
        context: {
          title: 'This is a title passed to the dialog component',
        },
      }).onClose
      .subscribe(
        (data: any) => {
          //this.ngOnInit();
          this.router.navigate(['/pages/application'])
          err => console.error(err)
      })
      //this.alertflag = 1;
      //this.message = "You have not cleared the examination. You could re-apply for the online entrance test and give one more shot!";
    }else if(result=='new'){
      //this.alertflag = 1;
     // this.message = "Your Application is under process.";
    }else{
      //this.alertflag = 1;
      //this.message = "There is something went wrong.";
    }
  }

  onClose(){		  		
    this.alertflag = 0;		
  }

  public checktabs(tab_index,tab1,tab2,tab3,tab4,tab5){
    if(tab1){
			this.tabcheck1 = true;
		}else{
			this.tabcheck1 = false;
    }

    if(tab2){
			this.tabcheck2 = true;
		}else{
			this.tabcheck2 = false;
		}

		if(tab3){
			this.tabcheck3 = true;
		}else{
			this.tabcheck3 = false;
    }
    
		if(tab4){
			this.tabcheck4 = true;
		}else{
			this.tabcheck4 = false;
    }

    if(tab5){
      this.tabcheck5 = true;
		}else{
			this.tabcheck5 = false;
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
            this.stepper.selectedIndex = 1;
          }else{
            this.stepper.selectedIndex = tab_index;
          }
        }else{
          if(tab1 == false){
            this.stepper.selectedIndex = 0;
          }else if(tab2 == false){
            this.stepper.selectedIndex = 1;
          }else {
            this.stepper.selectedIndex = tab_index;
          }
        }	
      }else if(tab_index == 2){
       if(tab_index<3){
          if(tab1 == false){
            this.stepper.selectedIndex = 0;
          }else if(tab2 == false){
            this.stepper.selectedIndex = 1;
          }else if(tab3 == false){
            this.stepper.selectedIndex = 2;
          }else {
            this.stepper.selectedIndex = tab_index;
          }
       }else{
          if(tab1 == false){
           this.stepper.selectedIndex = 0;
          }else if(tab2 == false){
           this.stepper.selectedIndex = 1;
         }else if(tab3 == false){
           this.stepper.selectedIndex = 2;
         }else {
          this.stepper.selectedIndex = tab_index;
        }
       }	
     }else if(tab_index == 3){
       if(tab_index<4){
         if(tab1 == false){
           this.stepper.selectedIndex = 0;
         }else if(tab2 == false){
           this.stepper.selectedIndex = 1;
         }else if(tab3 == false) {
           this.stepper.selectedIndex = 2;
         }else {
          this.stepper.selectedIndex = tab_index;
        }
       }else{
        if(tab1 == false){
          this.stepper.selectedIndex = 0;
        }else if(tab2 == false){
           this.stepper.selectedIndex = 1;
         }else if(tab3 == false){
           this.stepper.selectedIndex = 2;
         }else {
          this.stepper.selectedIndex = tab_index;
        }
       }	
     }else if(tab_index == 4){
      if(tab_index<5){
        if(tab1 == false){
          this.stepper.selectedIndex = 0;
        }else if(tab2 == false){
          this.stepper.selectedIndex = 1;
        }else if(tab3 == false) {
          this.stepper.selectedIndex = 2;
        }else if(tab4 == false){
          this.stepper.selectedIndex = 3;
        }else {
          this.stepper.selectedIndex = tab_index;
        }
      }else{
        if(tab1 == false){
          this.stepper.selectedIndex = 0;
        }else if(tab2 == false){
          this.stepper.selectedIndex = 1;
        }else if(tab3 == false){
          this.stepper.selectedIndex = 2;
        }else if(tab4 == false){
          this.stepper.selectedIndex = 3;
        }else {
          this.stepper.selectedIndex = tab_index;
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

  onlineexamfee(){
    this.dialogService.open(OnlineTestPaymentdialog, {
      closeOnBackdropClick : false,
        context: {
          title: 'This is a title passed to the dialog component',
          applicationID : this.applicationId,
          courseID : this.courseID,
          amount : '1000',
          order_id : '1'
        },
      }).onClose
      .subscribe(
        (data: any) => {
          //this.ngOnInit();
          err => console.error(err)
      })
  }


  proceedforpayment(){
    this.dialogService.open(Secondpaymentdialog, {
      closeOnBackdropClick : false,
      context: {
        title: 'This is a title passed to the dialog component',
        applicationID : this.applicationId,
        courseID : this.courseID,
        amount : '20000',
        order_id : '2'
      },
    }).onClose
    .subscribe(
      (data: any) => {
        this.pi_test_date = "";
        err => console.error(err)
      })
  }

  redirectProfile(applicationID,courseID){
    this.api.getDegree(this.courseID).subscribe(data =>{
      this.router.navigate(['pages/profile'],{queryParams:{courseId:courseID,applicationID:applicationID,degree:data['data']}})
    })
  }

  checkradio(x){
    this.date_exam = x;
  }

  saveexamdate(){
    if(this.date_exam == undefined){
      this.showerror = true;
    }else{
      this.confirmationService.confirm({
        message: 'Are You Sure to want to proceed?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        rejectVisible:false,
        acceptLabel :'OK',
        accept: () => {
          this.api.saveExamdate(this.date_exam,this.applicationId,this.courseID).subscribe(data => {
            if(data['status'] == 200){
              this.ngOnInit();
            }else if(data['status'] ==400){
            }
            error => {
                console.error("Error in saveexamdate :", error);
            }
          });
        },
        reject: () => {
          //this.ngOnInit();
        }
      })
    }
  }

  examStart(){
    this.confirmationService.confirm({
      message: 'Are You Sure to want to start the test now?  (Note: You are only eligible to appear for the test once.)',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      rejectVisible:false,
      acceptLabel :'OK',
      accept: () => {
        this.api.examStart(this.applicationId,this.courseID).subscribe(data => {
          if(data['status'] == 200){
            window.open("https://tests.mettl.com/authenticateKey/163b59e4", "_blank");
            this.ngOnInit();
          }else if(data['status'] ==400){
            alert("Please try again!")
          }
          error => {
              console.error("Error in saveexamdate :", error);
          }
        });
      },
      reject: () => {
        //this.ngOnInit();
      }
    })
  }

  next(){
    const invalid = [];
    const controls = this.OnlineEntranceForm.controls;
    for (const name in controls) {
        if (controls[name].invalid) {
            invalid.push(name);
        }
        console.log("invalid=="+invalid);
    }
  }
}