import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../shared/api.service';
import {
  Router,
  ActivatedRoute
} from '@angular/router';
import { HeaderComponent } from '../../@theme/components/header/header.component';
import { NbAuthService, NbAuthJWTToken } from '@nebular/auth';

@Component({
  selector: 'ngx-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  providers:[HeaderComponent],
})
export class SettingsComponent implements OnInit {

  userId;
  constructor(
    private api : ApiService,
    private route: ActivatedRoute,
    private router: Router,
    private comp: HeaderComponent,
    private authService: NbAuthService,
  ) {
    this.authService.onTokenChange()
      .subscribe((token: NbAuthJWTToken) => {
      this.userId = token.getPayload()['id'];
    });
   }


  ngOnInit() {
    this.api.getTheme();
  }

  changePassword(){
    this.router.navigateByUrl('/auth/changePassword');
  }

}
