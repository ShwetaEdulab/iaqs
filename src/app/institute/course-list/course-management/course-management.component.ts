import { Component, OnInit, Renderer2, ElementRef, ComponentFactoryResolver, ViewChild, ViewContainerRef } from '@angular/core';
import { FormControl, FormBuilder,
  FormGroup,
  Validators, } from '@angular/forms';
import { InstituteApiService } from '../../../shared/instituteapi.service';
import { config } from '../../../../../config';
import { UserService } from '../../../@core/data/users.service'  // '../../@core/data/users.service';
import { NbDialogService } from '@nebular/theme';
import { facultyComponent } from '../dialog/facultycomponent';
import { Router, ActivatedRoute } from '@angular/router';
import { curriculumComponent } from '../dialog/curriculumcomponent';

@Component({
  selector: 'course-management',
  templateUrl: './course-management.component.html',
  styleUrls: ['./course-management.component.scss']
})
export class CourseManagementComponent implements OnInit {
  @ViewChild('viewContainerRef', { read: ViewContainerRef }) VCR: ViewContainerRef;
  index: number = 0;
  componentsReferences = [];
  collegeId : any;
  courseID;
  currId;
  date = new Date();
  min: Date;
  max = new Date();
  degreeName
  course_from;
  course_to;
  intake_from;
  intake_to;
  degreeNameValues;
  courseOverviewValues;
  curriculumValues = {
    academics:[]
  };
  facultyValues = [];
  tab_type;
  courseCheck = true;
  saveData = false;
  public filterText: string;
  public filterPlaceholder: string;
  public filterInput = new FormControl();
  serverUrl = config.serverUrl;
  appdate;

  courseOverviewForm: FormGroup;
  latedate: any;
  commencementdate: any;
  commencementtime: any;

  constructor(
    protected instituteApi : InstituteApiService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private userService: UserService,
    private renderer:Renderer2,
    private el: ElementRef,
    private dialogService: NbDialogService,
    protected router : Router,
    private CFR: ComponentFactoryResolver
  ) { }

  ngOnInit() {
    this.userService.onUserChange()
    .subscribe(
      (user: any) => {
        this.collegeId = user['collegeId'];
    });
    this.courseID = this.route.snapshot.queryParamMap.get('courseId');
    this.courseOverview();

  }

  public courseOverview(): void {
    this.courseOverviewForm = this.fb.group({
      degreeNameCtrl : ['', [Validators.required,]],
      courseNameCtrl : ['', [Validators.required, Validators.minLength(3), Validators.pattern('[a-zA-Z ]*')]],
      courseSpecializationCtrl : ['', [Validators.required,Validators.minLength(3)]],
      fromDateCtrl : ['', [Validators.required,]],
      toDateCtrl : ['', [Validators.required,]],
      intakefromDateCtrl : ['', [Validators.required,]],
      intaketoDateCtrl : ['', [Validators.required,]],
      // NRIseatsCtrl : [''],
      // PIOseatsCtrl : [''],
      // OCIseatsCtrl : [''],
      scseatsCtrl : [''],
      stseatsCtrl : [''],
      dtaseatsCtrl : [''],
      ntbseatsCtrl : [''],
      ntcseatsCtrl : [''],
      ntdseatsCtrl : [''],
      obcseatsCtrl : [''],
      generalseatsCtrl : [''],
      TotalseatsCtrl : [''],
      courseFeeCtrl : [''],
      bankNameCtrl : [''],
      branchNameCtrl : [''],
      accountNameCtrl : [''],
      accNoCtrl : [''],
      IFSCCodeCtrl : [''],
      courseOverviewCtrl : ['',[Validators.maxLength(2500)]],
      courseDescriptionCtrl : ['',[Validators.maxLength(2500)]],
      admissionProcedureCtrl : [''],
      femalepopulationCtrl : ['', [Validators.required,]],
      malepopulationCtrl : ['', [Validators.required,]],
      appFormDateCtrl : [''],
      LateFeeFormDateCtrl : [''],
      Date_of_commencementctrl : [''],
      Date_of_commencement_timectrl : [''],
    });

    this.instituteApi.courseList(this.courseID).subscribe(data=>{
      //courseCheck
      if(data['data']['courseId'] != ''){
        this.courseCheck = false;
      }
      this.degreeNameValues = data['data']['degrees'];
      this.courseOverviewValues = data['data']['course_overview'];
      var duration_from1 = data['data']['course_overview']['duration_from'];
      var duration_to1 = data['data']['course_overview']['duration_to'];
      this.course_from = duration_from1 ? new Date(data['data']['course_overview']['duration_from']) : null;
      this.course_to = duration_to1 ? new Date(data['data']['course_overview']['duration_to']) : null;
      var intake_from1 = data['data']['course_overview']['intake_from'];
      var intake_to1 = data['data']['course_overview']['intake_to'];
      this.intake_from = intake_from1 ? new Date(data['data']['course_overview']['intake_from']) : null;
      this.intake_to = intake_to1 ? new Date(data['data']['course_overview']['intake_to']) : null;
      this.degreeName = data['data']['course_overview']['degree'];
      this.facultyValues = data['data']['faculties'];
      this.curriculumValues = data['data']['academics_fees'];
      this.appdate = data['data']['course_overview']['appform'] ? new Date(data['data']['course_overview']['appform']) : null;
      this.latedate = data['data']['course_overview']['latefee'] ? new Date(data['data']['course_overview']['latefee']) : null;
      this.commencementdate = data['data']['course_overview']['commencementdate'] ? new Date(data['data']['course_overview']['commencementdate']) : null;
      this.commencementtime = data['data']['course_overview']['commencementtime'] ? new Date(data['data']['course_overview']['commencementtime']) : null ;
    })
  }

  saveCourseOverview(){
    this.courseOverviewForm.get('appFormDateCtrl').disable();
    this.courseOverviewForm.get('LateFeeFormDateCtrl').disable();
    this.courseOverviewForm.get('Date_of_commencementctrl').disable();
    this.courseOverviewForm.controls.courseNameCtrl.markAsDirty();
    this.courseOverviewForm.controls.courseSpecializationCtrl.markAsDirty();
    this.courseOverviewForm.controls.fromDateCtrl.markAsDirty();
    this.courseOverviewForm.controls.toDateCtrl.markAsDirty();
    this.courseOverviewForm.controls.intakefromDateCtrl.markAsDirty();
    this.courseOverviewForm.controls.intaketoDateCtrl.markAsDirty();
    this.courseOverviewForm.controls.femalepopulationCtrl.markAsDirty();
    this.courseOverviewForm.controls.malepopulationCtrl.markAsDirty();
    if(this.courseOverviewForm.valid){
      var overview_data = {
        DegreeName : this.courseOverviewForm.controls.degreeNameCtrl.value,
        CourseName : this.courseOverviewForm.controls.courseNameCtrl.value,
        CourseSpecialization : this.courseOverviewForm.controls.courseSpecializationCtrl.value,
        CoursefromDate : this.courseOverviewForm.controls.fromDateCtrl.value,
        CoursetoDate : this.courseOverviewForm.controls.toDateCtrl.value,
        IntakefromDate : this.courseOverviewForm.controls.intakefromDateCtrl.value,
        IntaketoDate : this.courseOverviewForm.controls.intaketoDateCtrl.value,
        // NRIseats : this.courseOverviewForm.controls.NRIseatsCtrl.value,
        // PIOseats : this.courseOverviewForm.controls.PIOseatsCtrl.value,
        // OCIseats : this.courseOverviewForm.controls.OCIseatsCtrl.value,
        SCseats : this.courseOverviewForm.controls.scseatsCtrl.value,
        STseats : this.courseOverviewForm.controls.stseatsCtrl.value,
        DTAseats : this.courseOverviewForm.controls.dtaseatsCtrl.value,
        NTBseats : this.courseOverviewForm.controls.ntbseatsCtrl.value,
        NTCseats : this.courseOverviewForm.controls.ntcseatsCtrl.value,
        NTDseats : this.courseOverviewForm.controls.ntdseatsCtrl.value,
        OBCseats : this.courseOverviewForm.controls.obcseatsCtrl.value,
        Generalseats : this.courseOverviewForm.controls.generalseatsCtrl.value,  
        totalseats : this.courseOverviewForm.controls.TotalseatsCtrl.value,
        CourseFee : this.courseOverviewForm.controls.courseFeeCtrl.value,
        BankName : this.courseOverviewForm.controls.bankNameCtrl.value,
        BranchName : this.courseOverviewForm.controls.branchNameCtrl.value,
        AccountName : this.courseOverviewForm.controls.accountNameCtrl.value,
        AccountNo : this.courseOverviewForm.controls.accNoCtrl.value,
        IFSCCode : this.courseOverviewForm.controls.IFSCCodeCtrl.value,
        CourseOverview : this.courseOverviewForm.controls.courseOverviewCtrl.value,
        CourseDescription : this.courseOverviewForm.controls.courseDescriptionCtrl.value,
        AdmissionProcedure : this.courseOverviewForm.controls.admissionProcedureCtrl.value,
        FemalePopulation : this.courseOverviewForm.controls.femalepopulationCtrl.value,
        Malepopulation : this.courseOverviewForm.controls.malepopulationCtrl.value,
        lastDateAppForm : this.courseOverviewForm.controls.appFormDateCtrl.value,
        LateFeeFormDate : this.courseOverviewForm.controls.LateFeeFormDateCtrl.value,
        Dateofcommencement :this.courseOverviewForm.controls.Date_of_commencementctrl.value,
        DateofcommencementTime :this.courseOverviewForm.controls.Date_of_commencement_timectrl.value,
      }
      this.instituteApi.saveCourseOverview(this.collegeId,overview_data,this.courseID)
      .subscribe(
        (data: any) => {
          if(data['status']== 200){
            this.courseID = data['data']['courseId'];
            this.saveData = true;
          }
          err => console.error(err)
        });
   
    }else{
      const invalid = [];
      const controls = this.courseOverviewForm.controls;
      for (const name in controls) {
        if (controls[name].invalid) {
            invalid.push(name);
        }
      }
      //return invalid;
      //console.log("invalid========>"+invalid)
    }
  }

  //faculty functions

  addFaculty(){
    this.dialogService.open(facultyComponent, {
      closeOnBackdropClick : false,
      context: {
        courseID: this.courseID,
      },
    }).onClose
      .subscribe(
        (data: any) => {
          this.courseOverview();
          // err => console.error(err)
        })
  }

  deleteFaculty(id){
    this.instituteApi.deleteFaculty(id)
      .subscribe(
        (data: any) => {
          if(data['status']== 200){
            this.refreshFaculty();
          }
          err => console.error(err)
        });
  }

  refreshFaculty(){
    this.instituteApi.courseList(this.courseID).subscribe(data=>{
      this.facultyValues = data['data']['faculties'];
    })

  }

  backtocourse(){
    this.router.navigate(['pages/course-list']);
  }
  
  //Course Curriculum
  addCurriculum(id){
    this.dialogService.open(curriculumComponent, {
      closeOnBackdropClick : false,
      context: {
        courseID: this.courseID,
        currId : id
      },
    }).onClose
      .subscribe(
        (data: any) => {
          this.refreshCurriculum();
        })
  }

  refreshCurriculum(){
    this.instituteApi.courseList(this.courseID).subscribe(data=>{
      this.curriculumValues = data['data']['academics_fees'];
    })
  }

  deleteCurriculum(id){
    this.instituteApi.deleteCurriculum(this.collegeId,this.courseID,id).subscribe(data=>{
      if(data['status'] == 200){
        this.refreshCurriculum();
      }
    })
  }

}
