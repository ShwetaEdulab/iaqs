import { Component, Input} from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { Router} from '@angular/router';
import { ApiService } from '../../shared/api.service';
import {  NbToastrService } from '@nebular/theme';

@Component({
    selector: 'nb-dialog',
    template: `
    <nb-card [style.width.px]="auto" [style.height.px]="auto" status="primary">
        <nb-card-body>
            <ngb-carousel >
                <ng-template ngbSlide *ngFor="let img of arr">
                    <div ><img [src]="img.image" height=":600px;" width="100%;" alt="Random first slide"></div>
                </ng-template>
            </ngb-carousel>
        </nb-card-body>
    </nb-card>
    `,
    })
export class GalleryComponent {
    @Input() arr: any;
    auto;

    constructor(protected ref: NbDialogRef<GalleryComponent>,
      private router : Router,
      protected api : ApiService,
      private toastrService: NbToastrService,
      ) {
    }

   
    

    
}