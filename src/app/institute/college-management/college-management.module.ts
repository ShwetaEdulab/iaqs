import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CollegeManagementComponent } from './college-management.component';
import { FormsModule } from '@angular/forms';
import { ThemeModule } from '../../@theme/theme.module';
import { TabViewModule } from 'primeng/tabview';
import { NbInputModule,NbCardModule,NbListModule, NbSelectModule, NbCheckboxModule, NbButtonModule, NbAlertModule, NbDialogModule } from '@nebular/theme';
import { dialogcomponent } from './dialog.component';
import { DiologaddnewComponent} from './dialog-addnew.component';
import { DiologcollegeformComponent} from './dialog-collegeform.component';
import { NewDiologComponent } from './newdialog.component';
import {MatSelectModule} from '@angular/material/select';
import {FileUploadModule} from 'primeng/fileupload';
import {MatDividerModule} from '@angular/material/divider';
import {MatCheckboxModule} from '@angular/material/checkbox';
//import { FileUploadModule } from 'ng2-file-upload';
import { BrowserModule } from '@angular/platform-browser';


@NgModule({
  declarations: [CollegeManagementComponent,dialogcomponent,DiologaddnewComponent,NewDiologComponent,
    DiologcollegeformComponent],
  imports: [
    CommonModule,
    ThemeModule,
    FormsModule,
    TabViewModule,
    NbInputModule,
    NbSelectModule,
    NbCheckboxModule,
    NbAlertModule,
    NbButtonModule,
    NbCardModule,
    NbDialogModule,
    MatSelectModule,
    FileUploadModule,
    MatDividerModule,
    NbListModule,
    MatCheckboxModule,
  ],
  entryComponents:[dialogcomponent,DiologaddnewComponent,NewDiologComponent,DiologcollegeformComponent],
 
})
export class CollegeManagementModule { }
