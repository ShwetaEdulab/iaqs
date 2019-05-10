import { Component, Input } from '@angular/core';
import { NbDialogRef, NbDialogService, NbThemeService } from '@nebular/theme';
import { ApiService } from '../../../../app/shared/api.service';
import { AdminApiService } from '../../../../app/shared/adminapi.service';
import { FormBuilder } from '@angular/forms';
import { saveAs } from 'file-saver';
@Component({
selector: 'nb-dialog',
template: `
<nb-card class="col-xl-6 offset-xl-3" [style.height.px]="500" [style.width.px]="1500" accent="success" size="xsmall" [nbSpinner]="loading" nbSpinnerStatus="success" nbSpinnerSize="xlarge"> 
<nb-card-header>
    <div class="row">
        <div class="col-md-9" style="text-align:center;">Payment Details </div>
    </div>
</nb-card-header>
  <nb-card-body>
    <div class="row">
    <table class="" border="1" bordercolor="#c4c4c4" style="width:100%">
        <thead>
            <tr>
                <th style="width: 30%;padding: 8px;">Date of Payment :</th>
                <td style="width: 60%;padding: 8px;"><span id="date_of_payment">{{ dateOfPayment }}</span></td>
            </tr>
            <tr>
                <th style="width: 30%;padding: 8px;">Transaction Id :</th>
                <td style="width: 60%;padding: 8px;"><span id="t_transaction_id">{{ transaction_id }}</span></td>
            </tr>
            <tr>
                <th style="width: 30%;padding: 8px;">Currency :</th>
                <td style="width: 60%;padding: 8px;"><span id="t_currency">{{ currency }}</span></td>
            </tr>
            
            <tr>
                <th style="width: 30%;padding: 8px;">Total Amount :</th>
                <td style="width: 60%;padding: 8px;"><span id="amount">{{ amount }}</span></td>
            </tr>
            <tr>
                <th style="width: 30%;padding: 8px;">Challan : </th>
                <td style="width: 60%;padding: 8px;">
                   <span *ngIf="!(challanExist == true)">Challan not uploaded</span>
                   <a  (click)="downloadChallan();"  *ngIf="!(challanExist == false)">Download</a>
                </td>
            </tr>
        </thead>
    </table>
    </div>
    <br>
  </nb-card-body>
  <nb-card-footer>
    <button nbButton hero status="primary" (click)="dismiss()">Close</button> 
  </nb-card-footer>
</nb-card>
`,
})
export class PaymentDetailsDialogComponent {
@Input() value: number;
@Input() t_paymentMode: string;
@Input() amount: number;
@Input() currency: number;
@Input() transaction_id: string;
@Input() dateOfPayment: string;
@Input() challanExist:boolean;
@Input() challan: string;

display: boolean = false;
dialog_Message :string='';
preferences;
Countries: any [];
cbse_country;
sscCountryValidation = true;
loading = false;
max;
readonly emailValidate = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
result_date: any;


constructor(protected ref: NbDialogRef<PaymentDetailsDialogComponent>,
  protected api : ApiService,
  protected adminApi : AdminApiService,
  private fb: FormBuilder,
  public themeService : NbThemeService,) {
    
  }

  dismiss() {
    this.ref.close();
  }
  
    ngOnInit() {
    }

    downloadChallan(){
        var filename = this.challan.substring(this.challan.lastIndexOf("/") + 1, this.challan.length);

        this.adminApi.downloadChallan(this.challan).subscribe(data => {
            saveAs(data,filename);  
        });
    }
    

}
