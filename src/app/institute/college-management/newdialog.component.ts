import { Component, Input } from '@angular/core';
import { NbDialogRef,NbToastrService } from '@nebular/theme';
import { Router } from '@angular/router';
import { NbDialogService,NbThemeService } from '@nebular/theme';
import { NbAuthService, NbAuthJWTToken } from '@nebular/auth';
import {
    FormBuilder,
    FormGroup,
    Validators,
    ValidatorFn,
    AbstractControl,
    FormControl
  } from '@angular/forms';
  import { ApiService } from './../../shared/api.service';
  import { config } from './../../../../config';
  import { UserService } from './../../@core/data/users.service';

@Component({
    selector: 'nb-dialog',
    template: `<nb-card>
    <nb-card-body>
        <div class="row">
            <div class="col-md-9">
                <div id="acaPopTitle" style="margin:0;" class="popupAddTitle" >Add accreditation</div>
            </div>
            <div class="col-md-3">
                <button type="button" (click)="close2()" data-dismiss="modal" class="close closeBtn">Close</button>
            </div>
        </div>
        <br>
        <form [formGroup]="accreditationForm" >
            <div class="form-group">
                <div class="col-md-12 text-center">
                <input type="text" class="form-control" fieldSize="medium" [(ngModel)]="transcript_name" formControlName="accreditationnameCtrl"  nbInput placeholder="Name" >
            </div>
            <div class="row">
                <div class="col-xl-4 center1">
                    <p-fileUpload class="form-control"  [accept]= "'.pdf,.jpg,.jpeg,.png,.PNG,.JPEG,.JPG,.PDF'" chooseLabel="Browse"
                        name="file" url="{{serverUrl}}/institute_api/UPLOAD-accreditation?userid={{user?.id}}&transcript_name={{transcript_name}}&more=true" 
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
                </div>
            </div>
            <br>
            <div class="col-md-12 col-xs-offset-2 noteMsg text-center">
                Note! image looks good with 166px width X 166px height and maximum size would be 50MB.
            </div>
            <br>
            </div>
        </form>
    </nb-card-body>
    </nb-card>`,
    styleUrls: ['./college-management.component.scss']
})

export class NewDiologComponent {
    transcript_name;
    loading = false;
    currenttoken;
    uploadedFiles: any[] = [];
    uploaderror1= false;
    uploaderror= false;
    accreditationForm:FormGroup;
    serverUrl = config.serverUrl;
    user = { name : "", id:""};
    showUpload;

    public get router(): Router {
        return this._router;
    }
    public set router(value: Router) {
        this._router = value;
    }
    alertflag=0;


    constructor(protected ref: NbDialogRef<NewDiologComponent>,
        private dialogService: NbDialogService,
        private _router: Router,
        private authService: NbAuthService,
        protected api : ApiService,
        private userService: UserService,
        public themeService : NbThemeService,
        private fb: FormBuilder){
    }

    ngOnInit() {
        this.accreditationForm = this.fb.group({
            accreditationnameCtrl:['', [ Validators.required]],
            accreditationimgCtrl:['', [ Validators.required]]
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

    close(){
        this.alertflag=0; 
    }
    close2(){
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

    onUpload(event) {
        const reader = new FileReader();
        for(let file of event.files) {
            this.uploadedFiles.push(file);
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
}
