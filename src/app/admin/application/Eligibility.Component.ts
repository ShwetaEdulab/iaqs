import { Component, Input } from '@angular/core';
import { NbDialogRef,NbDialogService } from '@nebular/theme';
import { Router } from '@angular/router';
import { AdminApiService } from '../../shared/adminapi.service';
import { SupportapiService } from '../../shared/supportapi.service';

@Component({
    selector: 'nb-dialog',
    template: `
            <nb-card accent="info">
                <nb-card-header>
                    <div class="modal-header">                
                        <div class="popupTitle">Eligibility Details</div>
                        <button nbButton shape="semi-round" size="xsmall" outline class="closeBtn ion-close-round" (click)="close();"></button>
                    </div>
                </nb-card-header>
                <nb-card-body >
                    <div class="modal-body noPadding">
                    <h4 class="text-center"><font color="green">Mumbai University Eligible Students</font></h4>
                    <table class="table table-striped w-auto" *ngIf="mu_data.length > 0">
                    <thead>
                        <tr>
                            <th>Student Name :</th>
                            <th>Student Email :</th>
                            <th>Eligibility Number :</th>
                            <th>Provisional Letter :</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr *ngFor="let data of mu_data">
                            <td>{{data.stu_name}}</td>
                            <td>{{data.stu_email}}</td>
                            <td>{{data.eligib_number}}</td>
                            <td><button nbButton outline style="cursor: pointer;" (click)="openeligibilityletter(data.pdf,data.applicationId)">Download</button></td>
                        </tr>
                    </tbody>
                    </table>
                    </div>
                </nb-card-body>
                <nb-card-footer>
                    <div class="row userDetailsRow wordWrap" *ngIf="mu_data.length == 0">
						<div class="col-md-6 offset-md-3 ">
							<h5 class="text-center"><font class="text-center" color="red">No Records Found in Mumbai!!</font></h5>
						</div>
					</div>	
                </nb-card-footer>
            </nb-card>
    `,
    styleUrls: ['./application.component.scss'],
    })
    export class EligibilityComponent {
        @Input() userName:string;
        @Input()  Surname:string;
        @Input() userPassword:string;
        @Input()  Gender:string;
        @Input() userDob:string;
        @Input()  userEmail:string;
        @Input() student_category:string;
        @Input()  userCountryCode:string;       
        @Input() userContactNo:string;
        @Input()  userAddress:string;
        @Input() userCity:string;
        @Input()  userState:string;
        @Input()  postal_code:string;
        @Input()  Country:string;
        @Input()  CountryOfOrigin:string;
        @Input() data:string;

        mu_data;
        loading=false;
        Condition;
        Condition3;
        alertflag=0;
        messagealertflag=0;
        alert;
        user_id: any;
            constructor(protected ref: NbDialogRef<EligibilityComponent>,
              private router : Router,
              private dialogService: NbDialogService,
              protected adminApi : AdminApiService,
              ) {
            }
            ngOnInit(){
                this.mu_data = this.data;
                var data = this.data;
            }
            openeligibilityletter(pdf,applicationId){
                this.adminApi.downloadFiles(pdf)
                .subscribe(data => {
                 saveAs(data, applicationId+'_Confirmation_provisional_Letter.pdf');    
                });
              }

            onClose() {
                this.messagealertflag = 0;
              }
            close(){
                this.ref.close();
              }
        }