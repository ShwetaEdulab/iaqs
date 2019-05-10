import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewInstituteComponent } from './view-institute.component';
import {TabViewModule} from 'primeng/tabview';
import {NbCardModule ,NbPopoverModule, NbActionsModule,NbButtonModule, NbTabsetModule} from '@nebular/theme'; 
import { YoutubePlayerModule } from 'ngx-youtube-player';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [ViewInstituteComponent],
  imports: [
    CommonModule,
    TabViewModule,
    NbCardModule,
    NbTabsetModule,
    NbActionsModule,
    NbButtonModule,
    YoutubePlayerModule,
    NgbModule
  ]
})
export class ViewInstituteModule { }
