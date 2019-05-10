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
        <div class="col-md-9" style="text-align:center;">Educational Details </div>
    </div>
</nb-card-header>
  <nb-card-body>
  <div *ngFor="let edu of educationDetails">
    <div class="row" >
       
        <div class="col-xs-12"  style="text-align:center;font-size: 15px;"><h5>Qualification : {{ edu.qualification }}</h5></div>
       
     </div>  
       <div class="row">
        <div class="col-xs-12" style="text-align:center;font-size: 15px;"><h5>University / Board : {{ edu.college_university }}</h5></div>
       
       
       </div>
       <div class= "row">
            <div  class="col-xs-12" style="text-align:center;font-size: 15px;"><h5>Percentages : {{ edu.college_marks }}</h5></div>
       </div>
       <div class ="row">
        <table class="" border="1" bordercolor="#c4c4c4" style="width:100%">
            <thead>
                <tr>
                    <th class="tableHead">Subject</th>
                    <th class="tableData">Name</th>
                    <th class="tableData">Marks</th>
                    <th class="tableData">Out of Marks</th>
                    <th class="tableData">Grade</th>
                </tr>
                <tr>
                    <th class="tableHead">Subject 1</th>
                    <td class="tableData"><span id="Subject_first">{{ edu.Subject_first }}</span></td>
                    <td class="tableData"><span id="mark_first">{{ edu.mark_first_hsc }}</span></td>
                    <td class="tableData"><span id="OutOf_first">{{ edu.OutOf_first_hsc }}</span></td>
                    <td class="tableData"><span id="grade_first">{{ edu.grade_first_hsc }}</span></td>
                </tr>
                <tr>
                    <th class="tableHead">Subject 2</th>
                    <td class="tableData"><span id="Subject_Second">{{ edu.Subject_Second_hsc }}</span></td>
                    <td class="tableData"><span id="mark_Second">{{ edu.mark_Second_hsc }}</span></td>
                    <td class="tableData"><span id="OutOf_Second">{{ edu.OutOf_Second_hsc }}</span></td>
                    <td class="tableData"><span id="grade_Second">{{ edu.grade_Second_hsc }}</span></td>
                </tr>
                
                <tr>
                    <th class="tableHead">Subject 3</th>
                    <td class="tableData"><span id="Subject_Third">{{ edu.Subject_Third_hsc }}</span></td>
                    <td class="tableData"><span id="mark_Third">{{ edu.mark_Third_hsc }}</span></td>
                    <td class="tableData"><span id="OutOf_Third">{{ edu.OutOf_Third_hsc }}</span></td>
                    <td class="tableData"><span id="grade_Third">{{ edu.grade_Third_hsc }}</span></td>
                </tr>

                <tr>
                    <th class="tableHead">Subject 4</th>
                    <td class="tableData"><span id="Subject_fourth">{{ edu.Subject_fourth_hsc }}</span></td>
                    <td class="tableData"><span id="mark_fourth">{{ edu.mark_fourth_hsc }}</span></td>
                    <td class="tableData"><span id="OutOf_fourth">{{ edu.OutOf_fourth_hsc }}</span></td>
                    <td class="tableData"><span id="grade_fourth">{{ edu.grade_fourth_hsc }}</span></td>
                </tr>

                <tr>
                    <th class="tableHead">Subject 5</th>
                    <td class="tableData"><span id="Subject_fifth">{{ edu.Subject_fifth_hsc }}</span></td>
                    <td class="tableData"><span id="mark_fifth">{{ edu.mark_fifth_hsc }}</span></td>
                    <td class="tableData"><span id="OutOf_fifth">{{ edu.OutOf_fifth_hsc }}</span></td>
                    <td class="tableData"><span id="grade_fifth">{{ edu.grade_fifth_hsc }}</span></td>
                </tr>

                <tr>
                    <th class="tableHead">Subject 6</th>
                    <td class="tableData"><span id="Subject_Six">{{ edu.Subject_Six_hsc }}</span></td>
                    <td class="tableData"><span id="mark_Six">{{ edu.mark_Six_hsc }}</span></td>
                    <td class="tableData"><span id="OutOf_Six">{{ edu.OutOf_Six_hsc }}</span></td>
                    <td class="tableData"><span id="grade_Six">{{ edu.grade_Six_hsc }}</span></td>
                </tr>
            </thead>
        </table>
    </div>
    <br>
    </div>
    <br>
  </nb-card-body>
  <nb-card-footer>
    <button nbButton hero status="primary" (click)="dismiss()">Close</button> 
  </nb-card-footer>
</nb-card>
`,
})
export class EducationDetailsDialogComponent {

@Input() userid : number;
@Input() qualification : string;
@Input()  percentage : string;
@Input()  Subject_first : string;
@Input()  mark_first : string;
@Input()  OutOf_first : string;
@Input()  grade_first : string;
@Input()  Subject_Second: string;
@Input()  mark_Second: string;
@Input()  OutOf_Second: string;
@Input()  grade_Second: string;
@Input()  Subject_Third: string;
@Input()  mark_Third: string;
@Input()  OutOf_Third: string;
@Input()  grade_Third: string;
@Input()  Subject_fourth: string;
@Input()  mark_fourth: string;
@Input()  OutOf_fourth: string;
@Input()  grade_fourth: string;
@Input()  Subject_fifth: string;
@Input()  mark_fifth: string;
@Input()  OutOf_fifth: string;
@Input()  grade_fifth: string;
@Input()  Subject_Six: string;
@Input()  mark_Six: string;
@Input()  OutOf_Six: string;
@Input()  grade_Six: string;
@Input()  college_university: string;

display: boolean = false;
dialog_Message :string='';
Countries: any [];
loading = false;
educationDetails: any [];
max;
readonly emailValidate = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
result_date: any;


constructor(protected ref: NbDialogRef<EducationDetailsDialogComponent>,
  protected api : ApiService,
  protected adminApi : AdminApiService,
  private fb: FormBuilder,
  public themeService : NbThemeService,) {
    
  }

  dismiss() {
    this.ref.close();
  }
  
    ngOnInit() {
        this.adminApi.getStudentEducationDetails(this.userid).subscribe(data=>{
            this.educationDetails = data['data'];
            
        });
    }

    
    

}
