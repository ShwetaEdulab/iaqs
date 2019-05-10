import { Component, Input} from '@angular/core';
import { NbDialogRef, NbThemeService, NbToastrService } from '@nebular/theme';
import { ApiService } from '../../../shared/api.service';
import { NbAuthService, NbAuthJWTToken } from '@nebular/auth';
import { UserService } from '../../../@core/data/users.service';
import { config } from '../../../../../config';
import {ConfirmationService} from 'primeng/api';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { InstituteApiService } from '../../../shared/instituteapi.service';

@Component({
selector: 'nb-dialog',
template: `
<nb-card [nbSpinner]="loading" nbSpinnerStatus="danger" nbSpinnerSize="xlarge">
  <nb-card-header>
    <div class="modal-header">               
      <div class="popupTitle"><h4>Add Academics</h4></div>
      <button nbButton shape="semi-round" size="small" outline (click)="dismiss()">Close</button>
    </div>
  </nb-card-header>
  <nb-card-body>
    <div class="row">
      <div class="col-xl-4"></div>
      <div class="col-xl-4">
        <div class="priUpWrap">
          <div *ngIf="upload==false"><img class="facultyImgWidth clearMeTo" src="{{serverUrl}}/institute_assets/img/uploadImage.png" /></div><br>
          <div *ngIf="upload==true"><img class="facultyImgWidth clearMeTo" src="{{uploadedFacultyImage}}" /></div>
          <div *ngIf="upload==false">
            <p-fileUpload name="file" mode="basic" [accept]="'.jpg,.jpeg,.png,.PNG,.JPEG,.JPG'" auto="true" chooseLabel="Browse"
                url="{{serverUrl}}/institute_api/upload?courseId={{courseID}}&profilepicID={{profilepicID}}&coursefaculty=true"  
                maxFileSize="5000000" 
                (onBeforeSend)="onBeforeSend($event)" 
                (onUpload)="onUpload($event)"
                (onError)="onErrorFileUpload($event)"
                (onSelect)="onSelect($event);">
              </p-fileUpload>
          </div>
        </div>
      </div>
      <div class="col-xl-4"></div>
    </div>
    <div class="row">
      <div class="col-xs-offset-2 col-xs-8 noteMsg">Note! image looks good with 166px width X 166px height and maximum size would be 5MB.</div>
    </div>
    <form [formGroup]="facultyForm">
      <div class="col-xl-12">
        <div class="form-group">
        <label>Faculty Name<span style="color:red;">*</span></label>
        <input type="text" nbInput class="form-control" formControlName="facultyNameCtrl" 
        [ngClass]="{'form-control-danger': facultyForm.controls.facultyNameCtrl.invalid && (facultyForm.controls.facultyNameCtrl.dirty || facultyForm.controls.facultyNameCtrl.touched)}"
            placeholder="Name">
        </div>
      </div>
      <div class="col-xl-12">
        <div class="form-group">
        <label>Designation<span style="color:red;">*</span></label>
        <input type="text" nbInput class="form-control" formControlName="DesignationCtrl" 
        [ngClass]="{'form-control-danger': facultyForm.controls.DesignationCtrl.invalid && (facultyForm.controls.DesignationCtrl.dirty || facultyForm.controls.DesignationCtrl.touched)}"
            placeholder="Designation">
        </div>
      </div>
      <div class="col-xl-12">
        <div class="form-group">
        <label>Education qualification<span style="color:red;">*</span></label>
        <input type="text" nbInput class="form-control" formControlName="educationalQualificationCtrl" 
        [ngClass]="{'form-control-danger': facultyForm.controls.educationalQualificationCtrl.invalid && (facultyForm.controls.educationalQualificationCtrl.dirty || facultyForm.controls.educationalQualificationCtrl.touched)}"
            placeholder="Educational qualification">
        </div>
      </div>
      <div class="col-xl-12">
        <div class="form-group">
        <label>Department<span style="color:red;">*</span></label>
        <input type="text" nbInput class="form-control" formControlName="departmentCtrl" 
        [ngClass]="{'form-control-danger': facultyForm.controls.departmentCtrl.invalid && (facultyForm.controls.departmentCtrl.dirty || facultyForm.controls.departmentCtrl.touched)}"
            placeholder="Department">
        </div>
      </div>
      <div class="row">
        <div class="col-xl-12" style="text-align: center;">
          <button nbButton size="xsmall" status="info" (click)="saveFaculty()">Save</button>
        </div>
      </div>
    </form>
  </nb-card-body>
  <nb-card-footer>
  <div *ngIf="datasave==true"><span style="color:red;">Data Save Successfully</span></div>
  </nb-card-footer>
</nb-card>
`,
styleUrls: ['../course-management/course-management.component.scss'],
providers:[ConfirmationService],
})
export class facultyComponent {
@Input() title: string;
@Input()  courseID :string;
profilepicID;
currenttoken;
facultyForm : FormGroup;
loading = false;
user = { name : "", id:""};
serverUrl = config.serverUrl;
uploadedFiles: any[] = [];
upload = false;
datasave = false;
uploadedFacultyImage;
//courseID;
get t() { return this.facultyForm.controls; }

constructor(
  protected ref: NbDialogRef<facultyComponent>,
  protected api : ApiService,
  private authService: NbAuthService,
  private userService: UserService,
  public themeService : NbThemeService,
  private confirmationService: ConfirmationService,
  private toastrService: NbToastrService,
  private fb: FormBuilder,
  protected instituteApi : InstituteApiService,
  ) 
  {}

  ngOnInit() {
    this.api.getTheme().subscribe((data: any) => {
      if(data['data']){
        this.themeService.changeTheme(data['data']);
      }else{
        this.themeService.changeTheme('default');
      }
    });

    this.facultyForm = this.fb.group({
      facultyNameCtrl : ['', [Validators.required,]],
      DesignationCtrl : ['', [Validators.required,]],
      educationalQualificationCtrl : ['', [Validators.required,]],
      departmentCtrl : ['', [Validators.required,]],
    });
    
  }

  dismiss() {
  this.ref.close();
  }

  onSelect($event: any): void {
		var maxFileSize =  5000000;
		var imgArr = $event.files[0].name.split('.');
		var extension = imgArr[imgArr.length - 1].trim();
	
		if ($event.files[0].size > maxFileSize) {
	
			this.confirmationService.confirm({
				message: 'Max uploaded file size should be 5 MB.',
				header: 'Invalid File Size',
				icon: 'pi pi-info-circle',
				rejectVisible : false,
				acceptLabel: 'Ok'
			});
		}

		if(extension!='jpg' && extension!='jpeg' && extension!='png' && extension!='JPG' && extension!='JPEG' && extension!='PNG' ){
			this.confirmationService.confirm({
				message: 'Please upload your transcript in .jpeg or .jpg or .png formats',
				header: 'Invalid File Type',
				icon: 'pi pi-info-circle',
				rejectVisible : false,
				acceptLabel: 'Ok'
			});
		}
	}

  onBeforeSend(event) {
    this.loading = true;
    this.authService.onTokenChange().subscribe((token: NbAuthJWTToken) => {
      if (token.isValid()) {
       this.currenttoken = token;
        event.xhr.setRequestHeader("Authorization", `Bearer ` +this.currenttoken);
        event.formData.append('token',''+this.currenttoken);
        }
    });
  }
  
  onUpload(event) {
      const reader = new FileReader();
      var duration = 10000;
      if(event.files && event.files.length) {
        const [file] = event.files;
        reader.readAsDataURL(file);
        this.loading = false;
      }

      var json = JSON.parse(event.xhr.response);
      var yourData = json.data; // or json["Data"]
      var yourStatus = json.status; // or json["Data"]
			var yourMessage = json.message; // or json["Data"]
      if (yourStatus == 200) {
        this.upload = true;
        this.uploadedFacultyImage = yourData.pic;
        this.profilepicID =  yourData.id;
        if(this.upload && this.datasave){
          this.ref.close();
        }
			} else if (yourStatus == 401) {
				this.toastrService.show(
					` ` + yourMessage, {
						duration
					}
				);
			} else if (yourStatus == 400) {
				this.toastrService.show(
					` ` + yourMessage, {
						duration
					}
				);
			}
  }
  
  onErrorFileUpload(event: any,LoadNo){
		var duration = 10000;
		if (event.xhr.response == ""){
			this.toastrService.show(
				`Network Error. Please try again after some time.`,
				{ duration }
		  );
		}
		console.error("onErrorFileUpload Event", event);
  }
  
  saveFaculty(){
    this.facultyForm.controls.facultyNameCtrl.markAsDirty();
    this.facultyForm.controls.DesignationCtrl.markAsDirty();
    this.facultyForm.controls.educationalQualificationCtrl.markAsDirty();
    this.facultyForm.controls.departmentCtrl.markAsDirty();


    if(this.facultyForm.valid){
      var faculty_data = {
        profilepicID : this.profilepicID,
        facultyName : this.facultyForm.controls.facultyNameCtrl.value,
        designation : this.facultyForm.controls.DesignationCtrl.value,
        educationQualification : this.facultyForm.controls.educationalQualificationCtrl.value,
        department : this.facultyForm.controls.departmentCtrl.value,
        type : 'course'
      }

      this.instituteApi.facultyData(faculty_data,this.courseID)
      .subscribe(
        (data: any) => {
          if(data['status']== 200){
            this.datasave = true;
            this.profilepicID = data['data']['id'];
            if(this.upload && this.datasave){
              this.ref.close();
            }
          }
          err => console.error(err)
        });

    }
  }

  
  
}
