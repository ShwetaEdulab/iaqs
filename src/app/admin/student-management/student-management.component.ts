import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AdminApiService } from '../../shared/adminapi.service';
import { Router } from '@angular/router';
import { NbAuthJWTToken,NbAuthService } from '@nebular/auth';

@Component({
  selector: 'ngx-student-management',
  templateUrl: './student-management.component.html',
  styleUrls: ['./student-management.component.scss']
})
export class StudentManagementComponent implements OnInit {
  selectedYear ='2019'
  public filterText: string;
  public filterPlaceholder: string;
  public filterInput = new FormControl();
  p: number = 1;
  studentdata: any;
  active: any;
  constructor(
    protected adminApi : AdminApiService,
    private router : Router,
    private authService : NbAuthService,
  ) {
    this.authService.onTokenChange()
      .subscribe((token: NbAuthJWTToken) => {
        if(token.getPayload()['role'] !="admin"){
          this.router.navigate(['auth/logout'])
        }
      });
   }

  ngOnInit() {
    this.filterText = "";
    this.filterPlaceholder = "Search";
    this.adminApi.getallstudents().subscribe((data)=>{
      this.studentdata = data['data']
      this.active=data['counts'];
    })
    this.filterInput
      .valueChanges
      .debounceTime(200)
      .subscribe(term => {
      this.filterText = term;
    });
  }

  filterYear(year){
    this.adminApi.getallstudents().subscribe((data)=>{
      this.studentdata = data['data']
      this.active=data['counts'];
    })
    this.filterInput
      .valueChanges
      .debounceTime(200)
      .subscribe(term => {
        
      this.filterText = term;
    });

  }

  viewMore(category,userId){
    this.router.navigate(['pages/adminView'],{queryParams:{userId : userId,category:category}});
  }

  Ticket(email){
    this.router.navigate(['pages/help'],{queryParams:{userEmail : email}}); 

  }
  
  status(status,userId){
    this.adminApi.status(status,userId).subscribe((data)=>{
      if (data['status']== 200){
        this.ngOnInit();
        alert(data['message']);
      }else{
        alert('Something Went Wrong !!!');
      }
      
    })
  }
 

}
