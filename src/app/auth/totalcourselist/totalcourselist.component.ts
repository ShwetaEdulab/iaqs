import {Component} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../shared/api.service';
import { NbSearchService } from '@nebular/theme';
import { NbDialogService } from '@nebular/theme';
import { FormControl } from '@angular/forms';
import { config } from '../../../../config';

@Component({
    selector: 'totalcourselist',
    templateUrl: './totalcourselist.component.html',
    styleUrls: ['./totalcourselist.scss'],
  })
  export class TotalCourseListComponent {
    constructor(private router : Router,
      private route: ActivatedRoute,
      private api : ApiService,
      private searchService : NbSearchService,
      private dialogService: NbDialogService,
    ) {
    }
    p: number = 1;
    courselist_data: any = [];
    serverUrl = config.serverUrl;
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
    public filterText: string;
    public filterPlaceholder: string;
    public filterInput = new FormControl();

    async ngOnInit() {
      this.filterText = "";
      this.filterPlaceholder = "Search";
      this.api.totalcoursedetails().subscribe(data=>{
        this.courselist_data = data['data']['courses'];
      })

      this.filterInput
        .valueChanges
        .debounceTime(200)
        .subscribe(term => {
        this.filterText = term;
      })
    }

    redirectCourse(){
      //this.router.navigate(['auth/login'])
      this.router.navigate(['auth/register']);
    }

    
    redirectToPeers(college_id,id){
      this.router.navigate(['pages/peers'],{queryParams:{college_id:college_id,cour_id:id}}); 
    }
  }


