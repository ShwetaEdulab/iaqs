import { NgModule } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';
import { ThemeModule } from '../../@theme/theme.module';
import { OTPComponent } from './otp.component';
import { NbAccordionModule,NbAlertModule } from '@nebular/theme';
import { FormsModule } from '@angular/forms';
import {NbStepperModule} from '@nebular/theme/components/stepper/stepper.module';
import { InternationalPhoneModule } from 'ng4-intl-phone';
@NgModule({
  imports: [
    ThemeModule,
    NgxEchartsModule,
    NbAccordionModule,
    FormsModule,
    NbAlertModule,
    NbStepperModule,  
    InternationalPhoneModule,
  ],
  declarations: [
    OTPComponent,
  ],
  providers: []
})
export class OTPModule {
}