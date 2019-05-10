import { Component, Input,} from '@angular/core';
import { NbDialogRef, NbThemeService, } from '@nebular/theme';
import { ApiService } from '../../../shared/api.service';
import { UserService } from '../../../@core/data/users.service';
import {ConfirmationService} from 'primeng/api';
import { FormBuilder, FormGroup,Validators, FormArray, FormControl } from '@angular/forms';
import { InstituteApiService } from '../../../shared/instituteapi.service';

@Component({
selector: 'nb-dialog',
template: `
<nb-card [style.overflow]="'auto'" [style.height.px]="'600'">
  <nb-card-header>
    <div class="modal-header">               
      <div class="popupTitle"><h4>Add Academics</h4></div>
      <button nbButton shape="semi-round" size="small" outline (click)="dismiss()">Close</button>
    </div>
  </nb-card-header>
  <nb-card-body>
    <form [formGroup]="myForm" (ngSubmit)="submit()">
      <div class="row">
        <div class="col-xl-8">
          <label>Select Semester<span style="color:red;">*</span></label>
          <mat-form-field>
            <mat-select [(ngModel)]="semesterName" name="selectedsemester" formControlName="selectedsemesterCtrl">
              <mat-option *ngFor="let semesterValue of semesterValues" [value]="semesterValue">
                {{semesterValue}}
              </mat-option>
            </mat-select>
          </mat-form-field>
        </div>
        <div class="col-xl-4">
          <button type="button" size="xsmall" nbButton (click)="addSubject()">Add Subject</button>
        </div>
      </div>
      <fieldset formArrayName="items">
        <h6>Subjects</h6>
        <span *ngIf="subjecterror == true"  style="color:red;">
          Please add the subject.
        </span>
        <div class="form-group row" *ngFor="let item of myForm.get('items')['controls']; let i=index" [formGroup]="item">
          <div class="col-xl-8">
            <label [attr.for]="'name'+i">Name{{i+1}}</label>
            <input type="text" class="form-control" [attr.id]="'name'+i" formControlName="name" placeholder="Enter subjects">
          </div>
          <div class="col-xl-2" py-1>
            <label></label><br>
            <button type="button" nbButton outline status="danger" (click)="myForm.get('items').removeAt(i)">-</button>
          </div>
        </div>
      </fieldset>
      <div class="form-group row">
        <div class="col-xl-12">
          
        </div>
      </div>
      <hr>
      <div class="form-group">
        <input type="submit" class="form-control" value="Submit">
      </div>
    </form>
    </nb-card-body>
  <nb-card-footer>
  </nb-card-footer>
</nb-card>
`,
providers:[ConfirmationService],
})

export class curriculumComponent {

  myForm: FormGroup;
  @Input() title: string;
  @Input()  courseID :string;
  @Input()  currId :string;
  
  semesterValues = [
  "Semester 1",
  "Semester 2",
  "Semester 3",
  "Semester 4",
  "Semester 5",
  "Semester 6",
  "Semester 7",
  "Semester 8",
  "Semester 9",
  "Semester 10",
  "Semester 11",
  "Semester 12",
  "Semester 13",
  "Semester 14",
  "Semester 15",
];
subjecterror = false;
user = { name : "", id:"",collegeId:""};
collegeId;
multiple_subjects=[];
singleSubject;
semesterName;

  constructor(
    private fb: FormBuilder,
    protected ref: NbDialogRef<curriculumComponent>,
    protected instituteApi : InstituteApiService,
    protected api : ApiService,
    private userService: UserService,
    public themeService : NbThemeService,
    
  ) {}

  ngOnInit() {
    this.api.getTheme().subscribe((data: any) => {
      if(data['data']){
        this.themeService.changeTheme(data['data']);
      }else{
        this.themeService.changeTheme('default');
      }
    });

    // build the form model
    this.myForm = this.fb.group({
      selectedsemesterCtrl : ['', [Validators.required,]],
      items: this.fb.array(
        [ ],
      )
    })

    this.userService.onUserChange()
    .subscribe(
      (user: any) => {
        this.collegeId = user['collegeId'];
    });

    if(this.currId!=null){
      this.instituteApi.getCurriculum(this.currId,this.courseID,this.collegeId).subscribe(
        (data: any) => {
          if(data['status']== 200){
            this.semesterName = data['data']['name'];
            var subjects = JSON.parse(data['data']['subjects']);
            var subjects_length = JSON.parse(data['data']['subjects']).length;
            this.multiple_subjects = subjects;
            subjects.forEach(subject =>{
              (<FormArray>this.myForm.controls['items']).push(this.buildItem(subject));
            })
          }
          err => console.error(err)
      });
    }
  }

  submit() {
    if(this.myForm.valid && this.myForm.value.items.length > 0){
      var semester = this.myForm.value.selectedsemesterCtrl;
      var subjects_values = this.myForm.value.items;
      var subjects_length = this.myForm.value.items.length;
      var all_subject_array = [];
      subjects_values.forEach(function(element) {
        all_subject_array.push(element.name);
      });
      this.instituteApi.addUpdateCurriculum(this.collegeId,this.courseID,semester,all_subject_array,this.currId).subscribe(
        (data: any) => {
          if(data['status']== 200){
            this.ref.close();
          }
          err => console.error(err)
      });
    }else if(!this.myForm.valid){
      this.subjecterror = true;
    }else if(this.myForm.value.items.length == 0){
      this.subjecterror = true;
    }
  }

  addSubject(){
    var value = '';
    (<FormArray>this.myForm.controls['items']).push(this.buildItem(value));
  }

  buildItem(val: string) {
    return new FormGroup({
      name: new FormControl(val, Validators.required),
    })
  }

  dismiss() {
    this.ref.close();
  }

}