import { Component, Input} from '@angular/core';
import { NbDialogRef, NbThemeService } from '@nebular/theme';
import { ApiService } from '../../../shared/api.service';
import { NbAuthService, NbAuthJWTToken } from '@nebular/auth';
import { UserService } from '../../../@core/data/users.service';
import { config } from '../../../../../config';
import {ConfirmationService} from 'primeng/api';
@Component({
selector: 'nb-dialog',
template: `
<nb-card [nbSpinner]="loading" nbSpinnerStatus="danger" nbSpinnerSize="xlarge">
  <nb-card-header>Add transcription</nb-card-header>
  <nb-card-body>
    <div class="row">
      <div class="col-xl-12" style='center;'>
        <b>Transcript Name :</b>
        <input type="text" class="form-control" (input)="onSearchChange($event.target.value)" [(ngModel)]="transcript_name" name='inputTranscriptName' id="inputTranscriptName" placeholder="Transcript Name">
      </div><br><br><br>
      <div class="col-xl-12" *ngIf="showUpload == true">
        <p-fileUpload class="form-control" [accept]= "'.pdf,.jpg,.jpeg,.png,.PNG,.JPEG,.JPG,.PDF'" mode="basic" auto="true" chooseLabel="Browse"
          name="file" url="{{serverUrl}}/api/uploadtranscript?userid={{user?.id}}&transcript_name={{transcript_name}}&more=true" 
          maxFileSize="5000000" (onBeforeSend)="onBeforeSend($event)"
          (onUpload)="onUpload($event)" 
          (onSelect)="onSelect($event);">
        </p-fileUpload>
        <span *ngIf='uploaderror == true'>Max uploaded file size should be 5 MB.</span>
      </div>
    </div>
  </nb-card-body>
  <nb-card-footer>
    <button nbButton hero status="primary" (click)="dismiss()">Close</button>
  </nb-card-footer>
</nb-card>
`,
providers:[ConfirmationService],
})
export class TranscriptDialogComponent {
@Input() title: string;
cbse_marks;
currenttoken;
showUpload;
loading = false;
user = { name : "", id:""};
transcript_name;
serverUrl = config.serverUrl;
uploaderror = false;
uploaderror1 = false;
constructor(
  protected ref: NbDialogRef<TranscriptDialogComponent>,
  protected api : ApiService,
  private authService: NbAuthService,
  private userService: UserService,
  public themeService : NbThemeService,
  private confirmationService: ConfirmationService,
  ) 
  {}

  dismiss() {
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
      if(event.files && event.files.length) {
        const [file] = event.files;
        reader.readAsDataURL(file);
        this.loading = false;
        this.ref.close(file);
      }
  
  }
  
  selectedFile: File;

  onSelect($event: any): void {
		var maxFileSize =  2000000;
		var imgArr = $event.files[0].name.split('.');
    var extension = imgArr[imgArr.length - 1].trim();
    
    if(extension!='jpg' && extension!='jpeg' && extension!='png' && extension!='pdf'){
			this.uploaderror1 = true;
    }
    
    if ($event.files[0].size > maxFileSize) {
      this.uploaderror = true;
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
    this.userService.onUserChange()
      .subscribe((user: any) => {
        this.user = user;
        this.showUpload = false;
      });
   }

   onSearchChange(searchValue : string ) {
    if(searchValue.length > 3){
      this.showUpload = true;
    }else{
      this.showUpload = false;
    }
    
  }
  
}
