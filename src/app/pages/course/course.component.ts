import {
  Component
} from '@angular/core';
import {
  Router,
  ActivatedRoute
} from '@angular/router';
import {
  ApiService
} from '../../shared/api.service';
import {
  NbSearchService
} from '@nebular/theme';
import {
  NbAuthService,
  NbAuthJWTToken
} from '@nebular/auth';
import { HeaderComponent } from '../../@theme/components/header/header.component';
import { SocketService } from '../../shared/socket.service';
import { NbDialogService } from '@nebular/theme';
import { GalleryComponent } from './gallery.component';

@Component({
  selector: 'course',
  styleUrls: ['./course.component.scss'],
  templateUrl: './course.component.html',
  styles: [`
  :host nb-layout-column {
    height: 50vw;
  }
  :host nb-layout-column:first-child {
    background: #f4f4f7;
  }
  :host nb-layout-header /deep/ nav {
    justify-content: flex-end;
  }
`],
providers:[HeaderComponent],
})
export class CourseComponent {
  gallery: any;
  video: any;
  constructor(private router: Router,
    private route: ActivatedRoute,
    private api: ApiService,
    private searchService: NbSearchService,
    private authService: NbAuthService,
    private comp: HeaderComponent,
    private socket : SocketService,
    private dialogService: NbDialogService,
  ) {

  }
  loading = true;
  loadingbutton = true;
  specialization;
  name;
  courseid;
  courseoverview: any;
  collegelist;
  collegelistCount;
  courselist;
  college_principal;
  college_vice_principal;
  Dropdownvar = 0;
  collegedata;
  status;
  alertflag = 0;
  course_duration;
  colleges;
  procedure;
  process: any = [];
  course_curriculum;
  placement;
  logo;
  Dropdown = 1;
  user_id;
  async ngOnInit() {
    this.api.getTheme();
    this.searchService.onSearchSubmit()
      .subscribe((data: any) => {
        this.api.searchCollege(data.term, this.route.snapshot.queryParamMap.get('specialization'))
          .subscribe(data => {
              this.colleges = data['data']['college'];
              this.collegelistCount = this.colleges.length;
              this.Dropdown = 2;
            },
            error => {
              console.error("Error", error);
            }

          );
      });

    try {
      this.courseid = this.route.snapshot.queryParamMap.get('course_id');
      this.specialization = this.route.snapshot.queryParamMap.get('specialization');
      var response = await this.api.getCourseCollegeList(this.courseid, this.specialization);
      this.collegelist = response['data']['college_detail'];
      //console.log("Json===>"+JSON.stringify(this.collegelist));
      this.logo = response['data']['college_detail']['logo'];
      this.procedure = response['data']['admission_procedure'];
      this.placement = response['data']['course_placements'];
      this.process = this.procedure.slice(1, -1);
      this.course_curriculum = response['data']['course_curriculum'];
      this.course_duration = response['data'].cal_duration;
      this.gallery = response['data']['college_gallery_images'];
      this.video = response['data']['college_gallery_videos'];
    } catch (error) {
      console.error("Error from ngOnInit => " + error);
    }

    try {
      this.courseid = this.route.snapshot.queryParamMap.get('course_id');
      this.specialization = this.route.snapshot.queryParamMap.get('specialization');
      var response = await this.api.getCollegeList(this.courseid, this.specialization);
      this.colleges = response['data']['college'];
      this.collegelistCount = this.colleges.length;
      this.loading = false;
      this.loadingbutton = false;
    } catch (error) {
      console.error("Error from ngOnInit => " + error);
    }
  }

  async clearsearch() {
    this.loading = true;
    this.loadingbutton = true;
    try {
      this.courseid = this.route.snapshot.queryParamMap.get('course_id');
      this.specialization = this.route.snapshot.queryParamMap.get('specialization');
      var response = await this.api.getCollegeList(this.courseid, this.specialization);
      this.colleges = response['data']['college'];
      this.collegelistCount = this.colleges.length;
      this.loading = false;
      this.loadingbutton = false;
      this.Dropdown = 1;
    } catch (error) {
      console.error("Error from ngOnInit => " + error);
    }
  }
  onClickMe(x) {
    this.Dropdownvar = x;
  }
  onClose() {
    this.alertflag = 0;

  }

  async courseredirect(id) {
    var getwhishlistresponse = await this.api.getwhishlist(id);
    getwhishlistresponse.subscribe(
      data => {
        this.status = data['status'];
        if (this.status == '300') {
          this.alertflag = 1;
        } else if (this.status == '200') {
          this.alertflag = 0;
          this.router.navigate(['/pages/selectcollege'], {
            queryParams: {
              courseId: id
            }
          })
        }

      },
      error => {
        console.error("Error in wishlist :", error);
      }
    );

  }

  addCart(course_id,degree) {
    this.api.find_intake(this.courseid).subscribe(data => {
      var profileCompleteness = data['data'];
      if(data['status'] == 200){
        if(profileCompleteness == 100){
          this.api.getDegree(this.courseid).subscribe(data =>{
            if(data['status'] ==200){
              //this.router.navigate(['pages/selectcollege'],{queryParams:{courseId:course_id}});
              this.api.addtoCart(this.courseid).subscribe(
                data => {
                  this.user_id=data['data']['user_id'];
                  this.socket.getCartvalue(this.user_id);
                  this.router.navigateByUrl('/pages/cart');
                },
                error => {
                  console.log("Error", error);
                }
              ); 
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
      }else if(data['status'] == 301){
        this.alertflag = 3;
      }
      error => {
          console.error("Error in cart :", error);
      }
    });
    }

  redirectToPeers(college_id,id){
    this.router.navigate(['pages/peers'],{queryParams:{college_id:college_id,cour_id:id}}); 
  }


  redirectCourse(course_id, specialization) {
    this.router.navigate(['pages/course'], {
      queryParams: {
        course_id: course_id,
        specialization: specialization
      }
    });
    window.location.reload();
  }

  galleryPopup(){
    this.dialogService.open(GalleryComponent, {
      context: {
       arr : this.gallery
      },
   });
  }
}
