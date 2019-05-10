import { NgModule } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';
import { ThemeModule } from '../../@theme/theme.module';
import { SelectCollegeComponent } from './selectcollege.component';
import { NbAccordionModule } from '@nebular/theme';
import { FormsModule } from '@angular/forms';
import {NbStepperModule} from '@nebular/theme/components/stepper/stepper.module';
import { NbInputModule } from '@nebular/theme';
import { NbListModule } from '@nebular/theme';
import { NbSpinnerModule } from '@nebular/theme';
@NgModule({
  imports: [
    ThemeModule,
    NgxEchartsModule,
    NbAccordionModule,
    FormsModule,
    NbInputModule,
    NbStepperModule,
    NbListModule,
    NbSpinnerModule
  ],
  declarations: [
    SelectCollegeComponent,
  ],
  providers: []
})
export class SelectCollegeModule {
}