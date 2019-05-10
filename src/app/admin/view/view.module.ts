import {
    NgModule,Component 
  } from '@angular/core';
  import { AdminViewComponent } from './view.component';
  import {NbCardModule, NbStepperModule,NbActionsModule} from '@nebular/theme'; 
  import { CommonModule } from '@angular/common';

  @NgModule({
    imports: [
      NbCardModule,
      NbStepperModule,
      NbActionsModule,
      CommonModule
    ],
    declarations: [
      AdminViewComponent,
    ],
    providers: [],
  })
  export class AdminViewModule {}
