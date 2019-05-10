import { Component, OnDestroy } from '@angular/core';
import { delay, withLatestFrom, takeWhile } from 'rxjs/operators';
import {
  NbMediaBreakpoint,
  NbMediaBreakpointsService,
  NbMenuItem,
  NbMenuService,
  NbSidebarService,
  NbThemeService,
 // NbToastrService,
} from '@nebular/theme';
import { Router } from '@angular/router';
import { StateService } from '../../../@core/data/state.service';
import { ApiService } from '../../../shared/api.service';
import { Socket } from 'ngx-socket-io';

// TODO: move layouts into the framework
@Component({
  selector: 'ngx-sample-layout',
  styleUrls: ['./sample.layout.scss'],
  template: `
    <nb-layout [center]="layout.id === 'center-column'" windowMode>
      <nb-layout-header fixed>
        <ngx-header [position]="sidebar.id === 'start' ? 'normal': 'inverse'"></ngx-header>
      </nb-layout-header>

      <nb-sidebar class="menu-sidebar"
                   tag="menu-sidebar"
                   responsive
                   [end]="sidebar.id === 'end'">
        <nb-sidebar-header *ngIf="currentTheme !== 'corporate'">
          <a href="#" class="btn btn-hero-success main-btn">
            <i class="ion ion-university"></i> <span>Garware<br>Institute</span>
          </a>
        </nb-sidebar-header>
        <ng-content select="nb-menu"></ng-content>
      </nb-sidebar>

      <nb-layout-column class="main-content">
        <ng-content select="router-outlet"></ng-content>
      </nb-layout-column>

      <nb-layout-column start class="small" *ngIf="layout.id === 'two-column' || layout.id === 'three-column'">
        <nb-menu [items]="subMenu"></nb-menu>
      </nb-layout-column>

      <nb-layout-column class="small" *ngIf="layout.id === 'three-column'">
        <nb-menu [items]="subMenu"></nb-menu>
      </nb-layout-column>

      <nb-layout-footer fixed>
        <ngx-footer></ngx-footer>
      </nb-layout-footer>

      <nb-sidebar class="settings-sidebar"
                   tag="settings-sidebar"
                   state="collapsed"
                   fixed
                   [end]="sidebar.id !== 'end'">
                   {{ cartValue }}  <button (click)="redirect()" nbButton>View Cart</button>
        <!-- <ngx-theme-settings></ngx-theme-settings> -->
      </nb-sidebar>
    </nb-layout>
  `,
})
export class SampleLayoutComponent implements OnDestroy {

  subMenu: NbMenuItem[] = [
    {
      title: 'PAGE LEVEL MENU',
      group: true,
    },
    {
      title: 'Buttons',
      icon: 'ion ion-android-radio-button-off',
      link: '/pages/ui-features/buttons',
    },
    {
      title: 'Grid',
      icon: 'ion ion-android-radio-button-off',
      link: '/pages/ui-features/grid',
    },
    {
      title: 'Icons',
      icon: 'ion ion-android-radio-button-off',
      link: '/pages/ui-features/icons',
    },
    {
      title: 'Modals',
      icon: 'ion ion-android-radio-button-off',
      link: '/pages/ui-features/modals',
    },
    {
      title: 'Typography',
      icon: 'ion ion-android-radio-button-off',
      link: '/pages/ui-features/typography',
    },
    {
      title: 'Animated Searches',
      icon: 'ion ion-android-radio-button-off',
      link: '/pages/ui-features/search-fields',
    },
    {
      title: 'Tabs',
      icon: 'ion ion-android-radio-button-off',
      link: '/pages/ui-features/tabs',
    },
  ];
  cart :any =0;
  cartValue ;
  layout: any = {};
  sidebar: any = {};

  private alive = true;

  currentTheme: string;

  constructor(protected stateService: StateService,
              protected menuService: NbMenuService,
              protected themeService: NbThemeService,
              protected bpService: NbMediaBreakpointsService,
              protected sidebarService: NbSidebarService,
              protected api : ApiService,
              protected router : Router,
              private mainsocket: Socket,            
              ) {
    this.stateService.onLayoutState()
      .pipe(takeWhile(() => this.alive))
      .subscribe((layout: string) => this.layout = layout);

    this.stateService.onSidebarState()
      .pipe(takeWhile(() => this.alive))
      .subscribe((sidebar: string) => {
        this.sidebar = sidebar;
      });

    const isBp = this.bpService.getByName('is');
    this.menuService.onItemSelect()
      .pipe(
        takeWhile(() => this.alive),
        withLatestFrom(this.themeService.onMediaQueryChange()),
        delay(20),
      )
      .subscribe(([item, [bpFrom, bpTo]]: [any, [NbMediaBreakpoint, NbMediaBreakpoint]]) => {

        if (bpTo.width <= isBp.width) {
          this.sidebarService.collapse('menu-sidebar');
        }
      });

    this.themeService.getJsTheme()
      .pipe(takeWhile(() => this.alive))
      .subscribe(theme => {
        this.currentTheme = theme.name;
    });
  }

  redirect(){

    this.sidebarService.toggle(false, 'settings-sidebar');
    this.router.navigate(['pages/cart']);

  }

  async ngOnInit() {
    try {
      this.mainsocket.on('cartvalue',(data) => {  
       
        this.cart = data;  
        if(!(this.cart == 0)){
          this.cartValue='There is only '+this.cart+' item in your wishlist :'
         
          
        }else{
          this.cartValue="You don't have any items in wishlist !"
        }
      });
      this.mainsocket.on('cartremovevalue',(data) => {          
        this.cart = data;         
        if(!(this.cart == 0)){
          this.cartValue='There is only '+this.cart+' item in your wishlist :'       
          
        }else{
          this.cartValue="You don't have any items in wishlist !"
        }
      });
      var response = await this.api.getCartValue();
      this.cartValue=response['data']['message'];

    } catch (error) {
    this.cartValue = "network error please retry ...";
    }

  }

  ngOnDestroy() {
    this.alive = false;
  }
}
