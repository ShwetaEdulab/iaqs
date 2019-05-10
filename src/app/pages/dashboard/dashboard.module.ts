import {
  NgModule
} from '@angular/core';
import {
  NgxEchartsModule
} from 'ngx-echarts';
import {
  NgxChartsModule
} from '@swimlane/ngx-charts';

import {
  ThemeModule
} from '../../@theme/theme.module';
import {
  DashboardComponent
} from './dashboard.component';
import {
  ChartModule
} from 'angular2-chartjs';
import {
  NbStepperModule
} from '@nebular/theme/components/stepper/stepper.module';
import {
  FormsModule
} from '@angular/forms';
import {
  NbDatepickerModule
} from '@nebular/theme/components/datepicker/datepicker.module';
import {
  NbSelectModule,
  NbInputModule,
  NbButtonModule,
  NbAlertModule
} from '@nebular/theme';

import {
  ProfileCompleteness
} from './profileCompleteness/profileCompleteness.component';
import {MatSelectModule} from '@angular/material/select';
import {NgxPaginationModule} from 'ngx-pagination';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import { SharedModule } from '../../pages/shared-authpipe.module';


@NgModule({
  imports: [
    ThemeModule,
    ChartModule,
    NgxEchartsModule,
    NgxChartsModule,
    NbStepperModule,
    NbDatepickerModule,
    FormsModule,
    NbSelectModule,
    NbInputModule,
    NbButtonModule,
    MatSelectModule,
    NbAlertModule,
    NgxPaginationModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    SharedModule,
  ],
  declarations: [
    DashboardComponent,

    ProfileCompleteness,
  ],
  providers: [],
})
export class DashboardModule {}
