import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
import {TabViewModule} from 'primeng/tabview';
import {TableModule} from 'primeng/table';
import {MatSelectModule} from '@angular/material/select';
import {NgxPaginationModule} from 'ngx-pagination';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {InputSwitchModule} from 'primeng/inputswitch';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatIconModule} from '@angular/material/icon';
import {MatDatepickerModule, MatNativeDateModule} from '@angular/material';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { CourseManagementComponent } from './course-management.component';
import {CalendarModule} from 'primeng/calendar';

@NgModule({
  declarations: [
    CourseManagementComponent
  ],
  imports: [
    CommonModule,
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
    TabViewModule,
    TableModule,
    NgxPaginationModule,
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
    NgxMaterialTimepickerModule,
    CalendarModule,
  ]
})
export class CourseManagementModule { }
