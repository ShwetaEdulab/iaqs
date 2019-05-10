import {Component} from '@angular/core';
import { NbSearchService } from '@nebular/theme';
import { SearchService } from '../../shared/search.service';
import { Router,ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup,Validators, FormControl, } from '@angular/forms';
import { ApiService } from '../../shared/api.service';
import { Observable } from 'rxjs';
import {Data} from '../../shared/data';
import { RouterExtService } from '../../shared/identifyUrl';
import { HeaderComponent } from '../../@theme/components/header/header.component';
@Component({
  selector: 'search',
  styleUrls: ['./search.component.scss'],
  templateUrl: './search.component.html',
  providers:[HeaderComponent],
})
export class SearchComponent  {
  myControl = new FormControl();
  colleges: any = [];
  p: number = 1;
  collection: any[] = this.colleges;  
  courses : any = [];
  courseCount: number = 0; 
  collegeCount: number = 0;
  courseFlag : any =false;
  collegeFlag : any =false;
  Dropdown = 0;
  searchForm: FormGroup;
  searchCourses: any = [];
  searchSpecialization : any = [];
  loading = true;
  loadingbutton = true;
  filteredOptions: Observable<string[]>;
  search_college_course;
  Result_title :string = "";
  val;
  d;
  spec;
  public filterText: string;
  public filterPlaceholder: string;
  public filterInput = new FormControl();
  urrl;
  college_url;
  constructor(private searchService: NbSearchService,
              private customsearch : SearchService,
              private router : Router,
              protected api : ApiService, 
              private fb: FormBuilder,
              private route : ActivatedRoute,
              private data : Data,
              private routerExtService : RouterExtService,
              private comp: HeaderComponent,
            ) {
   
  }

  courseSearch(){
    this.data.storage = {
      search_data : this.search_college_course,
      search : "Course_Search",
    }
    this.Result_title ="Course";
    this.filterText = "";
    this.filterPlaceholder = "Filter by College Name";
    this.customsearch.getCoursedata(this.search_college_course).subscribe(res => {
    this.courses = res;
    this.courseCount = this.courses.length;
     this.courseFlag=true;
      this.collegeFlag=false;
      this.filterInput
      .valueChanges
      .debounceTime(200)
      .subscribe(term => {
        this.filterText = term;
      });

    });   

}

startSearch() {
  this.data.storage = {
    search_data : this.search_college_course,
    search : "College_Search",
  }
  
  this.Result_title ="College";
  this.customsearch.getSearchdata(this.search_college_course).subscribe(res=> {
    this.colleges = res;
    this.collegeCount = this.colleges.length;
    this.collegeFlag=true;
    this.courseFlag=false;
  });     

}

collegeList(collegeid){
  this.router.navigate(['pages/college'],{queryParams:{college_id:collegeid}});
}
 
  
CourseList(course_id,specialization){
  this.router.navigate(['pages/course'],{queryParams:{course_id:course_id,specialization:specialization}});
}

getspecialization(name){
  this.api.getSpecialization(name)
  .subscribe(data => { 
    this.searchSpecialization =  data['data']['specialization'];
  });
}

onApply(){
  this.searchForm.controls.courseCtrl.markAsDirty();
  this.searchForm.controls.specializationCtrl.markAsDirty();
  var coursename = this.searchForm.controls.courseCtrl.value;
  var specialization = this.searchForm.controls.specializationCtrl.value;
  this.data.setValue(coursename,specialization);
  if(coursename != 'undefined' && specialization != 'undefined' && coursename != undefined && specialization != undefined){
    this.router.navigate(['pages/search/course'],{queryParams:{coursename:coursename,specialization:specialization}});
  }else{
    this.Dropdown = 2;
  }
}

onClose(){
  this.Dropdown = 0;
}

ngOnInit() {
  this.data.getVal();
  var subject = this.data.getVal();
  var data = subject.split('/');
  this.d = data[0];
  this.spec = data[1];
  this.loading = true;
  this.loadingbutton = true;
  this.api.getTheme();



let previous = this.routerExtService.getPreviousUrl();
  this.urrl = previous.substring(0,13)
  this.college_url = previous.substring(0,14)


  if(this.urrl== "/pages/course"){
        
    if(!(this.data.storage==undefined)) {
         
      this.search_college_course = this.data.storage.search_data;
      this.courseSearch();
         
    } 
  }else if(this.college_url == "/pages/college"){

    if(!(this.data.storage==undefined)) {
        this.search_college_course = this.data.storage.search_data;
        this.startSearch();
    } 
    
  }else{

        this.search_college_course = null;
  }


  if(this.route.snapshot.queryParamMap.get('postal_code') != null){
    var collegeData = this.api.getCollegesByPincode(this.route.snapshot.queryParamMap.get('postal_code'));
    collegeData.subscribe(data =>{
      this.colleges = data['data'];
      this.collegeCount = this.colleges.length;
      this.collegeFlag=true;
    });
  } 
  this.searchForm = this.fb.group({
    courseCtrl:['', Validators.required],
    specializationCtrl:['', Validators.required]
  });

  this.api.getCourse()
  .subscribe(data => { 
    this.searchCourses =  data['data']['courses'];
    this.loading = false;
    this.loadingbutton = false;
  });
}

openQuickApply(){
  this.search_college_course = null;
  this.collegeFlag = false;
  this.courseFlag = false;
}

redirectToPeers(college_id,id){
  this.router.navigate(['pages/peers'],{queryParams:{college_id:college_id,cour_id:id}}); 
 }
}
