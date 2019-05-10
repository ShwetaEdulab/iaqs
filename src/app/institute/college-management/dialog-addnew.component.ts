import { Component, Input } from '@angular/core';
import { NbDialogRef,NbToastrService } from '@nebular/theme';
import { Router } from '@angular/router';
import { NbDialogService } from '@nebular/theme';

@Component({
  selector: 'nb-dialog',
  template: `<nb-card>
  <nb-card-body>
    Card
  </nb-card-body>
  </nb-card>`,
  styles: [`
    /deep/ nb-layout-column {
      height: 80vw;
    }
  `],
  })
  
  export class DiologaddnewComponent {


    constructor(protected ref: NbDialogRef<DiologaddnewComponent>,
        private dialogService: NbDialogService,
        private router : Router,){}



  }

  // <div class="row">
  //     <div class="col-xs-8 col-xs-offset-2 noPadding">
  //       <input id="addAccrName" type="text" placeholder="Name" name="name" class="col-xs-12 priUpText3"><span id="addAccrNameErr" class="error"></span></div><button type="button" onclick="validateAddAccr()" class="col-xs-4 col-xs-offset-4 priSubSave">Add</button>
  //     </div>
  //   </div>