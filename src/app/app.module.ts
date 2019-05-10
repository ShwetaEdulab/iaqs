/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpRequest } from '@angular/common/http';
import { CoreModule } from './@core/core.module';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ThemeModule } from './@theme/theme.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthGuard } from './shared/auth-guard.service';
import { NbAuthJWTInterceptor,NB_AUTH_TOKEN_INTERCEPTOR_FILTER } from '@nebular/auth';
import { FormsModule } from '@angular/forms';
import { ApiService } from './shared/api.service'
import { SharedModule } from './pages/shared-authpipe.module';
import { RegisterComponent } from './auth/register/register.component';
import { OtpComponent } from './auth/register/otp.component';
import { RegisteredComponent } from './auth/register/registered.component';
import { TermsComponent } from './auth/register/terms.component';
import { OTPModule } from './auth/otp/otp.module';
import { TotalCourseListModule } from './auth/totalcourselist/totalcourselist.module';
import {  NbToastrModule, 
  NbTooltipModule,
  NbSpinnerModule,
   NbListModule,
  NbDatepickerModule,
  NbSelectModule, 
  NbRadioModule ,
  NbDialogModule,
  NbAlertModule,
  NbButtonModule,
  NbCheckboxModule,
   NbInputModule 
 } from '@nebular/theme';
 import {MatSelectModule} from '@angular/material/select';
 import { changePasswordComponent } from "./auth/changePassword/changePassword.component";
 import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
 import { ForgotPasswordComponent } from './auth/Forgot-password/forgot-password.component';
 import { resetPasswordComponent } from './auth/Reset-password/reset-password.component';
 import { ResendEmailComponent } from './auth/Forgot-password/resend-email.component';
 import { RouterExtService } from './shared/identifyUrl';
 import { AdminOtpModule } from './admin/admin-otp/admin-otp.module';
import { InstituteRegisterComponent } from './auth/institute-register/institute-register.component';
import { config } from '../../config';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {MatDialogModule} from '@angular/material/dialog';
//const socketconfig: SocketIoConfig = { url: 'http://93.104.211.51:2', options: {} };
//const socketconfig: SocketIoConfig = { url: 'http://93.104.211.51', options: {reconnection: true,transports: ['websocket'],secure: true} };
const socketconfig: SocketIoConfig = { url: 'wss://garware.admissiondesk.org', options: {reconnection: true,transports: ['websocket'],secure: true} };
@NgModule({
  declarations: [AppComponent,
    RegisterComponent,
    changePasswordComponent,
    OtpComponent,
    RegisteredComponent,
    TermsComponent,
    ForgotPasswordComponent,
    resetPasswordComponent,
    ResendEmailComponent,
    InstituteRegisterComponent,
    ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    NbTooltipModule,
    NbSpinnerModule,
    SharedModule,
    NgbModule.forRoot(),
    ThemeModule.forRoot(),
    CoreModule.forRoot(),
    NbToastrModule.forRoot(),
    NbListModule,
  NbDatepickerModule.forRoot(),
  NbSelectModule, 
  NbRadioModule ,
  NbDialogModule.forRoot(),
  NbAlertModule,
  NbButtonModule,
  NbCheckboxModule,
   NbInputModule,
   MatSelectModule,
   OTPModule,
   TotalCourseListModule,
   SocketIoModule.forRoot(socketconfig),
   AdminOtpModule,
   ConfirmDialogModule,
   MatDialogModule,
   //DraggableModule,
    //DragDropModule,

  ],
  bootstrap: [AppComponent],
  providers: [
    { provide: APP_BASE_HREF, useValue: '/' },
    { provide: HTTP_INTERCEPTORS, useClass: NbAuthJWTInterceptor, multi: true},
    { provide: NB_AUTH_TOKEN_INTERCEPTOR_FILTER, useValue: filterInterceptorRequest },
    AuthGuard,
    ApiService,
    RouterExtService
  ],
  entryComponents:[
    OtpComponent,
    RegisteredComponent,
    TermsComponent,
    ResendEmailComponent
  ]
})
export class AppModule {
}
export function filterInterceptorRequest(req: HttpRequest<any>) {
  return [config.serverUrl+'/api/auth/',
         ]
    .some(url => req.url.includes(url));
}