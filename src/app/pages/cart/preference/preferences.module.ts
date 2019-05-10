import { NgModule } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';
import { ThemeModule } from '../../../@theme/theme.module';
import { PreferencesComponent } from './preferences.component';
import { NbAccordionModule,
  NbAlertModule,
  NbInputModule,
  NbListModule,
  NbSpinnerModule} from '@nebular/theme';
import { FormsModule } from '@angular/forms';
import {NbStepperModule} from '@nebular/theme/components/stepper/stepper.module';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {MessagesModule} from 'primeng/components/messages/messages';
import {DraggableModule} from '../draggable/draggable.module';

@NgModule({
  imports: [
    ThemeModule,
    NgxEchartsModule,
    NbAccordionModule,
    FormsModule,
    NbInputModule,
    NbStepperModule,
    NbListModule,
    NbSpinnerModule,
    NbAlertModule,
    DragDropModule,
    ConfirmDialogModule,
    MessagesModule,
    DraggableModule
  ],
  declarations: [
    PreferencesComponent,
  ],
  providers: []
})
export class PreferencesModule {
}