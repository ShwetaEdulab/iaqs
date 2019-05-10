import { NgModule } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';
import { ThemeModule } from '../../@theme/theme.module';
import { CartComponent } from './cart.component';
import { FormsModule } from '@angular/forms';
import {NbStepperModule} from '@nebular/theme/components/stepper/stepper.module';
import { NbContextMenuModule, NbListModule,
  NbDatepickerModule,
  NbSelectModule, 
  NbRadioModule ,
  NbDialogModule,
  NbInputModule} from '@nebular/theme';
import { NbAlertModule} from '@nebular/theme';
import { NbButtonModule } from '@nebular/theme';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { Firstpaymentdialog } from './dialog/Firstpaymentdialog';

@NgModule({
  imports: [
    ThemeModule,
    NgxEchartsModule,
    FormsModule,
    NbStepperModule,
    NbContextMenuModule,
    NbListModule,
    NbSelectModule,
    NbButtonModule,
    NbRadioModule,
    NbDatepickerModule,
    NbAlertModule,
    NgbModalModule,
    NbDialogModule.forRoot(),
    NbInputModule,
  ],
  declarations: [
    CartComponent,
    Firstpaymentdialog,
  ],
  providers: [

  ],
  entryComponents: [
    Firstpaymentdialog
  ]
  
})
export class CartModule {
}