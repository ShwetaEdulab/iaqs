import { NgModule } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';
import { ThemeModule } from '../../@theme/theme.module';
import { ApplicationComponent } from './application.component';
import { NbAccordionModule,NbAlertModule } from '@nebular/theme';
import { FormsModule } from '@angular/forms';
import {NbStepperModule} from '@nebular/theme/components/stepper/stepper.module';
import {FileUploadModule} from 'primeng/fileupload';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
@NgModule({
  imports: [
    ThemeModule,
    NgxEchartsModule,
    NbAccordionModule,
    FormsModule,
    NbAlertModule,
    NbStepperModule,
    FileUploadModule,
    ConfirmDialogModule,
  ],
  declarations: [
    ApplicationComponent,
  ],
  providers: []
})
export class ApplicationModule {
}