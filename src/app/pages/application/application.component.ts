
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../@core/data/users.service';
import { ApiService } from '../../shared/api.service';
import { HeaderComponent } from '../../@theme/components/header/header.component';

@Component({
  selector: 'application',
  styleUrls: ['./application.component.scss'],
  templateUrl: './application.component.html',
  providers:[HeaderComponent],
})
export class ApplicationComponent  {
  id : any;
  status;
  applications = [] ;
  applicationID;
  courseID;
  alertflag = 0;

  constructor(
    private router : Router,
    private apiservice : ApiService,
    private userService: UserService,
    private comp: HeaderComponent,
  ) {

  }
  async ngOnInit() {
    this.apiservice.getTheme();
    this.userService.onUserChange()
    .subscribe(
      (user: any) => {
        this.id = user['id'];
      });

      var getMyApplicationrsp = await  this.apiservice.getMyApplication(this.id);
      getMyApplicationrsp.subscribe(
        data => {
         
          this.status = data['status'];
          if(this.status == '400'){
          }else if(this.status == '200'){
          this.applications =  data['data']['userApplications'];
          //console.log("this.applicationsthis.applications========>"+JSON.stringify(this.applications));
          this.applicationID = this.applications[0]['application']['id'];
          this.courseID = this.applications[0]['application']['course_id'];
          }
          
      },
      error => {
          console.error("Error in wishlist :", error);
      });
  }

  loadsteps(applicationID,courseID){
    this.router.navigate(['/pages/application/process'],{queryParams:{appId:applicationID,courseID:courseID}})
  }

  showalert(){
    this.alertflag = 1;
  }
  openReject(){
    this.alertflag = 2;
  }
  showalert3(){
    this.alertflag = 3;
  }
  onClose(){		  		
    this.alertflag = 0;		
  }
  

}