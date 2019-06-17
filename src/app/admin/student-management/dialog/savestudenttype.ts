import { Component, Input } from '@angular/core';
import { NbDialogRef, NbDialogService, NbThemeService } from '@nebular/theme';
import { ApiService } from '../../../../app/shared/api.service';
import { AdminApiService } from '../../../../app/shared/adminapi.service';
import { FormBuilder, FormGroup , Validators} from '@angular/forms';
import {ConfirmationService} from 'primeng/api';
import { NbAuthJWTToken,NbAuthService } from '@nebular/auth';
import { Router } from '@angular/router';
@Component({
selector: 'nb-dialog',
providers:[ConfirmationService],
template: `
<nb-card style="font-size: 19px" class="col-md-6 offset-md-3" status="success" [style.overflow]="'auto'" [style.height.px]="500" [style.width.px]="1500">
    <nb-card-header><h2>Type</h2></nb-card-header>
    <nb-card-body>
    <form [formGroup]="qatForm">
        <div class="col-xl-12">
            <fieldset>
                <div class="col-xl-4">
                    <label class="radio-inline">
                        <h5><input id="rdb1" type="radio" formControlName="GivenCtrl"  value="registered" (click)="checkradio('registered')" /> Registered</h5>
                    </label>
                </div>
                <div class="col-xl-4">
                    <label class="radio-inline">
                        <h5><input id="rdb2" type="radio" formControlName="GivenCtrl" value="interested" (click)="checkradio('interested')"/> Interested</h5>
                    </label>
                </div>
                <div class="col-xl-4">
                    <label class="radio-inline">
                        <h5><input id="rdb3" type="radio" formControlName="GivenCtrl" value="not_interested" (click)="checkradio('not_interested')"/>Not-Interested</h5>
                    </label>
                </div>
            </fieldset>
        </div>
        <div class="row">
            <div class="col-xl-12">
                <button nbButton status="info" (click)="Savedata( userid )" >Save</button>
                <span *ngIf="errorshow == true" style="color:red;">Please Select One Above</span>
            </div>          
        </div> 
    </form>
    </nb-card-body>
    <nb-card-footer>
    <button nbButton hero status="primary" (click)="dismiss()">Close</button> 
  </nb-card-footer>
</nb-card>
`,
})
export class SavestudenttypeDialogComponent {
@Input() userid: string;
@Input() user_show_type;
display: boolean = false;
dialog_Message :string='';
qatForm: FormGroup;
loading = false;
max;
college_length;
date;
collegeListData;
readonly emailValidate = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
result_date: any;
message;
seats;
listdata: any;
errorshow = false;
selectedValue: any;

constructor(protected ref: NbDialogRef<SavestudenttypeDialogComponent>,
  protected api : ApiService,
  protected adminApi : AdminApiService,
  private fb: FormBuilder,
  private dialogService: NbDialogService,
  public themeService : NbThemeService,
  private confirmationService: ConfirmationService,
  private authService : NbAuthService,
  private router : Router,
) {
    this.authService.onTokenChange()
    .subscribe((token: NbAuthJWTToken) => {
      if(token.getPayload()['role'] !="admin"){
        this.router.navigate(['auth/logout'])
      }
    });
  }

  dismiss() {
    this.ref.close();
  }
  
    ngOnInit() {
        this.loading = true;
        this.api.getTheme().subscribe((data: any) => {
            if(data['data']){
            this.themeService.changeTheme(data['data']);
            }else{
            this.themeService.changeTheme('default');
            }
        });

        this.qatForm = this.fb.group({
            GivenCtrl: ['', [Validators.required]],
          });
        
        this.qatForm.patchValue({ 
            GivenCtrl: this.user_show_type
        });

        // this.adminApi.totalseats(this.userid,this.courseid,this.appid).subscribe(
        //     (data: any) => {
        //         this.listdata =  data['data'];
        // });
    
    }

    Savedata( userid ){
        if(this.selectedValue==undefined){
            this.errorshow = true;
        }else{
            this.adminApi.saveStudenttype(userid,this.selectedValue).subscribe(
            (data: any) => {
                if(data[status]=='200'){
                    this.ref.close();
                }else{
                    this.ref.close();
                }
            });
        } 
    }

    checkradio(value){
        this.selectedValue = value;
    }

}
