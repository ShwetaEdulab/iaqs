import { Component, Input } from '@angular/core';
import { NbDialogRef,NbDialogService, NbThemeService } from '@nebular/theme';
import { ApiService } from '../../../shared/api.service';
import { FormBuilder, FormGroup,Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { find_College_Diploma } from './find_college_diploma';
import { CountriesService } from '../../../@core/data/countries.service';

@Component({
selector: 'nb-dialog',
template: `
<nb-card class="col-xl-6 offset-xl-3" [style.height.px]="700" [style.overflow]="'auto'"> 
<nb-card-header>
<div class="row">
  <div class="col-md-9">Diploma Marks Details</div>
</div>
</nb-card-header>
  <nb-card-body [nbSpinner]="loadingbutton">
  <form [formGroup]="diploma_form"  class="step-container">
    <div class="row">
      <div class="col-md-3">Name of University/Board : </div>
      <div class="col-md-9"> <input pattern="[A-Za-z ]+"  ngModel="{{diploma_marks?.diploma_university}}" nbInput type="text" [ngClass]="{'form-control-danger': diploma_form.controls.diplomaUniversityCtrl.invalid && (diploma_form.controls.diplomaUniversityCtrl.dirty || diploma_form.controls.diplomaUniversityCtrl.touched)}" formControlName="diplomaUniversityCtrl" placeholder="" id="" class="form-control"> </div><br>
      <div class="col-md-3">School/College Name : </div>
      <div class="col-md-9"> <input ngModel="{{diploma_marks?.diploma_coll_name}}" nbInput type="text"  [ngClass]="{'form-control-danger': diploma_form.controls.diplomaCollegeCtrl.invalid && (diploma_form.controls.diplomaCollegeCtrl.dirty || diploma_form.controls.diplomaCollegeCtrl.touched)}" formControlName="diplomaCollegeCtrl" placeholder="" id="" class="form-control"> </div><br>
      <div class="col-md-3">Address of School/College : </div>
      <div class="col-md-9"> <input ngModel="{{diploma_marks?.diploma_add}}" nbInput type="text"  [ngClass]="{'form-control-danger': diploma_form.controls.diplomaAddCtrl.invalid && (diploma_form.controls.diplomaAddCtrl.dirty || diploma_form.controls.diplomaAddCtrl.touched)}" formControlName="diplomaAddCtrl" placeholder="" id="" class="form-control"> </div><br>
      <div class="col-md-3">Email address : </div>
      <div class="col-md-9"> <input ngModel="{{diploma_marks?.diploma_email}}" nbInput type="text"  [ngClass]="{'form-control-danger': diploma_form.controls.diplomaEmailCtrl.invalid && (diploma_form.controls.diplomaEmailCtrl.dirty || diploma_form.controls.diplomaEmailCtrl.touched)}" formControlName="diplomaEmailCtrl" placeholder="" id="" class="form-control"> </div><br>
      <div class="col-md-3">URL : </div>
      <div class="col-md-9"> <input pattern="(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})" ngModel="{{diploma_marks?.diploma_url}}" nbInput type="text"  [ngClass]="{'form-control-danger': diploma_form.controls.diplomaUrlCtrl.invalid && (diploma_form.controls.diplomaUrlCtrl.dirty || diploma_form.controls.diplomaUrlCtrl.touched)}" formControlName="diplomaUrlCtrl" placeholder="" id="" class="form-control"> </div><br>
      <div class="col-md-3">Date Of Result : </div>
      <div class="col-md-9"> <input readonly ngModel="{{diploma_marks?.diploma_result_date}}" nbInput type="text"  [ngClass]="{'form-control-danger': diploma_form.controls.diplomaResultDateCtrl.invalid && (diploma_form.controls.diplomaResultDateCtrl.dirty || diploma_form.controls.diplomaResultDateCtrl.touched)}" formControlName="diplomaResultDateCtrl" placeholder="DD/MM/YY" class="form-control"[nbDatepicker]="picker"> <nb-datepicker #picker [(date)]="date" [max]="max"></nb-datepicker></div><br>
      <div class="col-md-3">Roll No / Seat No : </div>
      <div class="col-md-9"> <input pattern="[A-Za-z0-9]+" ngModel="{{diploma_marks?.diploma_rollNo}}" nbInput type="text"  [ngClass]="{'form-control-danger': diploma_form.controls.diplomaRollNoCtrl.invalid && (diploma_form.controls.diplomaRollNoCtrl.dirty || diploma_form.controls.diplomaRollNoCtrl.touched)}" formControlName="diplomaRollNoCtrl" placeholder="" id="" class="form-control"> </div><br>
      <div class="col-md-3">Cert No : </div>
      <div class="col-md-9"> <input ngModel="{{diploma_marks?.diploma_certi_no}}" nbInput type="text"  [ngClass]="{'form-control-danger': diploma_form.controls.diplomacertiNoCtrl.invalid && (diploma_form.controls.diplomacertiNoCtrl.dirty || diploma_form.controls.diplomacertiNoCtrl.touched)}" formControlName="diplomacertiNoCtrl" placeholder="" id="" class="form-control"> </div><br>
      <div class="col-md-3">Medium of Instruction at school(English/Others) : </div>
      <div class="col-md-9"> <input pattern="[A-Za-z]+" ngModel="{{diploma_marks?.diploma_medium}}" nbInput type="text"  [ngClass]="{'form-control-danger': diploma_form.controls.diplomaMediumCtrl.invalid && (diploma_form.controls.diplomaMediumCtrl.dirty || diploma_form.controls.diplomaMediumCtrl.touched)}" formControlName="diplomaMediumCtrl" placeholder="" id="" class="form-control"> </div><br>
      <div class="col-md-3">Name of Diploma : </div>
      <div class="col-md-9"> <input ngModel="{{diploma_marks?.diploma_name}}" nbInput type="text"  [ngClass]="{'form-control-danger': diploma_form.controls.diplomaNameCtrl.invalid && (diploma_form.controls.diplomaNameCtrl.dirty || diploma_form.controls.diplomaNameCtrl.touched)}" formControlName="diplomaNameCtrl" placeholder="" id="" class="form-control"> </div><br>

      <div class="col-md-3">Subject :</div>
      <div class="col-md-2"><input  ngModel="{{diploma_marks?.Subject_first_dip}}" nbInput type="text"  [ngClass]="{'form-control-danger': diploma_form.controls.subjectFirstDipCtrl.invalid && (diploma_form.controls.subjectFirstDipCtrl.dirty || diploma_form.controls.subjectFirstDipCtrl.touched)}" formControlName="subjectFirstDipCtrl" placeholder="Subject1" id="" class="form-control"></div>
      <div class="col-md-2"><input pattern="[0-9]+" ngModel="{{diploma_marks?.mark_first_dip}}" nbInput type="text"  [ngClass]="{'form-control-danger': diploma_form.controls.markFirstDipCtrl.invalid && (diploma_form.controls.markFirstDipCtrl.dirty || diploma_form.controls.markFirstDipCtrl.touched)}" formControlName="markFirstDipCtrl" placeholder="Marks" id="" class="form-control"></div>
      <div class="col-md-2"><input pattern="[0-9]+" ngModel="{{diploma_marks?.OutOf_first_dip}}" nbInput type="text"  [ngClass]="{'form-control-danger': diploma_form.controls.outOfFirstDipCtrl.invalid && (diploma_form.controls.outOfFirstDipCtrl.dirty || diploma_form.controls.outOfFirstDipCtrl.touched)}" formControlName="outOfFirstDipCtrl" placeholder="Out of" id="" class="form-control"></div> OR <div
        class="col-md-2"> <input [ngClass]="{'form-control-danger': diploma_form.controls.gradeFirstDipCtrl.invalid && (diploma_form.controls.gradeFirstDipCtrl.dirty || diploma_form.controls.gradeFourthDipCtrl.touched)}"  ngModel="{{diploma_marks?.grade_first_dip}}" nbInput type="text"  formControlName="gradeFirstDipCtrl"  placeholder="Grade" id="" class="form-control"> </div><br>
      <div class="col-md-3"></div>
      <div class="col-md-2"><input  ngModel="{{diploma_marks?.Subject_Second_dip}}" nbInput type="text"  [ngClass]="{'form-control-danger': diploma_form.controls.subjectSecondDipCtrl.invalid && (diploma_form.controls.subjectSecondDipCtrl.dirty || diploma_form.controls.subjectSecondDipCtrl.touched)}" formControlName="subjectSecondDipCtrl" placeholder="Subject2" id="" class="form-control"></div>
      <div class="col-md-2"><input pattern="[0-9]+" ngModel="{{diploma_marks?.mark_Second_dip}}" nbInput type="text"  [ngClass]="{'form-control-danger': diploma_form.controls.markSecondDipCtrl.invalid && (diploma_form.controls.markSecondDipCtrl.dirty || diploma_form.controls.markSecondDipCtrl.touched)}" formControlName="markSecondDipCtrl" placeholder="Marks" id="" class="form-control"></div>
      <div class="col-md-2"><input pattern="[0-9]+" ngModel="{{diploma_marks?.OutOf_Second_dip}}" nbInput type="text"  [ngClass]="{'form-control-danger': diploma_form.controls.outOfSecondDipCtrl.invalid && (diploma_form.controls.outOfSecondDipCtrl.dirty || diploma_form.controls.outOfSecondDipCtrl.touched)}" formControlName="outOfSecondDipCtrl" placeholder="Out of" id="" class="form-control"></div> OR <div
        class="col-md-2"> <input [ngClass]="{'form-control-danger': diploma_form.controls.gradeSecondDipCtrl.invalid && (diploma_form.controls.gradeSecondDipCtrl.dirty || diploma_form.controls.gradeSecondDipCtrl.touched)}" ngModel="{{diploma_marks?.grade_Second_dip}}" nbInput type="text"  formControlName="gradeSecondDipCtrl" placeholder="Grade" id="" class="form-control"> </div><br>
      <div class="col-md-3"></div>
      <div class="col-md-2"><input  ngModel="{{diploma_marks?.Subject_Third_dip}}" nbInput type="text" [ngClass]="{'form-control-danger': diploma_form.controls.subjectThirdDipCtrl.invalid && (diploma_form.controls.subjectThirdDipCtrl.dirty || diploma_form.controls.subjectThirdDipCtrl.touched)}" formControlName="subjectThirdDipCtrl" placeholder="Subject3" id="" class="form-control"></div>
      <div class="col-md-2"><input pattern="[0-9]+" ngModel="{{diploma_marks?.mark_Third_dip}}" nbInput type="text" [ngClass]="{'form-control-danger': diploma_form.controls.markThirdDipCtrl.invalid && (diploma_form.controls.markThirdDipCtrl.dirty || diploma_form.controls.markThirdDipCtrl.touched)}" formControlName="markThirdDipCtrl" placeholder="Marks" id="" class="form-control"></div>
      <div class="col-md-2"><input pattern="[0-9]+" ngModel="{{diploma_marks?.OutOf_Third_dip}}" nbInput type="text" [ngClass]="{'form-control-danger': diploma_form.controls.outOfThirdDipCtrl.invalid && (diploma_form.controls.outOfThirdDipCtrl.dirty || diploma_form.controls.outOfThirdDipCtrl.touched)}" formControlName="outOfThirdDipCtrl" placeholder="Out of" id="" class="form-control"></div> OR <div
        class="col-md-2"> <input [ngClass]="{'form-control-danger': diploma_form.controls.gradeThirdDipCtrl.invalid && (diploma_form.controls.gradeThirdDipCtrl.dirty || diploma_form.controls.gradeThirdDipCtrl.touched)}" ngModel="{{diploma_marks?.grade_Third_dip}}" nbInput type="text"  formControlName="gradeThirdDipCtrl"  placeholder="Grade" id="" class="form-control"> </div><br>
      <div class="col-md-3"></div>
      <div class="col-md-2"><input  ngModel="{{diploma_marks?.Subject_fourth_dip}}" nbInput type="text" [ngClass]="{'form-control-danger': diploma_form.controls.subjectFourthDipCtrl.invalid && (diploma_form.controls.subjectFourthDipCtrl.dirty || diploma_form.controls.subjectFourthDipCtrl.touched)}" formControlName="subjectFourthDipCtrl" placeholder="Subject4" id="" class="form-control"></div>
      <div class="col-md-2"><input pattern="[0-9]+" ngModel="{{diploma_marks?.mark_fourth_dip}}" nbInput type="text" [ngClass]="{'form-control-danger': diploma_form.controls.markFourthDipCtrl.invalid && (diploma_form.controls.markFourthDipCtrl.dirty || diploma_form.controls.markFourthDipCtrl.touched)}" formControlName="markFourthDipCtrl" placeholder="Marks" id="" class="form-control"></div>
      <div class="col-md-2"><input pattern="[0-9]+" ngModel="{{diploma_marks?.OutOf_fourth_dip}}" nbInput type="text" [ngClass]="{'form-control-danger': diploma_form.controls.outOfFourthDipCtrl.invalid && (diploma_form.controls.outOfFourthDipCtrl.dirty || diploma_form.controls.outOfFourthDipCtrl.touched)}" formControlName="outOfFourthDipCtrl" placeholder="Out of" id="" class="form-control"></div> OR <div
        class="col-md-2"> <input [ngClass]="{'form-control-danger': diploma_form.controls.gradeFourthDipCtrl.invalid && (diploma_form.controls.gradeFourthDipCtrl.dirty || diploma_form.controls.gradeFourthDipCtrl.touched)}" ngModel="{{diploma_marks?.grade_fourth_dip}}" nbInput type="text"  formControlName="gradeFourthDipCtrl"  placeholder="Grade" id="" class="form-control"> </div><br>
      <div class="col-md-3"></div>
      <div class="col-md-2"><input  ngModel="{{diploma_marks?.Subject_fifth_dip}}" nbInput type="text" [ngClass]="{'form-control-danger': diploma_form.controls.subjectFifthDipCtrl.invalid && (diploma_form.controls.subjectFifthDipCtrl.dirty || diploma_form.controls.subjectFifthDipCtrl.touched)}" formControlName="subjectFifthDipCtrl"  placeholder="Subject5" id="" class="form-control"></div>
      <div class="col-md-2"><input pattern="[0-9]+" ngModel="{{diploma_marks?.mark_fifth_dip}}" nbInput type="text" [ngClass]="{'form-control-danger': diploma_form.controls.markFifthDipCtrl.invalid && (diploma_form.controls.markFifthDipCtrl.dirty || diploma_form.controls.markFifthDipCtrl.touched)}" formControlName="markFifthDipCtrl"  placeholder="Marks" id="" class="form-control"></div>
      <div class="col-md-2"><input pattern="[0-9]+" ngModel="{{diploma_marks?.OutOf_fifth_dip}}" [ngClass]="{'form-control-danger': diploma_form.controls.outOfFifthDipCtrl.invalid && (diploma_form.controls.outOfFifthDipCtrl.dirty || diploma_form.controls.outOfFifthDipCtrl.touched)}" nbInput type="text"  formControlName="outOfFifthDipCtrl"  placeholder="Out of" id="" class="form-control"></div> OR <div
        class="col-md-2"> <input ngModel="{{diploma_marks?.grade_fifth_dip}}" [ngClass]="{'form-control-danger': diploma_form.controls.gradeFifthDipCtrl.invalid && (diploma_form.controls.gradeFifthDipCtrl.dirty || diploma_form.controls.gradeFifthDipCtrl.touched)}" nbInput type="text"  formControlName="gradeFifthDipCtrl"  placeholder="Grade" id="" class="form-control"> </div><br>
      <div class="col-md-3"></div>
      <div class="col-md-2"><input  ngModel="{{diploma_marks?.Subject_Six_dip}}" [ngClass]="{'form-control-danger': diploma_form.controls.subjectSixthDipCtrl.invalid && (diploma_form.controls.subjectSixthDipCtrl.dirty || diploma_form.controls.subjectSixthDipCtrl.touched)}"nbInput type="text" formControlName="subjectSixthDipCtrl"  placeholder="Subject6" id="" class="form-control"></div>
      <div class="col-md-2"><input pattern="[0-9]+" [ngClass]="{'form-control-danger': diploma_form.controls.markSixthDipCtrl.invalid && (diploma_form.controls.markSixthDipCtrl.dirty || diploma_form.controls.markSixthDipCtrl.touched)}" ngModel="{{diploma_marks?.mark_Six_dip}}" nbInput type="text" formControlName="markSixthDipCtrl"  placeholder="Marks" id="" class="form-control"></div>
      <div class="col-md-2"><input pattern="[0-9]+" [ngClass]="{'form-control-danger': diploma_form.controls.outOfSixthDipCtrl.invalid && (diploma_form.controls.outOfSixthDipCtrl.dirty || diploma_form.controls.outOfSixthDipCtrl.touched)}" ngModel="{{diploma_marks?.OutOf_Six_dip}}" nbInput type="text" formControlName="outOfSixthDipCtrl"  placeholder="Out of" id="" class="form-control"></div> OR <div
        class="col-md-2"> <input ngModel="{{diploma_marks?.grade_Six_dip}}" [ngClass]="{'form-control-danger': diploma_form.controls.gradeSixthDipCtrl.invalid && (diploma_form.controls.gradeSixthDipCtrl.dirty || diploma_form.controls.gradeSixthDipCtrl.touched)}" nbInput type="text" formControlName="gradeSixthDipCtrl"  placeholder="Grade" id="" class="form-control"> </div><br>
        <div class="col-md-12"><span *ngIf="markError===true" style="color:red; font-weight: bold">Obtained marks should be less than Out of marks </span> </div>

      <div class="col-md-3">CGPA or Marks in % : </div>
      <div class="col-md-9"> <input ngModel="{{diploma_marks?.diploma_marks}}" nbInput type="text" [ngClass]="{'form-control-danger': diploma_form.controls.diplomaMarksCtrl.invalid && (diploma_form.controls.diplomaMarksCtrl.dirty || diploma_form.controls.diplomaMarksCtrl.touched)}" formControlName="diplomaMarksCtrl" placeholder="" id="" class="form-control"> </div><br>
    </div>
    </form>
  </nb-card-body>
  <nb-card-footer>
    <button nbButton hero status="primary" (click)="dismiss()">Close</button> 
    <button nbButton hero status="primary" style="margin-left:15px" (click)="savediploma()">Update</button>
  </nb-card-footer>
</nb-card>
`,
})
export class ThirdDialogComponent {
@Input() title: string;
diploma_marks;
diploma_form: FormGroup;
diploma_country;
max;
date;
Countries: any [];
diplomaCountryValidation = true;
readonly emailValidate = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
diploma_result_date: any;
loadingbutton = true;
markError = false;

constructor(protected ref: NbDialogRef<ThirdDialogComponent>,
  protected api : ApiService,
  private fb: FormBuilder,
  private dialogService: NbDialogService,
  protected countries :CountriesService,
  public themeService : NbThemeService
  ) {
    this.Countries = this.countries.getData();
  }

  dismiss() {
    this.ref.close();
  }

  ngOnInit() {
     this.api.getTheme().subscribe((data: any) => {
        if(data['data']){
          this.themeService.changeTheme(data['data']);
        }else{
          this.themeService.changeTheme('default');
        }
      });
    this.buildDiplomaForm();
  }


  private buildDiplomaForm() : void{
    
         
    this.api.getProfileValue('Education_diploma')
      .subscribe(
        (data: any) => {  
          this.diploma_marks =  data['data']['diploma_info'];
          this.loadingbutton = false;
          if(this.diploma_marks == null){
            this.diploma_result_date = null;
          }else{
            this.diploma_result_date = new Date(data['data']['diploma_info']['diploma_result_date']);
          }
          if(!( data['data']['diploma_info'] == null || data['data']['diploma_info'] == undefined || data['data']['diploma_info'] == '' )){
            this.diploma_country = data['data']['diploma_info']['diploma_country'];  
          }
          err => console.error(err)
      });

    this.diploma_form = this.fb.group({
          diplomaNameCtrl: [ '' ,  Validators.required],
          diplomaUniversityCtrl: [ '' ,  Validators.required],
          diplomaCollegeCtrl: ['', Validators.required],
          diplomaAddCtrl:['',  Validators.required],
          diplomaEmailCtrl:  ['', [Validators.required,Validators.pattern(this.emailValidate)]], 
          diplomaUrlCtrl:['',  Validators.required],
          diplomaResultDateCtrl: [ '',  Validators.required],
          diplomaRollNoCtrl:['',  Validators.required],
          diplomacertiNoCtrl:['',  Validators.required],
          diplomaMediumCtrl:['',  Validators.required],
          subjectFirstDipCtrl:['', Validators.required],
          markFirstDipCtrl:['',  Validators.required],
          outOfFirstDipCtrl:['',  Validators.required],
          gradeFirstDipCtrl : [''],
          subjectSecondDipCtrl:['', Validators.required],
          markSecondDipCtrl:['', Validators.required],
          outOfSecondDipCtrl:['',Validators.required ],
          gradeSecondDipCtrl : [''],
          subjectThirdDipCtrl:['',  Validators.required],
          markThirdDipCtrl:['', Validators.required],
          outOfThirdDipCtrl:['', Validators.required],
          gradeThirdDipCtrl:[''],
          subjectFourthDipCtrl:['', Validators.required],
          markFourthDipCtrl:['', Validators.required],
          outOfFourthDipCtrl:['', Validators.required],
          gradeFourthDipCtrl : [''],
          subjectFifthDipCtrl:['', ],
          markFifthDipCtrl:['', ],
          outOfFifthDipCtrl:['', ],
          gradeFifthDipCtrl : [''],
          subjectSixthDipCtrl:['', ],
          markSixthDipCtrl:['', ],
          outOfSixthDipCtrl:['', ],
          gradeSixthDipCtrl : [''],
          diplomaMarksCtrl:['', Validators.required],
        });
    }  


    savediploma() {
      var validation = true;
      
      if (this.diploma_form.valid==false){
        
        this.diploma_form.controls.diplomaNameCtrl.markAsDirty();
        this.diploma_form.controls.diplomaUniversityCtrl.markAsDirty();
        this.diploma_form.controls.diplomaCollegeCtrl.markAsDirty();
        this.diploma_form.controls.diplomaAddCtrl.markAsDirty();
        this.diploma_form.controls.diplomaEmailCtrl.markAsDirty();
        this.diploma_form.controls.diplomaUrlCtrl.markAsDirty();
        this.diploma_form.controls.diplomaResultDateCtrl.markAsDirty();
        this.diploma_form.controls.diplomaRollNoCtrl.markAsDirty();
        this.diploma_form.controls.diplomacertiNoCtrl.markAsDirty();
        this.diploma_form.controls.diplomaMediumCtrl.markAsDirty();
        this.diploma_form.controls.subjectFirstDipCtrl.markAsDirty();
        //this.diploma_form.controls.markFirstDipCtrl.markAsDirty();
        //this.diploma_form.controls.outOfFirstDipCtrl.markAsDirty();
        
        this.diploma_form.controls.subjectSecondDipCtrl.markAsDirty();
        //this.diploma_form.controls.markSecondDipCtrl.markAsDirty();
        //this.diploma_form.controls.outOfSecondDipCtrl.markAsDirty();
        
        this.diploma_form.controls.subjectThirdDipCtrl.markAsDirty();
       // this.diploma_form.controls.markThirdDipCtrl.markAsDirty();
       // this.diploma_form.controls.outOfThirdDipCtrl.markAsDirty();
        
        this.diploma_form.controls.subjectFourthDipCtrl.markAsDirty();
       // this.diploma_form.controls.markFourthDipCtrl.markAsDirty();
        //this.diploma_form.controls.outOfFourthDipCtrl.markAsDirty();
        
        this.diploma_form.controls.diplomaMarksCtrl.markAsDirty();
        
      }
         //if marks and grade both are null 
    if(this.diploma_form.controls.markFirstDipCtrl.value== '' && this.diploma_form.controls.outOfFirstDipCtrl.value == '' && this.diploma_form.controls.gradeFirstDipCtrl.value == ''){
      
      this.diploma_form.controls['markFirstDipCtrl'].setValidators([Validators.required]);
      this.diploma_form.controls['outOfFirstDipCtrl'].setValidators([Validators.required]);
      this.diploma_form.controls['gradeFirstDipCtrl'].setValidators([Validators.required]);
      this.diploma_form.controls['markFirstDipCtrl'].updateValueAndValidity();
      this.diploma_form.controls['outOfFirstDipCtrl'].updateValueAndValidity();
      this.diploma_form.controls['gradeFirstDipCtrl'].updateValueAndValidity();
      this.diploma_form.controls.markFirstDipCtrl.markAsDirty();
      this.diploma_form.controls.outOfFirstDipCtrl.markAsDirty();
      this.diploma_form.controls.gradeFirstDipCtrl.markAsDirty();
    }
    if(this.diploma_form.controls.markSecondDipCtrl.value== '' && this.diploma_form.controls.outOfSecondDipCtrl.value == '' && this.diploma_form.controls.gradeSecondDipCtrl.value == ''){
      
      this.diploma_form.controls['markSecondDipCtrl'].setValidators([Validators.required]);
      this.diploma_form.controls['outOfSecondDipCtrl'].setValidators([Validators.required]);
      this.diploma_form.controls['gradeSecondDipCtrl'].setValidators([Validators.required]);
      this.diploma_form.controls['markSecondDipCtrl'].updateValueAndValidity();
      this.diploma_form.controls['outOfSecondDipCtrl'].updateValueAndValidity();
      this.diploma_form.controls['gradeSecondDipCtrl'].updateValueAndValidity();
      this.diploma_form.controls.markSecondDipCtrl.markAsDirty();
      this.diploma_form.controls.outOfSecondDipCtrl.markAsDirty();
      this.diploma_form.controls.gradeSecondDipCtrl.markAsDirty();
      
    }
    if(this.diploma_form.controls.markThirdDipCtrl.value== '' && this.diploma_form.controls.outOfThirdDipCtrl.value == '' && this.diploma_form.controls.gradeThirdDipCtrl.value == ''){
      
      this.diploma_form.controls['markThirdDipCtrl'].setValidators([Validators.required]);
      this.diploma_form.controls['outOfThirdDipCtrl'].setValidators([Validators.required]);
      this.diploma_form.controls['gradeThirdDipCtrl'].setValidators([Validators.required]);
      this.diploma_form.controls['markThirdDipCtrl'].updateValueAndValidity();
      this.diploma_form.controls['outOfThirdDipCtrl'].updateValueAndValidity();
      this.diploma_form.controls['gradeThirdDipCtrl'].updateValueAndValidity();
      this.diploma_form.controls.markThirdDipCtrl.markAsDirty();
      this.diploma_form.controls.outOfThirdDipCtrl.markAsDirty();
      this.diploma_form.controls.gradeThirdDipCtrl.markAsDirty();
    }
    if(this.diploma_form.controls.gradeFourthDipCtrl.value== '' && this.diploma_form.controls.markFourthDipCtrl.value == '' && this.diploma_form.controls.outOfFourthDipCtrl.value== ''){
      
      this.diploma_form.controls['markFourthDipCtrl'].setValidators([Validators.required]);
      this.diploma_form.controls['outOfFourthDipCtrl'].setValidators([Validators.required]);
      this.diploma_form.controls['gradeFourthDipCtrl'].setValidators([Validators.required]);
      this.diploma_form.controls['markFourthDipCtrl'].updateValueAndValidity();
      this.diploma_form.controls['outOfFourthDipCtrl'].updateValueAndValidity();
      this.diploma_form.controls['gradeFourthDipCtrl'].updateValueAndValidity();
      this.diploma_form.controls.markFourthDipCtrl.markAsDirty();
      this.diploma_form.controls.outOfFourthDipCtrl.markAsDirty();
      this.diploma_form.controls.gradeFourthDipCtrl.markAsDirty();

    }
    //if outOfFirstDipCtrl is null 
    if(this.diploma_form.controls.markFirstDipCtrl.value != '' && this.diploma_form.controls.outOfFirstDipCtrl.value == ''){
      
      this.diploma_form.controls['outOfFirstDipCtrl'].setValidators([Validators.required]);
      this.diploma_form.controls['gradeFirstDipCtrl'].clearValidators();
      this.diploma_form.controls['gradeFirstDipCtrl'].updateValueAndValidity();
      this.diploma_form.controls['outOfFirstDipCtrl'].updateValueAndValidity();
      this.diploma_form.controls.outOfFirstDipCtrl.markAsDirty();
    }
    //if outOfSecondDipCtrl is null
    if(this.diploma_form.controls.markSecondDipCtrl.value != '' && this.diploma_form.controls.outOfSecondDipCtrl.value == ''){
      
      this.diploma_form.controls['outOfSecondDipCtrl'].setValidators([Validators.required]);
      this.diploma_form.controls['outOfSecondDipCtrl'].updateValueAndValidity();
      this.diploma_form.controls.outOfSecondDipCtrl.markAsDirty();
      this.diploma_form.controls['gradeSecondDipCtrl'].clearValidators();
      this.diploma_form.controls['gradeSecondDipCtrl'].updateValueAndValidity();
    }

    //if outOfThirdDipCtrl is null
    if(this.diploma_form.controls.markThirdDipCtrl.value != '' && this.diploma_form.controls.outOfThirdDipCtrl.value == ''){
      
      this.diploma_form.controls['outOfThirdDipCtrl'].setValidators([Validators.required]);
      this.diploma_form.controls['outOfThirdDipCtrl'].updateValueAndValidity();
      this.diploma_form.controls.outOfThirdDipCtrl.markAsDirty();
      this.diploma_form.controls['gradeThirdDipCtrl'].clearValidators();
      this.diploma_form.controls['gradeThirdDipCtrl'].updateValueAndValidity();
    }

    //if outOfFourthDipCtrl is null
    if(this.diploma_form.controls.markFourthDipCtrl.value != '' && this.diploma_form.controls.outOfFourthDipCtrl.value == ''){
      
      this.diploma_form.controls['outOfFourthDipCtrl'].setValidators([Validators.required]);
      this.diploma_form.controls['outOfFourthDipCtrl'].updateValueAndValidity();
      this.diploma_form.controls.outOfFourthDipCtrl.markAsDirty();
      this.diploma_form.controls['gradeFourthDipCtrl'].clearValidators();
      this.diploma_form.controls['gradeFourthDipCtrl'].updateValueAndValidity();
    }

    //if markFirstDipCtrl is null 
    if(this.diploma_form.controls.markFirstDipCtrl.value == '' &&  this.diploma_form.controls.outOfFirstDipCtrl.value !=''){
      this.diploma_form.controls['markFirstDipCtrl'].setValidators([Validators.required]);
      this.diploma_form.controls['markFirstDipCtrl'].updateValueAndValidity();
      this.diploma_form.controls.markFirstDipCtrl.markAsDirty();
      this.diploma_form.controls['gradeFirstDipCtrl'].clearValidators();
      this.diploma_form.controls['gradeFirstDipCtrl'].updateValueAndValidity();
    }
    //if markSecondDipCtrl is null 
    if(this.diploma_form.controls.markSecondDipCtrl.value == '' &&  this.diploma_form.controls.outOfSecondDipCtrl.value !='' ){
      this.diploma_form.controls['markSecondDipCtrl'].setValidators([Validators.required]);
      this.diploma_form.controls['markSecondDipCtrl'].updateValueAndValidity();
      this.diploma_form.controls.markSecondDipCtrl.markAsDirty();
      this.diploma_form.controls['gradeSecondDipCtrl'].clearValidators();
      this.diploma_form.controls['gradeSecondDipCtrl'].updateValueAndValidity();
      
    }

    //if markThirdDipCtrl is null
    if(this.diploma_form.controls.markThirdDipCtrl.value == '' && this.diploma_form.controls.outOfThirdDipCtrl.value != ''){
      this.diploma_form.controls['markThirdDipCtrl'].setValidators([Validators.required]);
      this.diploma_form.controls['markThirdDipCtrl'].updateValueAndValidity();
      this.diploma_form.controls.markThirdDipCtrl.markAsDirty();
      this.diploma_form.controls['gradeThirdDipCtrl'].clearValidators();
      this.diploma_form.controls['gradeThirdDipCtrl'].updateValueAndValidity();
    }

    //if markFourthDipCtrl is null
    if(this.diploma_form.controls.markFourthDipCtrl.value == '' && this.diploma_form.controls.outOfFourthDipCtrl.value != '' ){
      this.diploma_form.controls['markFourthDipCtrl'].setValidators([Validators.required]);
      this.diploma_form.controls['markFourthDipCtrl'].updateValueAndValidity();
      this.diploma_form.controls.markFourthDipCtrl.markAsDirty();
      this.diploma_form.controls['gradeFourthDipCtrl'].clearValidators();
      this.diploma_form.controls['gradeFourthDipCtrl'].updateValueAndValidity();
    }

    //if markFirstDipCtrl & outOfFirstDipCtrl is not null
    if(this.diploma_form.controls.markFirstDipCtrl.value != '' && this.diploma_form.controls.outOfFirstDipCtrl.value != ''){
      this.diploma_form.controls['gradeFirstDipCtrl'].clearValidators();
      this.diploma_form.controls['gradeFirstDipCtrl'].updateValueAndValidity();
    }

    //if markSecondDipCtrl & outOfSecondDipCtrl is not null
    if(this.diploma_form.controls.markSecondDipCtrl.value != '' && this.diploma_form.controls.outOfSecondDipCtrl.value != ''){
      this.diploma_form.controls['gradeSecondDipCtrl'].clearValidators();
      this.diploma_form.controls['gradeSecondDipCtrl'].updateValueAndValidity();
    }

    //if markThirdDipCtrl & outOfThirdDipCtrl is not null
    if(this.diploma_form.controls.markThirdDipCtrl.value != '' && this.diploma_form.controls.outOfThirdDipCtrl.value != ''){
      this.diploma_form.controls['gradeThirdDipCtrl'].clearValidators();
      this.diploma_form.controls['gradeThirdDipCtrl'].updateValueAndValidity();
    }

    //if markFourthDipCtrl & outOfFourthDipCtrl is not null
    if(this.diploma_form.controls.markFourthDipCtrl.value != '' && this.diploma_form.controls.outOfFourthDipCtrl.value != ''){
      this.diploma_form.controls['gradeFourthDipCtrl'].clearValidators();
      this.diploma_form.controls['gradeFourthDipCtrl'].updateValueAndValidity();
    }

    //if grade is not null
    if(this.diploma_form.controls.gradeFirstDipCtrl.value != ''){
      if(this.diploma_form.controls.markFirstDipCtrl.value != '' || this.diploma_form.controls.outOfFirstDipCtrl.value != ''){
        this.diploma_form.controls['markFirstDipCtrl'].setValidators([Validators.required]);
        this.diploma_form.controls['markFirstDipCtrl'].updateValueAndValidity();
        this.diploma_form.controls['outOfFirstDipCtrl'].setValidators([Validators.required]);
        this.diploma_form.controls['outOfFirstDipCtrl'].updateValueAndValidity();
      }else{
        this.diploma_form.controls['markFirstDipCtrl'].clearValidators();
        this.diploma_form.controls['markFirstDipCtrl'].updateValueAndValidity();
        this.diploma_form.controls['outOfFirstDipCtrl'].clearValidators();
        this.diploma_form.controls['outOfFirstDipCtrl'].updateValueAndValidity();
      }
    }

    if(this.diploma_form.controls.gradeSecondDipCtrl.value != ''){
      if(this.diploma_form.controls.markSecondDipCtrl.value != '' || this.diploma_form.controls.outOfSecondDipCtrl.value != ''){
        this.diploma_form.controls['markSecondDipCtrl'].setValidators([Validators.required]);
        this.diploma_form.controls['markSecondDipCtrl'].updateValueAndValidity();
        this.diploma_form.controls['outOfSecondDipCtrl'].setValidators([Validators.required]);
        this.diploma_form.controls['outOfSecondDipCtrl'].updateValueAndValidity();
      }else{
        this.diploma_form.controls['markSecondDipCtrl'].clearValidators();
        this.diploma_form.controls['markSecondDipCtrl'].updateValueAndValidity();
        this.diploma_form.controls['outOfSecondDipCtrl'].clearValidators();
        this.diploma_form.controls['outOfSecondDipCtrl'].updateValueAndValidity();
      }
    }

    if(this.diploma_form.controls.gradeThirdDipCtrl.value != ''){
      if(this.diploma_form.controls.markThirdDipCtrl.value != '' || this.diploma_form.controls.outOfThirdDipCtrl.value != ''){
        this.diploma_form.controls['markThirdDipCtrl'].setValidators([Validators.required]);
        this.diploma_form.controls['markThirdDipCtrl'].updateValueAndValidity();
        this.diploma_form.controls['outOfThirdDipCtrl'].setValidators([Validators.required]);
        this.diploma_form.controls['outOfThirdDipCtrl'].updateValueAndValidity();
      }else{
        this.diploma_form.controls['markThirdDipCtrl'].clearValidators();
        this.diploma_form.controls['markThirdDipCtrl'].updateValueAndValidity();
        this.diploma_form.controls['outOfThirdDipCtrl'].clearValidators();
        this.diploma_form.controls['outOfThirdDipCtrl'].updateValueAndValidity();
      }
    }

    if(this.diploma_form.controls.gradeFourthDipCtrl.value != ''){
      if(this.diploma_form.controls.markFourthDipCtrl.value != '' || this.diploma_form.controls.outOfFourthDipCtrl.value != ''){
        this.diploma_form.controls['markFourthDipCtrl'].setValidators([Validators.required]);
        this.diploma_form.controls['markFourthDipCtrl'].updateValueAndValidity();
        this.diploma_form.controls['outOfFourthDipCtrl'].setValidators([Validators.required]);
        this.diploma_form.controls['outOfFourthDipCtrl'].updateValueAndValidity();
      }else{
        this.diploma_form.controls['markFourthDipCtrl'].clearValidators();
        this.diploma_form.controls['markFourthDipCtrl'].updateValueAndValidity();
        this.diploma_form.controls['outOfFourthDipCtrl'].clearValidators();
        this.diploma_form.controls['outOfFourthDipCtrl'].updateValueAndValidity();
      }
    }

    //if marks greater than outof marks
    if(parseInt(this.diploma_form.controls.markFirstDipCtrl.value) > parseInt(this.diploma_form.controls.outOfFirstDipCtrl.value) ){
      this.diploma_form.controls['outOfFirstDipCtrl'].setValidators([Validators.required]);
      this.diploma_form.controls['markFirstDipCtrl'].setValidators([Validators.required]);
      this.diploma_form.controls['markFirstDipCtrl'].updateValueAndValidity();
      this.diploma_form.controls['outOfFirstDipCtrl'].updateValueAndValidity();
      this.diploma_form.controls.outOfFirstDipCtrl.markAsDirty();
      this.diploma_form.controls.markFirstDipCtrl.markAsDirty();
      this.markError = true;
      validation = false;
    }

    if(parseInt(this.diploma_form.controls.markSecondDipCtrl.value) > parseInt(this.diploma_form.controls.outOfSecondDipCtrl.value)){
      this.diploma_form.controls['outOfSecondDipCtrl'].setValidators([Validators.required]);
      this.diploma_form.controls['markSecondDipCtrl'].setValidators([Validators.required]);
      this.diploma_form.controls['markSecondDipCtrl'].updateValueAndValidity();
      this.diploma_form.controls['outOfSecondDipCtrl'].updateValueAndValidity();
      this.diploma_form.controls.outOfSecondDipCtrl.markAsDirty();
      this.diploma_form.controls.markSecondDipCtrl.markAsDirty();
      this.markError = true;
      validation = false;
    }

    if(parseInt(this.diploma_form.controls.markThirdDipCtrl.value) > parseInt(this.diploma_form.controls.outOfThirdDipCtrl.value) ){
      this.diploma_form.controls['outOfThirdDipCtrl'].setValidators([Validators.required]);
      this.diploma_form.controls['markThirdDipCtrl'].setValidators([Validators.required]);
      this.diploma_form.controls['outOfThirdDipCtrl'].updateValueAndValidity();
      this.diploma_form.controls['markThirdDipCtrl'].updateValueAndValidity();
      this.diploma_form.controls.markThirdDipCtrl.markAsDirty();
      this.diploma_form.controls.outOfThirdDipCtrl.markAsDirty();
      this.markError = true;
      validation = false;
    }

    if(parseInt(this.diploma_form.controls.markFourthDipCtrl.value) > parseInt(this.diploma_form.controls.outOfFourthDipCtrl.value) ){
      this.diploma_form.controls['outOfFourthDipCtrl'].setValidators([Validators.required]);
      this.diploma_form.controls['markFourthDipCtrl'].setValidators([Validators.required]);
      this.diploma_form.controls['outOfFourthDipCtrl'].updateValueAndValidity();
      this.diploma_form.controls['markFourthDipCtrl'].updateValueAndValidity();
      this.diploma_form.controls.markFourthDipCtrl.markAsDirty();
      this.diploma_form.controls.outOfFourthDipCtrl.markAsDirty();
      this.markError = true;
      validation = false;
    }
    
    //fifth subject validation
    if(this.diploma_form.controls.subjectFifthDipCtrl.value != '' || this.diploma_form.controls.markFifthDipCtrl.value != '' ||
      this.diploma_form.controls.outOfFifthDipCtrl.value != '' || this.diploma_form.controls.gradeFifthDipCtrl.value != ''){
      this.diploma_form.controls['subjectFifthDipCtrl'].setValidators([Validators.required]);
      this.diploma_form.controls['markFifthDipCtrl'].setValidators([Validators.required]);
      this.diploma_form.controls['outOfFifthDipCtrl'].setValidators([Validators.required]);
      this.diploma_form.controls['gradeFifthDipCtrl'].setValidators([Validators.required]);
      this.diploma_form.controls['subjectFifthDipCtrl'].updateValueAndValidity();
      this.diploma_form.controls['markFifthDipCtrl'].updateValueAndValidity();
      this.diploma_form.controls['outOfFifthDipCtrl'].updateValueAndValidity();
      this.diploma_form.controls['gradeFifthDipCtrl'].updateValueAndValidity();
      this.diploma_form.controls.subjectFifthDipCtrl.markAsDirty();
      this.diploma_form.controls.markFifthDipCtrl.markAsDirty();
      this.diploma_form.controls.outOfFifthDipCtrl.markAsDirty();
      this.diploma_form.controls.gradeFifthDipCtrl.markAsDirty();
    }else{
      this.diploma_form.controls['subjectFifthDipCtrl'].clearValidators();
      this.diploma_form.controls['markFifthDipCtrl'].clearValidators();
      this.diploma_form.controls['outOfFifthDipCtrl'].clearValidators();
      this.diploma_form.controls['gradeFifthDipCtrl'].clearValidators();
      this.diploma_form.controls['subjectFifthDipCtrl'].updateValueAndValidity();
      this.diploma_form.controls['markFifthDipCtrl'].updateValueAndValidity();
      this.diploma_form.controls['outOfFifthDipCtrl'].updateValueAndValidity();
      this.diploma_form.controls['gradeFifthDipCtrl'].updateValueAndValidity();
      this.diploma_form.controls.subjectFifthDipCtrl.markAsDirty();
      this.diploma_form.controls.markFifthDipCtrl.markAsDirty();
      this.diploma_form.controls.outOfFifthDipCtrl.markAsDirty();
      this.diploma_form.controls.gradeFifthDipCtrl.markAsDirty();
    }

    if(this.diploma_form.controls.gradeFifthDipCtrl.value != ''){
      if(this.diploma_form.controls.markFifthDipCtrl.value != '' || this.diploma_form.controls.outOfFifthDipCtrl.value != ''){
        this.diploma_form.controls['markFifthDipCtrl'].setValidators([Validators.required]);
        this.diploma_form.controls['markFifthDipCtrl'].updateValueAndValidity();
        this.diploma_form.controls['outOfFifthDipCtrl'].setValidators([Validators.required]);
        this.diploma_form.controls['outOfFifthDipCtrl'].updateValueAndValidity();
      }else{
        this.diploma_form.controls['markFifthDipCtrl'].clearValidators();
        this.diploma_form.controls['markFifthDipCtrl'].updateValueAndValidity();
        this.diploma_form.controls['outOfFifthDipCtrl'].clearValidators();
        this.diploma_form.controls['outOfFifthDipCtrl'].updateValueAndValidity();
      }
    }

    if(this.diploma_form.controls.markFifthDipCtrl.value != '' && this.diploma_form.controls.outOfFifthDipCtrl.value != ''){
      this.diploma_form.controls['gradeFifthDipCtrl'].clearValidators();
      this.diploma_form.controls['gradeFifthDipCtrl'].updateValueAndValidity();
    }

    if(parseInt(this.diploma_form.controls.markFifthDipCtrl.value) > parseInt(this.diploma_form.controls.outOfFifthDipCtrl.value) ){
      this.diploma_form.controls['outOfFifthDipCtrl'].setValidators([Validators.required]);
      this.diploma_form.controls['markFifthDipCtrl'].setValidators([Validators.required]);
      this.diploma_form.controls['markFifthDipCtrl'].updateValueAndValidity();
      this.diploma_form.controls['outOfFifthDipCtrl'].updateValueAndValidity();
      this.diploma_form.controls.outOfFifthDipCtrl.markAsDirty();
      this.diploma_form.controls.markFifthDipCtrl.markAsDirty();
      this.markError = true;
      validation = false;
    }

    //Sixth Subject Validation
    if(this.diploma_form.controls.subjectSixthDipCtrl.value != '' || this.diploma_form.controls.markSixthDipCtrl.value != '' ||
      this.diploma_form.controls.outOfSixthDipCtrl.value != '' || this.diploma_form.controls.gradeSixthDipCtrl.value != ''){
      this.diploma_form.controls['subjectSixthDipCtrl'].setValidators([Validators.required]);
      this.diploma_form.controls['markSixthDipCtrl'].setValidators([Validators.required]);
      this.diploma_form.controls['outOfSixthDipCtrl'].setValidators([Validators.required]);
      this.diploma_form.controls['gradeSixthDipCtrl'].setValidators([Validators.required]);
      this.diploma_form.controls['subjectSixthDipCtrl'].updateValueAndValidity();
      this.diploma_form.controls['markSixthDipCtrl'].updateValueAndValidity();
      this.diploma_form.controls['outOfSixthDipCtrl'].updateValueAndValidity();
      this.diploma_form.controls['gradeSixthDipCtrl'].updateValueAndValidity();
      this.diploma_form.controls.subjectSixthDipCtrl.markAsDirty();
      this.diploma_form.controls.markSixthDipCtrl.markAsDirty();
      this.diploma_form.controls.outOfSixthDipCtrl.markAsDirty();
      this.diploma_form.controls.gradeSixthDipCtrl.markAsDirty();
    }else{
      this.diploma_form.controls['subjectSixthDipCtrl'].clearValidators();
      this.diploma_form.controls['markSixthDipCtrl'].clearValidators();
      this.diploma_form.controls['outOfSixthDipCtrl'].clearValidators();
      this.diploma_form.controls['gradeSixthDipCtrl'].clearValidators();
      this.diploma_form.controls['subjectSixthDipCtrl'].updateValueAndValidity();
      this.diploma_form.controls['markSixthDipCtrl'].updateValueAndValidity();
      this.diploma_form.controls['outOfSixthDipCtrl'].updateValueAndValidity();
      this.diploma_form.controls['gradeSixthDipCtrl'].updateValueAndValidity();
      this.diploma_form.controls.subjectSixthDipCtrl.markAsDirty();
      this.diploma_form.controls.markSixthDipCtrl.markAsDirty();
      this.diploma_form.controls.outOfSixthDipCtrl.markAsDirty();
      this.diploma_form.controls.gradeSixthDipCtrl.markAsDirty();
    }

    if(this.diploma_form.controls.gradeSixthDipCtrl.value != ''){
      if(this.diploma_form.controls.markSixthDipCtrl.value != '' || this.diploma_form.controls.outOfSixthDipCtrl.value != ''){
        this.diploma_form.controls['markSixthDipCtrl'].setValidators([Validators.required]);
        this.diploma_form.controls['markSixthDipCtrl'].updateValueAndValidity();
        this.diploma_form.controls['outOfSixthDipCtrl'].setValidators([Validators.required]);
        this.diploma_form.controls['outOfSixthDipCtrl'].updateValueAndValidity();
      }else{
        this.diploma_form.controls['markSixthDipCtrl'].clearValidators();
        this.diploma_form.controls['markSixthDipCtrl'].updateValueAndValidity();
        this.diploma_form.controls['outOfSixthDipCtrl'].clearValidators();
        this.diploma_form.controls['outOfSixthDipCtrl'].updateValueAndValidity();
      }
    }

    if(this.diploma_form.controls.markSixthDipCtrl.value != '' && this.diploma_form.controls.outOfSixthDipCtrl.value != ''){
      this.diploma_form.controls['gradeSixthDipCtrl'].clearValidators();
      this.diploma_form.controls['gradeSixthDipCtrl'].updateValueAndValidity();
    }

    if(parseInt(this.diploma_form.controls.markSixthDipCtrl.value) > parseInt(this.diploma_form.controls.outOfSixthDipCtrl.value) ){
      this.diploma_form.controls['outOfSixthDipCtrl'].setValidators([Validators.required]);
      this.diploma_form.controls['markSixthDipCtrl'].setValidators([Validators.required]);
      this.diploma_form.controls['markSixthDipCtrl'].updateValueAndValidity();
      this.diploma_form.controls['outOfSixthDipCtrl'].updateValueAndValidity();
      this.diploma_form.controls.outOfSixthDipCtrl.markAsDirty();
      this.diploma_form.controls.markSixthDipCtrl.markAsDirty();
      this.markError = true;
      validation = false;
    }
    if( this.diploma_form.valid && validation){
      var diploma_data ={
        diplomaName : this.diploma_form.controls.diplomaNameCtrl.value,
        diplomaUniversity : this.diploma_form.controls.diplomaUniversityCtrl.value,
        diplomaCollege : this.diploma_form.controls.diplomaCollegeCtrl.value,
        diplomaAdd : this.diploma_form.controls.diplomaAddCtrl.value,
        diplomaEmail : this.diploma_form.controls.diplomaEmailCtrl.value,
        diplomaUrl : this.diploma_form.controls.diplomaUrlCtrl.value,
        diplomaResultDate: this.diploma_form.controls.diplomaResultDateCtrl.value,
        diplomaRollNo: this.diploma_form.controls.diplomaRollNoCtrl.value,
        diplomaCertiNo: this.diploma_form.controls.diplomacertiNoCtrl.value,
        diplomaMedium: this.diploma_form.controls.diplomaMediumCtrl.value,
        subjectFirstDip: this.diploma_form.controls.subjectFirstDipCtrl.value,
        markFirstDip: this.diploma_form.controls.markFirstDipCtrl.value,
        outOfFirstDip: this.diploma_form.controls.outOfFirstDipCtrl.value,
        gradeFirstDip: this.diploma_form.controls.gradeFirstDipCtrl.value,
        
        subjectSecondDip: this.diploma_form.controls.subjectSecondDipCtrl.value,
        markSecondDip: this.diploma_form.controls.markSecondDipCtrl.value,
        outOfSecondDip: this.diploma_form.controls.outOfSecondDipCtrl.value,
        gradeSecondDip: this.diploma_form.controls.gradeSecondDipCtrl.value,
        
        subjectThirdDip: this.diploma_form.controls.subjectThirdDipCtrl.value,
        markThirdDip: this.diploma_form.controls.markThirdDipCtrl.value,
        outOfThirdDip: this.diploma_form.controls.outOfThirdDipCtrl.value,
        gradeThirdDip: this.diploma_form.controls.gradeThirdDipCtrl.value,
        
        subjectFourthDip: this.diploma_form.controls.subjectFourthDipCtrl.value,
        markFourthDip: this.diploma_form.controls.markFourthDipCtrl.value,
        outOfFourthDip: this.diploma_form.controls.outOfFourthDipCtrl.value,
        gradeFourthDip: this.diploma_form.controls.gradeFourthDipCtrl.value,

        subjectFifthDip: this.diploma_form.controls.subjectFifthDipCtrl.value,
        markFifthDip: this.diploma_form.controls.markFifthDipCtrl.value,
        outOfFifthDip: this.diploma_form.controls.outOfFifthDipCtrl.value,
        gradeFifthDip: this.diploma_form.controls.gradeFifthDipCtrl.value,

        subjectSixthDip: this.diploma_form.controls.subjectSixthDipCtrl.value,
        markSixthDip: this.diploma_form.controls.markSixthDipCtrl.value,
        outOfSixthDip: this.diploma_form.controls.outOfSixthDipCtrl.value,
        gradeSixthDip: this.diploma_form.controls.gradeSixthDipCtrl.value,
        
        diplomaMarks: this.diploma_form.controls.diplomaMarksCtrl.value,
      }
        this.api.setProfileValues(diploma_data,'Education_Diploma')
        .subscribe(
          (data: any) => {  
            this.ref.close(diploma_data);
            err => console.error(err) 
        });
    }else{
      alert('Please Fill Mandatory fields!!!')
    }


      
  }
    open() {
      this.dialogService.open(find_College_Diploma).onClose
      .subscribe(
       (data: any) => {
        if(data!==undefined){
         this.diploma_form.controls['diplomaEmailCtrl'].setValue(data[0].school_email);
         this.diploma_form.controls['diplomaCollegeCtrl'].setValue(data[0].school_name);
         this.diploma_form.controls['diplomaAddCtrl'].setValue(data[0].school_add);
         this.diploma_form.controls['diplomaUrlCtrl'].setValue(data[0].school_url);
        } 
         err => console.error(err)
       }
      );
     }
}
