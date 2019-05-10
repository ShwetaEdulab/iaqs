import { NgModule } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';
import { ThemeModule } from '../../@theme/theme.module';
import { FirstSuccessComponent } from './FirstSuccess.component';
import { NbAccordionModule } from '@nebular/theme';
import { FormsModule } from '@angular/forms';
import {NbStepperModule} from '@nebular/theme/components/stepper/stepper.module';
@NgModule({
  imports: [
    ThemeModule,
    NgxEchartsModule,
    NbAccordionModule,
    FormsModule,
   
    NbStepperModule,
   
  ],
  declarations: [
    FirstSuccessComponent,
  ],
  providers: []
})
export class FirstSuccessModule {
}