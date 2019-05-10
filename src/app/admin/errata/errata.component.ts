import {Component} from '@angular/core';
import { AdminApiService } from '../../shared/adminapi.service';
import {
  Router,
  ActivatedRoute
} from '@angular/router';
import {Location} from '@angular/common';
import {ConfirmationService} from 'primeng/api';
import {Message} from 'primeng/api';
import { config } from '../../../../config';
import { NbAuthJWTToken,NbAuthService } from '@nebular/auth';

@Component({
  selector: 'errata',
  templateUrl: './errata.component.html',
  styleUrls: ['./errata.component.scss'],
  providers:[ConfirmationService],
})
export class AdminErrataComponent {
  serverUrl = config.serverUrl;
  TranscriptData:any =[];
  checked;
  errataTranscript:any=[];
  errataTranscriptofICCR:any=[];
  category;
  email;
  constructor(protected adminApi : AdminApiService,
    private route: ActivatedRoute,
    private _location: Location,
    private confirmationService: ConfirmationService,
    private router : Router,
    private authService : NbAuthService,
    ) {
      this.authService.onTokenChange()
      .subscribe((token: NbAuthJWTToken) => {
        if(token.getPayload()['role'] !="admin"){
          this.router.navigate(['auth/logout'])
        }
      });
    
  }

async ngOnInit(){
  var category=this.route.snapshot.queryParamMap.get('category');
  this.category = category;
  if(category == 'self_financed'){
    try {
      var userId=this.route.snapshot.queryParamMap.get('userId');
      var TranscriptData = await this.adminApi.getAllTranscriptData(userId);
      this.TranscriptData =  TranscriptData['data']['userTranscripts'];
      this.email =  this.TranscriptData[0].email;
    } catch (error) {
      console.log("Error", error);
    }
  }else{
    try {
      var userId=this.route.snapshot.queryParamMap.get('userId');
      var TranscriptData = await this.adminApi.getAllTranscriptDataOfICCR(userId);
      this.TranscriptData =  TranscriptData['data']['userTranscripts'];
    } catch (error) {
      console.log("Error", error);
    }
  }
  

}

handleChange(e,name,id,user_id,category) {
  let errataCheck = e.checked;
  if(category == 'self_financed'){
    this.errataTranscript.push({
      name:name,
      errataCheck : errataCheck,
      id:id,
      user_id :user_id
    });
  }else if(category == 'iccr'){
    this.errataTranscriptofICCR.push({
      name:name,
      errataCheck : errataCheck,
      id:id,
      user_id :user_id
    });
  }
}

updateErrataTranscript(category){
  if(category == 'self_financed'){
    if(this.errataTranscript.length > 0){
      this.adminApi.updateErrataTranscript(this.errataTranscript).subscribe(data=>{
        if(data['status'] == 200){
          this.confirmationService.confirm({
            message: 'Successfully Done Changes!!!',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
              
            }
          });
        }
      })
    }
  }else if(category == 'iccr'){
    if(this.errataTranscriptofICCR.length > 0){
      this.adminApi.updateErrataTranscriptofICCR(this.errataTranscriptofICCR).subscribe(data=>{
        if(data['status'] == 200){
          this.confirmationService.confirm({
            message: 'Successfully Done Changes!!!',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
              
            }
          });
        }
      })
    }
  }
  
}

Ticket(email){
  this.router.navigate(['pages/help'],{queryParams:{userEmail : email}});
}

DownloadTranscript(file_path,name){
  this.adminApi.downloadFiles(file_path)
  .subscribe(data => {
    saveAs(data, name);    
  });
}

Back(){
  this._location.back();
}
}
