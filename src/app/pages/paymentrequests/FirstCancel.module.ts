import { NgModule } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';
import { ThemeModule } from '../../@theme/theme.module';
import { FirstCancelComponent } from './FirstCancel.component';
import { NbAccordionModule } from '@nebular/theme';
import { FormsModule } from '@angular/forms';
import {NbStepperModule} from '@nebular/theme/components/stepper/stepper.module';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    ThemeModule,
    NgxEchartsModule,
    NbAccordionModule,
    FormsModule,
    RouterModule,
    NbStepperModule,
   
  ],
  declarations: [
    FirstCancelComponent,
  ],
  providers: []
})
export class FirstCancelModule {
}