import { Component, Input } from '@angular/core';
import { NbDialogRef,NbToastrService } from '@nebular/theme';
import { Router } from '@angular/router';
import { ApiService } from '../../shared/api.service';
import { config } from './../../../../config';
import { NbAuthService, NbAuthJWTToken } from '@nebular/auth';
import { NbDialogService,NbThemeService } from '@nebular/theme';
import { InstituteApiService } from '../../shared/instituteapi.service';
import {
    FormBuilder,
    FormGroup,
    Validators,
  } from '@angular/forms';
  import { UserService } from './../../@core/data/users.service';

@Component({
    selector: 'nb-dialog',
    template:`<nb-card>
    <nb-card-body>
        <div class="row">
            <div class="col-md-9">
                <div id="acaPopTitle" style="margin:0;" class="popupAddTitle" >Upload promotional materials</div>
            </div>
            <div class="col-md-3">
                <button type="button" (click)="close1()" data-dismiss="modal" class="close closeBtn">Close</button>
            </div>
        </div>
        <br>
        <form [formGroup]="promotionalMaterialForm" >
            <div class="row">  
                <input id="promMaterialName" class="form-control"  type="text" name="title" placeholder="Title" [(ngModel)]="transcript_name" formControlName="promotionalMaterialCtrl"  class="col-md-12 priUpText3">
            </div>
            <br>
            <div class="row">
                <div class="col-md-12">
                    <h5>You can upload multiple images</h5>
                </div>
            </div>
            <div class="row">  
                <p-fileUpload class="form-control"  [accept]= "'.pdf,.jpg,.jpeg,.png,.PNG,.JPEG,.JPG,.PDF,.DOC,.DOCX,.doc,.docx'" chooseLabel="Browse"
                    name="file"   url="{{serverUrl}}/institute_api/promotional-material?userid={{user?.id}}&transcript_name={{transcript_name}}&more=true" 
                    maxFileSize="5000000" multiple="multiple" (onBeforeSend)="onBeforeSend($event) " 
                    (onUpload)="onUpload($event)" 
                    (onSelect)="onSelect($event);">
                    <ng-template pTemplate="content">
                        <ul *ngIf="uploadedFiles.length">
                        <li *ngFor="let file of uploadedFiles">{{file.name}} - {{file.size}} bytes</li>
                        </ul>
                    </ng-template>
                </p-fileUpload>
            </div>
        </form>
    </nb-card-body>
    </nb-card>`,
    styleUrls: ['./college-management.component.scss']
    })
    
export class dialogcomponent {
    public get router(): Router {
        return this._router;
    }
    public set router(value: Router) {
        this._router = value;
    }
otp;
alertflag=0;
otpalertflag=0;
alert;
otpSent:boolean = true;
resend;
resend_input_validation:boolean = true;
resend_input:boolean = true;
contact ;
mobile;
phone_code;
otpValidation;
data: any;
uploadedFiles: any[] = [];
loading = false;
currenttoken;
uploaderror1= false;
uploaderror= false;
serverUrl = config.serverUrl;
user = { name : "", id:""};
showUpload;
promotionalMaterialForm:FormGroup;
transcript_name;
File: any;

    constructor(
        protected ref: NbDialogRef<dialogcomponent>,
        private _router: Router,
        protected api : ApiService,
        private toastrService: NbToastrService,
        private authService: NbAuthService,
        private userService: UserService,
        public themeService : NbThemeService,
        private fb: FormBuilder,
        private instituteapi : InstituteApiService,) {
    }

    ngOnInit() {
        this.promotionalMaterialForm = this.fb.group({
            promotionalMaterialCtrl:['', [ Validators.required]],
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

	ok(){
		this.router.navigate(['auth/login'])
		this.ref.close();
    }
    
    close(){
        this.alertflag=0; 
    }

    dismiss() {
        this.ref.close();
    }

    close1(){
        this.router.navigate(['/pages/college-management'])
        this.ref.close();
    }
    
	onUpload(event) {
        for(let file of event.files) {
            this.uploadedFiles.push(file);
        }
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
    
    onSelect($event: any): void {   
        var maxFileSize =  2000000;
        var imgArr = $event.files[0].name.split('.');
        var extension = imgArr[imgArr.length - 2].trim();
    
        if(extension!='jpg' && extension!='jpeg' && extension!='png' && extension!='pdf'&& extension!='txt'&& extension!='doc'&& extension!='docx'&& extension !== '.DOC' && extension !== '.DOCX'  && extension !== '.PDF'){
            this.uploaderror1 = true;
        }
    
        if ($event.files[0].size > maxFileSize) {
            this.uploaderror = true;
        }
    } 
}