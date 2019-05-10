import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminApiService } from '../../shared/adminapi.service';
import { NbAuthJWTToken,NbAuthService } from '@nebular/auth';
@Component({
  selector: 'ngx-view-institute',
  templateUrl: './view-institute.component.html',
  styleUrls: ['./view-institute.component.scss']
})
export class ViewInstituteComponent {
  college_id: any;
  details: any;
  heads: any;
  deans: any;
  naac: any;
  accreditation: any;
  affiliation: any;
  faculty: any;
  placement: any;
  gallery: any;
  video: any;
  promotional_materials: any;
  college_details: any;
  nation: any;
  sport: any;
  facility: any;

  constructor(private _location: Location,
    private route: ActivatedRoute,
    protected adminApi : AdminApiService,
    private authService : NbAuthService,
    private router : Router,) {
      this.authService.onTokenChange()
        .subscribe((token: NbAuthJWTToken) => {
          if(token.getPayload()['role'] !="admin"){
            this.router.navigate(['auth/logout'])
          }
        });
    }

  ngOnInit() {
    try {
      this.college_id=this.route.snapshot.queryParamMap.get('id');
      this.adminApi.getAllCollegeDetail(this.college_id).subscribe(data=> {
        this.details = data['data']['details'];
        this.heads = data['data']['heads'];
        this.deans = data['data']['deans'];
        this.naac = data['data']['Naac'];
        this.accreditation = data['data']['accreditation'];
        this.affiliation = data['data']['affiliation'];
        this.faculty = data['data']['faculty'];
        this.placement = data['data']['placement'];
        this.gallery = data['data']['gallery'];
        this.video = data['data']['college_gallery_videos'];
        this.promotional_materials = data ['data']['promotional_materials'];
        this.college_details = data['data']['college_details'];
        this.nation = data['data']['nation'];
        this.sport = data['data']['sport'];
        this.facility = data['data']['facility'];
      })
    }catch(error) {
      console.log("Error", error);
    }
  }

  Back(){
    this._location.back();
  }

  Open_link(link){
    window.open(link, '_blank');
  }
}
