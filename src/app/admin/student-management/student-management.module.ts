import {
    NgModule,Component 
  } from '@angular/core';
  import {TabViewModule} from 'primeng/tabview';
  import {TableModule} from 'primeng/table';
  
  //import {DataTableModule} from "angular-6-datatable";
  import { StudentManagementComponent } from './student-management.component';
  
  import {NgxPaginationModule} from 'ngx-pagination';
  import {CommonModule} from '@angular/common';
  import {NbCardModule ,NbPopoverModule, NbActionsModule, NbButtonModule, NbProgressBarModule,} from '@nebular/theme'; 
  import {MatInputModule} from '@angular/material/input'; 
  import { SharedModule } from '../../pages/shared-authpipe.module';
  import { FormsModule,ReactiveFormsModule } from '@angular/forms';

  import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
  
  @NgModule({
    imports: [
      TabViewModule,
      TableModule,
      NbCardModule,
      CommonModule,
      NbActionsModule,
      MatInputModule,
      NbPopoverModule,
      FormsModule,
      NgxPaginationModule,
      SharedModule,
      ReactiveFormsModule,
      MatSelectModule,
      MatIconModule,
      NbButtonModule,
      NbProgressBarModule
    ],
    declarations: [
        StudentManagementComponent,
    ],
    providers: [],
  })
  export class StudentMgmtModule {}