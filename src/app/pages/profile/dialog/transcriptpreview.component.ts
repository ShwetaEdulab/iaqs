import { Component, Input} from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { Router} from '@angular/router';
import { ApiService } from '../../../shared/api.service';
import {  NbToastrService } from '@nebular/theme';

@Component({
    selector: 'nb-dialog',
    template: `
    <nb-card [style.width.px]="auto" [style.height.px]="auto" status="primary">
        <nb-card-body>
            <div ><img [src]="arr" height=":800px;" width="100%;" alt="Random first slide"></div>
        </nb-card-body>
    </nb-card>
    `,
    })
export class transcriptpreview {
    @Input() arr: any;
    auto;

    constructor(protected ref: NbDialogRef<transcriptpreview>,
      private router : Router,
      protected api : ApiService,
      private toastrService: NbToastrService,
      ) {
          this.auto = 'auto';
    }

   
    

    
}