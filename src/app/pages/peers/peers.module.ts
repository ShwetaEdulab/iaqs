import { NgModule } from '@angular/core';

import { NgxEchartsModule } from 'ngx-echarts';

import { ThemeModule } from '../../@theme/theme.module';
import { PeersComponent } from './peers.component';
import { SearchService } from '../../shared/search.service';
import { NbListModule, NbSpinnerModule } from '@nebular/theme'
import {NgxPaginationModule} from 'ngx-pagination';
import {MatSelectModule} from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { NbAlertModule } from '@nebular/theme';
import { MatAutocompleteModule, MatInputModule,MatFormFieldModule } from '@angular/material';

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
    MatFormFieldModule
  ],
  declarations: [
    PeersComponent,
  ],
  providers: [ SearchService ]
})
export class PeerModule { }
