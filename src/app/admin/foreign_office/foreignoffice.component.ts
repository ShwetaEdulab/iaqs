import {Component ,OnInit , ElementRef , ViewChild} from '@angular/core';
import { AdminApiService } from '../../../app/shared/adminapi.service';
import { Inject }  from '@angular/core';
import { DOCUMENT } from '@angular/common'; 
import { CountriesService } from './../../@core/data/countries.service'; 
import { saveAs } from 'file-saver';
import { PreferencesDialogComponent } from './dialog/studentPreferences';
import { PaymentDetailsDialogComponent } from './dialog/paymentDetails';
import { EducationDetailsDialogComponent } from './dialog/education_details';
import { SeatAllocationDialogComponent } from './dialog/seatAllocation';
import { NbDateService, NbDialogService, NbToastrService,NbStepperComponent,NbThemeService } from '@nebular/theme';
import {ConfirmationService} from 'primeng/api';
import * as $ from 'jquery';
import { FormGroup, FormControl } from '@angular/forms';
import { NbAuthJWTToken,NbAuthService } from '@nebular/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'adminForeignOffice',
  templateUrl: './foreignoffice.component.html',
  styleUrls: ['./foreignoffice.component.scss'],
  providers: [ConfirmationService]
})
export class AdminForeignOfficeComponent {
  tab_type;
  application_data;
  Countries;
  country;
  embassy;
  embassyEmailList;
  p: number = 1;
  dialog_Message:string;
  display: boolean = false;
  public filterText: string;
  public filterPlaceholder: string;
  public filterInput = new FormControl();
 // @ViewChild('embassyEmail') input :ElementRef; 
  constructor(
    protected adminApi : AdminApiService, 
    protected countries : CountriesService,
    private confirmationService: ConfirmationService,
    private authService : NbAuthService,
    private router : Router,
    @Inject(DOCUMENT) document,
    private dialogService: NbDialogService) 
      {
        this.authService.onTokenChange()
        .subscribe((token: NbAuthJWTToken) => {
          if(token.getPayload()['role'] !="admin"){
            this.router.navigate(['auth/logout'])
          }
        });
        this.Countries = this.countries.getData();
      }

  ngOnInit(){
    this.filterText = "";
    this.filterPlaceholder = "Search";
    var obj = {
      index: 0
    };
    this.getApplicationAcceptedForeignOffice(obj);
  }
  
  getApplicationAcceptedForeignOffice(e) {
    var index = e.index;
    if(index == 0){
      this.tab_type = 'new'
    }else if(index == 1){
      this.tab_type = 'seat_allocation'
    }else if(index == 2){
      this.tab_type = 'seat_alloted_student'
    }else if(index == 3){
      this.tab_type = 'failed_student'
    }
    // else if(index == 2){
    //   this.tab_type = 'third_payment'
    // }
    this.adminApi.getApplicationinForeignOffice(this.tab_type).subscribe(data=>{
      this.application_data = data['data'];
    })
    this.filterInput
      .valueChanges
      .debounceTime(200)
      .subscribe(term => {
      this.filterText = term;
    });
  }

  getPaymentDetails(value,t_paymentMode,amount,currency,transaction_id,dateOfPayment,challanExist,challan){

    this.dialogService.open(PaymentDetailsDialogComponent,{ 
        context: {
          value : value,
          t_paymentMode : t_paymentMode,
          amount : amount,
          currency : currency,
          transaction_id : transaction_id,
          dateOfPayment : dateOfPayment,
          challanExist: challanExist,
          challan: challan
        }
     }).onClose
        .subscribe(
          (data: any) => {
       
            err => console.error(err)
        });

  }

  sendEmailTostudent(event: any,user_id,course_id,id,specialization){
    if (event.target.checked){
      this.adminApi.sendEmailFromForeignOffice('student',user_id,course_id,id).subscribe(data=>{
    
        if(data['status'] == 200){
          alert("Email sent successfully to student");
        }  
      });
    }
  }

  sendEmailToGuardian(event: any,user_id,course_id,id,specialization){
    
    if (event.target.checked){
      this.adminApi.sendEmailFromForeignOffice('guardian',user_id,course_id,id).subscribe(data=>{
        if(data['status'] == 200){
            alert("Email sent successfully to guardian");
        }  
      });

    }
  }

  sendEmailToEmbassy(user_id,course_id,id,specialization){
    document.getElementById("country"+id).style.visibility = "visible";
  }

  sendEmailembassy(id,user_id,course_id,Embemail,Contryvalue,input_email){
    document.getElementById("emailerror"+id).innerHTML = "";
   
    var valid = true;
    var mailformat = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var email = input_email; //$('#input_email'+id).val()

    if(email == ""){
      valid = false;
      document.getElementById("emailerror"+id).innerHTML = "Email is required";
    }else if(!mailformat.test(email)){
      valid = false;
      document.getElementById("emailerror"+id).innerHTML = "Invalid Email";
    }else if(email.length > 100){
      valid = false;
      document.getElementById("emailerror"+id).innerHTML = "Email less than 100 characters";
    }
          
    var country = document.getElementById("country"+id);
    if(valid){
      this.adminApi.sendEmailToEmbassy(user_id,course_id,id,email,Contryvalue).subscribe(data=>{
        if(data['status'] == 200){
          alert("Email sent successfully to Embassy");
        }  else {
          alert("Email not sent to guardian");
        }
      });
        
    }
  }

  sendEmailembassy1(id,user_id,course_id,Embemail,Contryvalue,input_email){
    document.getElementById("emailerror"+id).innerHTML = "";
    //embassyEmail
    var valid = true;
    var email = input_email;
    
    if(email = ''){
      valid = false;
      document.getElementById("emailerror").innerHTML = "Email is required";
    }

    if(valid){
      this.adminApi.sendEmailToEmbassy(user_id,course_id,id,email,Contryvalue).subscribe(data=>{
        if(data['status'] == 200){
          alert("Email sent successfully to Embassy");
        }  else {
          alert("Email not sent to guardian");
        }
      });
        
    }
  }

  viewHSCDetails(userid,qualification,percentage,Subject_first,mark_first,OutOf_first,grade_first,Subject_Second,mark_Second,
    OutOf_Second,grade_Second,Subject_Third,mark_Third,OutOf_Third,grade_Third,Subject_fourth,mark_fourth,OutOf_fourth,
    grade_fourth,Subject_fifth,mark_fifth,OutOf_fifth,grade_fifth,Subject_Six,mark_Six,OutOf_Six,grade_Six,college_university){
      this.dialogService.open(EducationDetailsDialogComponent,{ 
        context: {
          userid : userid,
          qualification : qualification,
          percentage : percentage,
          Subject_first : Subject_first,
          mark_first : mark_first,
          OutOf_first : OutOf_first,
          grade_first : grade_first,
          Subject_Second: Subject_Second,
          mark_Second: mark_Second,
          OutOf_Second: OutOf_Second,
          grade_Second: grade_Second,
          Subject_Third: Subject_Third,
          mark_Third: mark_Third,
          OutOf_Third: OutOf_Third,
          grade_Third: grade_Third,
          Subject_fourth: Subject_fourth,
          mark_fourth: mark_fourth,
          OutOf_fourth: OutOf_fourth,
          grade_fourth: grade_fourth,
          Subject_fifth: Subject_fifth,
          mark_fifth: mark_fifth,
          OutOf_fifth: OutOf_fifth,
          grade_fifth: grade_fifth,
          Subject_Six: Subject_Six,
          mark_Six: mark_Six,
          OutOf_Six: OutOf_Six,
          grade_Six: grade_Six,
          college_university: college_university,
        }
    }).onClose
        .subscribe(
          (data: any) => {
      
            err => console.error(err)
        });
  }

  getEmail(event,id){
    var value = event;
     
    document.getElementById("emailerror"+id).innerHTML = null;
     	if (value == 'Not exists in list') {
				document.getElementById("input_email"+id).style.visibility = "visible";
				document.getElementById("sendEmail"+id).style.visibility = "visible";
				document.getElementById("sendEmail1"+id).style.visibility = "hidden";

			} else {
				document.getElementById("sendEmail1"+id).style.visibility = "visible";
				document.getElementById("input_email"+id).style.visibility = "hidden";
				document.getElementById("sendEmail"+id).style.visibility = "hidden";
			}
  }

  deallocateCollege(application_id,user_id,collegename){
    this.confirmationService.confirm({
      message: 'Do you want to perform this action??',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.adminApi.studentDeallocateCollege(application_id,user_id,collegename).subscribe(data=>{
          if(data['status'] == 200){
            this.ngOnInit();
          }  else {
            alert("Error on server");
          }
        });
      },
      reject: () => {
          
      }
  });
								
  }

  downloadletter(id,type,applicationid){
    if(type == "Provisional_Letter"){
      var file_name = applicationid+"_Confirmation_provisional_Letter.pdf";
      var file_location = id+"";
      this.adminApi.downloadDocument(id,file_name)
      .subscribe(data => {
        saveAs(data, file_name);    
      });
    }
      
  }

  downloadSeatAllocationDraft(userid,enrollment,id){
      var file_name = enrollment+'_seat_allocate_details.pdf';
      this.adminApi.downloadAllocationDraftLetter(userid,enrollment,id)
      .subscribe(data => {
        saveAs(data, file_name);    
      });
    }

  downloadFirmLetter(userid,specialization,id){
      var file_name = id+'_Final_Letter.pdf';
      this.adminApi.checkDownloadedFirmLetter(userid, specialization, id)
      .subscribe(data => {
        if(data['status'] == 200){

          this.adminApi.downloadFirmLetter(userid, file_name)
          .subscribe(data => {
              saveAs(data, file_name);
          });
         

        }  else if(data['status'] == 400) {
          this.dialog_Message ="You can't download firm letter until director allocate the college.";
          this.display = true;
          //alert(" 400 on server");

        } else if(data['status'] == 401){
          $("#input_college_fees"+id).val(data['data'].fees);
          $("#course_fees_id"+id).val(data['data'].id);
          //document.getElementById("firmletterdownload"+id).value ='';
          document.getElementById("firmletterdownload"+id).style.visibility = "hidden";
          document.getElementById("input_college_fees"+id).style.visibility = "visible";
          document.getElementById("generateFirmFeesUpdate"+id).style.visibility = "visible";

        } else if(data['status'] == 402){
          //alert("402 on server");
          this.dialog_Message ="You can't generate firm letter until student verify all required documents.";
          this.display = true;

        } else{
          this.dialog_Message ="Error on server, Please try again later !!";
          this.display = true;
        }
      });
  } 
  
  downloadFirmLetterUpdateCollegeFees(userid,specialization,id,collegeFees,course_id){
    var file_name = id+'_Final_Letter.pdf';
    if(collegeFees == '0' || collegeFees == ''){
      document.getElementById("coursefeeserror"+id).innerHTML = "Enter valid course fees";
    }else{
      this.adminApi.generateFirmLetter(userid, specialization, id,collegeFees,course_id)
      .subscribe(data => {
        if(data['status'] == 200){

          this.adminApi.downloadFirmLetter(userid, file_name)
          .subscribe(data => {
              saveAs(data, file_name);
          });

        }else{
          this.dialog_Message ="Error on server, Please try again later !!";
          this.display = true;
        }
      });  
    }  

  }

  changeemail(event,id,embassyEmail){
    
    embassyEmail = null;
    document.getElementById("emailerror"+id).innerHTML = null;
    this.embassyEmailList = null;
    
    var embassyEmail=null;
    var permittedValues = this.Countries.map(function (value) {
      if (value.name == event) {
        if(!(value.embassy_email == null) ){
          embassyEmail = value.embassy_email;
        }
        
      }
    });

      if(embassyEmail == null){
        document.getElementById("embassyEmail"+id).style.visibility = "visible";
        document.getElementById("input_email"+id).style.visibility = "visible";
        document.getElementById("sendEmail"+id).style.visibility = "visible";
        document.getElementById("sendEmail1"+id).style.visibility = "hidden";
        
      } else {
        let match: string[]; 
        document.getElementById("input_email"+id).style.visibility = "hidden";
        document.getElementById("sendEmail"+id).style.visibility = "hidden";
        var space = embassyEmail.replace(/\s/g,'');
        var s = space;
        match = s.split(',');
        var message = "Not exists in list";
        match.push(message);
        document.getElementById("embassyEmail"+id).style.visibility = "visible";
        this.embassyEmailList = match;
      }
  }
  
  open(userid,appid,courseid,specialization) {
    this.dialogService.open(PreferencesDialogComponent,{ 
      context: {
        userid : userid,
        appid : appid,
        courseid : courseid,
        specialization : specialization
      }
     }).onClose
        .subscribe(
          (data: any) => {
            this.ngOnInit();
            err => console.error(err)
        });
  }

  saveMarks(id,course_id){
    var pi_test_marks = ((document.getElementById("eligib_number"+id) as HTMLInputElement).value);
    var online_test_Marks = ((document.getElementById("onlineMark"+id) as HTMLInputElement).value);
    if(online_test_Marks==null || online_test_Marks=="" || online_test_Marks==undefined){
      document.getElementById("elignumbererror"+id).innerHTML ="Online Test Marks is null";
			document.getElementById("elignumbererror"+id).style.color = "red";
    }else if(pi_test_marks==null || pi_test_marks=="" || pi_test_marks==undefined){
      document.getElementById("elignumbererror"+id).innerHTML ="Please Enter Personal Interview Marks.";
			document.getElementById("elignumbererror"+id).style.color = "red";
    }else{
      document.getElementById("elignumbererror"+id).innerHTML ="";
      this.adminApi.enterPIMarks(id,pi_test_marks,course_id)
      .subscribe(data => {
        if(data['status'] == 200){
          //console.log("DONE!!!!!!!!!!!!!!!");
          this.ngOnInit();
        }else{
          this.dialog_Message ="Error on server, Please try again later !!";
          this.display = true;
          var obj = {
            index: 0
          };
          this.getApplicationAcceptedForeignOffice(obj);
        }
      });
    }
  }

  acceptApplication(userId,courseId,id){
    this.dialogService.open(SeatAllocationDialogComponent,{
      closeOnBackdropClick : false,
      context: {
        userid : userId,
        appid : id,
        courseid : courseId
      }
     }).onClose
        .subscribe(
          (data: any) => {
            var obj = {
              index: 1
            };
            this.getApplicationAcceptedForeignOffice(obj);
        });
  }

  rejectApplication(userId,courseId,id){
    this.confirmationService.confirm({
      message: 'Do you want to perform this action??',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.adminApi.failStudent(userId,courseId,id).subscribe(data=>{
          if(data['status'] == 200){
            this.confirmationService.confirm({
              message: 'Application Rejected!!!',
              header: 'Confirmation',
              icon: 'pi pi-exclamation-triangle',
              accept: () => { 
              }
            });
          } 
        })
      },
      reject: () => {
      }
    });
  }

  errata(userId,category){
    this.router.navigate(['pages/adminErrata'],{queryParams:{userId : userId ,category:category}});
  }


}
