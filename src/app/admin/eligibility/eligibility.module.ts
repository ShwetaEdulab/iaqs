import {
  NgModule,Component 
} from '@angular/core';
import {TabViewModule} from 'primeng/tabview';
import {TableModule} from 'primeng/table';

//import {DataTableModule} from "angular-6-datatable";
import { AdminEligibilityComponent } from './eligibility.component';

import {NgxPaginationModule} from 'ngx-pagination';
import {CommonModule} from '@angular/common';
import {NbCardModule ,
  NbPopoverModule,
  NbActionsModule,
  NbButtonModule,
  NbInputModule,
  NbSpinnerModule } from '@nebular/theme'; 
import {MatInputModule} from '@angular/material/input'; 
import { SharedModule } from '../../pages/shared-authpipe.module';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {
  NbDatepickerModule
} from '@nebular/theme/components/datepicker/datepicker.module';
import {MatIconModule} from '@angular/material/icon';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import {CalendarModule} from 'primeng/calendar';


@NgModule({
  imports: [
    TabViewModule,
    TableModule,
    NbCardModule,
    CommonModule,
    NbActionsModule,
    MatInputModule,
    NbPopoverModule,
    NbButtonModule,
    FormsModule,
    NgxPaginationModule,
    SharedModule,
    ReactiveFormsModule,
    ConfirmDialogModule,
    MatSlideToggleModule,
    NbDatepickerModule,
    MatIconModule,
    NbInputModule,
    NbSpinnerModule,
    NgxMaterialTimepickerModule,
    CalendarModule
  ],
  declarations: [
    AdminEligibilityComponent,
  ],
  providers: [],
})
export class AdminEligibilityModule {}
