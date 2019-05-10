import { NgModule } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';
import { ThemeModule } from '../../@theme/theme.module';
import { DownloadsComponent } from './downloads.component';
import { NbListModule,
         NbDatepickerModule,
         NbSelectModule,
         NbRadioModule,
         NbAccordionModule, } from '@nebular/theme';
import { FormsModule } from '@angular/forms';
import {NbStepperModule} from '@nebular/theme/components/stepper/stepper.module';
@NgModule({
  imports: [
    ThemeModule,
    NgxEchartsModule,
    NbListModule,
    NbDatepickerModule,
    FormsModule,
    NbSelectModule,
    NbStepperModule,
    NbSelectModule,
    NbRadioModule,
    NbAccordionModule,
  ],
  declarations: [
    DownloadsComponent,
  ],
  providers: []
})
export class DownloadsModule {
}