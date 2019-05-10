import { Component, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { ApiService } from '../../../../shared/api.service';
import { UserService } from '../../../../@core/data/users.service';
import { NbAuthService, NbAuthJWTToken } from '@nebular/auth';
import { FormBuilder, FormGroup,Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { Router , ActivatedRoute } from '@angular/router';
import { config } from '../../../../../../config';

@Component({
selector: 'nb-dialog',
template: `
<nb-card [style.width.px]="500" [style.height.px]="300" status="success">
  <nb-card-header>
    <div class="row">
      <div class="col-md-1">
      </div>
      <div class="col-md-10">
        <h3 style="color:#ffffff">
        Upload Second Payment Receipt
        </h3>
      </div>
      <div class="col-md-1">
        <div *ngIf="showclose == 1">
          <nb-action icon="ion-close-round" (click)="closepop()">
          </nb-action>
        </div>
      </div>
    </div>
  </nb-card-header>
  <form [formGroup]="SecondUploadForm">
    <nb-card-body>
      <p-fileUpload name="file" url="{{serverUrl}}/api/myApplication/upload?userid={{userId}}&second_payment=true&applicationId={{applicationId}}" (onUpload)="onUpload($event,s.SecondDocument)" (onSelect)="mySelect($event);this.SecondUploadForm.controls.SecondDocument.reset();" accept="application/pdf,image/*" maxFileSize="1000000" formControlName="SecondDocument" class="form-control" [ngClass]="{ 'is-invalid': secondsubmitted && s.SecondDocument.errors }" ngDefaultControl>
        <ng-template pTemplate="content">
          <ul *ngIf="uploadedFiles.length">
            <li *ngFor="let file of uploadedFiles">{{file.name}} - {{file.size}} bytes</li>
          </ul>
        </ng-template>
      </p-fileUpload>
      <div *ngIf="secondsubmitted && s.SecondDocument.errors" class="invalid-feedback">
        <div *ngIf="s.SecondDocument.errors.required">Second payment receipt is required</div>
      </div>
    </nb-card-body>
    <nb-card-footer>
      <div class="row">
      <div class="col-md-5"></div>
      <div class="col-md-3">
        <button nbButton hero status="primary" (click)="dismiss('done')">Close</button>
      </div>
      <div class="col-md-4"></div>
      </div>
    </nb-card-footer>
  </form>
</nb-card>
`,
})
export class uploadreceiptdialog {
@Input() title: string;
uploadedFiles: any[] = [];
applicationId;
userId;
SecondUploadForm : FormGroup;
secondsubmitted = false;
showclose = 1;
serverUrl = config.serverUrl;
constructor(protected ref: NbDialogRef<uploadreceiptdialog>,
  protected api : ApiService,
  private authService: NbAuthService,
  private userService: UserService,
  private router: Router,
  private route: ActivatedRoute,
  private formBuilder: FormBuilder) {
  }

  get s() { return this.SecondUploadForm.controls; }

  dismiss(value) {
    this.ref.close(value);
  }

  closepop(){
    this.ref.close();
  }
  ngOnInit() {
    this.applicationId = this.route.snapshot.queryParamMap.get('appId');
    this.SecondUploadStep();
    this.userService.onUserChange()
    .subscribe(
      (user: any) => {
        this.userId = user['id'];
      });
  }

  private SecondUploadStep() : void{
    this.SecondUploadForm = this.formBuilder.group({
      SecondDocument : [null, Validators.required]
    });
  }

  onUpload(event,dynamicController) {

    const reader = new FileReader();
    if(event.files && event.files.length) {
      const [file] = event.files;
      reader.readAsDataURL(file);
  
      reader.onload = () => {
        dynamicController.patchValue({
          file: reader.result
       });
       this.ref.close();
       this.showclose = 0
      };
    }
  }

  mySelect(event){
  }
  
}
