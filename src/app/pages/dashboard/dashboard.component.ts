import { Component, ViewChild, HostListener } from '@angular/core';
import { UserService } from '../../@core/data/users.service';
import { FormGroup, FormControl } from '@angular/forms';
import { NbDateService, NbStepperComponent, NbThemeService } from '@nebular/theme';
import { ApiService } from '../../shared/api.service';
import { InstituteApiService } from '../../shared/instituteapi.service';
import { Router } from '@angular/router';
import { HeaderComponent } from '../../@theme/components/header/header.component';
import { NbAuthJWTToken,NbAuthService } from '@nebular/auth';


@Component({
  selector: 'Dashboard',
  templateUrl: './Dashboard.component.html',
  styleUrls: ['./Dashboard.component.scss'],
  providers:[HeaderComponent],
})
export class DashboardComponent {
  @HostListener('window:resize', ['$event'])
  @ViewChild('stepper') stepper : NbStepperComponent;

  screenHeight:any;
  screenWidth:any;
  cartValue;
  cartCheck = false;
  applicationCheck = false;
  application;
  applicationData;
  applicationID;
  min: Date;
  max: Date;
  alertFlag = 0;
  selectedItem ;
  user = { name : "",id:"",role:""};
  firstForm: FormGroup;
  courseID;
  length;
  message;
  status = false;
  pincode;
  colleges;
  alert: number =0;
  ucaFlag = false;
  coursedata;
  public filterText: string;
  public filterPlaceholder: string;
  public filterInput = new FormControl();

  constructor(
    private userService: UserService,
    private instituteApi :InstituteApiService,
    protected dateService: NbDateService<Date>,
    protected api : ApiService,
    protected router : Router,
    private comp: HeaderComponent,
    public themeService : NbThemeService,
    private authService : NbAuthService
  ) {
      this.min = this.dateService.addMonth(this.dateService.today(), -1);
      this.max = this.dateService.addMonth(this.dateService.today(), 1);
      this.getScreenSize();
    }
  
  async ngOnInit() {
    this.filterText = "";
    this.filterPlaceholder = "Search";

    this.authService.onTokenChange()
    .subscribe((token: NbAuthJWTToken) => {
        if(token.getPayload()['role'] == "admin"){
          this.router.navigate(['auth/adminOtp'])
        }
    });

    this.api.getTheme().subscribe((data: any) => {
      if(data['data']){
        this.themeService.changeTheme(data['data']);
      }else{
        this.themeService.changeTheme('default');
      }
    });

  
    this.userService.onUserChange()
      .subscribe((user: any) => this.user = user);
      if(this.user.role == 'student'){
        var cart = await this.api.getCartValue();
        this.cartValue = cart['data']['course'];
        if(this.cartValue.length > 0){
          this.cartCheck = true;  
          setTimeout(() => {
            this.setOrientation();
            this.stepper.selectedIndex = 0;
          },1000);
        }else{
          this.cartCheck = false;
        }
        var applications = await  this.api.getApplicationLength();
        applications.subscribe(data =>{
          this.application = data['data'];
          this.length = data['length'];
          if(this.length == 1){
            this.ucaFlag = true;
            this.applicationID = this.application.id;
            this.courseID = this.application.course_id;
            setTimeout(() => {
              this.setOrientation();
              this.stepper.selectedIndex = 1;
            },1000);
            if(this.application.online_test_details == true){
              setTimeout(() => {
                this.setOrientation();
                this.stepper.selectedIndex = 2;
              },1000);
            }
            if(this.application.pi_test_details == true){
              setTimeout(() => {
                this.setOrientation();
                this.stepper.selectedIndex = 3;
              },1000);
            }
            if(this.application.exam_result == true){
              setTimeout(() => {
                this.setOrientation();
                this.stepper.selectedIndex = 4;
              },1000);
            }
            if(this.application.paidfee == true){
              setTimeout(() => {
                this.setOrientation();
                this.stepper.selectedIndex = 5;
              },1000);
            }
          }else if(this.length > 1 ){
            this.ucaFlag = true;
            this.applicationData = data['data'];
            setTimeout(() => {
              this.setOrientation();
              this.stepper.selectedIndex = 1;
            },1000);
            this.applicationData.forEach(element => {
              //if(element.status == "accept"){
                this.status = true;
              //}
            });
          }

        });
      }else if(this.user.role == 'institute'){
        var applications = await  this.instituteApi.getDashboardData();
        applications.subscribe(data =>{
        this.coursedata = data['data']['courses'];
        });

        this.filterInput
        .valueChanges
        .debounceTime(200)
        .subscribe(term => {
        this.filterText = term;
      });

      }
  } 


  setOrientation(){
    if(this.screenWidth < 500){
      this.stepper.orientation = "vertical";
    }else{
      this.stepper.orientation = "horizontal";
    }
  }

  setCourse_id(course_id){
  this.courseID = course_id;
  }

  async setStepper(id){
    this.stepper.reset();
    this.applicationID = id;   
    var app = await  this.api.getUserApplication(id);
    app.subscribe(data =>{
      this.application= data['data'];
      if(this.length > 0){
        this.stepper.selectedIndex = 1;
      }
      if(this.application.online_test_details == true){
        this.stepper.selectedIndex = 2;
      }
      if(this.application.pi_test_details == true){
        this.stepper.selectedIndex = 3;
      }
      if(this.application.exam_result == true){
        this.stepper.selectedIndex = 4;
      }
      if(this.application.paidfee == true){
        this.stepper.selectedIndex = 5;
      }
    });
  }


  selectStep(){
    if(this.stepper.selectedIndex == 0){
      if(this.cartCheck == true){
        this.router.navigate(['pages/cart']);
      }else{
        this.message = "You havn't add any course to cart";
        this.alertFlag = 1;
        this.timer();
      }
    }else if(this.stepper.selectedIndex == 1){
      if(this.length > 0){
        this.router.navigate(['pages/application']);
      }else{
        this.message = "You havn't apply any course";
        this.alertFlag = 1;
        this.timer();
      }
    }else if(this.stepper.selectedIndex == 2){
      if(this.application.online_test_details == true){
        this.router.navigate(['pages/application/process'],{queryParams:{appId :this.applicationID,courseID:this.courseID,selectedIndex:0}});
      }else{
        this.message = "Your Online entrance test is not scheduled.";
        this.alertFlag = 1;
        this.timer();
      }
    }else if(this.stepper.selectedIndex == 3 ){
      if(this.application.pi_test_details == true){
        this.router.navigate(['pages/application/process'],{queryParams:{appId :this.applicationID,courseID:this.courseID,selectedIndex:1}});
      }else{
        this.message = "Your Personal Interview is not scheduled.";
        this.alertFlag = 1;
        this.timer();
      }
    }else if(this.stepper.selectedIndex == 4){
      if(this.application.exam_result == true){
        this.router.navigate(['pages/application/process'],{queryParams:{appId :this.applicationID,courseID:this.courseID,selectedIndex:2}});
      }else{
        this.message = "Your Merit List is not yet out.";
        this.alertFlag = 1;
        this.timer();
      }
    }else if(this.stepper.selectedIndex == 5){
      if(this.application.status=='accept'){
        if(this.application.exam_result == true && this.application.paidfee == false){
          this.router.navigate(['pages/application/process'],{queryParams:{appId :this.applicationID,courseID:this.courseID,selectedIndex:3}});
        }else if(this.application.paidfee == true){
          this.message = "You have already paid amount. You have to upload receipt.";
          this.alertFlag = 1;
          this.timer();
        }else{
          this.message = "You can not pay fees until the result will be out.";
          this.alertFlag = 1;
          this.timer();
        }
      }else if(this.application.status=='reject'){
        this.message = "Your application is rejected.";
        this.alertFlag = 1;
        this.timer();
      }else if(this.application.status=='new'){
        this.message = "You can not pay fees until the result will be out.";
        this.alertFlag = 1;
        this.timer();
      }
    }
  }

  onClose(){
    this.alertFlag = 0;
  }

  timer (){
    setTimeout(()=>{
      //this.onClose();
      this.alertFlag = 0;
    },5000);
  }
  
  searchCollege(){
    if(!(this.pincode===undefined || this.pincode === '' )){
      this.router.navigate(['pages/search'],{queryParams:{postal_code:this.pincode}});
    }
    else{
      this.alert=1
    }
    
  }


  getScreenSize(event?) {
    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;
  }
}