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
    FormsModule, ReactiveFormsModule
  } from '@angular/forms';
  import {
    NbDatepickerModule
  } from '@nebular/theme/components/datepicker/datepicker.module';
  import {
    NbSelectModule,
    NbInputModule,
    NbButtonModule,
    NbAlertModule,
    NbCardModule,
    NbTabsetModule,
    NbListModule,
    NbSpinnerModule,
    NbPopoverModule,
  } from '@nebular/theme';  


  /** Material Modules*/
  import {MatTabsModule} from '@angular/material/tabs';
  import {MatListModule} from '@angular/material/list';
  import {MatTableModule} from '@angular/material/table';
  import {MatCardModule} from '@angular/material/card';
  import {TabViewModule} from 'primeng/tabview';
  import {TableModule} from 'primeng/table';

  import { PreferencesDialogComponent } from "./dialog/studentPreferences";
  import { MoreCollegesDialogComponent } from "./dialog/addMorePreference";
  import { EducationDetailsDialogComponent } from "./dialog/education_details";
  import { PaymentDetailsDialogComponent } from "./dialog/paymentDetails";
  import { SeatAllocationDialogComponent } from "./dialog/seatAllocation";
  import {DataTableModule} from "angular-6-datatable";
  import {MatSelectModule} from '@angular/material/select';
  import { AdminForeignOfficeComponent } from './foreignoffice.component';
  import {NgxPaginationModule} from 'ngx-pagination';
  import { MatAutocompleteModule, MatInputModule,MatFormFieldModule } from '@angular/material';
  import {ConfirmDialogModule} from 'primeng/confirmdialog';
  import { DialogModule } from 'primeng/dialog';
  import { SharedModule } from '../../pages/shared-authpipe.module';
  
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
      NbSpinnerModule,
      MatTabsModule,
      MatListModule,
      MatTableModule,
      MatCardModule,
      TabViewModule,
      TableModule,
      DataTableModule,
      NgxPaginationModule,
      MatInputModule,
      ConfirmDialogModule,
      DialogModule,
      ReactiveFormsModule,
      SharedModule,
      NbPopoverModule,
    ],
    declarations: [
      AdminForeignOfficeComponent,
      PreferencesDialogComponent,
      MoreCollegesDialogComponent,
      PaymentDetailsDialogComponent,
      EducationDetailsDialogComponent,
      SeatAllocationDialogComponent
    ],
    entryComponents: [
      PreferencesDialogComponent,
      MoreCollegesDialogComponent,
      PaymentDetailsDialogComponent,
      EducationDetailsDialogComponent,
      SeatAllocationDialogComponent
    ],
    providers: [],
  })
  export class AdminForeignOfficeModule {}
