import { Component } from '@angular/core';
import {FormControl} from '@angular/forms';
import { AdminApiService } from '../../shared/adminapi.service';
import { Router } from '@angular/router';
import { NbAuthJWTToken,NbAuthService } from '@nebular/auth';
@Component({
  selector: 'ngx-institute-management',
  templateUrl: './institute-management.component.html',
  styleUrls: ['./institute-management.component.scss']
})
export class InstituteManagementComponent {
  public filterText: string;
  public filterPlaceholder: string;
  public filterInput = new FormControl();
  myControl = new FormControl();
  p: number = 1;
  courseData: any;
  active: any;
  colleges: any;
  courses: any;
  authDetails: any;
  institute: any;
  instituteData: any;
  selectedValue;
  constructor(protected adminApi : AdminApiService,
    private router : Router,
    private authService : NbAuthService) {
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
    this.adminApi.getallInstituteRequest().subscribe((data)=>{
      this.institute = data['data'];
    })
    this.filterInput
      .valueChanges
      .debounceTime(200)
      .subscribe(term => {
      this.filterText = term;
    });
  }

  getInstituteManagement(e) {
    var index = e.index;
    if(index == 0){
      this.filterText = "";
      this.filterPlaceholder = "Search";
      this.adminApi.getallInstituteRequest().subscribe((data)=>{
        this.institute = data['data'];
      })
      this.filterInput
        .valueChanges
        .debounceTime(200)
        .subscribe(term => {
        this.filterText = term;
      });
    }else if(index == 1){
      this.filterText = "";
      this.filterPlaceholder = "Search";
      this.adminApi.getInstitute_list().subscribe((data)=>{
        this.instituteData = data['data'];
      })
      this.filterInput
        .valueChanges
        .debounceTime(200)
        .subscribe(term => {
        this.filterText = term;
      });
    }else if(index == 2){
      this.adminApi.getallAuthDetails().subscribe((data)=>{
        this.authDetails = data['data'];
      })
    }else if(index == 3){
      this.adminApi.getallColleges().subscribe((data)=>{
        this.colleges = data['data'];
      })
    }
  }

  getCourse(value){
    this.filterText = "";
    this.filterPlaceholder = "Search";
    this.adminApi.getAllCourse(value).subscribe((data)=>{
      this.courses = data['data'];
    })
    this.filterInput
      .valueChanges
      .debounceTime(200)
      .subscribe(term => {
      this.filterText = term;
    });
  }

  course_status(status,id){
    this.adminApi.courseStatus(status,id).subscribe((data)=>{
      this.ngOnInit();
      alert('updated sucessfully');
    })
  }

  college_status(status,id){
    this.adminApi.college_status(status,id).subscribe((data)=>{
      this.ngOnInit();
      alert('updated sucessfully');
    })
  }

  viewMore(id){
    this.router.navigate(['pages/adminInstituteView'],{queryParams:{id : id}});
  }
}
