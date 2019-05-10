import { NgModule } from '@angular/core';

import { NgxEchartsModule } from 'ngx-echarts';

import { ThemeModule } from '../../@theme/theme.module';
import { SearchComponent } from './search.component';
import { SearchService } from '../../shared/search.service';
import { NbListModule, NbSpinnerModule } from '@nebular/theme'
import {NgxPaginationModule} from 'ngx-pagination';
import {MatSelectModule} from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { NbAlertModule } from '@nebular/theme';
import { MatAutocompleteModule, MatInputModule,MatFormFieldModule } from '@angular/material';
import { SharedModule } from '../shared-authpipe.module';
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
    SharedModule,
  ],
  declarations: [
    SearchComponent
  ],
  providers: [ SearchService ]
})
export class SearchModule { }
