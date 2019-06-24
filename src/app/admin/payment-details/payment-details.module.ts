import { NgModule , Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentDetailsComponent } from './payment-details.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { SharedModule } from '../../pages/shared-authpipe.module';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import {NbCardModule, NbPopoverModule, NbActionsModule, NbButtonModule, NbProgressBarModule, NbSpinnerModule} from '@nebular/theme'; 
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input'; 
import {TabViewModule} from 'primeng/tabview';

@NgModule({
  declarations: [ PaymentDetailsComponent ],
  imports: [
    CommonModule,
    FormsModule,
    NgxPaginationModule,
    SharedModule,
    ReactiveFormsModule,
    NbCardModule,
    NbPopoverModule, 
    NbActionsModule, 
    NbButtonModule, 
    NbProgressBarModule,
    NbSpinnerModule,
    MatIconModule,
    MatInputModule,
    TabViewModule
  ]
})
export class PaymentDetailsModule { }
