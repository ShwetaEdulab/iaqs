import { NgModule } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';
import { ThemeModule } from '../../../@theme/theme.module';
import { ApplicationStepsComponent } from './applicationsteps.component';
import { NbAccordionModule , NbDialogModule , NbAlertModule , NbTabsetModule } from '@nebular/theme';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import {NbStepperModule} from '@nebular/theme/components/stepper/stepper.module';
import { NbInputModule,NbDatepickerModule,NbSelectModule , NbCardModule , NbSpinnerModule } from '@nebular/theme';
import {FileUploadModule} from 'primeng/fileupload';
import {TabViewModule} from 'primeng/tabview';
import { Secondpaymentdialog } from './dialog/Secondpaymentdialog';
import { Thirdpaymentdialog } from './dialog/Thirdpaymentdialog';
import { uploadreceiptdialog } from './dialog/uploadreceiptdialog'; 
import { uploadthirdreceiptdialog } from './dialog/uploadthirdreceiptdialog';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../../shared-authpipe.module';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
//import { AuthPipe } from '../../../pipe/auth-pipe.pipe';

@NgModule({
  imports: [
    ThemeModule,
    NgxEchartsModule,
    NbAccordionModule,
    FormsModule,
    FileUploadModule,
    TabViewModule,
    NbStepperModule,
    NbInputModule,
    NbDatepickerModule.forRoot(),
    NbSelectModule,
    NbAlertModule,
    NbTabsetModule,
    NbCardModule,
    NbSpinnerModule,
    SharedModule,
    //BrowserModule,
    ReactiveFormsModule,
    NgbModalModule,
    NbDialogModule.forRoot(),
    ConfirmDialogModule,
  ],
  declarations: [
    ApplicationStepsComponent,
    Secondpaymentdialog,
    Thirdpaymentdialog,
    uploadreceiptdialog,
    uploadthirdreceiptdialog,
  ],
  providers: [],
  entryComponents: [
    Secondpaymentdialog,
    Thirdpaymentdialog,
    uploadreceiptdialog,
    uploadthirdreceiptdialog
],
})
export class ApplicationStepsModule {
}