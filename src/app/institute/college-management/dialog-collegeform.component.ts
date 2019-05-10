import { Component, Input } from '@angular/core';
import { NbDialogRef,NbToastrService } from '@nebular/theme';
import { Router } from '@angular/router';
import { NbDialogService,NbThemeService } from '@nebular/theme';
import { ApiService } from './../../shared/api.service';
import { InstituteApiService } from '../../shared/instituteapi.service';
import { NbAuthService, NbAuthJWTToken } from '@nebular/auth';
import { UserService } from './../../@core/data/users.service';
import { config } from './../../../../config';
import {
    FormBuilder,
    FormGroup,
    Validators,
    ValidatorFn,
    AbstractControl,
    FormControl
  } from '@angular/forms';
import { Data } from '../../shared/data';

@Component({
    selector: 'nb-dialog',
    template:`
      <nb-card>
        <nb-card-body>
          <button type="button" (click)="close1()" data-dismiss="modal" class="close closeBtn">Close</button>
          <div class="row">
            <div class="col-md-12 transAddTitle text-center">Upload College Form</div>
          </div>
          <form [formGroup]="ClgForm" >
            <div class="form-group">
              <p-fileUpload class="form-control"  [accept]= "'.pdf,.jpg,.jpeg,.png,.PNG,.JPEG,.JPG,.PDF,.txt,.doc,.docx'" chooseLabel="Browse"
                name="file" url="{{serverUrl}}/institute_api/uplcollege-form?userid={{user?.id}}&more=true" 
                maxFileSize="5000000" (onBeforeSend)="onBeforeSend($event)" 
                (onUpload)="onUpload($event)" 
                (onSelect)="onSelect($event);">
                  <ng-template pTemplate="content">
                  <ul *ngIf="uploadedFiles.length">
                    <li *ngFor="let file of uploadedFiles">{{file.name}} - {{file.size}} bytes</li>
                  </ul>
                  </ng-template>
              </p-fileUpload>
              <span *ngIf='uploaderror == true'>Max uploaded file size should be 5 MB.</span>
              <div class="col-xs-12 transInfoText text-center">
                Please upload college form in pdf or word formats only and max size should be 50 MB.
              </div>
              <div class="col-xs-12 transInfoText text-center">
              <button nbButton status="info" type="button" (click)="close1()" data-dismiss="modal" >savee</button>
              </div>
            </div>
          </form>
        </nb-card-body>
      </nb-card>`,
    styleUrls: ['./college-management.component.scss']
    })
    
    
export class DiologcollegeformComponent {
    loading = false;
    currenttoken;
    uploaderror = false;
    uploaderror1 = false;
    ClgForm:FormGroup;
    errorflag = 0;
    errortext;
    messages:any;
    user = { name : "", id:""};
    showUpload;
    serverUrl = config.serverUrl;
    uploadedFiles: any[] = [];

    public get router(): Router {
        return this._router;
    }
    public set router(value: Router) {
        this._router = value;
    }
    alertflag=0;


    constructor(protected ref: NbDialogRef<DiologcollegeformComponent>,
        private dialogService: NbDialogService,
        private _router: Router,
        protected api : ApiService,
        private authService: NbAuthService,
        private userService: UserService,
        public themeService : NbThemeService,
        private fb: FormBuilder,
        private instituteapi : InstituteApiService,){

    }

    ngOnInit() {
        this.ClgForm = this.fb.group({
          imgCtrl:['', [ Validators.required]]
            
        })
        
        this.api.getTheme().subscribe((data: any) => {
          if(data['data']){
            this.themeService.changeTheme(data['data']);
          }else{
            this.themeService.changeTheme('default');
          }
        });
      this.userService.onUserChange()
        .subscribe((user: any) => {
          this.user = user;
          this.showUpload = false;
        });
    }

    onUpload(event) {
      const reader = new FileReader();
      for(let file of event.files) {
          this.uploadedFiles.push(file);
          reader.readAsDataURL(file);
          this.loading = false;
      }
    }


    close(){
      this.alertflag=0; 
    }

    close1(){
        this.router.navigate(['/pages/college-management'])
        this.ref.close();
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
      onUpload1(event) {
        const reader = new FileReader();
        if(event.files && event.files.length) {
          const [file] = event.files;
          reader.readAsDataURL(file);
          this.loading = false;
          this.ref.close(file);

        }
    
    }
    onSelect($event: any): void {
		var maxFileSize =  2000000;
		var imgArr = $event.files[0].name.split('.');
    var extension = imgArr[imgArr.length - 1].trim();
    
    if(extension!='jpg' && extension!='jpeg' && extension!='png' && extension!='pdf'&& extension!='txt'&& extension!='doc'&& extension!='docx'){
			this.uploaderror1 = true;
    }
    
    if ($event.files[0].size > maxFileSize) {
      this.uploaderror = true;
    }
  }
  

  validateCollegeForm(){
    var image = this.ClgForm.controls.imgCtrl.disable();
    this.instituteapi.updateclgform(image)
      .subscribe( 
        (data: any) => {
          if(data['status']== 200){
            alert("college form uploaded")
        }
        err => console.error(err)
      });
  }

  










}
    