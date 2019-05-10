import { ModuleWithProviders, NgModule, Optional, SkipSelf, Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbAuthModule, NbPasswordAuthStrategy,NbAuthJWTToken, NbAuthService  } from '@nebular/auth';
import { NbSecurityModule, NbRoleProvider } from '@nebular/security';
import { of as observableOf , Observable} from 'rxjs';

import { throwIfAlreadyLoaded } from './module-import-guard';
import { DataModule } from './data/data.module';
import { AnalyticsService } from './utils/analytics.service';
import { map } from 'rxjs/operators';
import { config } from '../../../config';

const socialLinks = [
  {
    url: 'https://github.com/akveo/nebular',
    target: '_blank',
    icon: 'socicon-github',
  },
  {
    url: 'https://www.facebook.com/akveo/',
    target: '_blank',
    icon: 'socicon-facebook',
  },
  {
    url: 'https://twitter.com/akveo_inc',
    target: '_blank',
    icon: 'socicon-twitter',
  },
];

// export class NbSimpleRoleProvider extends NbRoleProvider {
//   getRole() {
//     // here you could provide any role based on any auth flow
//     return observableOf('guest');
//   }
// }

@Injectable()
export class RoleProvider implements NbRoleProvider {

  constructor(private authService: NbAuthService) {
  }

  getRole(): Observable<string> {
    return this.authService.onTokenChange()
      .pipe(
        map((token: NbAuthJWTToken) => {
          //console.log("token.getPayload()['role']== "+token.getPayload()['role'])
          return token.isValid() ? token.getPayload()['role'] : 'guest';
        }),
      );
  }
}

export const NB_CORE_PROVIDERS = [
  ...DataModule.forRoot().providers,
  ...NbAuthModule.forRoot({




    strategies: [
      NbPasswordAuthStrategy.setup({
        name: 'email',
        token: {
          class: NbAuthJWTToken,
         // key: 'token',
        },
        login: {
          requireValidToken: false,
        },
        

        baseEndpoint: config.serverUrl+'/api/auth/',
        logout: {
          redirect: {
            success: '/auth/login',
            failure: '/auth/login',
          },
        },
        requestPass: {
          redirect: {
            success: '/auth/reset-password',
          },
        },
        resetPass: {
          redirect: {
            success: '/auth/login',
          },
        },
        errors: {
          key: 'data.errors',
        },
      }),
    ],
    forms: {
      login: {
        //strategy: 'password',
        rememberMe: true,
        redirectDelay: 0,
        endpoint: '/login',
        method: 'post',
        redirect: {
          success: '/pages',
          failure: '/auth/login',
          },
      },
      register: {
        endpoint: '/register', 
        method: 'post',
        showMessages: {
          success: true,
        },
        redirectDelay: 0,
      },
      requestPass: {
        endpoint: '/request-pass',
        method: 'post',
      },
      resetPass: {
        endpoint: '/reset-pass',
        method: 'post',
      },
    },
  }).providers,

  NbSecurityModule.forRoot({
    accessControl: {
      // guest: {
      //   view: '*',
      // },
      student: {
        view: ['dashboard','search','profile','application','UTILITIES','downloads','faq','help','theme','totalcourse'],
        //create: '',
        // edit: '*',
        // remove: '*',
      },
      admin: {
        view:['adminDashboard','studentManagement','adminApplication','adminEligibility','adminErrata','adminView','adminForeignOffice','AdminReuploadedTranscript','adminReport','theme','help','adminInstitute',],
        //create: '*',
        // edit: '*',
        // remove: '*',
      },
      // admin: {
      //   view:['dashboard','studentManagement','adminApplication','adminEligibility','adminErrata','adminView','adminForeignOffice','AdminReuploadedTranscript','admindownloads','theme','help'],
      //   //create: '*',
      //   // edit: '*',
      //   // remove: '*',
      // },
      institute:{
        view: ['dashboard','theme','course-list','institute-application','college-management'],
      },
    },
  }).providers,

  {
    provide: NbRoleProvider, useClass: RoleProvider,
  },
  AnalyticsService,
];

@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [
    NbAuthModule,
  ],
  declarations: [],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }

  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: CoreModule,
      providers: [
        ...NB_CORE_PROVIDERS,
      ],
    };
  }
}
