import { NgModule } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';
import { ThemeModule } from '../../@theme/theme.module';
import { SecondSuccessComponent } from './SecondSuccess.component';
import { NbAccordionModule,NbSpinnerModule } from '@nebular/theme';
import { FormsModule } from '@angular/forms';
import {NbStepperModule} from '@nebular/theme/components/stepper/stepper.module';
@NgModule({
  imports: [
    ThemeModule,
    NgxEchartsModule,
    NbAccordionModule,
    FormsModule,
    NbSpinnerModule,
    NbStepperModule,
   
  ],
  declarations: [
    SecondSuccessComponent,
  ],
  providers: []
})
export class SecondSuccessModule {
}