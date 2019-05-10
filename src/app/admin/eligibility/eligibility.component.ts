import {Component ,OnInit,ElementRef, ViewChild} from '@angular/core';
import { AdminApiService } from '../../shared/adminapi.service';
import { FormGroup, FormControl } from '@angular/forms';
import { saveAs } from 'file-saver';
import { Router, ActivatedRoute } from '@angular/router';
import {ConfirmationService} from 'primeng/api';
import {Message} from 'primeng/api';
import {config} from '../../../../config';
import { NbAuthJWTToken,NbAuthService } from '@nebular/auth';

@Component({
  selector: 'eligibility',
  templateUrl: './eligibility.component.html',
  styleUrls: ['./eligibility.component.scss'],
  providers:[ConfirmationService],
})

export class AdminEligibilityComponent {
  @ViewChild('myDiv') myDiv: ElementRef;
  tab_type;
  application_data;
  p: number = 1;
  status;
  msgs : Message[]= [];
  serverUrl = config.serverUrl;
  selectedYear ='2019'
  public filterText: string;
  public filterPlaceholder: string;
  public filterInput = new FormControl();
  showOne = false;
  showTwo = false;
  date = new Date();
  min: Date;
  max = new Date();
  severPITest;
  piTest: any;
  loading = false;
  message;
  serverOnlineTime: any;
  serverTimeId: any;
  onlinePITime: any;
  constructor(protected adminApi : AdminApiService,
    private router : Router,
    private confirmationService: ConfirmationService,
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
    this.adminApi.getApplicationinEligibility('new',this.selectedYear).subscribe(data=>{
      this.showOne = false;
      this.showTwo = false;
      this.application_data = data['data'];
      this.severPITest = data['dates']['pitest'];
      this.serverOnlineTime = data['dates']['pi_time'];
      this.serverTimeId = data['dates']['pitestId'];
      //this.onlinePITime = data['dates']['pi_time'];
      if(data['dates']['pitest'] == null || data['dates']['pitest'] == '' || data['dates']['pitest'] == undefined){
        this.piTest = null;
      }else{
        this.piTest =  new Date(data['dates']['pitest']);
      }

      if(data['dates']['pi_time'] == null || data['dates']['pi_time'] == '' || data['dates']['pi_time'] == undefined){
        this.onlinePITime = null;
      }else{
        var AnnouncementDate = new Date(data['dates']['pi_time']);
        this.onlinePITime = AnnouncementDate;
      }
    })
    this.filterText = "";
    this.filterPlaceholder = "Search";
    this.filterInput
      .valueChanges
      .debounceTime(200)
      .subscribe(term => {
      this.filterText = term;
    });
  }
  getApplication(e) {
    var index = e.index;
    if(index == 0){
      this.tab_type = 'new'
    }else if(index == 1){
      this.tab_type = 'new'
    }else if(index == 2){
      this.tab_type = 'requested_unlocked_transcript'
    }
    if(this.tab_type == 'new'){
      this.showOne = false;
      this.adminApi.getApplicationinEligibility(this.tab_type,this.selectedYear).subscribe(data=>{
        this.application_data = data['data'];
        this.severPITest = data['dates']['pitest'];
        if(data['dates']['pitest'] == null || data['dates']['pitest'] == '' || data['dates']['pitest'] == undefined){
          this.piTest = null;
        }else{
          this.piTest =  new Date(data['dates']['pitest']);
        }

        if(data['dates']['pi_time'] == null || data['dates']['pi_time'] == '' || data['dates']['pi_time'] == undefined){
          this.onlinePITime = null;
        }else{
          var AnnouncementDate = new Date(data['dates']['pi_time']);
          this.onlinePITime = AnnouncementDate;
        }
      })
      this.filterText = "";
      this.filterPlaceholder = "Search";
      this.filterInput
        .valueChanges
        .debounceTime(200)
        .subscribe(term => {
        this.filterText = term;
      });
    }else if(this.tab_type == 'iccr'){
      this.status='new';
      this.adminApi.getICCRApplicationinEligibility(this.status).subscribe(data=>{
        this.application_data = data['data'];
      })
      this.filterText = "";
      this.filterPlaceholder = "Search";
      this.filterInput
        .valueChanges
        .debounceTime(200)
        .subscribe(term => {
        this.filterText = term;
      });
    }else if(this.tab_type == 'iccr_allocated_college_data'){
      this.adminApi.geticcr_allocated_college_data().subscribe(data=>{
        this.application_data = data['data'];
      })
      this.filterText = "";
      this.filterPlaceholder = "Search";
      this.filterInput
        .valueChanges
        .debounceTime(200)
        .subscribe(term => {
        this.filterText = term;
      });
    }else if(this.tab_type == 'requested_unlocked_transcript'){
      this.adminApi.getrequested_unlocked_transcript().subscribe(data=>{
        this.application_data = data['data'];
      })
      this.filterText = "";
      this.filterPlaceholder = "Search";
      this.filterInput
        .valueChanges
        .debounceTime(200)
        .subscribe(term => {
        this.filterText = term;
      });
    }else if(this.tab_type == 'iccr_requested_unlocked_transcript'){
      this.adminApi.geticcr_requested_unlocked_transcript().subscribe(data=>{
        this.application_data = data['data'];
      })
      this.filterText = "";
      this.filterPlaceholder = "Search";
      this.filterInput
        .valueChanges
        .debounceTime(200)
        .subscribe(term => {
        this.filterText = term;
      });
    }
    

  }

  sendToForeign(e,id,course_id,user_id,checkEligiblity){
    var data={
        id:id,
        user_id:user_id,
        course_id:course_id,
        value:e.checked
    }
    var PI_test_date = ((document.getElementById("DOBtxt") as HTMLInputElement).value);
    //var PI_test_time = ((document.getElementById("inputPITime") as HTMLInputElement).value);
    var PI_test_time = this.onlinePITime;
    if(PI_test_date=="" || PI_test_date==null || PI_test_date==undefined){
      this.showOne = true;
      this.message ="Please Select Date";
      setTimeout(()=>{
        this.ngOnInit();
      },2500);
    }else if(this.severPITest==null || this.severPITest =="" || this.severPITest ==undefined){
      this.showOne = true;
      this.message ="Please Save Date";
      setTimeout(()=>{
        this.ngOnInit();
      },2500);
    }else if(PI_test_time== null || PI_test_time =="" || PI_test_time== undefined){
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
        message:'Do you want to schedule the exam on '+PI_test_date+'?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.showOne = false;
          this.loading = true;
          this.adminApi.checkforeign(data).subscribe(data=>{
            if(data['status'] === 200){
              this.loading = false;
              this.ngOnInit();  
            } else if(data['status'] === 400){
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

  DownloadProvisionalLetter(user_id,id){
    this.adminApi.DownloadProvisionalLetter(user_id,id).subscribe(data => {
      if(data['status'] == 200){
        var pdf = '/srv/www/uiserver/public/upload/transcript/'+user_id+'/'+id+'_Confirmation_provisional_Letter.pdf'
        this.adminApi.downloadFiles(pdf)
        .subscribe(data => {
        saveAs(data, id+'_Confirmation_provisional_Letter.pdf');    
        });
      }else if(data['status'] == 400){
        alert('Confirmation Provisional Letter Not generated !!')
      }
    })
    
  }

  viewMore(category,userId,courseId,tab,applicationId){
    this.router.navigate(['pages/adminView'],{queryParams:{category:category,userId : userId, courseId:courseId,tab:tab,applicationId:applicationId }});
  }

  downloadForewordLetter(pdf,file_name){
    this.adminApi.downloadFiles(pdf)
    .subscribe(data => {
     saveAs(data, file_name);    
    });
  }

  errata(userId,category){
    this.router.navigate(['pages/adminErrata'],{queryParams:{userId : userId ,category:category}});
  }

  acceptApplication(userId,courseId,id){
    var eligib_number = ((document.getElementById("eligib_number"+id) as HTMLInputElement).value);
    var onlineMark = ((document.getElementById("onlineMark"+id) as HTMLInputElement).value);
    if(eligib_number==null || eligib_number==undefined || eligib_number==""||eligib_number==" "
    || onlineMark==null || onlineMark==undefined || onlineMark==""||onlineMark==" "){
      document.getElementById("elignumbererror"+id).innerHTML ="Eligblity number is required";
			document.getElementById("elignumbererror"+id).style.color = "red";
    }else{
      document.getElementById("elignumbererror"+id).innerHTML ="";
      // this.adminApi.acceptApplication(userId,courseId,eligib_number).subscribe(data=>{
      //   if(data['status'] == 200){
      //     document.getElementById('view_eligibility'+id).style.visibility = "hidden";
      //     document.getElementById('documentverify'+id).style.visibility = "hidden";
      //     document.getElementById('acceptbutton'+id).style.visibility = "hidden";
      //     document.getElementById('rejectbutton'+id).style.visibility = "hidden";
      //     this.confirmationService.confirm({
      //       message: 'Application Accepted!!!',
      //       header: 'Confirmation',
      //       icon: 'pi pi-exclamation-triangle',
      //       accept: () => {
              
      //       }
      //     });
      //   }
        
      // })
    }
  }

  rejectApplication(userId,courseId,id){
    this.adminApi.rejectApplication(userId,courseId).subscribe(data=>{
      if(data['status'] == 200){
        document.getElementById('view_eligibility'+id).style.visibility = "hidden";
        document.getElementById('documentverify'+id).style.visibility = "hidden";
        document.getElementById('acceptbutton'+id).style.visibility = "hidden";
        document.getElementById('rejectbutton'+id).style.visibility = "hidden";
        
        this.confirmationService.confirm({
          message: 'Application Rejected!!!',
          header: 'Confirmation',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
            
          }
        });
      }
      
    })
  }

  acceptApplicationICCR(userId,courseId,id){
    var eligib_numbericcr = ((document.getElementById("eligib_numbericcr"+id) as HTMLInputElement).value);
    if(eligib_numbericcr==null || eligib_numbericcr==undefined || eligib_numbericcr==""||eligib_numbericcr==" "){
      document.getElementById("elignumber_iccrerror"+id).innerHTML ="Eligblity number is required";
			document.getElementById("elignumber_iccrerror"+id).style.color = "red";
    }else{
      document.getElementById("elignumber_iccrerror"+id).innerHTML ="";
      this.adminApi.acceptApplicationICCR(id,userId,courseId,eligib_numbericcr).subscribe(data=>{
        if(data['status'] == 200){
          document.getElementById('view_eligibilityiccr'+id).style.visibility = "hidden";
          document.getElementById('documentverifyiccr'+id).style.visibility = "hidden";
          document.getElementById('acceptbuttoniccr'+id).style.visibility = "hidden";
          document.getElementById('rejectbuttoniccr'+id).style.visibility = "hidden";
          this.confirmationService.confirm({
            message: 'Application Accepted!!!',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
              
            }
          });
        }
        
      })
    }
  }

  rejectApplicationICCR(userId,courseId,id){
    this.adminApi.rejectApplicationICCR(userId,courseId).subscribe(data=>{
      if(data['status'] == 200){
        document.getElementById('view_eligibilityiccr'+id).style.visibility = "hidden";
        document.getElementById('documentverifyiccr'+id).style.visibility = "hidden";
        document.getElementById('acceptbuttoniccr'+id).style.visibility = "hidden";
        document.getElementById('rejectbuttoniccr'+id).style.visibility = "hidden";
        this.confirmationService.confirm({
          message: 'Application Rejected!!!',
          header: 'Confirmation',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
            
          }
        });
      }
      
    })
  }

  view_reupload_transcript(userId,category){
    this.router.navigate(['pages/AdminReuploadedTranscript'],{queryParams:{userId : userId,category:category}});
  }

  DownloadFirmPDFICCR(applicationId,userId){
    this.adminApi.DownloadFirmPDFICCR(applicationId,userId).subscribe(data=>{
      if(data[`status`] == 200){
        this.adminApi.downloadFiles(data[`data`])
        .subscribe(data => {
          saveAs(data, applicationId+'_Final_Letter.pdf');    
        });
      }else{
        alert("You can't download firm letter until you allocate any college.")
      }
    })

  }

  Ticket(email){
    this.router.navigate(['pages/help'],{queryParams:{userEmail : email}});
  }

  saveDate(value){
    if(value == 'pit'){
      var PI_test_date = ((document.getElementById("DOBtxt") as HTMLInputElement).value);
      if(PI_test_date=="" || PI_test_date==null || PI_test_date==undefined){
        this.showOne = true;
        this.message ="Please Select Date";
      }else{
        this.showOne = false;
        this.adminApi.savedate(value,PI_test_date).subscribe(data=>{
          if(data['status'] === 200){
            this.ngOnInit();
            alert('Date Save Successfully');
          }
        })
      }
    }
  }

  saveTime(value){
    var PI_test_date = ((document.getElementById("DOBtxt") as HTMLInputElement).value);
    //var PI_test_time = ((document.getElementById("inputPITime") as HTMLInputElement).value);
    var PI_test_time = this.onlinePITime;
    if(PI_test_date == "" || PI_test_date == null || PI_test_date == undefined || this.severPITest==null || this.severPITest =="" || this.severPITest ==undefined){
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
    }else if(PI_test_time=="" || PI_test_time==null || PI_test_time==undefined){
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
        message: 'Are you sure you want to save time for the exam schedule on '+PI_test_date+'.',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.adminApi.saveTime(value,PI_test_time).subscribe(data=>{
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

}
