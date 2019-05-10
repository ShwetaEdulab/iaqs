import {Component ,OnInit} from '@angular/core';
import { AdminApiService } from '../../shared/adminapi.service';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { NbDialogRef,NbDialogService } from '@nebular/theme';
import { EligibilityComponent } from './Eligibility.Component';
import {ConfirmationService} from 'primeng/api';
import { DatePipe } from '@angular/common';
import { NbAuthJWTToken,NbAuthService } from '@nebular/auth';

@Component({
  selector: 'application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.scss'],
  providers: [ConfirmationService]
})
export class AdminApplicationComponent {
  tab_type;
  application_data;
  p: number = 1;
  iccr_data: any;
  status;
  checked=false;
  color = 'accent';
  public filterText: string;
  public filterPlaceholder: string;
  public filterInput = new FormControl();
	unticked_data: any;
  mu_data: any;
  onlineTest;
  piTest: any;
  date = new Date();
  min: Date;
  max = new Date();
  showOne = false;
  showTwo = false;
  severOnlineTest: any;
  loading = false;
  serverOnlineTime: any;
  serverDateId: any;
  onlineTime: any;
  message: string;

  constructor( 
  private dialogService: NbDialogService,
	protected adminApi : AdminApiService,
  private router : Router,
  private confirmationService: ConfirmationService,
  private datePipe: DatePipe,
  private authService : NbAuthService,
) {
  this.authService.onTokenChange()
    .subscribe((token: NbAuthJWTToken) => {
      if(token.getPayload()['role'] !="admin"){
        this.router.navigate(['auth/logout'])
      }
    });
  }

  ngOnInit(){
    this.showOne = false;
    this.showTwo = false;
	  this.filterText = "";
    this.filterPlaceholder = "Search";
    this.adminApi.getApplication('new',2019).subscribe(data=>{
      this.application_data = data['data'];
      this.severOnlineTest = data['dates']['onlinetest'];
      this.serverOnlineTime = data['dates']['onlinetime'];
      this.serverDateId = data['dates']['onlinetestId'];
      //this.onlineTime = data['dates']['onlinetime'];
      
      if(data['dates']['onlinetest'] == null || data['dates']['onlinetest'] == '' || data['dates']['onlinetest'] == undefined){
        this.onlineTest = null;
      }else{
        this.onlineTest = new Date(data['dates']['onlinetest']);
      }

      if(data['dates']['onlinetime'] == null || data['dates']['onlinetime'] == '' || data['dates']['onlinetime'] == undefined){
        this.onlineTime = null;
      }else{
        var AnnouncementDate = new Date(data['dates']['onlinetime']);
        this.onlineTime = AnnouncementDate;
      }


    })
      this.filterInput
      .valueChanges
      .debounceTime(200)
      .subscribe(term => {
      this.filterText = term;
    });
  }
  
  getApplicationAccepted(e) {
    var index = e.index;
    if(index == 0){
      this.tab_type = 'new'
    }
    // else if(index == 1){
    //   this.tab_type = 'accept'
    // }else if(index == 2){
    //   this.tab_type = 'reject'
    // }
    else if(index == 1){
		this.tab_type = 'unticked',
		this.status = 'reject';
	  }
    if(this.tab_type === 'new' ||   this.tab_type ==='accept' ||  this.tab_type === 'reject'){
      this.showOne = false;
      this.adminApi.getApplication(this.tab_type,2019).subscribe(data=>{
        this.application_data = data['data'];
        this.severOnlineTest = data['dates']['onlinetest'];
        if(data['dates']['onlinetest'] == null || data['dates']['onlinetest'] == '' || data['dates']['onlinetest'] == undefined){
          this.onlineTest = null;
        }else{
          this.onlineTest = new Date(data['data']['onlinetest']);
        }

        if(data['dates']['onlinetime'] == null || data['dates']['onlinetime'] == '' || data['dates']['onlinetime'] == undefined){
          this.onlineTime = null;
        }else{
          var AnnouncementDate = new Date(data['dates']['onlinetime']);
          this.onlineTime = AnnouncementDate;
        }
  
        // if(data['dates']['pitest'] == null || data['dates']['pitest'] == '' || data['dates']['pitest'] == undefined){
        //   this.piTest = null;
        // }else{
        //   this.piTest =  new Date(data['dates']['pitest']);
        // }
      })
        this.filterInput
        .valueChanges
        .debounceTime(200)
        .subscribe(term => {
        this.filterText = term;
      });

    }else if(this.tab_type === 'iccr' || this.tab_type === 'iccr_accept' || this.tab_type === 'iccr_reject'){     
      this.adminApi.getIccrApplication(this.status).subscribe(data=>{
        this.iccr_data = data['data'];
      })
        this.filterInput
        .valueChanges
        .debounceTime(200)
        .subscribe(term => {
        this.filterText = term;
      });

    }else if(this.tab_type === 'unticked' ){     
		this.adminApi.getUntickedApplication(this.tab_type).subscribe(data=>{
		  this.unticked_data = data['data'];
		})
		  this.filterInput
		  .valueChanges
		  .debounceTime(200)
		  .subscribe(term => {
		  this.filterText = term;
		});
  
	  } 

  }

  viewMore(category,userId,courseId,tab,applicationId){
    this.router.navigate(['pages/adminView'],{queryParams:{category:category,userId : userId, courseId:courseId,tab:tab,applicationId:applicationId }});
  }

  sendToEligibility(e,id,course_id,user_id,checkEligiblity,enrollment_no){
    var data={
        id:id,
        user_id:user_id,
        course_id:course_id,
        value:e.checked
    }
    var Online_test_date = ((document.getElementById("inputDob") as HTMLInputElement).value);
    //var Online_test_time = ((document.getElementById("inputTime") as HTMLInputElement).value);
    var Online_test_time = this.onlineTime;
    if(Online_test_date=="" || Online_test_date==null || Online_test_date==undefined ){
      this.showOne = true;
      this.message = "Please Select Date";
      setTimeout(()=>{
        this.ngOnInit();
      },2500);
    }else if(this.severOnlineTest==null || this.severOnlineTest =="" || this.severOnlineTest ==undefined){
      this.showOne = true;
      this.message = "Please Save Date";
      setTimeout(()=>{
        this.ngOnInit();
      },2500);
    }else if(Online_test_time== null || Online_test_time =="" || Online_test_time== undefined){
      this.showTwo = true;
      this.message = "Please Select Time";
      setTimeout(()=>{
        this.ngOnInit();
      },2500);
    }else if(this.serverOnlineTime==null || this.serverOnlineTime =="" || this.serverOnlineTime ==undefined){
      this.showTwo = true;
      this.message = "Please Save Time";
      setTimeout(()=>{
        this.ngOnInit();
      },2500);
    }else{
      this.confirmationService.confirm({
        //message: 'Are you sure that you want to proceed?',
        message: 'Do you want to schedule the exam on '+Online_test_date+'?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.showOne = false;
          this.loading = true;
          this.adminApi.checkeligiblity(data).subscribe(data=>{
            if(data['status'] === 200){
              this.loading = false;
              //this.ngOnInit();
              this.adminApi.downloadFiles(data[`data`])
              .subscribe(data => {
                saveAs(data, enrollment_no+'_hallticket.pdf');
                this.ngOnInit();  
              });

            }else if(data['status'] === 400){
              this.loading = false;
              alert(data['message']);
              this.ngOnInit();
            }
          })
        },
        reject: () => {
          this.ngOnInit();
        } 
    })
    }
  }

  Check_Eligibility(user_id,college_university,college_name,Subject_first_hsc,Subject_Second_hsc,Subject_Third_hsc,Subject_fourth_hsc,Subject_fifth_hsc,Subject_Six_hsc,specialization,course){
    
    this.adminApi.Check_Eligibility(user_id,college_university,college_name,Subject_first_hsc,Subject_Second_hsc,Subject_Third_hsc,Subject_fourth_hsc,Subject_fifth_hsc,Subject_Six_hsc,specialization,course).subscribe(response=> {
      
      if(response['status'] == 200){
        var data = response['data'];					
        var nrp = response['data'];					
        if(data.length == 0 || data.length == undefined || data.length == null){
          this.mu_data = response['data'];
          this.dialogService.open(EligibilityComponent, {
            context: {
              data: this.mu_data						
            },
          
          });

        }else{
          this.adminApi.Check_Eligibility_data(nrp,specialization,course).subscribe(response1=>{
            if(response1['status'] == 200){
              var muData = response1['data'];
              this.mu_data = response1['data'];
              this.dialogService.open(EligibilityComponent, {
                context: {
                  data: this.mu_data						
                },
              
              });
            }else if(response1['status'] == 400){
              this.mu_data =null;
              this.dialogService.open(EligibilityComponent, {
                context: {
                  data: ''						
                },
              
              });
            }
            
          });

        }
      }else if(response['status'] == 400){
        this.mu_data =null;
        this.dialogService.open(EligibilityComponent, {
          context: {
            data: ''						
          },
        
        });

      }

    })
  }
 
  showprovisionalLetterApp(user_id,course_id,application_id){
    this.adminApi.showprovisionalLetterApp(user_id,course_id,application_id).subscribe(data => {
      if(data[`status`] == 200){
        this.adminApi.downloadFiles(data[`data`])
        .subscribe(data => {
          saveAs(data, application_id+'_Confirmation_provisional_Letter.pdf');    
        });
       
      }else{
        alert("You Can't Download Preview Letter!!!!!!")
      }
  
    })
  }

  preview(user_id,course_id,application_id){
    this.adminApi.preview(user_id,course_id,application_id).subscribe(data => {
      if(data[`status`] == 200){
        this.adminApi.downloadFiles(data[`data`])
        .subscribe(data => {
          saveAs(data, application_id+'_Preview.pdf');    
        });
        
      }else{
        alert("You Can't Download Preview Letter!!!!!!")
      }
  
    })
  
  }

  preview_data_with_Preferences(user_id,course_id,application_id){
    this.adminApi.preview_data_with_Preferences(user_id,course_id,application_id).subscribe(data => {
      if(data[`status`] == 200){
        this.adminApi.downloadFiles(data[`data`])
        .subscribe(data => {
          saveAs(data, application_id+'_Preview_Pref.pdf');    
        });
        
      }else{
        alert("You Can't Download Preview Letter!!!!!!")
      }
  
    })
  }

  Ticket(email){
    this.router.navigate(['pages/help'],{queryParams:{userEmail : email}});
  }

  onChange(event){
    var Online_test_date = ((document.getElementById("inputDob") as HTMLInputElement).value);
    
  }

  saveDate(value){
    if(value == 'ot'){
      var Online_test_date = ((document.getElementById("inputDob") as HTMLInputElement).value);
      if(Online_test_date=="" || Online_test_date==null || Online_test_date==undefined){
        this.showOne = true;
        this.message = "Please Select Date";
      }else{
        this.showOne = false;
        this.adminApi.savedate(value,Online_test_date).subscribe(data=>{
          if(data['status'] === 200){
            this.ngOnInit();
            alert('Date Save Successfully');   
          }
        })
      }
    }
  }

  saveTime(value){
    var Online_test_date = ((document.getElementById("inputDob") as HTMLInputElement).value);
    // //var Online_test_time = ((document.getElementById("inputTime") as HTMLInputElement).value);
    // var t= this.onlineTime;
    // var dateFormat = new DatePipe('en-ISO');
    // var Online_test_time = this.datePipe.transform(t,"HH:mm:ss");
    var Online_test_time = this.onlineTime;
    if(Online_test_date=="" || Online_test_date==null || Online_test_date==undefined || this.severOnlineTest==null || this.severOnlineTest =="" || this.severOnlineTest ==undefined){
      this.confirmationService.confirm({
        message: 'Please first add date.',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        rejectVisible:false,
        acceptLabel :'OK',
        accept: () => {
          this.ngOnInit();
        },
      })
    }else if(Online_test_time=="" || Online_test_time==null || Online_test_time==undefined){
      this.confirmationService.confirm({
        message: 'Please add Time.',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        rejectVisible:false,
        acceptLabel :'OK',
        accept: () => {
          this.ngOnInit();
        },
      })
    }else{
      this.confirmationService.confirm({
        message: 'Are you sure you want to save time for the exam schedule on '+Online_test_date+'.',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.adminApi.saveTime(value,Online_test_time).subscribe(data=>{
            if(data['status'] === 200){
              alert('Time Save Successfully');
              this.ngOnInit();
            }
          })
        },
        reject: () => {
          this.ngOnInit();
        },
      })

    }
  }

  errata(userId,category){
    this.router.navigate(['pages/adminErrata'],{queryParams:{userId : userId ,category:category}});
  }

}