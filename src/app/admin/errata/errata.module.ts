import {
  NgModule,Component 
} from '@angular/core';
import { AdminErrataComponent } from './errata.component';
import {NbCardModule,NbActionsModule, NbButtonModule} from '@nebular/theme'; 
import { CommonModule } from '@angular/common';
import {InputSwitchModule} from 'primeng/inputswitch';
import { FormsModule } from '@angular/forms';
import {ConfirmDialogModule} from 'primeng/confirmdialog';

@NgModule({
  imports: [
    NbCardModule,
    NbActionsModule,
    CommonModule,
    NbButtonModule,
    InputSwitchModule,
    FormsModule,
    ConfirmDialogModule
  ],
  declarations: [
    AdminErrataComponent,
  ],
  providers: [],
})
export class AdminErrataModule {}
