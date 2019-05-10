import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'ngx-institute-register',
  templateUrl: './institute-register.component.html',
  styleUrls: ['./institute-register.component.scss']
})
export class InstituteRegisterComponent implements OnInit {

  InstituteRegisterForm: FormGroup;

  readonly emailValidate = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  readonly alphanumeric = /^[a-zA-Z0-9]+$/;

  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit() {

    this.InstituteRegisterForm = this.fb.group({
      instituteNameCtrl : [ '', [ Validators.required, Validators.maxLength(300),Validators.minLength(3)]],
      emailAddCtrl: ['', [ Validators.required, Validators.maxLength(100), Validators.pattern(this.emailValidate)]],
      alternateEmailCtrl: ['', [ Validators.pattern(this.emailValidate)]],
      microWebCtrl:['',[ Validators.required, Validators.maxLength(50), Validators.minLength(2), Validators.pattern(this.alphanumeric)]]

    });


  }

  onSubmit(duration,status){
    this.InstituteRegisterForm.controls.instituteNameCtrl.markAsDirty();     
		this.InstituteRegisterForm.controls.emailAddCtrl.markAsDirty();
    this.InstituteRegisterForm.controls.alternateEmailCtrl.markAsDirty();
    this.InstituteRegisterForm.controls.microWebCtrl.markAsDirty();
  }

}
