import { NgModule } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';
import { ThemeModule } from '../../@theme/theme.module';
import { ProfileComponent } from './profile.component';
import { NbListModule,
         NbDatepickerModule,
         NbSelectModule, 
         NbRadioModule ,
         NbDialogModule,
         NbAlertModule,
         NbButtonModule,
         NbPopoverModule,
         NbSpinnerModule,
         NbBadgeModule,
        } from '@nebular/theme';
import { FormsModule } from '@angular/forms';
import {NbStepperModule} from '@nebular/theme/components/stepper/stepper.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { CountriesService } from '../../@core/data/countries.service';
import { FirstDialogComponent } from './dialog/firstdialogcomponent';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { SecondDialogComponent } from './dialog/seconddialogcomponent';
import { ThirdDialogComponent } from './dialog/thirddialogcomponent';
import { FourthDialogComponent } from './dialog/fourthdialogcomponent';
import {FileUploadModule} from 'primeng/fileupload';
//import { AuthPipe } from '../../pipe/auth-pipe.pipe';
import { find_College_HSC } from './dialog/find_college_hsc';
import { find_College_SSC } from './dialog/find_college_ssc';
import { find_College_Diploma } from './dialog/find_college_diploma';
import { find_College_Degree } from './dialog/find_college_degree';
import {NgxPaginationModule} from 'ngx-pagination';
import { TranscriptDialogComponent } from './dialog/transcriptdialogcomponent';
import { SharedModule } from '../shared-authpipe.module';
import {MatSelectModule} from '@angular/material/select';
import { transcriptpreview } from './dialog/transcriptpreview.component';
import {ConfirmDialogModule} from 'primeng/confirmdialog';

@NgModule({
  imports: [
    ThemeModule,
    NgxEchartsModule,
    NbListModule,
    NbDatepickerModule.forRoot(),
    FormsModule,
    NbSelectModule,
    NbStepperModule,
    NbSelectModule,
    NbAlertModule,
    NbRadioModule,
    Ng2SmartTableModule,
    NgbModalModule,
    FileUploadModule,
    NbDialogModule.forRoot(),
    NgxPaginationModule,
    NbButtonModule,
    NbPopoverModule,
    NbSpinnerModule,
    SharedModule,
    MatSelectModule,
    NbBadgeModule,
    ConfirmDialogModule,
    
  ],
  declarations: [
    ProfileComponent,
    FirstDialogComponent,
    SecondDialogComponent,
    ThirdDialogComponent,
    FourthDialogComponent,
    TranscriptDialogComponent,
    transcriptpreview,
    //AuthPipe,
    find_College_HSC,
    find_College_SSC,
    find_College_Diploma,
    find_College_Degree,

  ],
  providers: [
    CountriesService,
  ],
  entryComponents: [
    FirstDialogComponent,
    SecondDialogComponent,
    ThirdDialogComponent,
    FourthDialogComponent,
    TranscriptDialogComponent,
    find_College_HSC,
    find_College_SSC,
    find_College_Diploma,
    find_College_Degree,
    transcriptpreview,
],
})
export class ProfileModule {
}