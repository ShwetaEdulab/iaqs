import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InstituteApiService } from '../../shared/instituteapi.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent implements OnInit {
  searchForm: FormGroup;
  searchdegrees: any = [];
  searchCourse : any = [];
  searchspecializaion : any = [];
  d;
  cour;
  spec;
  degreename;
  

  constructor(
    protected router : Router,
    protected instituteApi : InstituteApiService,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {

    this.searchForm = this.fb.group({
      degreeCtrl : ['',Validators.required],
      courseCtrl : ['', Validators.required],
      specializationCtrl:['', Validators.required]
    });

    this.instituteApi.getCourseList().subscribe(data=>{
      this.searchdegrees = data['data']['degrees'];
   
    })
  }

  

  getcourse(name){
    this.degreename = name
    this.instituteApi.getCourse(name)
    .subscribe(data => {
      this.searchCourse =  data['data']['courseObj'];

    });
  }

  getspecialization(name){
    this.instituteApi.getspecialization(name,this.degreename)
    .subscribe(data => {
      this.searchspecializaion =  data['data']['specialization'];
    });
  }

  onSearch(){
    this.searchForm.controls.degreeCtrl.markAsDirty();
    this.searchForm.controls.courseCtrl.markAsDirty();
    this.searchForm.controls.specializationCtrl.markAsDirty();
    
    var degreename = this.searchForm.controls.degreeCtrl.value;
    var coursename = this.searchForm.controls.courseCtrl.value;
    var specialization = this.searchForm.controls.specializationCtrl.value;
    if(coursename != '' && specialization != '' && degreename != '' && coursename != undefined && specialization != undefined && degreename != undefined){
      this.instituteApi.getCourseId(degreename,coursename,specialization)
      .subscribe(data => {
        if(data['status'] == '200'){
          var res_data = data['data'][0];
          this.router.navigate(['pages/course-management'],{queryParams:{courseId:res_data.id, name:res_data.name, specialization: res_data.specialization}});
        }
      });
    }else{
      //this.Dropdown = 2;
    }
  }

  courseAddEdit(){
    this.router.navigate(['pages/course-management']);
  }

}
