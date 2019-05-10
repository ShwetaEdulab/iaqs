import { Component, ViewChild} from '@angular/core';
import { AdminApiService } from '../../shared/adminapi.service';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { NbThemeService } from '@nebular/theme';
import { NbAuthJWTToken,NbAuthService } from '@nebular/auth';
import { MatDatepicker } from '@angular/material';

@Component({
  selector: 'report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
})
export class AdminReportComponent {
  
  public filterText: string;
  public filterPlaceholder: string;
  public filterInput = new FormControl();
  application_data: any;
  p: number = 1;
  tab_type: any;
  activity_data: any;
  firstPaymentChallanData: any;
  secondPaymentChallanData: any;
  collegeAttendedStudents: any;
  tableData: any;
  options: any = {};
  themeSubscription: any;
  selectedYear: any ='2019';
  emailActivityData : any;
  loadingbutton;
  yesterday;
  month;
  year;
  smsshow = 0;
  smsActivityData: any;
  p1: number = 1;
  p2: number = 1;
  p3: number = 1;
  p4: number = 1;
  p5: number = 1;
  showmedium: number;
  registrationData: any;
  registrationDatacount: any;
  pieData: number;
  showregdata: number;
  notnull: any;
  registrationFromMainWebsite: any;
  alldata: any;
  registrationDatacounts: any;
  constructor(
    protected adminApi : AdminApiService,
    private router : Router,
    private theme: NbThemeService,
    private authService : NbAuthService,
    ) {
      this.authService.onTokenChange()
      .subscribe((token: NbAuthJWTToken) => {
        if(token.getPayload()['role'] !="admin"){
          this.router.navigate(['auth/logout'])
        }
      });
    
  }

  @ViewChild(MatDatepicker) picker;
  date = new FormControl();

  pieChartOptions = {
    responsive: true
  }
  pieChartLabels  :any ;
  pieChartColor  :any ;
  pieChartData:any ;
  
  monthSelectedSMS(params) {
    this.date.setValue(params);
    this.picker.close();
    this.smsshow = 0;
    this.loadingbutton = true;
    this.adminApi.getSMSActivityMonthWise(params).subscribe(data=> {
      this.loadingbutton = false;
      if(data['status'] == 200){
        this.smsshow = 1
        this.smsActivityData = data['data'];
      }else if(data['status'] == 400){
        this.smsshow = 0;
       
      }else{
        this.smsshow = 0;
      }
      
    });
  }

  ngOnInit(){
    this.filterText = "";
    this.adminApi.getApplicationsByStatus(2019).subscribe(data=> {
      this.application_data = data['data'];
      this.filterText = "";
      this.filterPlaceholder = "Search";
      this.filterInput
        .valueChanges
        .debounceTime(200)
        .subscribe(term => {
        this.filterText = term;
      });
    })
  }

  filterYearWise(year){
    this.adminApi.getApplicationsByStatus(year).subscribe(data=>{
      this.application_data = data['data'];
    })
      this.filterInput
      .valueChanges
      .debounceTime(200)
      .subscribe(term => {
      this.filterText = term;
    });
  }

  DownloadFistChallan(value){
    var name = value.split("/").pop();
    this.adminApi.downloadFiles(value)
    .subscribe(data => {
     saveAs(data, name);    
    });
  }

  DownloadSecondChallan(value){
    var name = value.split("/").pop();
    this.adminApi.downloadFiles(value)
    .subscribe(data => {
     saveAs(data, name);    
    });
  }
  
  getReportData(e){
    var index = e.index;
    if(index == 0){
      this.adminApi.getApplicationsByStatus(this.selectedYear).subscribe(data=> {
        this.application_data = data['data'];
        this.filterText = "";
        this.filterPlaceholder = "Search";
        this.filterInput
          .valueChanges
          .debounceTime(200)
          .subscribe(term => {
          this.filterText = term;
        });
      })
    }else if(index == 1){
      this.adminApi.getApplicationAcceptance(this.selectedYear).subscribe(data=> {
        this.application_data = data['data'];
        this.filterText = "";
        this.filterPlaceholder = "Search";
        this.filterInput
          .valueChanges
          .debounceTime(200)
          .subscribe(term => {
          this.filterText = term;
        });
      })
    }
    // else if(index == 2){
    //   this.adminApi.studentStatisticsPiechart().subscribe(data=> {
    //     this.tableData = data['data']['tableData'];
    //     this.filterText = "";
    //     this.filterPlaceholder = "Search";
    //     this.filterInput
    //       .valueChanges
    //       .debounceTime(200)
    //       .subscribe(term => {
    //       this.filterText = term;
    //     });
    //   })
    // }
    else if(index == 2){
      this.adminApi.activitytracker().subscribe(data=> {
        this.activity_data = data['data'];
        this.filterText = "";
        this.filterPlaceholder = "Search";
        this.filterInput
          .valueChanges
          .debounceTime(200)
          .subscribe(term => {
          this.filterText = term;
        });
      })
    }else if(index == 3){
      this.tab_type = 'email_activity';
      this.loadingbutton = true;
      this.adminApi.getEmailTracker().subscribe(data =>{
        this.emailActivityData = data['data']['messages'];
        this.loadingbutton = false;
        this.filterText = "";
        this.filterPlaceholder = "Search";
        this.filterInput
          .valueChanges
          .debounceTime(200)
          .subscribe(term => {
          this.filterText = term;
        });
      });
    }else if(index == 4){
      this.tab_type = 'sms_activity';
      var today = new Date();
			var date = today.getDate() ;
			var month = today.getMonth() + 1;
			var year = today.getFullYear();
			var yesterday = date - 1;
			this.yesterday = yesterday;
			this.month = month;
			this.year = year;
    }else if(index == 5){
      //this.pieData = 0;
      this.adminApi.getRegistrationTracker().subscribe(data =>{
        if(data['status'] == 200){
          this.showmedium = 1
          this.registrationData = data['data'];
          this.registrationDatacount = data['counts'];
          var label = [];
          var count = [];
          for(var a in data['counts']){
            label.push(data['counts'][a]['source_of_information']);
            count.push(data['counts'][a]['count']);
          }
          this.pieChartLabels = label;
          this.pieChartData =[
              { 
                data: count
              }
            ];
        }else{
          this.showmedium = 0;
        }
      })
    }else if(index == 6){
      this.adminApi.getRefererLink().subscribe(data =>{
        if(data['status'] == 200){
          this.showregdata = 1
          this.registrationDatacounts = data['counts'];
          this.notnull = data['otherwebsite'];
          this.registrationFromMainWebsite = data['dataa'];
          this.alldata = data['table'];
          var label = [];
          var count = [];
          for(var a in data['counts']){
            label.push(data['counts'][a]['referer_link']);
            count.push(data['counts'][a]['count']);
          }
          this.pieChartLabels = label;
          this.pieChartData =[
              { 
                data: count
              }
            ];
        }else{
          this.showregdata = 0
        }
      })
    }

    // else if(index == 3){
    //   this.adminApi.firstPaymentChallanData().subscribe(data=> {
    //     this.firstPaymentChallanData = data['data'];
    //     this.filterText = "";
    //     this.filterPlaceholder = "Search";
    //     this.filterInput
    //       .valueChanges
    //       .debounceTime(200)
    //       .subscribe(term => {
    //       this.filterText = term;
    //     });
    //   })
    // }else if(index == 4){
    //   this.adminApi.secondPaymentChallanData().subscribe(data=> {
    //     this.secondPaymentChallanData = data['data'];
    //     this.filterText = "";
    //     this.filterPlaceholder = "Search";
    //     this.filterInput
    //       .valueChanges
    //       .debounceTime(200)
    //       .subscribe(term => {
    //       this.filterText = term;
    //     });
    //   })
    // }else if(index == 5){
    //   this.adminApi.collegeAttendedStudents().subscribe(data=> {
    //     this.collegeAttendedStudents = data['data'];
    //     this.filterText = "";
    //     this.filterPlaceholder = "Search";
    //     this.filterInput
    //       .valueChanges
    //       .debounceTime(200)
    //       .subscribe(term => {
    //       this.filterText = term;
    //     });
    //   })
    // }else if(index == 6){
    //   this.adminApi.getApplication('new',this.selectedYear).subscribe(data=>{
    //    this.application_data = data['data'];
    //  })
    //    this.filterInput
    //    .valueChanges
    //    .debounceTime(200)
    //    .subscribe(term => {
    //    this.filterText = term;
    //  });
    // }else if(index == 7){
    //  this.adminApi.getApplicationinEligibility('new',this.selectedYear).subscribe(data=>{
    //    this.application_data = data['data'];
    //  })
    //  this.filterText = "";
    //  this.filterPlaceholder = "Search";
    //  this.filterInput
    //    .valueChanges
    //    .debounceTime(200)
    //    .subscribe(term => {
    //    this.filterText = term;
    //  });
    // }
  }

  filterYear(tab,tab_type,year){
    if(tab === 'app'){
      this.adminApi.getApplication(tab_type,year).subscribe(data=>{
        this.application_data = data['data'];
      })
        this.filterInput
        .valueChanges
        .debounceTime(200)
        .subscribe(term => {
        this.filterText = term;
      });
    }else if(tab === 'eligib'){
      this.adminApi.getApplicationinEligibility(tab_type,year).subscribe(data=>{
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

}