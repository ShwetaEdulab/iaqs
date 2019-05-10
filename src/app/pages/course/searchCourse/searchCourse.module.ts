import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ThemeModule } from '../../../@theme/theme.module';
import { searchCourseComponent } from './searchCourse.component';
import { NbListModule } from '@nebular/theme';
import { NbAlertModule } from '@nebular/theme';
import { NbButtonModule,NbAccordionModule,NbSpinnerModule } from '@nebular/theme';
import {NgxPaginationModule} from 'ngx-pagination';
import { SharedModule } from '../../shared-authpipe.module';
@NgModule({
  imports: [

    ThemeModule,
    CommonModule,
    FormsModule,
    NbListModule,
    NbAlertModule,
    NbButtonModule,
    NbAccordionModule,
    NgxPaginationModule,
    NbSpinnerModule,
    SharedModule,
  ],
  declarations: [
    searchCourseComponent,
  ],
  providers: []
})
export class searchCourseModule {
}