import {
    NgModule,Component 
  } from '@angular/core';
  import { AdminReuploadedTranscriptComponent } from './re_Uploaded_Transcript.component';
  import {NbCardModule, NbStepperModule,NbActionsModule, NbPopoverModule} from '@nebular/theme'; 
  import { CommonModule } from '@angular/common';
  import {InputSwitchModule} from 'primeng/inputswitch';
  import { FormsModule } from '@angular/forms';

  @NgModule({
    imports: [
       NbCardModule,
       NbStepperModule,
       NbActionsModule,
       InputSwitchModule,
       CommonModule,
       NbPopoverModule,
       FormsModule
    ],
    declarations: [
      AdminReuploadedTranscriptComponent,
    ],
    providers: [],
  })
  export class AdminReuploadedTranscriptModule {}
