import {Component} from '@angular/core';
import { AdminApiService } from '../../shared/adminapi.service';
import {
  Router,
  ActivatedRoute
} from '@angular/router';
import {Location} from '@angular/common';
import { config } from '../../../../config';
import { NbAuthJWTToken,NbAuthService } from '@nebular/auth';

@Component({
  selector: 're_Uploaded_Transcript',
  templateUrl: './re_Uploaded_Transcript.component.html',
  styleUrls: ['./re_Uploaded_Transcript.component.scss'],
})
export class AdminReuploadedTranscriptComponent {
  studentData;
  userTranscripts;
  category;
  serverUrl = config.serverUrl;
  constructor(protected adminApi : AdminApiService,
    private route: ActivatedRoute,
    private _location: Location,
    private authService : NbAuthService,
    private router : Router,
    ) {
      this.authService.onTokenChange()
      .subscribe((token: NbAuthJWTToken) => {
        if(token.getPayload()['role'] !="admin"){
          this.router.navigate(['auth/logout'])
        }
      });
    
  }

  async ngOnInit(){
    try {
      this.category=this.route.snapshot.queryParamMap.get('category');
      var userId=this.route.snapshot.queryParamMap.get('userId');
      if(this.category==="self_financed"){ 
        var data = await this.adminApi.reuploadedTranscriptData(userId);
        this.studentData =  data['data'];
        this.userTranscripts = data['data']['userTranscripts'];
      }else if(this.category==="iccr"){
        var data = await this.adminApi.ICCR_reuploadedTranscriptData(userId);
        this.studentData =  data['data'];
        this.userTranscripts = data['data']['userTranscripts'];
      }
    }catch (error) {
      console.log("Error", error);
    }

  }

  requestToUpload(e,name,id,user_id,category){
    if(category == 'self_financed'){
      this.adminApi.requestToUpload(id).subscribe(data=>{

      });
    }

  }

  transcriptSetDefault(id,email,category){
    if(category == 'self_financed'){
      this.adminApi.transcriptSetDefault(id,email).subscribe(data=>{

      });
    }
  }

  download_transcripts(file_path,name){
      this.adminApi.downloadFiles(file_path)
      .subscribe(data => {
        saveAs(data, name);    
      });
  }

  Back(){
    this._location.back();
  }
}
