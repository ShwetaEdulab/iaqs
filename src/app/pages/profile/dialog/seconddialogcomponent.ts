import {
  Component,
  Input,
  ViewChild
} from '@angular/core';
import {
  NbDialogRef,
  NbDialogService,
  NbThemeService
} from '@nebular/theme';
import {
  ApiService
} from '../../../shared/api.service';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import {
  find_College_HSC
} from './find_college_hsc';
import {
  CountriesService
} from '../../../@core/data/countries.service';

@Component({
  selector: 'nb-dialog',
  template: `
<nb-card class="col-xl-6 offset-xl-3" [style.height.px]="700" [style.overflow]="'auto'"> 
<nb-card-header>
<div class="row">
  <div class="col-md-12">HSC Marks Details</div>
</div>
</nb-card-header>
  <nb-card-body [nbSpinner]="loadingbutton">
  <form [formGroup]="hsc_form"  class="step-container">
    <div class="row">
      <div class="col-md-3">Name of University/Board : </div>
      <div class="col-md-9"> <input  pattern="[A-Za-z ]+" ngModel="{{hsc_marks?.college_university}}" nbInput type="text" [ngClass]="{'form-control-danger': hsc_form.controls.hscUniversityCtrl.invalid && (hsc_form.controls.hscUniversityCtrl.dirty || hsc_form.controls.hscUniversityCtrl.touched)}" formControlName="hscUniversityCtrl" placeholder="" id="" class="form-control"> </div><br>
      <div class="col-md-3">School/College Name : </div>
      <div class="col-md-9"> <input ngModel="{{hsc_marks?.college_name}}" nbInput type="text" [ngClass]="{'form-control-danger': hsc_form.controls.hscCollegeCtrl.invalid && (hsc_form.controls.hscCollegeCtrl.dirty || hsc_form.controls.hscCollegeCtrl.touched)}" formControlName="hscCollegeCtrl" placeholder="" id="" class="form-control"> </div><br>
      <div class="col-md-3">Address of School/College : </div>
      <div class="col-md-9"> <input ngModel="{{hsc_marks?.college_add}}" nbInput type="text" [ngClass]="{'form-control-danger': hsc_form.controls.hscAddCtrl.invalid && (hsc_form.controls.hscAddCtrl.dirty || hsc_form.controls.hscAddCtrl.touched)}" formControlName="hscAddCtrl" placeholder="" id="" class="form-control"> </div><br>
      <div class="col-md-3">Email address : </div>
      <div class="col-md-9"> <input  ngModel="{{hsc_marks?.college_email}}" nbInput type="text" [ngClass]="{'form-control-danger': hsc_form.controls.hscEmailCtrl.invalid && (hsc_form.controls.hscEmailCtrl.dirty || hsc_form.controls.hscEmailCtrl.touched)}" formControlName="hscEmailCtrl" placeholder="" id="" class="form-control"> </div><br>
      <div class="col-md-3">URL : </div>
      <div class="col-md-9"> <input pattern="(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})" ngModel="{{hsc_marks?.college_url}}" nbInput type="text" [ngClass]="{'form-control-danger': hsc_form.controls.hscUrlCtrl.invalid && (hsc_form.controls.hscUrlCtrl.dirty || hsc_form.controls.hscUrlCtrl.touched)}" formControlName="hscUrlCtrl" placeholder="" id="" class="form-control"> </div><br>
      <div class="col-md-3">Date Of Result : </div>
      <div class="col-md-9"> <input readonly ngModel="{{hsc_marks?.college_result_date}}" nbInput type="text" [ngClass]="{'form-control-danger': hsc_form.controls.hscResultDateCtrl.invalid && (hsc_form.controls.hscResultDateCtrl.dirty || hsc_form.controls.hscResultDateCtrl.touched)}" formControlName="hscResultDateCtrl" placeholder="DD/MM/YY" id="" class="form-control"[nbDatepicker]="picker"> <nb-datepicker #picker [(date)]="date" [max]="max"></nb-datepicker></div><br>
      <div class="col-md-3">Roll No / Seat No : </div>
      <div class="col-md-9"> <input pattern="[A-Za-z0-9]+"  ngModel="{{hsc_marks?.college_rollNo}}" nbInput type="text" [ngClass]="{'form-control-danger': hsc_form.controls.hscRollNoCtrl.invalid && (hsc_form.controls.hscRollNoCtrl.dirty || hsc_form.controls.hscRollNoCtrl.touched)}" formControlName="hscRollNoCtrl" placeholder="" id="" class="form-control"> </div><br>
      <div class="col-md-3">Cert No : </div>
      <div class="col-md-9"> <input ngModel="{{hsc_marks?.college_certi_no}}" nbInput type="text"  [ngClass]="{'form-control-danger': hsc_form.controls.hsccertiNoCtrl.invalid && (hsc_form.controls.hsccertiNoCtrl.dirty || hsc_form.controls.hsccertiNoCtrl.touched)}" formControlName="hsccertiNoCtrl" placeholder="" id="" class="form-control"> </div><br>
      <div class="col-md-3">Medium of Instruction at school(English/Others) : </div>
      <div class="col-md-9"> <input pattern="[A-Za-z]+" ngModel="{{hsc_marks?.college_medium}}" nbInput type="text" [ngClass]="{'form-control-danger': hsc_form.controls.hscMediumCtrl.invalid && (hsc_form.controls.hscMediumCtrl.dirty || hsc_form.controls.hscMediumCtrl.touched)}" formControlName="hscMediumCtrl" placeholder="" id="" class="form-control"> </div><br>

      <div class="col-md-3">Subject :</div>
      <div class="col-md-2"><input  ngModel="{{hsc_marks?.Subject_first_hsc}}" nbInput type="text" [ngClass]="{'form-control-danger': hsc_form.controls.subjectFirsthscCtrl.invalid && (hsc_form.controls.subjectFirsthscCtrl.dirty || hsc_form.controls.subjectFirsthscCtrl.touched)}" formControlName="subjectFirsthscCtrl" placeholder="Subject1" id="" class="form-control"></div>
      <div class="col-md-2"><input pattern="[0-9]+" ngModel="{{hsc_marks?.mark_first_hsc}}" nbInput type="text" [ngClass]="{'form-control-danger': hsc_form.controls.markFirsthscCtrl.invalid && (hsc_form.controls.markFirsthscCtrl.dirty || hsc_form.controls.markFirsthscCtrl.touched)}" formControlName="markFirsthscCtrl" placeholder="Marks" id="" class="form-control"></div>
      <div class="col-md-2"><input pattern="[0-9]+" ngModel="{{hsc_marks?.OutOf_first_hsc}}" nbInput type="text" [ngClass]="{'form-control-danger': hsc_form.controls.outOfFirsthscCtrl.invalid && (hsc_form.controls.outOfFirsthscCtrl.dirty || hsc_form.controls.outOfFirsthscCtrl.touched)}" formControlName="outOfFirsthscCtrl" placeholder="Out of" id="" class="form-control"></div> OR <div
        class="col-md-2"> <input ngModel="{{hsc_marks?.grade_first_hsc}}" nbInput type="text"  [ngClass]="{'form-control-danger': hsc_form.controls.gradeFirsthscCtrl.invalid && (hsc_form.controls.gradeFirsthscCtrl.dirty || hsc_form.controls.gradeFirsthscCtrl.touched)}" formControlName="gradeFirsthscCtrl" placeholder="Grade" id="" class="form-control"> </div><br>
      <div class="col-md-3"></div>
      <div class="col-md-2"><input  ngModel="{{hsc_marks?.Subject_Second_hsc}}" nbInput type="text" [ngClass]="{'form-control-danger': hsc_form.controls.subjectSecondhscCtrl.invalid && (hsc_form.controls.subjectSecondhscCtrl.dirty || hsc_form.controls.subjectSecondhscCtrl.touched)}" formControlName="subjectSecondhscCtrl" placeholder="Subject2" id="" class="form-control"></div>
      <div class="col-md-2"><input pattern="[0-9]+" ngModel="{{hsc_marks?.mark_Second_hsc}}" nbInput type="text" [ngClass]="{'form-control-danger': hsc_form.controls.markSecondhscCtrl.invalid && (hsc_form.controls.markSecondhscCtrl.dirty || hsc_form.controls.markSecondhscCtrl.touched)}" formControlName="markSecondhscCtrl" placeholder="Marks" id="" class="form-control"></div>
      <div class="col-md-2"><input pattern="[0-9]+" ngModel="{{hsc_marks?.OutOf_Second_hsc}}" nbInput type="text" [ngClass]="{'form-control-danger': hsc_form.controls.outOfSecondhscCtrl.invalid && (hsc_form.controls.outOfSecondhscCtrl.dirty || hsc_form.controls.outOfSecondhscCtrl.touched)}" formControlName="outOfSecondhscCtrl" placeholder="Out of" id="" class="form-control"></div> OR <div
        class="col-md-2"> <input ngModel="{{hsc_marks?.grade_Second_hsc}}" [ngClass]="{'form-control-danger': hsc_form.controls.gradeSecondhscCtrl.invalid && (hsc_form.controls.gradeSecondhscCtrl.dirty || hsc_form.controls.gradeSecondhscCtrl.touched)}" nbInput type="text" formControlName="gradeSecondhscCtrl" placeholder="Grade" id="" class="form-control"> </div><br>
      <div class="col-md-3"></div>
      <div class="col-md-2"><input  ngModel="{{hsc_marks?.Subject_Third_hsc}}" nbInput type="text" [ngClass]="{'form-control-danger': hsc_form.controls.subjectThirdhscCtrl.invalid && (hsc_form.controls.subjectThirdhscCtrl.dirty || hsc_form.controls.subjectThirdhscCtrl.touched)}" formControlName="subjectThirdhscCtrl" placeholder="Subject3" id="" class="form-control"></div>
      <div class="col-md-2"><input pattern="[0-9]+" ngModel="{{hsc_marks?.mark_Third_hsc}}" nbInput type="text" [ngClass]="{'form-control-danger': hsc_form.controls.markThirdhscCtrl.invalid && (hsc_form.controls.markThirdhscCtrl.dirty || hsc_form.controls.markThirdhscCtrl.touched)}" formControlName="markThirdhscCtrl" placeholder="Marks" id="" class="form-control"></div>
      <div class="col-md-2"><input pattern="[0-9]+" ngModel="{{hsc_marks?.OutOf_Third_hsc}}" nbInput type="text" [ngClass]="{'form-control-danger': hsc_form.controls.outOfThirdhscCtrl.invalid && (hsc_form.controls.outOfThirdhscCtrl.dirty || hsc_form.controls.outOfThirdhscCtrl.touched)}" formControlName="outOfThirdhscCtrl" placeholder="Out of" id="" class="form-control"></div> OR <div
        class="col-md-2"> <input ngModel="{{hsc_marks?.grade_Third_hsc}}" [ngClass]="{'form-control-danger': hsc_form.controls.gradeThirdhscCtrl.invalid && (hsc_form.controls.gradeThirdhscCtrl.dirty || hsc_form.controls.gradeThirdhscCtrl.touched)}" nbInput type="text" formControlName="gradeThirdhscCtrl" placeholder="Grade" id="" class="form-control"> </div><br>
      <div class="col-md-3"></div>
      <div class="col-md-2"><input  ngModel="{{hsc_marks?.Subject_fourth_hsc}}" nbInput type="text" [ngClass]="{'form-control-danger': hsc_form.controls.subjectFourthhscCtrl.invalid && (hsc_form.controls.subjectFourthhscCtrl.dirty || hsc_form.controls.subjectFourthhscCtrl.touched)}" formControlName="subjectFourthhscCtrl" placeholder="Subject4" id="" class="form-control"></div>
      <div class="col-md-2"><input pattern="[0-9]+" ngModel="{{hsc_marks?.mark_fourth_hsc}}" nbInput type="text" [ngClass]="{'form-control-danger': hsc_form.controls.markFourthhscCtrl.invalid && (hsc_form.controls.markFourthhscCtrl.dirty || hsc_form.controls.markFourthhscCtrl.touched)}" formControlName="markFourthhscCtrl" placeholder="Marks" id="" class="form-control"></div>
      <div class="col-md-2"><input pattern="[0-9]+" ngModel="{{hsc_marks?.OutOf_fourth_hsc}}" nbInput type="text" [ngClass]="{'form-control-danger': hsc_form.controls.outOfFourthhscCtrl.invalid && (hsc_form.controls.outOfFourthhscCtrl.dirty || hsc_form.controls.outOfFourthhscCtrl.touched)}" formControlName="outOfFourthhscCtrl" placeholder="Out of" id="" class="form-control"></div> OR <div
        class="col-md-2"> <input ngModel="{{hsc_marks?.grade_fourth_hsc}}" [ngClass]="{'form-control-danger': hsc_form.controls.gradeFourthhscCtrl.invalid && (hsc_form.controls.gradeFourthhscCtrl.dirty || hsc_form.controls.gradeFourthhscCtrl.touched)}" nbInput type="text" formControlName="gradeFourthhscCtrl" placeholder="Grade" id="" class="form-control"> </div><br>
      <div class="col-md-3"></div>
      <div class="col-md-2"><input  ngModel="{{hsc_marks?.Subject_fifth_hsc}}" [ngClass]="{'form-control-danger': hsc_form.controls.subjectFifthhscCtrl.invalid && (hsc_form.controls.subjectFifthhscCtrl.dirty || hsc_form.controls.subjectFifthhscCtrl.touched)}" nbInput type="text" formControlName="subjectFifthhscCtrl" placeholder="Subject5" id="" class="form-control"></div>
      <div class="col-md-2"><input pattern="[0-9]+" [ngClass]="{'form-control-danger': hsc_form.controls.markFifthhscCtrl.invalid && (hsc_form.controls.markFifthhscCtrl.dirty || hsc_form.controls.markFifthhscCtrl.touched)}" ngModel="{{hsc_marks?.mark_fifth_hsc}}" nbInput type="text" formControlName="markFifthhscCtrl" placeholder="Marks" id="" class="form-control"></div>
      <div class="col-md-2"><input pattern="[0-9]+" [ngClass]="{'form-control-danger': hsc_form.controls.outOfFifthhscCtrl.invalid && (hsc_form.controls.outOfFifthhscCtrl.dirty || hsc_form.controls.outOfFifthhscCtrl.touched)}" ngModel="{{hsc_marks?.OutOf_fifth_hsc}}"  nbInput type="text" formControlName="outOfFifthhscCtrl" placeholder="Out of" id="" class="form-control"></div> OR <div
        class="col-md-2"> <input [ngClass]="{'form-control-danger': hsc_form.controls.gradeFifthhscCtrl.invalid && (hsc_form.controls.gradeFifthhscCtrl.dirty || hsc_form.controls.gradeFifthhscCtrl.touched)}" ngModel="{{hsc_marks?.grade_fifth_hsc}}" nbInput type="text" formControlName="gradeFifthhscCtrl" placeholder="Grade" id="" class="form-control"> </div><br>
      <div class="col-md-3"></div>
      <div class="col-md-2"><input  [ngClass]="{'form-control-danger': hsc_form.controls.subjectSixthhscCtrl.invalid && (hsc_form.controls.subjectSixthhscCtrl.dirty || hsc_form.controls.subjectSixthhscCtrl.touched)}" ngModel="{{hsc_marks?.Subject_Six_hsc}}" nbInput type="text" formControlName="subjectSixthhscCtrl" placeholder="Subject6" id="" class="form-control"></div>
      <div class="col-md-2"><input pattern="[0-9]+" ngModel="{{hsc_marks?.mark_Six_hsc}}" [ngClass]="{'form-control-danger': hsc_form.controls.markSixthhscCtrl.invalid && (hsc_form.controls.markSixthhscCtrl.dirty || hsc_form.controls.markSixthhscCtrl.touched)}" nbInput type="text" formControlName="markSixthhscCtrl" placeholder="Marks" id="" class="form-control"></div>
      <div class="col-md-2"><input pattern="[0-9]+" [ngClass]="{'form-control-danger': hsc_form.controls.outOfSixthhscCtrl.invalid && (hsc_form.controls.outOfSixthhscCtrl.dirty || hsc_form.controls.outOfSixthhscCtrl.touched)}" ngModel="{{hsc_marks?.OutOf_Six_hsc}}" nbInput type="text" formControlName="outOfSixthhscCtrl" placeholder="Out of" id="" class="form-control"></div> OR <div
        class="col-md-2"> <input [ngClass]="{'form-control-danger': hsc_form.controls.gradeSixthhscCtrl.invalid && (hsc_form.controls.gradeSixthhscCtrl.dirty || hsc_form.controls.gradeSixthhscCtrl.touched)}" ngModel="{{hsc_marks?.grade_Six_hsc}}" nbInput type="text" formControlName="gradeSixthhscCtrl" placeholder="Grade" id="" class="form-control"> </div><br>
        <div class="col-md-12"><span *ngIf="markError===true" style="color:red; font-weight: bold">Obtained marks should be less than Out of marks </span> </div>

      <div class="col-md-3">CGPA or Marks in % : </div>
      <div class="col-md-9"> <input pattern="[A-Za-z0-9%+-.]+" ngModel="{{hsc_marks?.college_marks}}"  nbInput type="text" [ngClass]="{'form-control-danger': hsc_form.controls.hscMarksCtrl.invalid && (hsc_form.controls.hscMarksCtrl.dirty || hsc_form.controls.hscMarksCtrl.touched)}" formControlName="hscMarksCtrl" placeholder="" id="" class="form-control"> </div><br>
    </div>
    </form>
  </nb-card-body>
  <nb-card-footer>
    <button nbButton hero status="primary" (click)="dismiss()">Close</button>
    <button nbButton hero status="primary" style="margin-left:15px" (click)="savehsc()">Update</button>
  </nb-card-footer>
</nb-card>
`,
})
export class SecondDialogComponent {
  @Input() title: string;
  hsc_marks;
  hsc_form: FormGroup;
  hsc_radio_check;
  qualification;
  appearance = "disappeared";
  submitted = false;
  hsc = 0;
  preboard = 0;
  appearances;
  hsc_country;
  hscCountryValidation = true;
  Countries: any[];
  max;
date;
markError = false;
  readonly emailValidate = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  college_result_date: any;
  loadingbutton = true;

  constructor(protected ref: NbDialogRef < SecondDialogComponent > ,
    protected api: ApiService,
    private fb: FormBuilder,
    private dialogService: NbDialogService,
    protected countries: CountriesService,
    public themeService : NbThemeService
  ) {
    this.Countries = this.countries.getData();
  }

  dismiss() {
    this.ref.close();
  }

  // get Radio_hsc() {
  //   return this.hsc_form.get('Radio_hsc');
  // }

  appear(event) {
    if (event.target.checked == true) {
      this.appearance = "appeared";
    } else if (event.target.checked == false) {
      this.appearance = "disappeared";
    } else {
      this.appearance = "disappeared";
    }

  }

  checkradiohsc(x) {
    if (x == 1) {
      this.hsc_radio_check = '1';
      this.qualification = 'PRE-BOARD';
    } else {
      this.hsc_radio_check = '2';
      this.qualification = 'HSC';
    }

  }

  ngOnInit() {
     this.api.getTheme().subscribe((data: any) => {
        if(data['data']){
          this.themeService.changeTheme(data['data']);
        }else{
          this.themeService.changeTheme('default');
        }
      });
    this.buildhscForm();
  }


  private buildhscForm(): void {


    this.api.getProfileValue('Education_HSC')
      .subscribe(
        (data: any) => {
          this.hsc_marks = data['data']['hsc_info'];
          this.loadingbutton = false;
          if(this.hsc_marks == null){
            this.college_result_date = null;
          }else{
            this.college_result_date = new Date(data['data']['hsc_info']['college_result_date']);
          }
          if (this.hsc_marks != null) {
            this.hsc_country = data['data']['hsc_info']['college_country'];
            if (this.hsc_marks.qualification == "HSC") {
              this.hsc = 1;
              this.preboard = 0;
              this.hsc_radio_check = '2';
              this.qualification = 'HSC';
              //this.hsc_form.controls['Radio_hsc'].setValue('2');
            } else if (this.hsc_marks.qualification == "PRE-BOARD") {
              this.preboard = 1;
              this.hsc = 0;
              this.hsc_radio_check = '1';
              this.qualification = 'PRE-BOARD';
              //this.hsc_form.controls['Radio_hsc'].setValue('1');
              if (this.hsc_marks.appearance == "appeared") {
                this.appearances = "" + 1;
                this.appearance = "appeared";
              } else {
                this.appearances = "" + 0;
                this.appearance = "disappeared";
              }
            } else {

            }
          }

          err => console.error(err)
        });

    this.hsc_form = this.fb.group({
      //Radio_hsc: ['', Validators.required, ],
      hscUniversityCtrl: ['', Validators.required],
      hscCollegeCtrl: ['', Validators.required],
      hscAddCtrl: ['', Validators.required],
      hscEmailCtrl: ['', [Validators.required, Validators.pattern(this.emailValidate)]],
      hscUrlCtrl: ['', Validators.required],
      hscResultDateCtrl: ['', Validators.required],
      hscRollNoCtrl: ['', Validators.required],
      hsccertiNoCtrl: ['', Validators.required],
      hscMediumCtrl: ['', Validators.required],
      subjectFirsthscCtrl: ['', Validators.required],
      markFirsthscCtrl: ['', Validators.required],
      outOfFirsthscCtrl: ['', Validators.required],
      gradeFirsthscCtrl: [''],
      subjectSecondhscCtrl: ['', Validators.required],
      markSecondhscCtrl: ['', Validators.required],
      outOfSecondhscCtrl: ['', Validators.required],
      gradeSecondhscCtrl: [''],
      subjectThirdhscCtrl: ['', Validators.required],
      markThirdhscCtrl: ['', Validators.required],
      outOfThirdhscCtrl: ['', Validators.required],
      gradeThirdhscCtrl: [''],
      subjectFourthhscCtrl: ['', Validators.required],
      markFourthhscCtrl: ['', Validators.required],
      outOfFourthhscCtrl: ['', Validators.required],
      gradeFourthhscCtrl: [''],
      subjectFifthhscCtrl: ['', ],
      markFifthhscCtrl: ['', ],
      outOfFifthhscCtrl: ['', ],
      gradeFifthhscCtrl: [''],
      subjectSixthhscCtrl: ['', ],
      markSixthhscCtrl: ['', ],
      outOfSixthhscCtrl: ['', ],
      gradeSixthhscCtrl: [''],
      hscMarksCtrl: ['', Validators.required],
    });
  }

  savehsc() {
    this.submitted = true;
    var validation = true;

    if (this.hsc_form.valid == false) {
      this.hsc_form.controls.hscUniversityCtrl.markAsDirty();
      this.hsc_form.controls.hscCollegeCtrl.markAsDirty();
      this.hsc_form.controls.hscAddCtrl.markAsDirty();
      this.hsc_form.controls.hscEmailCtrl.markAsDirty();
      this.hsc_form.controls.hscUrlCtrl.markAsDirty();
      this.hsc_form.controls.hscResultDateCtrl.markAsDirty();
      this.hsc_form.controls.hscRollNoCtrl.markAsDirty();
      this.hsc_form.controls.hsccertiNoCtrl.markAsDirty();
      this.hsc_form.controls.hscMediumCtrl.markAsDirty();
      this.hsc_form.controls.subjectFirsthscCtrl.markAsDirty();
      //this.hsc_form.controls.markFirsthscCtrl.markAsDirty();
      //this.hsc_form.controls.outOfFirsthscCtrl.markAsDirty();

      this.hsc_form.controls.subjectSecondhscCtrl.markAsDirty();
      //this.hsc_form.controls.markSecondhscCtrl.markAsDirty();
      //this.hsc_form.controls.outOfSecondhscCtrl.markAsDirty();

      this.hsc_form.controls.subjectThirdhscCtrl.markAsDirty();
      //this.hsc_form.controls.markThirdhscCtrl.markAsDirty();
      //this.hsc_form.controls.outOfThirdhscCtrl.markAsDirty();

      this.hsc_form.controls.subjectFourthhscCtrl.markAsDirty();
      //this.hsc_form.controls.markFourthhscCtrl.markAsDirty();
      //this.hsc_form.controls.outOfFourthhscCtrl.markAsDirty();

      this.hsc_form.controls.hscMarksCtrl.markAsDirty();
    } 
        //if marks and grade both are null 
        if(this.hsc_form.controls.markFirsthscCtrl.value== '' && this.hsc_form.controls.outOfFirsthscCtrl.value == '' && this.hsc_form.controls.gradeFirsthscCtrl.value == ''){
      
          this.hsc_form.controls['markFirsthscCtrl'].setValidators([Validators.required]);
          this.hsc_form.controls['outOfFirsthscCtrl'].setValidators([Validators.required]);
          this.hsc_form.controls['gradeFirsthscCtrl'].setValidators([Validators.required]);
          this.hsc_form.controls['markFirsthscCtrl'].updateValueAndValidity();
          this.hsc_form.controls['outOfFirsthscCtrl'].updateValueAndValidity();
          this.hsc_form.controls['gradeFirsthscCtrl'].updateValueAndValidity();
          this.hsc_form.controls.markFirsthscCtrl.markAsDirty();
          this.hsc_form.controls.outOfFirsthscCtrl.markAsDirty();
          this.hsc_form.controls.gradeFirsthscCtrl.markAsDirty();
        }
        if(this.hsc_form.controls.markSecondhscCtrl.value== '' && this.hsc_form.controls.outOfSecondhscCtrl.value == '' && this.hsc_form.controls.gradeSecondhscCtrl.value == ''){
          
          this.hsc_form.controls['markSecondhscCtrl'].setValidators([Validators.required]);
          this.hsc_form.controls['outOfSecondhscCtrl'].setValidators([Validators.required]);
          this.hsc_form.controls['gradeSecondhscCtrl'].setValidators([Validators.required]);
          this.hsc_form.controls['markSecondhscCtrl'].updateValueAndValidity();
          this.hsc_form.controls['outOfSecondhscCtrl'].updateValueAndValidity();
          this.hsc_form.controls['gradeSecondhscCtrl'].updateValueAndValidity();
          this.hsc_form.controls.markSecondhscCtrl.markAsDirty();
          this.hsc_form.controls.outOfSecondhscCtrl.markAsDirty();
          this.hsc_form.controls.gradeSecondhscCtrl.markAsDirty();
          
        }
        if(this.hsc_form.controls.markThirdhscCtrl.value== '' && this.hsc_form.controls.outOfThirdhscCtrl.value == '' && this.hsc_form.controls.gradeThirdhscCtrl.value == ''){
          
          this.hsc_form.controls['markThirdhscCtrl'].setValidators([Validators.required]);
          this.hsc_form.controls['outOfThirdhscCtrl'].setValidators([Validators.required]);
          this.hsc_form.controls['gradeThirdhscCtrl'].setValidators([Validators.required]);
          this.hsc_form.controls['markThirdhscCtrl'].updateValueAndValidity();
          this.hsc_form.controls['outOfThirdhscCtrl'].updateValueAndValidity();
          this.hsc_form.controls['gradeThirdhscCtrl'].updateValueAndValidity();
          this.hsc_form.controls.markThirdhscCtrl.markAsDirty();
          this.hsc_form.controls.outOfThirdhscCtrl.markAsDirty();
          this.hsc_form.controls.gradeThirdhscCtrl.markAsDirty();
        }
        if(this.hsc_form.controls.gradeFourthhscCtrl.value== '' && this.hsc_form.controls.markFourthhscCtrl.value == '' && this.hsc_form.controls.outOfFourthhscCtrl.value== ''){
          
          this.hsc_form.controls['markFourthhscCtrl'].setValidators([Validators.required]);
          this.hsc_form.controls['outOfFourthhscCtrl'].setValidators([Validators.required]);
          this.hsc_form.controls['gradeFourthhscCtrl'].setValidators([Validators.required]);
          this.hsc_form.controls['markFourthhscCtrl'].updateValueAndValidity();
          this.hsc_form.controls['outOfFourthhscCtrl'].updateValueAndValidity();
          this.hsc_form.controls['gradeFourthhscCtrl'].updateValueAndValidity();
          this.hsc_form.controls.markFourthhscCtrl.markAsDirty();
          this.hsc_form.controls.outOfFourthhscCtrl.markAsDirty();
          this.hsc_form.controls.gradeFourthhscCtrl.markAsDirty();
    
        }
        //if outOfFirsthscCtrl is null 
        if(this.hsc_form.controls.markFirsthscCtrl.value != '' && this.hsc_form.controls.outOfFirsthscCtrl.value == ''){
          
          this.hsc_form.controls['outOfFirsthscCtrl'].setValidators([Validators.required]);
          this.hsc_form.controls['gradeFirsthscCtrl'].clearValidators();
          this.hsc_form.controls['gradeFirsthscCtrl'].updateValueAndValidity();
          this.hsc_form.controls['outOfFirsthscCtrl'].updateValueAndValidity();
          this.hsc_form.controls.outOfFirsthscCtrl.markAsDirty();
        }
        //if outOfSecondhscCtrl is null
        if(this.hsc_form.controls.markSecondhscCtrl.value != '' && this.hsc_form.controls.outOfSecondhscCtrl.value == ''){
         
          this.hsc_form.controls['outOfSecondhscCtrl'].setValidators([Validators.required]);
          this.hsc_form.controls['outOfSecondhscCtrl'].updateValueAndValidity();
          this.hsc_form.controls.outOfSecondhscCtrl.markAsDirty();
          this.hsc_form.controls['gradeSecondhscCtrl'].clearValidators();
          this.hsc_form.controls['gradeSecondhscCtrl'].updateValueAndValidity();
        }
    
        //if outOfThirdhscCtrl is null
        if(this.hsc_form.controls.markThirdhscCtrl.value != '' && this.hsc_form.controls.outOfThirdhscCtrl.value == ''){
          
          this.hsc_form.controls['outOfThirdhscCtrl'].setValidators([Validators.required]);
          this.hsc_form.controls['outOfThirdhscCtrl'].updateValueAndValidity();
          this.hsc_form.controls.outOfThirdhscCtrl.markAsDirty();
          this.hsc_form.controls['gradeThirdhscCtrl'].clearValidators();
          this.hsc_form.controls['gradeThirdhscCtrl'].updateValueAndValidity();
        }
    
        //if outOfFourthhscCtrl is null
        if(this.hsc_form.controls.markFourthhscCtrl.value != '' && this.hsc_form.controls.outOfFourthhscCtrl.value == ''){
         
          this.hsc_form.controls['outOfFourthhscCtrl'].setValidators([Validators.required]);
          this.hsc_form.controls['outOfFourthhscCtrl'].updateValueAndValidity();
          this.hsc_form.controls.outOfFourthhscCtrl.markAsDirty();
          this.hsc_form.controls['gradeFourthhscCtrl'].clearValidators();
          this.hsc_form.controls['gradeFourthhscCtrl'].updateValueAndValidity();
        }
    
        //if markFirsthscCtrl is null 
        if(this.hsc_form.controls.markFirsthscCtrl.value == '' &&  this.hsc_form.controls.outOfFirsthscCtrl.value !=''){
          this.hsc_form.controls['markFirsthscCtrl'].setValidators([Validators.required]);
          this.hsc_form.controls['markFirsthscCtrl'].updateValueAndValidity();
          this.hsc_form.controls.markFirsthscCtrl.markAsDirty();
          this.hsc_form.controls['gradeFirsthscCtrl'].clearValidators();
          this.hsc_form.controls['gradeFirsthscCtrl'].updateValueAndValidity();
        }
        //if markSecondhscCtrl is null 
        if(this.hsc_form.controls.markSecondhscCtrl.value == '' &&  this.hsc_form.controls.outOfSecondhscCtrl.value !='' ){
          this.hsc_form.controls['markSecondhscCtrl'].setValidators([Validators.required]);
          this.hsc_form.controls['markSecondhscCtrl'].updateValueAndValidity();
          this.hsc_form.controls.markSecondhscCtrl.markAsDirty();
          this.hsc_form.controls['gradeSecondhscCtrl'].clearValidators();
          this.hsc_form.controls['gradeSecondhscCtrl'].updateValueAndValidity();
          
        }
    
        //if markThirdhscCtrl is null
        if(this.hsc_form.controls.markThirdhscCtrl.value == '' && this.hsc_form.controls.outOfThirdhscCtrl.value != ''){
          this.hsc_form.controls['markThirdhscCtrl'].setValidators([Validators.required]);
          this.hsc_form.controls['markThirdhscCtrl'].updateValueAndValidity();
          this.hsc_form.controls.markThirdhscCtrl.markAsDirty();
          this.hsc_form.controls['gradeThirdhscCtrl'].clearValidators();
          this.hsc_form.controls['gradeThirdhscCtrl'].updateValueAndValidity();
        }
    
        //if markFourthhscCtrl is null
        if(this.hsc_form.controls.markFourthhscCtrl.value == '' && this.hsc_form.controls.outOfFourthhscCtrl.value != '' ){
          this.hsc_form.controls['markFourthhscCtrl'].setValidators([Validators.required]);
          this.hsc_form.controls['markFourthhscCtrl'].updateValueAndValidity();
          this.hsc_form.controls.markFourthhscCtrl.markAsDirty();
          this.hsc_form.controls['gradeFourthhscCtrl'].clearValidators();
          this.hsc_form.controls['gradeFourthhscCtrl'].updateValueAndValidity();
        }
    
        //if markFirsthscCtrl & outOfFirsthscCtrl is not null
        if(this.hsc_form.controls.markFirsthscCtrl.value != '' && this.hsc_form.controls.outOfFirsthscCtrl.value != ''){
          this.hsc_form.controls['gradeFirsthscCtrl'].clearValidators();
          this.hsc_form.controls['gradeFirsthscCtrl'].updateValueAndValidity();
        }
    
        //if markSecondhscCtrl & outOfSecondhscCtrl is not null
        if(this.hsc_form.controls.markSecondhscCtrl.value != '' && this.hsc_form.controls.outOfSecondhscCtrl.value != ''){
          this.hsc_form.controls['gradeSecondhscCtrl'].clearValidators();
          this.hsc_form.controls['gradeSecondhscCtrl'].updateValueAndValidity();
        }
    
        //if markThirdhscCtrl & outOfThirdhscCtrl is not null
        if(this.hsc_form.controls.markThirdhscCtrl.value != '' && this.hsc_form.controls.outOfThirdhscCtrl.value != ''){
          this.hsc_form.controls['gradeThirdhscCtrl'].clearValidators();
          this.hsc_form.controls['gradeThirdhscCtrl'].updateValueAndValidity();
        }
    
        //if markFourthhscCtrl & outOfFourthhscCtrl is not null
        if(this.hsc_form.controls.markFourthhscCtrl.value != '' && this.hsc_form.controls.outOfFourthhscCtrl.value != ''){
          this.hsc_form.controls['gradeFourthhscCtrl'].clearValidators();
          this.hsc_form.controls['gradeFourthhscCtrl'].updateValueAndValidity();
        }
    
        //if grade is not null
        if(this.hsc_form.controls.gradeFirsthscCtrl.value != ''){
          if(this.hsc_form.controls.markFirsthscCtrl.value != '' || this.hsc_form.controls.outOfFirsthscCtrl.value != ''){
            this.hsc_form.controls['markFirsthscCtrl'].setValidators([Validators.required]);
            this.hsc_form.controls['markFirsthscCtrl'].updateValueAndValidity();
            this.hsc_form.controls['outOfFirsthscCtrl'].setValidators([Validators.required]);
            this.hsc_form.controls['outOfFirsthscCtrl'].updateValueAndValidity();
          }else{
            this.hsc_form.controls['markFirsthscCtrl'].clearValidators();
            this.hsc_form.controls['markFirsthscCtrl'].updateValueAndValidity();
            this.hsc_form.controls['outOfFirsthscCtrl'].clearValidators();
            this.hsc_form.controls['outOfFirsthscCtrl'].updateValueAndValidity();
          }
        }
    
        if(this.hsc_form.controls.gradeSecondhscCtrl.value != ''){
          if(this.hsc_form.controls.markSecondhscCtrl.value != '' || this.hsc_form.controls.outOfSecondhscCtrl.value != ''){
            this.hsc_form.controls['markSecondhscCtrl'].setValidators([Validators.required]);
            this.hsc_form.controls['markSecondhscCtrl'].updateValueAndValidity();
            this.hsc_form.controls['outOfSecondhscCtrl'].setValidators([Validators.required]);
            this.hsc_form.controls['outOfSecondhscCtrl'].updateValueAndValidity();
          }else{
            this.hsc_form.controls['markSecondhscCtrl'].clearValidators();
            this.hsc_form.controls['markSecondhscCtrl'].updateValueAndValidity();
            this.hsc_form.controls['outOfSecondhscCtrl'].clearValidators();
            this.hsc_form.controls['outOfSecondhscCtrl'].updateValueAndValidity();
          }
        }
    
        if(this.hsc_form.controls.gradeThirdhscCtrl.value != ''){
          if(this.hsc_form.controls.markThirdhscCtrl.value != '' || this.hsc_form.controls.outOfThirdhscCtrl.value != ''){
            this.hsc_form.controls['markThirdhscCtrl'].setValidators([Validators.required]);
            this.hsc_form.controls['markThirdhscCtrl'].updateValueAndValidity();
            this.hsc_form.controls['outOfThirdhscCtrl'].setValidators([Validators.required]);
            this.hsc_form.controls['outOfThirdhscCtrl'].updateValueAndValidity();
          }else{
            this.hsc_form.controls['markThirdhscCtrl'].clearValidators();
            this.hsc_form.controls['markThirdhscCtrl'].updateValueAndValidity();
            this.hsc_form.controls['outOfThirdhscCtrl'].clearValidators();
            this.hsc_form.controls['outOfThirdhscCtrl'].updateValueAndValidity();
          }
        }
    
        if(this.hsc_form.controls.gradeFourthhscCtrl.value != ''){
          if(this.hsc_form.controls.markFourthhscCtrl.value != '' || this.hsc_form.controls.outOfFourthhscCtrl.value != ''){
            this.hsc_form.controls['markFourthhscCtrl'].setValidators([Validators.required]);
            this.hsc_form.controls['markFourthhscCtrl'].updateValueAndValidity();
            this.hsc_form.controls['outOfFourthhscCtrl'].setValidators([Validators.required]);
            this.hsc_form.controls['outOfFourthhscCtrl'].updateValueAndValidity();
          }else{
            this.hsc_form.controls['markFourthhscCtrl'].clearValidators();
            this.hsc_form.controls['markFourthhscCtrl'].updateValueAndValidity();
            this.hsc_form.controls['outOfFourthhscCtrl'].clearValidators();
            this.hsc_form.controls['outOfFourthhscCtrl'].updateValueAndValidity();
          }
        }
    
        //if marks greater than outof marks
        if(parseInt(this.hsc_form.controls.markFirsthscCtrl.value) > parseInt(this.hsc_form.controls.outOfFirsthscCtrl.value) ){
          this.hsc_form.controls['outOfFirsthscCtrl'].setValidators([Validators.required]);
          this.hsc_form.controls['markFirsthscCtrl'].setValidators([Validators.required]);
          this.hsc_form.controls['markFirsthscCtrl'].updateValueAndValidity();
          this.hsc_form.controls['outOfFirsthscCtrl'].updateValueAndValidity();
          this.hsc_form.controls.outOfFirsthscCtrl.markAsDirty();
          this.hsc_form.controls.markFirsthscCtrl.markAsDirty();
          this.markError = true;
          validation = false;
        }
    
        if(parseInt(this.hsc_form.controls.markSecondhscCtrl.value) > parseInt(this.hsc_form.controls.outOfSecondhscCtrl.value)){
          this.hsc_form.controls['outOfSecondhscCtrl'].setValidators([Validators.required]);
          this.hsc_form.controls['markSecondhscCtrl'].setValidators([Validators.required]);
          this.hsc_form.controls['markSecondhscCtrl'].updateValueAndValidity();
          this.hsc_form.controls['outOfSecondhscCtrl'].updateValueAndValidity();
          this.hsc_form.controls.outOfSecondhscCtrl.markAsDirty();
          this.hsc_form.controls.markSecondhscCtrl.markAsDirty();
          this.markError = true;
          validation = false;
        }
    
        if(parseInt(this.hsc_form.controls.markThirdhscCtrl.value) > parseInt(this.hsc_form.controls.outOfThirdhscCtrl.value) ){
          this.hsc_form.controls['outOfThirdhscCtrl'].setValidators([Validators.required]);
          this.hsc_form.controls['markThirdhscCtrl'].setValidators([Validators.required]);
          this.hsc_form.controls['outOfThirdhscCtrl'].updateValueAndValidity();
          this.hsc_form.controls['markThirdhscCtrl'].updateValueAndValidity();
          this.hsc_form.controls.markThirdhscCtrl.markAsDirty();
          this.hsc_form.controls.outOfThirdhscCtrl.markAsDirty();
          this.markError = true;
          validation = false;
        }
    
        if(parseInt(this.hsc_form.controls.markFourthhscCtrl.value) > parseInt(this.hsc_form.controls.outOfFourthhscCtrl.value) ){
          this.hsc_form.controls['outOfFourthhscCtrl'].setValidators([Validators.required]);
          this.hsc_form.controls['markFourthhscCtrl'].setValidators([Validators.required]);
          this.hsc_form.controls['outOfFourthhscCtrl'].updateValueAndValidity();
          this.hsc_form.controls['markFourthhscCtrl'].updateValueAndValidity();
          this.hsc_form.controls.markFourthhscCtrl.markAsDirty();
          this.hsc_form.controls.outOfFourthhscCtrl.markAsDirty();
          this.markError = true;
          validation = false;
        }
    
        //fifth subject validation
        if(this.hsc_form.controls.subjectFifthhscCtrl.value != '' || this.hsc_form.controls.markFifthhscCtrl.value != '' ||
          this.hsc_form.controls.outOfFifthhscCtrl.value != '' || this.hsc_form.controls.gradeFifthhscCtrl.value != ''){
          this.hsc_form.controls['subjectFifthhscCtrl'].setValidators([Validators.required]);
          this.hsc_form.controls['markFifthhscCtrl'].setValidators([Validators.required]);
          this.hsc_form.controls['outOfFifthhscCtrl'].setValidators([Validators.required]);
          this.hsc_form.controls['gradeFifthhscCtrl'].setValidators([Validators.required]);
          this.hsc_form.controls['subjectFifthhscCtrl'].updateValueAndValidity();
          this.hsc_form.controls['markFifthhscCtrl'].updateValueAndValidity();
          this.hsc_form.controls['outOfFifthhscCtrl'].updateValueAndValidity();
          this.hsc_form.controls['gradeFifthhscCtrl'].updateValueAndValidity();
          this.hsc_form.controls.subjectFifthhscCtrl.markAsDirty();
          this.hsc_form.controls.markFifthhscCtrl.markAsDirty();
          this.hsc_form.controls.outOfFifthhscCtrl.markAsDirty();
          this.hsc_form.controls.gradeFifthhscCtrl.markAsDirty();
        }else{
          this.hsc_form.controls['subjectFifthhscCtrl'].clearValidators();
          this.hsc_form.controls['markFifthhscCtrl'].clearValidators();
          this.hsc_form.controls['outOfFifthhscCtrl'].clearValidators();
          this.hsc_form.controls['gradeFifthhscCtrl'].clearValidators();
          this.hsc_form.controls['subjectFifthhscCtrl'].updateValueAndValidity();
          this.hsc_form.controls['markFifthhscCtrl'].updateValueAndValidity();
          this.hsc_form.controls['outOfFifthhscCtrl'].updateValueAndValidity();
          this.hsc_form.controls['gradeFifthhscCtrl'].updateValueAndValidity();
          this.hsc_form.controls.subjectFifthhscCtrl.markAsDirty();
          this.hsc_form.controls.markFifthhscCtrl.markAsDirty();
          this.hsc_form.controls.outOfFifthhscCtrl.markAsDirty();
          this.hsc_form.controls.gradeFifthhscCtrl.markAsDirty();
        }
    
        if(this.hsc_form.controls.gradeFifthhscCtrl.value != ''){
          if(this.hsc_form.controls.markFifthhscCtrl.value != '' || this.hsc_form.controls.outOfFifthhscCtrl.value != ''){
            this.hsc_form.controls['markFifthhscCtrl'].setValidators([Validators.required]);
            this.hsc_form.controls['markFifthhscCtrl'].updateValueAndValidity();
            this.hsc_form.controls['outOfFifthhscCtrl'].setValidators([Validators.required]);
            this.hsc_form.controls['outOfFifthhscCtrl'].updateValueAndValidity();
          }else{
            this.hsc_form.controls['markFifthhscCtrl'].clearValidators();
            this.hsc_form.controls['markFifthhscCtrl'].updateValueAndValidity();
            this.hsc_form.controls['outOfFifthhscCtrl'].clearValidators();
            this.hsc_form.controls['outOfFifthhscCtrl'].updateValueAndValidity();
          }
        }
    
        if(this.hsc_form.controls.markFifthhscCtrl.value != '' && this.hsc_form.controls.outOfFifthhscCtrl.value != ''){
          this.hsc_form.controls['gradeFifthhscCtrl'].clearValidators();
          this.hsc_form.controls['gradeFifthhscCtrl'].updateValueAndValidity();
        }
    
        if(parseInt(this.hsc_form.controls.markFifthhscCtrl.value) > parseInt(this.hsc_form.controls.outOfFifthhscCtrl.value) ){
          this.hsc_form.controls['outOfFifthhscCtrl'].setValidators([Validators.required]);
          this.hsc_form.controls['markFifthhscCtrl'].setValidators([Validators.required]);
          this.hsc_form.controls['markFifthhscCtrl'].updateValueAndValidity();
          this.hsc_form.controls['outOfFifthhscCtrl'].updateValueAndValidity();
          this.hsc_form.controls.outOfFifthhscCtrl.markAsDirty();
          this.hsc_form.controls.markFifthhscCtrl.markAsDirty();
          this.markError = true;
          validation = false;
        }
    
        //Sixth Subject Validation
        if(this.hsc_form.controls.subjectSixthhscCtrl.value != '' || this.hsc_form.controls.markSixthhscCtrl.value != '' ||
          this.hsc_form.controls.outOfSixthhscCtrl.value != '' || this.hsc_form.controls.gradeSixthhscCtrl.value != ''){
          this.hsc_form.controls['subjectSixthhscCtrl'].setValidators([Validators.required]);
          this.hsc_form.controls['markSixthhscCtrl'].setValidators([Validators.required]);
          this.hsc_form.controls['outOfSixthhscCtrl'].setValidators([Validators.required]);
          this.hsc_form.controls['gradeSixthhscCtrl'].setValidators([Validators.required]);
          this.hsc_form.controls['subjectSixthhscCtrl'].updateValueAndValidity();
          this.hsc_form.controls['markSixthhscCtrl'].updateValueAndValidity();
          this.hsc_form.controls['outOfSixthhscCtrl'].updateValueAndValidity();
          this.hsc_form.controls['gradeSixthhscCtrl'].updateValueAndValidity();
          this.hsc_form.controls.subjectSixthhscCtrl.markAsDirty();
          this.hsc_form.controls.markSixthhscCtrl.markAsDirty();
          this.hsc_form.controls.outOfSixthhscCtrl.markAsDirty();
          this.hsc_form.controls.gradeSixthhscCtrl.markAsDirty();
        }else{
          this.hsc_form.controls['subjectSixthhscCtrl'].clearValidators();
          this.hsc_form.controls['markSixthhscCtrl'].clearValidators();
          this.hsc_form.controls['outOfSixthhscCtrl'].clearValidators();
          this.hsc_form.controls['gradeSixthhscCtrl'].clearValidators();
          this.hsc_form.controls['subjectSixthhscCtrl'].updateValueAndValidity();
          this.hsc_form.controls['markSixthhscCtrl'].updateValueAndValidity();
          this.hsc_form.controls['outOfSixthhscCtrl'].updateValueAndValidity();
          this.hsc_form.controls['gradeSixthhscCtrl'].updateValueAndValidity();
          this.hsc_form.controls.subjectSixthhscCtrl.markAsDirty();
          this.hsc_form.controls.markSixthhscCtrl.markAsDirty();
          this.hsc_form.controls.outOfSixthhscCtrl.markAsDirty();
          this.hsc_form.controls.gradeSixthhscCtrl.markAsDirty();
        }
    
        if(this.hsc_form.controls.gradeSixthhscCtrl.value != ''){
          if(this.hsc_form.controls.markSixthhscCtrl.value != '' || this.hsc_form.controls.outOfSixthhscCtrl.value != ''){
            this.hsc_form.controls['markSixthhscCtrl'].setValidators([Validators.required]);
            this.hsc_form.controls['markSixthhscCtrl'].updateValueAndValidity();
            this.hsc_form.controls['outOfSixthhscCtrl'].setValidators([Validators.required]);
            this.hsc_form.controls['outOfSixthhscCtrl'].updateValueAndValidity();
          }else{
            this.hsc_form.controls['markSixthhscCtrl'].clearValidators();
            this.hsc_form.controls['markSixthhscCtrl'].updateValueAndValidity();
            this.hsc_form.controls['outOfSixthhscCtrl'].clearValidators();
            this.hsc_form.controls['outOfSixthhscCtrl'].updateValueAndValidity();
          }
        }
    
        if(this.hsc_form.controls.markSixthhscCtrl.value != '' && this.hsc_form.controls.outOfSixthhscCtrl.value != ''){
          this.hsc_form.controls['gradeSixthhscCtrl'].clearValidators();
          this.hsc_form.controls['gradeSixthhscCtrl'].updateValueAndValidity();
        }
    
        if(parseInt(this.hsc_form.controls.markSixthhscCtrl.value) > parseInt(this.hsc_form.controls.outOfSixthhscCtrl.value) ){
          this.hsc_form.controls['outOfSixthhscCtrl'].setValidators([Validators.required]);
          this.hsc_form.controls['markSixthhscCtrl'].setValidators([Validators.required]);
          this.hsc_form.controls['markSixthhscCtrl'].updateValueAndValidity();
          this.hsc_form.controls['outOfSixthhscCtrl'].updateValueAndValidity();
          this.hsc_form.controls.outOfSixthhscCtrl.markAsDirty();
          this.hsc_form.controls.markSixthhscCtrl.markAsDirty();
          this.markError = true;
          validation = false;
        }

        if( this.hsc_form.valid && validation){
          var hsc_data = {
            //appearance: this.appearance,
            //qualification: this.qualification,
            qualification: '',
            hscUniversity: this.hsc_form.controls.hscUniversityCtrl.value,
            hscCollege: this.hsc_form.controls.hscCollegeCtrl.value,
            hscAdd: this.hsc_form.controls.hscAddCtrl.value,
            hscEmail: this.hsc_form.controls.hscEmailCtrl.value,
            hscUrl: this.hsc_form.controls.hscUrlCtrl.value,
            hscResultDate: this.hsc_form.controls.hscResultDateCtrl.value,
            hscRollNo: this.hsc_form.controls.hscRollNoCtrl.value,
            hscCertiNo: this.hsc_form.controls.hsccertiNoCtrl.value,
            hscMedium: this.hsc_form.controls.hscMediumCtrl.value,
            subjectFirsthsc: this.hsc_form.controls.subjectFirsthscCtrl.value,
            markFirsthsc: this.hsc_form.controls.markFirsthscCtrl.value,
            outOfFirsthsc: this.hsc_form.controls.outOfFirsthscCtrl.value,
            gradeFirsthsc: this.hsc_form.controls.gradeFirsthscCtrl.value,
    
            subjectSecondhsc: this.hsc_form.controls.subjectSecondhscCtrl.value,
            markSecondhsc: this.hsc_form.controls.markSecondhscCtrl.value,
            outOfSecondhsc: this.hsc_form.controls.outOfSecondhscCtrl.value,
            gradeSecondhsc: this.hsc_form.controls.gradeSecondhscCtrl.value,
    
            subjectThirdhsc: this.hsc_form.controls.subjectThirdhscCtrl.value,
            markThirdhsc: this.hsc_form.controls.markThirdhscCtrl.value,
            outOfThirdhsc: this.hsc_form.controls.outOfThirdhscCtrl.value,
            gradeThirdhsc: this.hsc_form.controls.gradeThirdhscCtrl.value,
    
            subjectFourthhsc: this.hsc_form.controls.subjectFourthhscCtrl.value,
            markFourthhsc: this.hsc_form.controls.markFourthhscCtrl.value,
            outOfFourthhsc: this.hsc_form.controls.outOfFourthhscCtrl.value,
            gradeFourthhsc: this.hsc_form.controls.gradeFourthhscCtrl.value,
    
            subjectFifthhsc: this.hsc_form.controls.subjectFifthhscCtrl.value,
            markFifthhsc: this.hsc_form.controls.markFifthhscCtrl.value,
            outOfFifthhsc: this.hsc_form.controls.outOfFifthhscCtrl.value,
            gradeFifthhsc: this.hsc_form.controls.gradeFifthhscCtrl.value,
    
            subjectSixthhsc: this.hsc_form.controls.subjectSixthhscCtrl.value,
            markSixthhsc: this.hsc_form.controls.markSixthhscCtrl.value,
            outOfSixthhsc: this.hsc_form.controls.outOfSixthhscCtrl.value,
            gradeSixthhsc: this.hsc_form.controls.gradeSixthhscCtrl.value,
    
            hscMarks: this.hsc_form.controls.hscMarksCtrl.value,
          }
    
          this.api.setProfileValues(hsc_data, 'Education_HSC')
            .subscribe(
              (data: any) => {
                this.ref.close(hsc_data);
                err => console.log(err)
              });
        }else{
          alert('Please Fill Mandatory fields!!!')
        }

  }
  open() {
    this.dialogService.open(find_College_HSC).onClose
      .subscribe(
        (data: any) => {
          if (data !== undefined) {
            this.hsc_form.controls['hscEmailCtrl'].setValue(data[0].school_email);
            this.hsc_form.controls['hscCollegeCtrl'].setValue(data[0].school_name);
            this.hsc_form.controls['hscAddCtrl'].setValue(data[0].school_add);
            this.hsc_form.controls['hscUrlCtrl'].setValue(data[0].school_url);
          }
          err => console.log(err)
        }
      );
  }


}
