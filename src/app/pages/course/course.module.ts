import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ThemeModule } from '../../@theme/theme.module';
import { CourseComponent } from './course.component';
import { NbListModule } from '@nebular/theme';
import { NbAlertModule } from '@nebular/theme';
import { NbButtonModule , NbAccordionModule,NbSpinnerModule } from '@nebular/theme';
import { YoutubePlayerModule } from 'ngx-youtube-player';
import { GalleryComponent } from './gallery.component';
@NgModule({
  imports: [

    ThemeModule,
    CommonModule,
    FormsModule,
    NbListModule,
    NbAlertModule,
    NbButtonModule,
    NbAccordionModule,
    NbSpinnerModule,
    YoutubePlayerModule,
  ],
  declarations: [
    CourseComponent,
    GalleryComponent,
  ],
  entryComponents: [
    GalleryComponent
  ],
  providers: []
})
export class CourseModule {
}