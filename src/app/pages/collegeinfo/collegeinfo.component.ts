import {Component} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../shared/api.service';
import { NbSearchService } from '@nebular/theme';
import { NbDialogService } from '@nebular/theme';
import {PeerComponent } from './peer.component';
import { HeaderComponent } from '../../@theme/components/header/header.component';

@Component({
    selector: 'college',
    templateUrl: './collegeinfo.component.html',
    styleUrls: ['./collegeinfo.scss'],
    providers:[HeaderComponent],
  })
  export class CollegeinfoComponent {
    constructor(private router : Router,
      private route: ActivatedRoute,
      private api : ApiService,
      private searchService : NbSearchService,
      private dialogService: NbDialogService,
      private comp: HeaderComponent,
    ) {
    }
    courseid ;
    collegeId;
    collegelist;
    courselist;
    courselistCount;
    college_principal;
    college_vice_principal;
    Dropdownvar = 0;
    collegedata;
    status;
    alertflag = 0;
    gallery;
    placement;
    accreditation;
    video;
    naac_rating;
    college_affiliates;
    AFFILIATE_IMAGE_PATH;
    college_foreign_nationals;
    lat: number;
    lng: number;
    counsellor_img;
    available_counsellors;
    peerstatus:any;
    available_from:any;
    available_to:any;
    mobile :any;
    peer : any;
    peer_id : any;

    async ngOnInit() {
      this.api.getTheme();
      this.searchService.onSearchSubmit()
     .subscribe( (data: any) => {
      this.api.searchCourse(data.term,this.route.snapshot.queryParamMap.get('college_id'))
      .subscribe(data => {
        this.courselist = data['data']['courses'];
        this.courselistCount = this.courselist.length;
      },
      error => {
        console.error("Error", error);
      }
        
        );
    });

      try {
    
        this.collegeId = this.route.snapshot.queryParamMap.get('college_id');
        var response = await this.api.getCollegeListValue(this.collegeId);
        this.collegelist= response['data']['college_detail'];
        this.courselist = response['data']['courses'];
        this.courselistCount = this.courselist.length;
        this.college_principal = response['data']['college_principal'];
        this.college_vice_principal = response['data']['college_vice_principal'];
        this.gallery = response['data']['college_gallery_images'];
        this.placement = response['data']['college_placements'];
        this.accreditation = response['data']['college_accredations'];
        this.video = response['data']['college_gallery_videos'];
        this.naac_rating = response['data']['naac_rating'];
        this.college_affiliates = response['data']['college_affiliates'];
        this.AFFILIATE_IMAGE_PATH = response['data']['AFFILIATE_IMAGE_PATH'];
        this.available_counsellors=response['data']['available_counsellors'];
        this.college_foreign_nationals=response['data']['college_foreign_nationals'];
        this.lat = response['data']['college_detail']['latitude'];
        this.lng =response['data']['college_detail']['longitude'] ;
      } catch (error) {
        console.error("Error from ngOnInit => "+error);
      }

      try {
      var CollegeCourseresponse = await this.api.getCollegeCourse(this.route.snapshot.queryParamMap.get('college_id'));
      CollegeCourseresponse.subscribe(
          data => {
              this.collegedata =  data['data']['courses'];
          },
          error => {
              console.error("Error", error);
          }
      );  
  
      } catch (error) {
        console.log("Error", error);
      }
  
    }

    onClickMe(x) {
       this.Dropdownvar = x;
     }

     courseredirect(course_id,degree) {
      this.courseid = course_id;
     this.api.find_intake(this.courseid).subscribe(data => {
       var profileCompleteness = data['data'];
       if(data['status'] == 200){
         if(profileCompleteness == 100){
           this.api.getDegree(this.courseid).subscribe(data =>{
             if(data['status'] ==200){
               this.router.navigate(['pages/selectcollege'],{queryParams:{courseId:course_id}}); 
             }else{
               this.router.navigate(['pages/profile'],{queryParams:{courseId:course_id,degree:degree}});
             }
           })
         }else{
           this.router.navigate(['pages/profile'],{queryParams:{courseId:course_id,degree:degree}});
         }
       }else if(data['status'] ==300){
         this.alertflag = 1;
       
       }else if(data['status'] ==400){
           this.alertflag = 2;
       }
       error => {
           console.error("Error in cart :", error);
       }
     });
   }

    redirectCourse(course_id,specialization){
      this.router.navigate(['pages/course'],{queryParams:{course_id:course_id,specialization:specialization}});
      window.location.reload();
    }

    onClose(){
      this.alertflag = 0;
  
    }

    onClick(peer,status){
     this.peerstatus = status;
     this.mobile =peer;
     this.dialogService.open(PeerComponent, {
      closeOnBackdropClick : false,
       context: {
         peerstatus : this.peerstatus,
         mobile :this.mobile
        },
    });
    }

    offlineClick(peer_id,peer,status,to,from){
     this.peerstatus = status;
     this.available_to = to;
     this.available_from = from;
     this.mobile =peer;
     this.peer_id = peer_id
     this.dialogService.open(PeerComponent, {
      closeOnBackdropClick : false,
       context: {
         peer_id : this.peer_id,
         peerstatus : this.peerstatus,
         available_to : this.available_to,
         available_from : this.available_from,
         mobile :this.mobile
      },
    });

    }
  }