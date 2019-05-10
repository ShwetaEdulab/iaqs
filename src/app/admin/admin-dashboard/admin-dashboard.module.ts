import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminDashboardComponent } from './admin-dashboard.component';
import {
  NgxEchartsModule
} from 'ngx-echarts';
import {
  NgxChartsModule
} from '@swimlane/ngx-charts';   
import {
  ChartModule
} from 'primeng/chart';
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
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import { SharedModule } from '../../pages/shared-authpipe.module';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {InputSwitchModule} from 'primeng/inputswitch';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { MatDatepickerModule , MatNativeDateModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
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
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  declarations: [AdminDashboardComponent],
  
})
export class AdminDashboardModule { }
