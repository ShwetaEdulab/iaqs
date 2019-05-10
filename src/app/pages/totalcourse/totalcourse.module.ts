import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ThemeModule } from '../../@theme/theme.module';
import { TotalCourseComponent } from './totalcourse.component';
import { NbListModule } from '@nebular/theme';
import { NbAlertModule } from '@nebular/theme';
import { NbButtonModule } from '@nebular/theme';
import { AgmCoreModule } from '@agm/core';
import { YoutubePlayerModule } from 'ngx-youtube-player';
import { NbDialogModule } from '@nebular/theme';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { config } from '../../../../config';
import { InternationalPhoneModule } from 'ng4-intl-phone';
import {NgxPaginationModule} from 'ngx-pagination';
import { SharedModule } from '../shared-authpipe.module';
@NgModule({
    imports: [
      ThemeModule,
      CommonModule,
      FormsModule,
      NbListModule,
      NbAlertModule,
      NbButtonModule,
      NgxPaginationModule,
      YoutubePlayerModule,
      SharedModule,
      NgxMaterialTimepickerModule.forRoot(),
      NbDialogModule.forRoot(),
      AgmCoreModule.forRoot({
        apiKey: config.googleapi
      }),
      InternationalPhoneModule,
    ],
    declarations: [
      //CollegeinfoComponent,
      TotalCourseComponent
    ],
    entryComponents: [
    ],
  })
  export class TotalCourseModule {
  }
