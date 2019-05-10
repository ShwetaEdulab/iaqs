import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { NbListModule, NbButtonModule, NbActionsModule, NbInputModule, NbChatModule } from '@nebular/theme';

@NgModule({
    imports: [
      ThemeModule,
      NbListModule,
      NbButtonModule,
      NbActionsModule,
      NbInputModule,
      NbChatModule
    ],
    //declarations: [ChatComponent],
    providers: [],
    entryComponents: [
      
    ],
  })
  export class ChatModule {
  }