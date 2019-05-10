import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InstituteManagementComponent } from './institute-management.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {NbCardModule ,NbPopoverModule, NbActionsModule, NbButtonModule,} from '@nebular/theme'; 
import { SharedModule } from '../../pages/shared-authpipe.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input'; 
import {MatSelectModule} from '@angular/material/select';
import {TabViewModule} from 'primeng/tabview';
@NgModule({
  declarations: [InstituteManagementComponent],
  imports: [
    CommonModule,
    NgxPaginationModule,
    NbCardModule,
    SharedModule,
    MatSelectModule,
    FormsModule, 
    MatInputModule,
    ReactiveFormsModule,
    NbButtonModule,
    NbPopoverModule,
    TabViewModule
  ]
})
export class InstituteManagementModule { }
