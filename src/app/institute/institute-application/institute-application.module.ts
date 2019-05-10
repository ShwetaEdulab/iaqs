import { NgModule } from '@angular/core';

import { NgxEchartsModule } from 'ngx-echarts';

import { ThemeModule } from '../../@theme/theme.module';
import { InstituteApplicationComponent } from './institute-application.component';
import { SearchService } from '../../shared/search.service';
import { NbListModule, NbSpinnerModule, NbButtonModule } from '@nebular/theme'
import {NgxPaginationModule} from 'ngx-pagination';
import {MatSelectModule} from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { NbAlertModule } from '@nebular/theme';
import { MatAutocompleteModule, MatInputModule,MatFormFieldModule } from '@angular/material';
import {FileUploadModule} from 'primeng/fileupload';

/** Material Modules*/
import {TabViewModule} from 'primeng/tabview';
import {TableModule} from 'primeng/table';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {InputSwitchModule} from 'primeng/inputswitch';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatIconModule} from '@angular/material/icon';
import {MatDatepickerModule, MatNativeDateModule} from '@angular/material';

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
    NbButtonModule,
    TabViewModule,
    TableModule,
    MatCheckboxModule,
    InputSwitchModule,
    MatSlideToggleModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  declarations: [
    InstituteApplicationComponent,
  ],
  providers: [ SearchService ],
  entryComponents: [
  ],
})
export class InstituteApplicationModule { }