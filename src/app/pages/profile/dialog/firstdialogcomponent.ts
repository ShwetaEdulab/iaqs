import { Component, Input } from '@angular/core';
import { NbDialogRef, NbDialogService, NbThemeService } from '@nebular/theme';
import { ApiService } from '../../../shared/api.service';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { find_College_SSC } from './find_college_ssc';
import { CountriesService } from '../../../@core/data/countries.service';
@Component({
selector: 'nb-dialog',
template: `
<nb-card class="col-xl-6 offset-xl-3" [style.height.px]="700" [style.overflow]="'auto'"> 
<nb-card-header>
<div class="row">
  <div class="col-md-9">CBSE/ICSE/SSC Marks Details </div>
</div>
</nb-card-header>
  <nb-card-body [nbSpinner]="loadingbutton">
  <form [formGroup]="ssc_form"  class="step-container">
    <div class="row">
      <div class="col-md-3">Name of University/Board : </div>
      <div class="col-md-9"> <input pattern="[A-Za-z ]+" ngModel="{{cbse_marks?.university}}" nbInput type="text" [ngClass]="{'form-control-danger': ssc_form.controls.sscUniversityCtrl.invalid && (ssc_form.controls.sscUniversityCtrl.dirty || ssc_form.controls.sscUniversityCtrl.touched)}" formControlName="sscUniversityCtrl" placeholder="" id="" class="form-control"> </div><br>
      <div class="col-md-3">School/College Name : </div>
      <div class="col-md-9"> <input ngModel="{{cbse_marks?.school_name}}" nbInput type="text"  [ngClass]="{'form-control-danger': ssc_form.controls.sscCollegeCtrl.invalid && (ssc_form.controls.sscCollegeCtrl.dirty || ssc_form.controls.sscCollegeCtrl.touched)}" formControlName="sscCollegeCtrl" placeholder="" id="" class="form-control"> </div><br>
      <div class="col-md-3">Address of School/College : </div>
      <div class="col-md-9"> <input ngModel="{{cbse_marks?.school_add}}" nbInput type="text"  [ngClass]="{'form-control-danger': ssc_form.controls.sscAddCtrl.invalid && (ssc_form.controls.sscAddCtrl.dirty || ssc_form.controls.sscAddCtrl.touched)}" formControlName="sscAddCtrl" placeholder="" id="" class="form-control"> </div><br>
      <div class="col-md-3">Email address : </div>
      <div class="col-md-9"> <input ngModel="{{cbse_marks?.school_email}}" nbInput type="text"  [ngClass]="{'form-control-danger': ssc_form.controls.sscEmailCtrl.invalid && (ssc_form.controls.sscEmailCtrl.dirty || ssc_form.controls.sscEmailCtrl.touched)}" formControlName="sscEmailCtrl" placeholder="" id="" class="form-control"> </div><br>
      <div class="col-md-3">URL : </div>
      <div class="col-md-9"> <input pattern="(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})" ngModel="{{cbse_marks?.school_url}}" nbInput type="text"  [ngClass]="{'form-control-danger': ssc_form.controls.sscUrlCtrl.invalid && (ssc_form.controls.sscUrlCtrl.dirty || ssc_form.controls.sscUrlCtrl.touched)}" formControlName="sscUrlCtrl" placeholder="" id="" class="form-control"> </div><br>
      <div class="col-md-3">Date Of Result : </div>
      <div class="col-md-9"> <input readonly ngModel="{{cbse_marks?.result_date}}" nbInput [ngClass]="{'form-control-danger': ssc_form.controls.sscResultDateCtrl.invalid && (ssc_form.controls.sscResultDateCtrl.dirty || ssc_form.controls.sscResultDateCtrl.touched)}" formControlName="sscResultDateCtrl" placeholder="DD/MM/YY" class="form-control" [nbDatepicker]="picker"> <nb-datepicker #picker [(date)]="date" [max]="max"></nb-datepicker></div><br>
      <div class="col-md-3">Roll No / Seat No : </div>
      <div class="col-md-9"> <input pattern="[A-Za-z0-9]+" ngModel="{{cbse_marks?.school_rollNo}}" nbInput type="text"  [ngClass]="{'form-control-danger': ssc_form.controls.sscRollNoCtrl.invalid && (ssc_form.controls.sscRollNoCtrl.dirty || ssc_form.controls.sscRollNoCtrl.touched)}" formControlName="sscRollNoCtrl" placeholder="" id="" class="form-control"> </div><br>
      <div class="col-md-3">Cert No : </div>
      <div class="col-md-9"> <input ngModel="{{cbse_marks?.school_certi_no}}" nbInput type="text"  [ngClass]="{'form-control-danger': ssc_form.controls.ssccertiNoCtrl.invalid && (ssc_form.controls.ssccertiNoCtrl.dirty || ssc_form.controls.ssccertiNoCtrl.touched)}" formControlName="ssccertiNoCtrl" placeholder="" id="" class="form-control"> </div><br>
      <div class="col-md-3">Medium of Instruction at school(English/Others) : </div>
      <div class="col-md-9"> <input pattern="[A-Za-z]+" ngModel="{{cbse_marks?.school_medium}}" nbInput type="text" [ngClass]="{'form-control-danger': ssc_form.controls.sscMediumCtrl.invalid && (ssc_form.controls.sscMediumCtrl.dirty || ssc_form.controls.sscMediumCtrl.touched)}" formControlName="sscMediumCtrl" placeholder="" id="" class="form-control"> </div><br>
      <div class="col-md-3">Subject :</div>
      <div class="col-md-2"><input  ngModel="{{cbse_marks?.Subject_first}}" nbInput type="text" [ngClass]="{'form-control-danger': ssc_form.controls.subjectFirstsscCtrl.invalid && (ssc_form.controls.subjectFirstsscCtrl.dirty || ssc_form.controls.subjectFirstsscCtrl.touched)}" formControlName="subjectFirstsscCtrl" placeholder="Subject1" id="" class="form-control"></div>
      <div class="col-md-2"><input pattern="[0-9]+" ngModel="{{cbse_marks?.mark_first}}" nbInput type="text" [ngClass]="{'form-control-danger': ssc_form.controls.markFirstsscCtrl.invalid && (ssc_form.controls.markFirstsscCtrl.dirty || ssc_form.controls.markFirstsscCtrl.touched)}" formControlName="markFirstsscCtrl" placeholder="Marks" id="" class="form-control"></div>
      <div class="col-md-2"><input pattern="[0-9]+" ngModel="{{cbse_marks?.OutOf_first}}" nbInput type="text" [ngClass]="{'form-control-danger': ssc_form.controls.outOfFirstsscCtrl.invalid && (ssc_form.controls.outOfFirstsscCtrl.dirty || ssc_form.controls.outOfFirstsscCtrl.touched)}" formControlName="outOfFirstsscCtrl" placeholder="Out of" id="" class="form-control"></div> OR <div
        class="col-md-2"> <input  [ngClass]="{'form-control-danger': ssc_form.controls.gradeFirstsscCtrl.invalid && (ssc_form.controls.gradeFirstsscCtrl.dirty || ssc_form.controls.gradeFirstsscCtrl.touched)}" ngModel="{{cbse_marks?.grade_first}}" nbInput type="text" formControlName="gradeFirstsscCtrl" placeholder="Grade" id="" class="form-control"> </div><br>
      <div class="col-md-3"></div>
      <div class="col-md-2"><input  ngModel="{{cbse_marks?.Subject_Second}}" nbInput type="text" [ngClass]="{'form-control-danger': ssc_form.controls.subjectSecondsscCtrl.invalid && (ssc_form.controls.subjectSecondsscCtrl.dirty || ssc_form.controls.subjectSecondsscCtrl.touched)}" formControlName="subjectSecondsscCtrl" placeholder="Subject2" id="" class="form-control"></div>
      <div class="col-md-2"><input pattern="[0-9]+" ngModel="{{cbse_marks?.mark_Second}}" nbInput type="text" [ngClass]="{'form-control-danger': ssc_form.controls.markSecondsscCtrl.invalid && (ssc_form.controls.markSecondsscCtrl.dirty || ssc_form.controls.markSecondsscCtrl.touched)}" formControlName="markSecondsscCtrl" placeholder="Marks" id="" class="form-control"></div>
      <div class="col-md-2"><input pattern="[0-9]+" ngModel="{{cbse_marks?.OutOf_Second}}" nbInput type="text" [ngClass]="{'form-control-danger': ssc_form.controls.outOfSecondsscCtrl.invalid && (ssc_form.controls.outOfSecondsscCtrl.dirty || ssc_form.controls.outOfSecondsscCtrl.touched)}" formControlName="outOfSecondsscCtrl" placeholder="Out of" id="" class="form-control"></div> OR <div
        class="col-md-2"> <input   [ngClass]="{'form-control-danger': ssc_form.controls.gradeSecondsscCtrl.invalid && (ssc_form.controls.gradeSecondsscCtrl.dirty || ssc_form.controls.gradeSecondsscCtrl.touched)}" ngModel="{{cbse_marks?.grade_Second}}" nbInput type="text" formControlName="gradeSecondsscCtrl" placeholder="Grade" id="" class="form-control"> </div><br>
      <div class="col-md-3"></div>
      <div class="col-md-2"><input  ngModel="{{cbse_marks?.Subject_Third}}" nbInput type="text" [ngClass]="{'form-control-danger': ssc_form.controls.subjectThirdsscCtrl.invalid && (ssc_form.controls.subjectThirdsscCtrl.dirty || ssc_form.controls.subjectThirdsscCtrl.touched)}" formControlName="subjectThirdsscCtrl" placeholder="Subject3" id="" class="form-control"></div>
      <div class="col-md-2"><input pattern="[0-9]+" ngModel="{{cbse_marks?.mark_Third}}" nbInput type="text" [ngClass]="{'form-control-danger': ssc_form.controls.markThirdsscCtrl.invalid && (ssc_form.controls.markThirdsscCtrl.dirty || ssc_form.controls.markThirdsscCtrl.touched)}" formControlName="markThirdsscCtrl" placeholder="Marks" id="" class="form-control"></div>
      <div class="col-md-2"><input pattern="[0-9]+" ngModel="{{cbse_marks?.OutOf_Third}}" nbInput type="text" [ngClass]="{'form-control-danger': ssc_form.controls.outOfThirdsscCtrl.invalid && (ssc_form.controls.outOfThirdsscCtrl.dirty || ssc_form.controls.outOfThirdsscCtrl.touched)}" formControlName="outOfThirdsscCtrl" placeholder="Out of" id="" class="form-control"></div> OR <div
        class="col-md-2"> <input   ngModel="{{cbse_marks?.grade_Third}}" [ngClass]="{'form-control-danger': ssc_form.controls.gradeThirdsscCtrl.invalid && (ssc_form.controls.gradeThirdsscCtrl.dirty || ssc_form.controls.gradeThirdsscCtrl.touched)}" nbInput type="text" formControlName="gradeThirdsscCtrl" placeholder="Grade" id="" class="form-control"> </div><br>
      <div class="col-md-3"></div>
      <div class="col-md-2"><input  ngModel="{{cbse_marks?.Subject_fourth}}" nbInput type="text" [ngClass]="{'form-control-danger': ssc_form.controls.subjectFourthsscCtrl.invalid && (ssc_form.controls.subjectFourthsscCtrl.dirty || ssc_form.controls.subjectFourthsscCtrl.touched)}" formControlName="subjectFourthsscCtrl" placeholder="Subject4" id="" class="form-control"></div>
      <div class="col-md-2"><input pattern="[0-9]+" ngModel="{{cbse_marks?.mark_fourth}}" nbInput type="text" [ngClass]="{'form-control-danger': ssc_form.controls.markFourthsscCtrl.invalid && (ssc_form.controls.markFourthsscCtrl.dirty || ssc_form.controls.markFourthsscCtrl.touched)}" formControlName="markFourthsscCtrl" placeholder="Marks" id="" class="form-control"></div>
      <div class="col-md-2"><input pattern="[0-9]+" ngModel="{{cbse_marks?.OutOf_fourth}}" nbInput type="text" [ngClass]="{'form-control-danger': ssc_form.controls.outOfFourthsscCtrl.invalid && (ssc_form.controls.outOfFourthsscCtrl.dirty || ssc_form.controls.outOfFourthsscCtrl.touched)}" formControlName="outOfFourthsscCtrl" placeholder="Out of" id="" class="form-control"></div> OR <div
        class="col-md-2"> <input   [ngClass]="{'form-control-danger': ssc_form.controls.gradeFourthsscCtrl.invalid && (ssc_form.controls.gradeFourthsscCtrl.dirty || ssc_form.controls.gradeFourthsscCtrl.touched)}" ngModel="{{cbse_marks?.grade_fourth}}" nbInput type="text" formControlName="gradeFourthsscCtrl" placeholder="Grade" id="" class="form-control"> </div><br>
      <div class="col-md-3"></div>
      <div class="col-md-2"><input  [ngClass]="{'form-control-danger': ssc_form.controls.subjectFifthsscCtrl.invalid && (ssc_form.controls.subjectFifthsscCtrl.dirty || ssc_form.controls.subjectFifthsscCtrl.touched)}" ngModel="{{cbse_marks?.Subject_fifth}}" nbInput type="text" formControlName="subjectFifthsscCtrl" placeholder="Subject5" id="" class="form-control"></div>
      <div class="col-md-2"><input pattern="[0-9]+" ngModel="{{cbse_marks?.mark_fifth}}" nbInput type="text" [ngClass]="{'form-control-danger': ssc_form.controls.markFifthsscCtrl.invalid && (ssc_form.controls.markFifthsscCtrl.dirty || ssc_form.controls.markFifthsscCtrl.touched)}" formControlName="markFifthsscCtrl" placeholder="Marks" id="" class="form-control"></div>
      <div class="col-md-2"><input pattern="[0-9]+" ngModel="{{cbse_marks?.OutOf_fifth}}" nbInput type="text" [ngClass]="{'form-control-danger': ssc_form.controls.outOfFifthsscCtrl.invalid && (ssc_form.controls.outOfFifthsscCtrl.dirty || ssc_form.controls.outOfFifthsscCtrl.touched)}" formControlName="outOfFifthsscCtrl" placeholder="Out of" id="" class="form-control"></div> OR <div
        class="col-md-2"> <input  [ngClass]="{'form-control-danger': ssc_form.controls.gradeFifthsscCtrl.invalid && (ssc_form.controls.gradeFifthsscCtrl.dirty || ssc_form.controls.gradeFifthsscCtrl.touched)}" ngModel="{{cbse_marks?.grade_fifth}}" nbInput type="text" formControlName="gradeFifthsscCtrl" placeholder="Grade" id="" class="form-control"> </div><br>
      <div class="col-md-3"></div>
      <div class="col-md-2"><input  [ngClass]="{'form-control-danger': ssc_form.controls.subjectSixthsscCtrl.invalid && (ssc_form.controls.subjectSixthsscCtrl.dirty || ssc_form.controls.subjectSixthsscCtrl.touched)}" ngModel="{{cbse_marks?.Subject_Six}}" nbInput type="text" formControlName="subjectSixthsscCtrl" placeholder="Subject6" id="" class="form-control"></div>
      <div class="col-md-2"><input pattern="[0-9]+" [ngClass]="{'form-control-danger': ssc_form.controls.markSixthsscCtrl.invalid && (ssc_form.controls.markSixthsscCtrl.dirty || ssc_form.controls.markSixthsscCtrl.touched)}" ngModel="{{cbse_marks?.mark_Six}}" nbInput type="text" formControlName="markSixthsscCtrl" placeholder="Marks" id="" class="form-control"></div>
      <div class="col-md-2"><input pattern="[0-9]+" [ngClass]="{'form-control-danger': ssc_form.controls.outOfSixthsscCtrl.invalid && (ssc_form.controls.outOfSixthsscCtrl.dirty || ssc_form.controls.outOfSixthsscCtrl.touched)}" ngModel="{{cbse_marks?.OutOf_Six}}" nbInput type="text" formControlName="outOfSixthsscCtrl" placeholder="Out of" id="" class="form-control"></div> OR <div
        class="col-md-2"> <input [ngClass]="{'form-control-danger': ssc_form.controls.gradeSixthsscCtrl.invalid && (ssc_form.controls.gradeSixthsscCtrl.dirty || ssc_form.controls.gradeSixthsscCtrl.touched)}" ngModel="{{cbse_marks?.grade_Six}}" nbInput type="text" formControlName="gradeSixthsscCtrl" placeholder="Grade" id="" class="form-control"> </div><br>
        <div class="col-md-12"><span *ngIf="markError===true" style="color:red; font-weight: bold">Obtained marks should be less than Out of marks </span> </div>
      <div class="col-md-3">CGPA or Marks in % : </div>
      <div class="col-md-9"> <input pattern="[A-Za-z0-9%+-.]+" ngModel="{{cbse_marks?.school_marks}}" nbInput type="text" [ngClass]="{'form-control-danger': ssc_form.controls.sscMarksCtrl.invalid && (ssc_form.controls.sscMarksCtrl.dirty || ssc_form.controls.sscMarksCtrl.touched)}" formControlName="sscMarksCtrl" placeholder="" id="" class="form-control"> </div><br>
    </div>
    </form>
  </nb-card-body>
  <nb-card-footer>
    <button nbButton hero status="primary" (click)="dismiss()">Close</button> 
    <button nbButton hero status="primary" style="margin-left:15px;" (click)="saveSsc()" >Update</button>
  </nb-card-footer>
</nb-card>
`,
})
export class FirstDialogComponent {
@Input() title: string;
cbse_marks;
ssc_form: FormGroup;
Countries: any [];
cbse_country;
sscCountryValidation = true;
max;
date;
readonly emailValidate = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
result_date: any;
loadingbutton = true;
markError = false;

constructor(protected ref: NbDialogRef<FirstDialogComponent>,
  protected api : ApiService,
  private fb: FormBuilder,
  private dialogService: NbDialogService,
  protected countries :CountriesService,
  public themeService : NbThemeService) {
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
    this.buildsscForm();
  }

  private buildsscForm() : void{
    
         
    this.api.getProfileValue('Education_SSC') 
      .subscribe(
        (data: any) => {  
          this.cbse_marks =  data['data']['ssc_info'];
          this.loadingbutton = false;
          if(this.cbse_marks == null){
            this.result_date = null;
          }else{
            this.result_date = new Date(data['data']['ssc_info']['result_date']);
          }
          if(!( data['data']['ssc_info'] == null || data['data']['ssc_info'] == undefined || data['data']['ssc_info'] == '' )){
            this.cbse_country = data['data']['ssc_info']['school_country'];
          }
          err => console.error(err)
      });
      
        this.ssc_form = this.fb.group({
          sscUniversityCtrl: [ '' ,  Validators.required],
          sscCollegeCtrl: ['', Validators.required],
          sscAddCtrl:['',  Validators.required],
          sscEmailCtrl: ['', [Validators.required,Validators.pattern(this.emailValidate)]], 
          sscUrlCtrl:['',  Validators.required],
          sscResultDateCtrl: [ '',  Validators.required],
          sscRollNoCtrl:['',  Validators.required],
          ssccertiNoCtrl:['',  Validators.required],
          sscMediumCtrl:['',  Validators.required],
          subjectFirstsscCtrl:['', Validators.required],
          markFirstsscCtrl:[''],
          outOfFirstsscCtrl:[''],
          gradeFirstsscCtrl : [''],
          subjectSecondsscCtrl:['', Validators.required],
          markSecondsscCtrl:[''],
          outOfSecondsscCtrl:[''],
          gradeSecondsscCtrl : [''],
          subjectThirdsscCtrl:['',  Validators.required],
          markThirdsscCtrl:[''],
          outOfThirdsscCtrl:[''],
          gradeThirdsscCtrl:[''],
          subjectFourthsscCtrl:['', Validators.required],
          markFourthsscCtrl:[''],
          outOfFourthsscCtrl:[''],
          gradeFourthsscCtrl : [''],
          subjectFifthsscCtrl:['',],
          markFifthsscCtrl:['', ],
          outOfFifthsscCtrl:['',],
          gradeFifthsscCtrl : [''],
          subjectSixthsscCtrl:['',],
          markSixthsscCtrl:['',],
          outOfSixthsscCtrl:['',],
          gradeSixthsscCtrl : [''],
          sscMarksCtrl:['', Validators.required],
        });
    }

    saveSsc() {
      var validation = true;
      
      if (this.ssc_form.valid==false){
        this.ssc_form.controls.sscUniversityCtrl.markAsDirty();
        this.ssc_form.controls.sscCollegeCtrl.markAsDirty();
        this.ssc_form.controls.sscAddCtrl.markAsDirty();
        this.ssc_form.controls.sscEmailCtrl.markAsDirty();
        this.ssc_form.controls.sscUrlCtrl.markAsDirty();
        this.ssc_form.controls.sscResultDateCtrl.markAsDirty();
        this.ssc_form.controls.sscRollNoCtrl.markAsDirty();
        this.ssc_form.controls.ssccertiNoCtrl.markAsDirty();
        this.ssc_form.controls.sscMediumCtrl.markAsDirty();
        this.ssc_form.controls.subjectFirstsscCtrl.markAsDirty();
        //this.ssc_form.controls.markFirstsscCtrl.markAsDirty();
        //this.ssc_form.controls.outOfFirstsscCtrl.markAsDirty();
        
        this.ssc_form.controls.subjectSecondsscCtrl.markAsDirty();
        //this.ssc_form.controls.markSecondsscCtrl.markAsDirty();
        //this.ssc_form.controls.outOfSecondsscCtrl.markAsDirty();
        
        this.ssc_form.controls.subjectThirdsscCtrl.markAsDirty();
        //this.ssc_form.controls.markThirdsscCtrl.markAsDirty();
        //this.ssc_form.controls.outOfThirdsscCtrl.markAsDirty();
        
        this.ssc_form.controls.subjectFourthsscCtrl.markAsDirty();
       // this.ssc_form.controls.markFourthsscCtrl.markAsDirty();
        //this.ssc_form.controls.outOfFourthsscCtrl.markAsDirty();
        
        this.ssc_form.controls.sscMarksCtrl.markAsDirty();
     }
     
    //  else{
    //  }
     //if marks and grade both are null 
     if(this.ssc_form.controls.markFirstsscCtrl.value== '' && this.ssc_form.controls.outOfFirstsscCtrl.value == '' && this.ssc_form.controls.gradeFirstsscCtrl.value == ''){
     
      this.ssc_form.controls['markFirstsscCtrl'].setValidators([Validators.required]);
      this.ssc_form.controls['outOfFirstsscCtrl'].setValidators([Validators.required]);
      this.ssc_form.controls['gradeFirstsscCtrl'].setValidators([Validators.required]);
      this.ssc_form.controls['markFirstsscCtrl'].updateValueAndValidity();
      this.ssc_form.controls['outOfFirstsscCtrl'].updateValueAndValidity();
      this.ssc_form.controls['gradeFirstsscCtrl'].updateValueAndValidity();
      this.ssc_form.controls.markFirstsscCtrl.markAsDirty();
      this.ssc_form.controls.outOfFirstsscCtrl.markAsDirty();
      this.ssc_form.controls.gradeFirstsscCtrl.markAsDirty();
    }
    if(this.ssc_form.controls.markSecondsscCtrl.value== '' && this.ssc_form.controls.outOfSecondsscCtrl.value == '' && this.ssc_form.controls.gradeSecondsscCtrl.value == ''){
    
      this.ssc_form.controls['markSecondsscCtrl'].setValidators([Validators.required]);
      this.ssc_form.controls['outOfSecondsscCtrl'].setValidators([Validators.required]);
      this.ssc_form.controls['gradeSecondsscCtrl'].setValidators([Validators.required]);
      this.ssc_form.controls['markSecondsscCtrl'].updateValueAndValidity();
      this.ssc_form.controls['outOfSecondsscCtrl'].updateValueAndValidity();
      this.ssc_form.controls['gradeSecondsscCtrl'].updateValueAndValidity();
      this.ssc_form.controls.markSecondsscCtrl.markAsDirty();
      this.ssc_form.controls.outOfSecondsscCtrl.markAsDirty();
      this.ssc_form.controls.gradeSecondsscCtrl.markAsDirty();
      
    }
    if(this.ssc_form.controls.markThirdsscCtrl.value== '' && this.ssc_form.controls.outOfThirdsscCtrl.value == '' && this.ssc_form.controls.gradeThirdsscCtrl.value == ''){
   
      this.ssc_form.controls['markThirdsscCtrl'].setValidators([Validators.required]);
      this.ssc_form.controls['outOfThirdsscCtrl'].setValidators([Validators.required]);
      this.ssc_form.controls['gradeThirdsscCtrl'].setValidators([Validators.required]);
      this.ssc_form.controls['markThirdsscCtrl'].updateValueAndValidity();
      this.ssc_form.controls['outOfThirdsscCtrl'].updateValueAndValidity();
      this.ssc_form.controls['gradeThirdsscCtrl'].updateValueAndValidity();
      this.ssc_form.controls.markThirdsscCtrl.markAsDirty();
      this.ssc_form.controls.outOfThirdsscCtrl.markAsDirty();
      this.ssc_form.controls.gradeThirdsscCtrl.markAsDirty();
    }
    if(this.ssc_form.controls.gradeFourthsscCtrl.value== '' && this.ssc_form.controls.markFourthsscCtrl.value == '' && this.ssc_form.controls.outOfFourthsscCtrl.value== ''){
     
      this.ssc_form.controls['markFourthsscCtrl'].setValidators([Validators.required]);
      this.ssc_form.controls['outOfFourthsscCtrl'].setValidators([Validators.required]);
      this.ssc_form.controls['gradeFourthsscCtrl'].setValidators([Validators.required]);
      this.ssc_form.controls['markFourthsscCtrl'].updateValueAndValidity();
      this.ssc_form.controls['outOfFourthsscCtrl'].updateValueAndValidity();
      this.ssc_form.controls['gradeFourthsscCtrl'].updateValueAndValidity();
      this.ssc_form.controls.markFourthsscCtrl.markAsDirty();
      this.ssc_form.controls.outOfFourthsscCtrl.markAsDirty();
      this.ssc_form.controls.gradeFourthsscCtrl.markAsDirty();

    }
    //if outOfFirstsscCtrl is null 
    if(this.ssc_form.controls.markFirstsscCtrl.value != '' && this.ssc_form.controls.outOfFirstsscCtrl.value == ''){
     
      this.ssc_form.controls['outOfFirstsscCtrl'].setValidators([Validators.required]);
      this.ssc_form.controls['gradeFirstsscCtrl'].clearValidators();
      this.ssc_form.controls['gradeFirstsscCtrl'].updateValueAndValidity();
      this.ssc_form.controls['outOfFirstsscCtrl'].updateValueAndValidity();
      this.ssc_form.controls.outOfFirstsscCtrl.markAsDirty();
    }
    //if outOfSecondsscCtrl is null
    if(this.ssc_form.controls.markSecondsscCtrl.value != '' && this.ssc_form.controls.outOfSecondsscCtrl.value == ''){
    
      this.ssc_form.controls['outOfSecondsscCtrl'].setValidators([Validators.required]);
      this.ssc_form.controls['outOfSecondsscCtrl'].updateValueAndValidity();
      this.ssc_form.controls.outOfSecondsscCtrl.markAsDirty();
      this.ssc_form.controls['gradeSecondsscCtrl'].clearValidators();
      this.ssc_form.controls['gradeSecondsscCtrl'].updateValueAndValidity();
    }

    //if outOfThirdsscCtrl is null
    if(this.ssc_form.controls.markThirdsscCtrl.value != '' && this.ssc_form.controls.outOfThirdsscCtrl.value == ''){
     
      this.ssc_form.controls['outOfThirdsscCtrl'].setValidators([Validators.required]);
      this.ssc_form.controls['outOfThirdsscCtrl'].updateValueAndValidity();
      this.ssc_form.controls.outOfThirdsscCtrl.markAsDirty();
      this.ssc_form.controls['gradeThirdsscCtrl'].clearValidators();
      this.ssc_form.controls['gradeThirdsscCtrl'].updateValueAndValidity();
    }

    //if outOfFourthsscCtrl is null
    if(this.ssc_form.controls.markFourthsscCtrl.value != '' && this.ssc_form.controls.outOfFourthsscCtrl.value == ''){
      
      this.ssc_form.controls['outOfFourthsscCtrl'].setValidators([Validators.required]);
      this.ssc_form.controls['outOfFourthsscCtrl'].updateValueAndValidity();
      this.ssc_form.controls.outOfFourthsscCtrl.markAsDirty();
      this.ssc_form.controls['gradeFourthsscCtrl'].clearValidators();
      this.ssc_form.controls['gradeFourthsscCtrl'].updateValueAndValidity();
    }

    //if markFirstsscCtrl is null 
    if(this.ssc_form.controls.markFirstsscCtrl.value == '' &&  this.ssc_form.controls.outOfFirstsscCtrl.value !=''){
      this.ssc_form.controls['markFirstsscCtrl'].setValidators([Validators.required]);
      this.ssc_form.controls['markFirstsscCtrl'].updateValueAndValidity();
      this.ssc_form.controls.markFirstsscCtrl.markAsDirty();
      this.ssc_form.controls['gradeFirstsscCtrl'].clearValidators();
      this.ssc_form.controls['gradeFirstsscCtrl'].updateValueAndValidity();
    }
    //if markSecondsscCtrl is null 
    if(this.ssc_form.controls.markSecondsscCtrl.value == '' &&  this.ssc_form.controls.outOfSecondsscCtrl.value !='' ){
      this.ssc_form.controls['markSecondsscCtrl'].setValidators([Validators.required]);
      this.ssc_form.controls['markSecondsscCtrl'].updateValueAndValidity();
      this.ssc_form.controls.markSecondsscCtrl.markAsDirty();
      this.ssc_form.controls['gradeSecondsscCtrl'].clearValidators();
      this.ssc_form.controls['gradeSecondsscCtrl'].updateValueAndValidity();
      
    }

    //if markThirdsscCtrl is null
    if(this.ssc_form.controls.markThirdsscCtrl.value == '' && this.ssc_form.controls.outOfThirdsscCtrl.value != ''){
      this.ssc_form.controls['markThirdsscCtrl'].setValidators([Validators.required]);
      this.ssc_form.controls['markThirdsscCtrl'].updateValueAndValidity();
      this.ssc_form.controls.markThirdsscCtrl.markAsDirty();
      this.ssc_form.controls['gradeThirdsscCtrl'].clearValidators();
      this.ssc_form.controls['gradeThirdsscCtrl'].updateValueAndValidity();
    }

    //if markFourthsscCtrl is null
    if(this.ssc_form.controls.markFourthsscCtrl.value == '' && this.ssc_form.controls.outOfFourthsscCtrl.value != '' ){
      this.ssc_form.controls['markFourthsscCtrl'].setValidators([Validators.required]);
      this.ssc_form.controls['markFourthsscCtrl'].updateValueAndValidity();
      this.ssc_form.controls.markFourthsscCtrl.markAsDirty();
      this.ssc_form.controls['gradeFourthsscCtrl'].clearValidators();
      this.ssc_form.controls['gradeFourthsscCtrl'].updateValueAndValidity();
    }

    //if markFirstsscCtrl & outOfFirstsscCtrl is not null
    if(this.ssc_form.controls.markFirstsscCtrl.value != '' && this.ssc_form.controls.outOfFirstsscCtrl.value != ''){
      this.ssc_form.controls['gradeFirstsscCtrl'].clearValidators();
      this.ssc_form.controls['gradeFirstsscCtrl'].updateValueAndValidity();
    }

    //if markSecondsscCtrl & outOfSecondsscCtrl is not null
    if(this.ssc_form.controls.markSecondsscCtrl.value != '' && this.ssc_form.controls.outOfSecondsscCtrl.value != ''){
      this.ssc_form.controls['gradeSecondsscCtrl'].clearValidators();
      this.ssc_form.controls['gradeSecondsscCtrl'].updateValueAndValidity();
    }

    //if markThirdsscCtrl & outOfThirdsscCtrl is not null
    if(this.ssc_form.controls.markThirdsscCtrl.value != '' && this.ssc_form.controls.outOfThirdsscCtrl.value != ''){
      this.ssc_form.controls['gradeThirdsscCtrl'].clearValidators();
      this.ssc_form.controls['gradeThirdsscCtrl'].updateValueAndValidity();
    }

    //if markFourthsscCtrl & outOfFourthsscCtrl is not null
    if(this.ssc_form.controls.markFourthsscCtrl.value != '' && this.ssc_form.controls.outOfFourthsscCtrl.value != ''){
      this.ssc_form.controls['gradeFourthsscCtrl'].clearValidators();
      this.ssc_form.controls['gradeFourthsscCtrl'].updateValueAndValidity();
    }

    //if grade is not null
    if(this.ssc_form.controls.gradeFirstsscCtrl.value != ''){
      if(this.ssc_form.controls.markFirstsscCtrl.value != '' || this.ssc_form.controls.outOfFirstsscCtrl.value != ''){
        this.ssc_form.controls['markFirstsscCtrl'].setValidators([Validators.required]);
        this.ssc_form.controls['markFirstsscCtrl'].updateValueAndValidity();
        this.ssc_form.controls['outOfFirstsscCtrl'].setValidators([Validators.required]);
        this.ssc_form.controls['outOfFirstsscCtrl'].updateValueAndValidity();
      }else{
        this.ssc_form.controls['markFirstsscCtrl'].clearValidators();
        this.ssc_form.controls['markFirstsscCtrl'].updateValueAndValidity();
        this.ssc_form.controls['outOfFirstsscCtrl'].clearValidators();
        this.ssc_form.controls['outOfFirstsscCtrl'].updateValueAndValidity();
      }
    }

    if(this.ssc_form.controls.gradeSecondsscCtrl.value != ''){
      if(this.ssc_form.controls.markSecondsscCtrl.value != '' || this.ssc_form.controls.outOfSecondsscCtrl.value != ''){
        this.ssc_form.controls['markSecondsscCtrl'].setValidators([Validators.required]);
        this.ssc_form.controls['markSecondsscCtrl'].updateValueAndValidity();
        this.ssc_form.controls['outOfSecondsscCtrl'].setValidators([Validators.required]);
        this.ssc_form.controls['outOfSecondsscCtrl'].updateValueAndValidity();
      }else{
        this.ssc_form.controls['markSecondsscCtrl'].clearValidators();
        this.ssc_form.controls['markSecondsscCtrl'].updateValueAndValidity();
        this.ssc_form.controls['outOfSecondsscCtrl'].clearValidators();
        this.ssc_form.controls['outOfSecondsscCtrl'].updateValueAndValidity();
      }
    }

    if(this.ssc_form.controls.gradeThirdsscCtrl.value != ''){
      if(this.ssc_form.controls.markThirdsscCtrl.value != '' || this.ssc_form.controls.outOfThirdsscCtrl.value != ''){
        this.ssc_form.controls['markThirdsscCtrl'].setValidators([Validators.required]);
        this.ssc_form.controls['markThirdsscCtrl'].updateValueAndValidity();
        this.ssc_form.controls['outOfThirdsscCtrl'].setValidators([Validators.required]);
        this.ssc_form.controls['outOfThirdsscCtrl'].updateValueAndValidity();
      }else{
        this.ssc_form.controls['markThirdsscCtrl'].clearValidators();
        this.ssc_form.controls['markThirdsscCtrl'].updateValueAndValidity();
        this.ssc_form.controls['outOfThirdsscCtrl'].clearValidators();
        this.ssc_form.controls['outOfThirdsscCtrl'].updateValueAndValidity();
      }
    }

    if(this.ssc_form.controls.gradeFourthsscCtrl.value != ''){
      if(this.ssc_form.controls.markFourthsscCtrl.value != '' || this.ssc_form.controls.outOfFourthsscCtrl.value != ''){
        this.ssc_form.controls['markFourthsscCtrl'].setValidators([Validators.required]);
        this.ssc_form.controls['markFourthsscCtrl'].updateValueAndValidity();
        this.ssc_form.controls['outOfFourthsscCtrl'].setValidators([Validators.required]);
        this.ssc_form.controls['outOfFourthsscCtrl'].updateValueAndValidity();
      }else{
        this.ssc_form.controls['markFourthsscCtrl'].clearValidators();
        this.ssc_form.controls['markFourthsscCtrl'].updateValueAndValidity();
        this.ssc_form.controls['outOfFourthsscCtrl'].clearValidators();
        this.ssc_form.controls['outOfFourthsscCtrl'].updateValueAndValidity();
      }
    }

    //if marks greater than outof marks
    if(parseInt(this.ssc_form.controls.markFirstsscCtrl.value) > parseInt(this.ssc_form.controls.outOfFirstsscCtrl.value) ){
      this.ssc_form.controls['outOfFirstsscCtrl'].setValidators([Validators.required]);
      this.ssc_form.controls['markFirstsscCtrl'].setValidators([Validators.required]);
      this.ssc_form.controls['markFirstsscCtrl'].updateValueAndValidity();
      this.ssc_form.controls['outOfFirstsscCtrl'].updateValueAndValidity();
      this.ssc_form.controls.outOfFirstsscCtrl.markAsDirty();
      this.ssc_form.controls.markFirstsscCtrl.markAsDirty();
      this.markError = true;
      validation = false;
    }

    if(parseInt(this.ssc_form.controls.markSecondsscCtrl.value) > parseInt(this.ssc_form.controls.outOfSecondsscCtrl.value)){
      this.ssc_form.controls['outOfSecondsscCtrl'].setValidators([Validators.required]);
      this.ssc_form.controls['markSecondsscCtrl'].setValidators([Validators.required]);
      this.ssc_form.controls['markSecondsscCtrl'].updateValueAndValidity();
      this.ssc_form.controls['outOfSecondsscCtrl'].updateValueAndValidity();
      this.ssc_form.controls.outOfSecondsscCtrl.markAsDirty();
      this.ssc_form.controls.markSecondsscCtrl.markAsDirty();
      this.markError = true;
      validation = false;
    }

    if(parseInt(this.ssc_form.controls.markThirdsscCtrl.value) > parseInt(this.ssc_form.controls.outOfThirdsscCtrl.value) ){
      this.ssc_form.controls['outOfThirdsscCtrl'].setValidators([Validators.required]);
      this.ssc_form.controls['markThirdsscCtrl'].setValidators([Validators.required]);
      this.ssc_form.controls['outOfThirdsscCtrl'].updateValueAndValidity();
      this.ssc_form.controls['markThirdsscCtrl'].updateValueAndValidity();
      this.ssc_form.controls.markThirdsscCtrl.markAsDirty();
      this.ssc_form.controls.outOfThirdsscCtrl.markAsDirty();
      this.markError = true;
      validation = false;
    }

    if(parseInt(this.ssc_form.controls.markFourthsscCtrl.value) > parseInt(this.ssc_form.controls.outOfFourthsscCtrl.value) ){
      this.ssc_form.controls['outOfFourthsscCtrl'].setValidators([Validators.required]);
      this.ssc_form.controls['markFourthsscCtrl'].setValidators([Validators.required]);
      this.ssc_form.controls['outOfFourthsscCtrl'].updateValueAndValidity();
      this.ssc_form.controls['markFourthsscCtrl'].updateValueAndValidity();
      this.ssc_form.controls.markFourthsscCtrl.markAsDirty();
      this.ssc_form.controls.outOfFourthsscCtrl.markAsDirty();
      this.markError = true;
      validation = false;
    }

    //fifth subject validation
    if(this.ssc_form.controls.subjectFifthsscCtrl.value != '' || this.ssc_form.controls.markFifthsscCtrl.value != '' ||
      this.ssc_form.controls.outOfFifthsscCtrl.value != '' || this.ssc_form.controls.gradeFifthsscCtrl.value != ''){
      this.ssc_form.controls['subjectFifthsscCtrl'].setValidators([Validators.required]);
      this.ssc_form.controls['markFifthsscCtrl'].setValidators([Validators.required]);
      this.ssc_form.controls['outOfFifthsscCtrl'].setValidators([Validators.required]);
      this.ssc_form.controls['gradeFifthsscCtrl'].setValidators([Validators.required]);
      this.ssc_form.controls['subjectFifthsscCtrl'].updateValueAndValidity();
      this.ssc_form.controls['markFifthsscCtrl'].updateValueAndValidity();
      this.ssc_form.controls['outOfFifthsscCtrl'].updateValueAndValidity();
      this.ssc_form.controls['gradeFifthsscCtrl'].updateValueAndValidity();
      this.ssc_form.controls.subjectFifthsscCtrl.markAsDirty();
      this.ssc_form.controls.markFifthsscCtrl.markAsDirty();
      this.ssc_form.controls.outOfFifthsscCtrl.markAsDirty();
      this.ssc_form.controls.gradeFifthsscCtrl.markAsDirty();
    }else{
      this.ssc_form.controls['subjectFifthsscCtrl'].clearValidators();
      this.ssc_form.controls['markFifthsscCtrl'].clearValidators();
      this.ssc_form.controls['outOfFifthsscCtrl'].clearValidators();
      this.ssc_form.controls['gradeFifthsscCtrl'].clearValidators();
      this.ssc_form.controls['subjectFifthsscCtrl'].updateValueAndValidity();
      this.ssc_form.controls['markFifthsscCtrl'].updateValueAndValidity();
      this.ssc_form.controls['outOfFifthsscCtrl'].updateValueAndValidity();
      this.ssc_form.controls['gradeFifthsscCtrl'].updateValueAndValidity();
      this.ssc_form.controls.subjectFifthsscCtrl.markAsDirty();
      this.ssc_form.controls.markFifthsscCtrl.markAsDirty();
      this.ssc_form.controls.outOfFifthsscCtrl.markAsDirty();
      this.ssc_form.controls.gradeFifthsscCtrl.markAsDirty();
    }

    if(this.ssc_form.controls.gradeFifthsscCtrl.value != ''){
      if(this.ssc_form.controls.markFifthsscCtrl.value != '' || this.ssc_form.controls.outOfFifthsscCtrl.value != ''){
        this.ssc_form.controls['markFifthsscCtrl'].setValidators([Validators.required]);
        this.ssc_form.controls['markFifthsscCtrl'].updateValueAndValidity();
        this.ssc_form.controls['outOfFifthsscCtrl'].setValidators([Validators.required]);
        this.ssc_form.controls['outOfFifthsscCtrl'].updateValueAndValidity();
      }else{
        this.ssc_form.controls['markFifthsscCtrl'].clearValidators();
        this.ssc_form.controls['markFifthsscCtrl'].updateValueAndValidity();
        this.ssc_form.controls['outOfFifthsscCtrl'].clearValidators();
        this.ssc_form.controls['outOfFifthsscCtrl'].updateValueAndValidity();
      }
    }

    if(this.ssc_form.controls.markFifthsscCtrl.value != '' && this.ssc_form.controls.outOfFifthsscCtrl.value != ''){
      this.ssc_form.controls['gradeFifthsscCtrl'].clearValidators();
      this.ssc_form.controls['gradeFifthsscCtrl'].updateValueAndValidity();
    }

    if(parseInt(this.ssc_form.controls.markFifthsscCtrl.value) > parseInt(this.ssc_form.controls.outOfFifthsscCtrl.value) ){
      this.ssc_form.controls['outOfFifthsscCtrl'].setValidators([Validators.required]);
      this.ssc_form.controls['markFifthsscCtrl'].setValidators([Validators.required]);
      this.ssc_form.controls['markFifthsscCtrl'].updateValueAndValidity();
      this.ssc_form.controls['outOfFifthsscCtrl'].updateValueAndValidity();
      this.ssc_form.controls.outOfFifthsscCtrl.markAsDirty();
      this.ssc_form.controls.markFifthsscCtrl.markAsDirty();
      this.markError = true;
      validation = false;
    }

    //Sixth Subject Validation
    if(this.ssc_form.controls.subjectSixthsscCtrl.value != '' || this.ssc_form.controls.markSixthsscCtrl.value != '' ||
      this.ssc_form.controls.outOfSixthsscCtrl.value != '' || this.ssc_form.controls.gradeSixthsscCtrl.value != ''){
      this.ssc_form.controls['subjectSixthsscCtrl'].setValidators([Validators.required]);
      this.ssc_form.controls['markSixthsscCtrl'].setValidators([Validators.required]);
      this.ssc_form.controls['outOfSixthsscCtrl'].setValidators([Validators.required]);
      this.ssc_form.controls['gradeSixthsscCtrl'].setValidators([Validators.required]);
      this.ssc_form.controls['subjectSixthsscCtrl'].updateValueAndValidity();
      this.ssc_form.controls['markSixthsscCtrl'].updateValueAndValidity();
      this.ssc_form.controls['outOfSixthsscCtrl'].updateValueAndValidity();
      this.ssc_form.controls['gradeSixthsscCtrl'].updateValueAndValidity();
      this.ssc_form.controls.subjectSixthsscCtrl.markAsDirty();
      this.ssc_form.controls.markSixthsscCtrl.markAsDirty();
      this.ssc_form.controls.outOfSixthsscCtrl.markAsDirty();
      this.ssc_form.controls.gradeSixthsscCtrl.markAsDirty();
    }else{
      this.ssc_form.controls['subjectSixthsscCtrl'].clearValidators();
      this.ssc_form.controls['markSixthsscCtrl'].clearValidators();
      this.ssc_form.controls['outOfSixthsscCtrl'].clearValidators();
      this.ssc_form.controls['gradeSixthsscCtrl'].clearValidators();
      this.ssc_form.controls['subjectSixthsscCtrl'].updateValueAndValidity();
      this.ssc_form.controls['markSixthsscCtrl'].updateValueAndValidity();
      this.ssc_form.controls['outOfSixthsscCtrl'].updateValueAndValidity();
      this.ssc_form.controls['gradeSixthsscCtrl'].updateValueAndValidity();
      this.ssc_form.controls.subjectSixthsscCtrl.markAsDirty();
      this.ssc_form.controls.markSixthsscCtrl.markAsDirty();
      this.ssc_form.controls.outOfSixthsscCtrl.markAsDirty();
      this.ssc_form.controls.gradeSixthsscCtrl.markAsDirty();
    }

    if(this.ssc_form.controls.gradeSixthsscCtrl.value != ''){
      if(this.ssc_form.controls.markSixthsscCtrl.value != '' || this.ssc_form.controls.outOfSixthsscCtrl.value != ''){
        this.ssc_form.controls['markSixthsscCtrl'].setValidators([Validators.required]);
        this.ssc_form.controls['markSixthsscCtrl'].updateValueAndValidity();
        this.ssc_form.controls['outOfSixthsscCtrl'].setValidators([Validators.required]);
        this.ssc_form.controls['outOfSixthsscCtrl'].updateValueAndValidity();
      }else{
        this.ssc_form.controls['markSixthsscCtrl'].clearValidators();
        this.ssc_form.controls['markSixthsscCtrl'].updateValueAndValidity();
        this.ssc_form.controls['outOfSixthsscCtrl'].clearValidators();
        this.ssc_form.controls['outOfSixthsscCtrl'].updateValueAndValidity();
      }
    }

    if(this.ssc_form.controls.markSixthsscCtrl.value != '' && this.ssc_form.controls.outOfSixthsscCtrl.value != ''){
      this.ssc_form.controls['gradeSixthsscCtrl'].clearValidators();
      this.ssc_form.controls['gradeSixthsscCtrl'].updateValueAndValidity();
    }

    if(parseInt(this.ssc_form.controls.markSixthsscCtrl.value) > parseInt(this.ssc_form.controls.outOfSixthsscCtrl.value) ){
      this.ssc_form.controls['outOfSixthsscCtrl'].setValidators([Validators.required]);
      this.ssc_form.controls['markSixthsscCtrl'].setValidators([Validators.required]);
      this.ssc_form.controls['markSixthsscCtrl'].updateValueAndValidity();
      this.ssc_form.controls['outOfSixthsscCtrl'].updateValueAndValidity();
      this.ssc_form.controls.outOfSixthsscCtrl.markAsDirty();
      this.ssc_form.controls.markSixthsscCtrl.markAsDirty();
      this.markError = true;
      validation = false;
    }

    if( this.ssc_form.valid && validation){
      var ssc_data ={
          sscUniversity : this.ssc_form.controls.sscUniversityCtrl.value,
          sscCollege : this.ssc_form.controls.sscCollegeCtrl.value,
          sscCountry: '',
          sscAdd : this.ssc_form.controls.sscAddCtrl.value,
          sscEmail : this.ssc_form.controls.sscEmailCtrl.value,
          sscUrl : this.ssc_form.controls.sscUrlCtrl.value,
          sscResultDate: this.ssc_form.controls.sscResultDateCtrl.value,
          sscRollNo: this.ssc_form.controls.sscRollNoCtrl.value,
          sscCertiNo: this.ssc_form.controls.ssccertiNoCtrl.value,
          sscMedium: this.ssc_form.controls.sscMediumCtrl.value,
          subjectFirstssc: this.ssc_form.controls.subjectFirstsscCtrl.value,
          markFirstssc: this.ssc_form.controls.markFirstsscCtrl.value,
          outOfFirstssc: this.ssc_form.controls.outOfFirstsscCtrl.value,
          gradeFirstssc: this.ssc_form.controls.gradeFirstsscCtrl.value,
          
          subjectSecondssc: this.ssc_form.controls.subjectSecondsscCtrl.value,
          markSecondssc: this.ssc_form.controls.markSecondsscCtrl.value,
          outOfSecondssc: this.ssc_form.controls.outOfSecondsscCtrl.value,
          gradeSecondssc: this.ssc_form.controls.gradeSecondsscCtrl.value,
          
          subjectThirdssc: this.ssc_form.controls.subjectThirdsscCtrl.value,
          markThirdssc: this.ssc_form.controls.markThirdsscCtrl.value,
          outOfThirdssc: this.ssc_form.controls.outOfThirdsscCtrl.value,
          gradeThirdssc: this.ssc_form.controls.gradeThirdsscCtrl.value,
          
          subjectFourthssc: this.ssc_form.controls.subjectFourthsscCtrl.value,
          markFourthssc: this.ssc_form.controls.markFourthsscCtrl.value,
          outOfFourthssc: this.ssc_form.controls.outOfFourthsscCtrl.value,
          gradeFourthssc: this.ssc_form.controls.gradeFourthsscCtrl.value,
  
          subjectFifthssc: this.ssc_form.controls.subjectFifthsscCtrl.value,
          markFifthssc: this.ssc_form.controls.markFifthsscCtrl.value,
          outOfFifthssc: this.ssc_form.controls.outOfFifthsscCtrl.value,
          gradeFifthssc: this.ssc_form.controls.gradeFifthsscCtrl.value,
  
          subjectSixthssc: this.ssc_form.controls.subjectSixthsscCtrl.value,
          markSixthssc: this.ssc_form.controls.markSixthsscCtrl.value,
          outOfSixthssc: this.ssc_form.controls.outOfSixthsscCtrl.value,
          gradeSixthssc: this.ssc_form.controls.gradeSixthsscCtrl.value,
          
          sscMarks: this.ssc_form.controls.sscMarksCtrl.value,
      }
      this.api.setProfileValues(ssc_data,'Education_SSC')
        .subscribe(
          (data: any) => {  
            this.ref.close(ssc_data);
            err => console.error(err) 
        });
    }else{
      alert('Please Fill Mandatory fields!!!')
    }
      
    }

    open() {
      this.dialogService.open(find_College_SSC).onClose
      .subscribe(
       (data: any) => {
         
          if(data!==undefined){
            this.ssc_form.controls['sscEmailCtrl'].setValue(data[0].school_email);
            this.ssc_form.controls['sscCollegeCtrl'].setValue(data[0].school_name);
            this.ssc_form.controls['sscAddCtrl'].setValue(data[0].school_add);
            this.ssc_form.controls['sscUrlCtrl'].setValue(data[0].school_url);
          }
          
          err => console.error(err)
        }
       );
    }


}
