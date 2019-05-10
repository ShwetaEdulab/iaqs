import { delay } from 'rxjs/operators';
import { AfterViewInit, Component, Input, OnDestroy,OnInit } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { ApiService } from '../../../shared/api.service';
import { UserService } from '../../../@core/data/users.service';
import { Router } from "@angular/router";

declare const echarts: any;

@Component({
  selector: 'ngx-solar',
  styleUrls: ['./profileCompleteness.component.scss'],
  template: `
    <nb-card status="success" size="xsmall" class="solar-card">
     <nb-card-header><h2>Your Profile Completeness</h2></nb-card-header>
      <nb-card-body>
        <div echarts [options]="option" class="echart">
        </div>
        <div class="info">
          <div class="value">{{ value }} </div>
          <div class="details" *ngIf="transcriptLock == false"><span>out of</span> 100 %</div>
          <div class = "row" *ngIf="transcriptLock == true">
            <a (click)="onClickTranscript()"><span style="color:red; font-size: 100%;"><u><b>Error in uploaded document ! <br>Click here to make changes.</b></u></span></a>
        </div>
        </div>
      </nb-card-body>
    </nb-card>
  `,
})
export class ProfileCompleteness implements OnInit,AfterViewInit, OnDestroy {

  value = 0;
  pc;
  user = {id:"", name : "",profileCompleteness : ""};
//   @Input('chartValue')
//   set chartValue(value: number) {
//     this.value = value;
//     if (this.option.series) {
//       this.option.series[0].data[0].value = value;
//       this.option.series[0].data[1].value = 100 - value;
//       this.option.series[1].data[0].value = value;
//     }
//   }

  
  option: any = {};
  themeSubscription: any;
  transcriptLock: any;
  constructor(private theme: NbThemeService,private userService: UserService,protected api : ApiService,private router : Router,) {

  }
 ngOnInit() {
    
    

  }
  ngAfterViewInit() {
    var a;
    this.userService.onUserChange()
      .subscribe((user: any) => this.user = user);
    //   this.value = +this.user.profileCompleteness;

    this.api.getTranscriptLock(this.user.id)
      .subscribe((data: any) => {
          this.pc = data;
        this.transcriptLock =  data['data']['tl'];
        this.value = data['data']['pc'];
     
        //console.log("this.value1======="+this.value)
        this.themeSubscription = this.theme.getJsTheme().pipe(delay(1)).subscribe(config => {

        const solarTheme: any = config.variables.solar;

        this.option = Object.assign({}, {
            tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)',
            },
            series: [
            {
                name: ' ',
                clockWise: true,
                hoverAnimation: false,
                type: 'pie',
                center: ['45%', '50%'],
                radius: solarTheme.radius,
                data: [
                {
                    value: this.value,
                    name: ' ',
                    label: {
                    normal: {
                        position: 'center',
                        formatter: '{d}%',
                        textStyle: {
                        fontSize: '22',
                        fontFamily: config.variables.fontSecondary,
                        fontWeight: '600',
                        color: config.variables.fgHeading,
                        },
                    },
                    },
                    tooltip: {
                    show: false,
                    },
                    itemStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                            offset: 0,
                            color: solarTheme.gradientLeft,
                        },
                        {
                            offset: 1,
                            color: solarTheme.gradientRight,
                        },
                        ]),
                        shadowColor: solarTheme.shadowColor,
                        shadowBlur: 0,
                        shadowOffsetX: 0,
                        shadowOffsetY: 3,
                    },
                    },
                    hoverAnimation: false,
                },
                {
                    value: 100 - this.value,
                    name: ' ',
                    tooltip: {
                    show: false,
                    },
                    label: {
                    normal: {
                        position: 'inner',
                    },
                    },
                    itemStyle: {
                    normal: {
                        color: config.variables.layoutBg,
                    },
                    },
                },
                ],
            },
            {
                name: ' ',
                clockWise: true,
                hoverAnimation: false,
                type: 'pie',
                center: ['45%', '50%'],
                radius: solarTheme.radius,
                data: [
                {
                    value: this.value,
                    name: ' ',
                    label: {
                    normal: {
                        position: 'inner',
                        show: false,
                    },
                    },
                    tooltip: {
                    show: false,
                    },
                    itemStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                            offset: 0,
                            color: solarTheme.gradientLeft,
                        },
                        {
                            offset: 1,
                            color: solarTheme.gradientRight,
                        },
                        ]),
                        shadowColor: solarTheme.shadowColor,
                        shadowBlur: 7,
                    },
                    },
                    hoverAnimation: false,
                },
                {
                    value: 28,
                    name: ' ',
                    tooltip: {
                    show: false,
                    },
                    label: {
                    normal: {
                        position: 'inner',
                    },
                    },
                    itemStyle: {
                    normal: {
                        color: 'none',
                    },
                    },
                },
                ],
            },
            ],
        });
        });
    });
  }

  onClickTranscript(){
    this.router.navigate(['pages/profile'],{queryParams:{selectedIndex:4}});
  }

  ngOnDestroy() {
    this.themeSubscription.unsubscribe();
  }
}