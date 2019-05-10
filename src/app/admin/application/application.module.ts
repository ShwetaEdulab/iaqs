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
  ChartModule
} from 'angular2-chartjs';
import {
  NbStepperModule
} from '@nebular/theme/components/stepper/stepper.module';
import {
  NbDatepickerModule
} from '@nebular/theme/components/datepicker/datepicker.module';
import {
  NbCardModule,
  NbTabsetModule,
  NbActionsModule,
  NbPopoverModule,
  NbListModule,
  NbSelectModule,
  NbTooltipModule,
  NbSpinnerModule, 
  NbRadioModule ,
  NbDialogModule,
  NbAlertModule,
  NbButtonModule,
  NbCheckboxModule,
   NbInputModule 
} from '@nebular/theme'; 
import {ConfirmDialogModule} from 'primeng/confirmdialog'; 
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';

/** Material Modules*/
import {MatTabsModule} from '@angular/material/tabs';
import {MatListModule} from '@angular/material/list';
import {MatTableModule} from '@angular/material/table';
import {MatCardModule} from '@angular/material/card';
import {TabViewModule} from 'primeng/tabview';
import {TableModule} from 'primeng/table';
import {DataTableModule} from "angular-6-datatable";
import {MatSelectModule} from '@angular/material/select';
import {NgxPaginationModule} from 'ngx-pagination';
import { AdminApplicationComponent } from './application.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import { SharedModule } from '../../pages/shared-authpipe.module';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {InputSwitchModule} from 'primeng/inputswitch';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { EligibilityComponent } from './Eligibility.Component';
import {CalendarModule} from 'primeng/calendar';

@NgModule({
  imports: [
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
    NbCardModule,
    NbTabsetModule,
    NbListModule,
    MatTabsModule,
    MatListModule,
    MatTableModule,
    MatCardModule,
    TabViewModule,
    TableModule,
    DataTableModule,
    NgxPaginationModule,
    SharedModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    NbActionsModule,
    MatCheckboxModule,
    NbPopoverModule,
    InputSwitchModule,
    MatSlideToggleModule,
    NbTooltipModule,
    NbSpinnerModule, 
    NbRadioModule ,
    NbDialogModule,
    NbCheckboxModule,
    ConfirmDialogModule,
    NgxMaterialTimepickerModule,
    CalendarModule,
  ],
  declarations: [
      AdminApplicationComponent,
      EligibilityComponent
  ],
  providers: [],
  entryComponents:[
    EligibilityComponent
  ]
})
export class AdminApplicationModule {}
