import { NgModule } from '@angular/core';

import { NgxEchartsModule } from 'ngx-echarts';

import { ThemeModule } from '../../@theme/theme.module';
import { CourseListComponent } from './course-list.component';
import { SearchService } from '../../shared/search.service';
import { NbListModule, NbSpinnerModule, NbButtonModule } from '@nebular/theme'
import {NgxPaginationModule} from 'ngx-pagination';
import {MatSelectModule} from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { NbAlertModule } from '@nebular/theme';
import { MatAutocompleteModule, MatInputModule,MatFormFieldModule } from '@angular/material';
import { facultyComponent } from '../../../../src/app/institute/course-list/dialog/facultycomponent';
import { curriculumComponent } from '../../../../src/app/institute/course-list/dialog/curriculumcomponent';
import {FileUploadModule} from 'primeng/fileupload';

@NgModule({
  imports: [
    ThemeModule,
    NgxEchartsModule,
    NbListModule,
    NgxPaginationModule,
    FormsModule,
    NbAlertModule,
    MatSelectModule,
    NbSpinnerModule,
    MatAutocompleteModule,
    MatInputModule,
    MatFormFieldModule,
    FileUploadModule,
    NbButtonModule
  ],
  declarations: [
    CourseListComponent,
    facultyComponent,
    curriculumComponent
  ],
  providers: [ SearchService ],
  entryComponents: [
    facultyComponent,
    curriculumComponent
  ],
})
export class CourseListModule { }