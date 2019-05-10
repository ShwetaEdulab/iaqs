import { Component, OnInit } from '@angular/core';
import { NbDialogService, NbThemeService } from '@nebular/theme';
import { dialogcomponent } from './dialog.component';
import { DiologaddnewComponent } from './dialog-addnew.component';
import { NewDiologComponent } from './newdialog.component';
import { DiologcollegeformComponent } from './dialog-collegeform.component';
import { UserService } from '../../@core/data/users.service';
import { ApiService } from '../../shared/api.service';
import { InstituteApiService } from '../../shared/instituteapi.service';
import { NbAuthService, NbAuthJWTToken } from '@nebular/auth';
import { config } from '../../../../config';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ValidatorFn,
  AbstractControl,
  FormControl
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import {CountriesService} from '../../@core/data/countries.service';
import { Data } from '../../shared/data';


@Component({
  selector: 'college-management',
  templateUrl: './college-management.component.html',
  styleUrls: ['./college-management.component.scss'],
})

export class CollegeManagementComponent implements OnInit {
  data: any;
  id: any;
  CollegeName: any;
  VForm: FormGroup;
  InstituteHead1Form: FormGroup;
  InstituteHead2Form: FormGroup;
  ForeignNationals:FormGroup;
  NaacForm:FormGroup;
  ClgForm:FormGroup;
  AccreditationForm:FormGroup;
  VideogalleryForm:FormGroup;
  updateVideoURL:FormGroup;
  Years: any;
  messages:any;
  selectedyear:any; 
  updateclgdetail: any;
  updateInstituteDetail:any;
  postforeignNationals:any;
  detail;
  headdetail;
  headdetail2;
  insti:any;
  alertflag = 0;
  errorflag = 0;
  errortext;
  type_of_institute ;
  collgegId ;
  passYear ;
  image1;
  prinimage1;
  showUpload;
  established_year:any;
  uploaderror = false;
  uploaderror1 = false;
  loading = false;
  currenttoken;
  showerror = false;
  
  user = { name : "", id:""};

  titlee;
  serverUrl = config.serverUrl;
  college_id;
  showpassbuttondiv;
  showcidbuttondiv;
  passImage;
  alerttab3;
  showpassImage = 0;
  uploadedFiles: any[] = [];
  type1 ;
  type2 ;
  Countries: any[];
  selected_country: any;
  clggForm: any;
  userrid:any;
  clgaccreditations:any;
  image: any;
  value: any;
  image11: any;
  imgacc: any;
  galleries: any;
  pricID: any;
  priID: any;
  show = false;
  vicePrinimg: string;
  valueA: any;
  valueB: any;
  valueC: any;
  NaacCrating: any;
  promotionalMat: any;
 
  constructor(private dialogService: NbDialogService,
    private apiservice : ApiService,
    private api : ApiService,
    private instituteapi : InstituteApiService,
    private userService: UserService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    public themeService : NbThemeService,
    private authService: NbAuthService,
    protected countries: CountriesService,
  ) { 
      this.Countries = this.countries.getData();
  }

  ngOnInit() {
    this.instituteapi.getInstCalender().subscribe(
      user => {
        this.Years = user['data'];
    });

      this.instituteapi.getcollegedetail('collegedetails').subscribe(
        user => {
          this.detail = user['data'];
          this.college_id = user['data']['id'];
          this.type_of_institute = user['data']['type_of_institute'];
          this.selectedyear = user['data']['established_in'];
          var yearrr = this.selectedyear.split("-");
          this.established_year = yearrr[0];
          this.selected_country=user['data']['country_id']
          this.userrid = user['data']['user_id']
          this.clggForm = user['data']['collegeForm']
          this.prinimage1 = user['data']['principal']['image']
          this.vicePrinimg =user['data']['vice_principal']['image']
          this.headdetail = user['data']['vice_principal'];
          this.headdetail2 = user['data']['principal'];
          this.pricID = user['data']['principal']['id'];
          this.clgaccreditations=user['data']['college_accreditations']
          this.image= user['data']['college_accreditations']['image']
          this.image11 = user['data']['banner']
          this.galleries=user['data']['galleries'];
          this.promotionalMat = user['data']['promotional_materials']
          if(this.image11== null || this.image11== 'null' || this.image11== "" ){
            this.show = false;
          }else{
            this.show = true;
          }
          if(user['data']['naac_id'] == 1.00){
            this.NaacCrating = 'A'
          }else if(user['data']['naac_id'] == 2.00){
              this.NaacCrating = 'B'
          }else if(user['data']['naac_id'] == 3.00){
              this.NaacCrating = 'C'
          }else if(user['data']['naac_id'] == 4.00){
            this.NaacCrating = 'D'
          }else if(user['data']['naac_id'] == 0.00){
            this.NaacCrating = 'N/A'
          }
      });      
      
      this.userService.onUserChange()
        .subscribe((user: any) => {
          this.user = user;
          this.showUpload = false;
      });

     this.VForm = this.fb.group({
      clgNameCtrl: ['', [ Validators.required, Validators.maxLength(70),Validators.minLength(3)]],
      clgAddCtrl: ['', [ Validators.required, Validators.maxLength(70),Validators.minLength(3)]],
      clgOverviewCtrl: ['', [ Validators.required, Validators.maxLength(500),Validators.minLength(3)]],
      StateCtrl: ['', [ Validators.required, Validators.maxLength(70),Validators.minLength(3)]],
      DistrictCtrl: ['', [ Validators.required, Validators.maxLength(70),Validators.minLength(3)]],
      PostalCodeCtrl:['', [ Validators.required, Validators.maxLength(70),Validators.minLength(3)]],
      CityCtrl: ['', [ Validators.required, Validators.maxLength(70),Validators.minLength(3)]],
      campusAreaCtrl:  ['', [ Validators.required, Validators.maxLength(70),Validators.minLength(3)]],
      CodeCtrl:  ['', [ Validators.required, Validators.maxLength(70),Validators.minLength(3)]],
      YearCtrl: ['', [ Validators.required, Validators.maxLength(70),Validators.minLength(3)]],
      PrincipalNameCtrl: ['', [ Validators.maxLength(70),Validators.minLength(3)]],
      PrincipalEmailCtrl: ['', [ Validators.maxLength(70),Validators.minLength(3)]],
      AuthorisedPersonNameCtrl: ['', [ Validators.required, Validators.maxLength(70),Validators.minLength(3)]],
      AuthorisedPersonEmailCtrl: ['', [ Validators.required, Validators.maxLength(70),Validators.minLength(3)]],
      PrincipalMobileNumberCtrl:[''],
      PrincipallandlineNumberCtrl: [''],
      AuthorisedMobileNumberCtrl: [''],
      AuthorisedlandlineNumberCtrl: ['']

    })

    this.InstituteHead1Form = this.fb.group({
      TitleCtrl:['', [ Validators.required, Validators.maxLength(70),Validators.minLength(3)]],
      NameCtrl:['', [ Validators.required, Validators.maxLength(70),Validators.minLength(3)]],
      EducationalqualificationCtrl:['', [ Validators.required, Validators.maxLength(70),Validators.minLength(3)]],
    })

    this.InstituteHead2Form = this.fb.group({
      TitleCtrl2:['', [ Validators.required, Validators.maxLength(70),Validators.minLength(3)]],
      NameCtrl2:['', [ Validators.required, Validators.maxLength(70),Validators.minLength(3)]],
      EducationalqualificationCtrl2 :['', [ Validators.required, Validators.maxLength(70),Validators.minLength(3)]],
    })

    this.NaacForm = this.fb.group({
      selectRatingCtrl:['', [ Validators.required, Validators.maxLength(70),Validators.minLength(3)]]
    })
    this.AccreditationForm = this.fb.group({
      naaccCtrl:['', [ Validators.required, Validators.maxLength(70),Validators.minLength(3)]]
    })

    
    this.VideogalleryForm = this.fb.group({
      VideogalleryCtrl:['', [ Validators.required, Validators.maxLength(70),Validators.minLength(3)]]
    })

    this.updateVideoURL = this.fb.group({
      VideoURLCtrl:[''],
      VideoURL1Ctrl:['']
    })
  }
  
  getValues(e){
    this.value = e.index
    // if(this.value==0 || this.value==1  || this.value==2 || this.value==3){
    //   this.call();
    // }
  }

  call(){
    this.instituteapi.getcollegedetail('collegedetails').subscribe(
      user => {
        this.detail = user['data'];
        this.college_id = user['data']['id'];
        this.type_of_institute = user['data']['type_of_institute'];
        this.selectedyear = user['data']['established_in'];
        var yearrr = this.selectedyear.split("-");
        this.established_year = yearrr[0];
        this.selected_country=user['data']['country_id']
        this.userrid=user['data']['user_id']
        this.clggForm=user['data']['collegeForm']
        this.headdetail = user['data']['vice_principal'];
        this.headdetail2 = user['data']['principal'];
        this.priID = user['data']['principal']['id'];
        this.clgaccreditations=user['data']['college_accreditations']
        this.galleries=user['data']['galleries'];
        this.promotionalMat = user['data']['promotional_materials']
    }); 
  }
   
  onSelect($event: any): void {
		var maxFileSize =  2000000;
		var imgArr = $event.files[0].name.split('.');
    var extension = imgArr[imgArr.length - 1].trim();
    
    if(extension!='jpg' && extension!='jpeg' && extension!='png' && extension!='pdf'){
			this.uploaderror1 = true;
    }
    
    if ($event.files[0].size > maxFileSize) {
      this.uploaderror = true;
    }
  }
  
  timer (){
    setTimeout(()=>{
      this.errorflag = 0;
    },5000);
  }

  save(){
    var check_validation;
    var validation_messages;
    var alternate_message_show;
    this.VForm.controls.clgNameCtrl.markAsDirty();
    this.VForm.controls.clgAddCtrl.markAsDirty();
    this.VForm.controls.clgOverviewCtrl.markAsDirty();
    this.VForm.controls.StateCtrl.markAsDirty();
    this.VForm.controls.DistrictCtrl.markAsDirty();
    this.VForm.controls.CityCtrl.markAsDirty();
    this.VForm.controls.PostalCodeCtrl.markAsDirty();
    this.VForm.controls.campusAreaCtrl.markAsDirty();
    this.VForm.controls.YearCtrl.markAsDirty();
    this.VForm.controls.AuthorisedPersonNameCtrl.markAsDirty();
    this.VForm.controls.AuthorisedPersonEmailCtrl.markAsDirty();
    if (this.VForm.valid) {
      check_validation = true;
      this.errorflag = 0;
      this.alertflag = 0;
    }else {
      check_validation = false;
      this.alertflag = 1;
      this.errorflag = 1;
      this.errortext = "Please fill all mandatory fields";
    }

    var userdb = {
      College_Name: this.VForm.controls.clgNameCtrl.value,
      College_Address: this.VForm.controls.clgAddCtrl.value,
      College_Overview: this.VForm.controls.clgOverviewCtrl.value,
      State: this.VForm.controls.StateCtrl.value,
      District: this.VForm.controls.DistrictCtrl.value,
      City: this.VForm.controls.CityCtrl.value,
      Postal_Code: this.VForm.controls.PostalCodeCtrl.value,
      campus_area :this.VForm.controls.campusAreaCtrl.value,
      Established_In: this.VForm.controls.YearCtrl.value,
      Principal_Name: this.VForm.controls.PrincipalNameCtrl.value,
      Principal_Email: this.VForm.controls.PrincipalEmailCtrl.value,
      Principal_Mobile_Number: this.VForm.controls.PrincipalMobileNumberCtrl.value,
      Principal_landline_Number: this.VForm.controls.PrincipallandlineNumberCtrl.value,
      Authorised_Person_Name: this.VForm.controls.AuthorisedPersonNameCtrl.value,
      Authorised_Person_Email: this.VForm.controls.AuthorisedPersonEmailCtrl.value,
      Authorised_Mobile_Number: this.VForm.controls.AuthorisedMobileNumberCtrl.value,
      Authorised_landline_Number: this.VForm.controls.AuthorisedlandlineNumberCtrl.value,
      Type_of_institute:this.VForm.controls.CodeCtrl.value
    }
     

    if (check_validation) {
      this.instituteapi.updateclgdetail(userdb)
        .subscribe( 
          (data: any) => {
            if(data['status']== 200){
          }
          err => console.error(err)
       });
    } else {
      this.alertflag = 1;
      if (validation_messages != null) {
        this.messages = validation_messages;
      } else {
        this.messages = "Your form is not filled please fill completely";
      }
    }
  }
 
  instit_save(prinID){
    var check_validation;
    var validation_messages;
    var alternate_message_show;
    this.InstituteHead1Form.controls.TitleCtrl.markAsDirty();
    this.InstituteHead1Form.controls.NameCtrl.markAsDirty();
    this.InstituteHead1Form.controls.EducationalqualificationCtrl.markAsDirty()
    if (this.InstituteHead1Form.valid) {
      check_validation = true;
      this.errorflag = 0;
      this.alertflag = 0;
    }else {
      check_validation = false;
      this.alertflag = 1;
      this.errorflag = 1;
      this.errortext = "Please fill all mandatory fields";
    }
    var userdb1 = {
      name: this.InstituteHead1Form.controls.NameCtrl.value,
      title: this.InstituteHead1Form.controls.TitleCtrl.value,
      qualification: this.InstituteHead1Form.controls.EducationalqualificationCtrl.value,
    }
    if (check_validation) {
      this.instituteapi.instit_save(userdb1,prinID)
        .subscribe( 
          (data: any) => {
            if(data['status']== 200){
          }
          err => console.error(err)
       });
    } else {
      this.alertflag = 1;
      if (validation_messages != null) {
        this.messages = validation_messages;
      } else {
        this.messages = "Your form is not filled please fill completely";
      }
    }

  }

  institueinfo2(vprinID){
    var check_validation;
    var validation_messages;
    var alternate_message_show;
    this.InstituteHead2Form.controls.TitleCtrl2.markAsDirty();
    this.InstituteHead2Form.controls.NameCtrl2.markAsDirty();
    this.InstituteHead2Form.controls.EducationalqualificationCtrl2.markAsDirty(); 
    if (this.InstituteHead2Form.valid) {
      check_validation = true;
      this.errorflag = 0;
      this.alertflag = 0;
    }else {
      check_validation = false;
      this.alertflag = 1;
      this.errorflag = 1;
      this.errortext = "Please fill all mandatory fields";
    }
    var userdb2 = {
      name: this.InstituteHead2Form.controls.NameCtrl2.value,
      title: this.InstituteHead2Form.controls.TitleCtrl2.value,
      qualification: this.InstituteHead2Form.controls.EducationalqualificationCtrl2.value,
    }
    if (check_validation) {
      this.instituteapi.instit_save2(userdb2,vprinID)
        .subscribe( 
          (data: any) => {
            if(data['status']== 200){
            }
          err => console.error(err)
       });
    } else {
      this.alertflag = 1;
      if (validation_messages != null) {
        this.messages = validation_messages;
      } else {
        this.messages = "Your form is not filled please fill completely";
      }
    }
  }

  validateAddURL(){
    this.VideogalleryForm.controls.VideogalleryCtrl.markAsDirty();  
    var galleryUrl = this.VideogalleryForm.controls.VideogalleryCtrl.value;
    if(galleryUrl != null && galleryUrl != '' && galleryUrl != undefined){
      this.showerror = false;
      this.instituteapi.Videogallery(galleryUrl)
        .subscribe( 
          (data: any) => {
            if(data['status']== 200){
              this.loaddata();
            }
          err => console.error(err)
       });
    }else{
      this.showerror = true;
    }
  }
  
  downloadcollegeform() {
    let filename =  this.clggForm;
      this.instituteapi.downloadclgform(filename).subscribe(
        data => {
          saveAs(data, filename);
        },
        err => {
          alert("Problem while downloading the file.");
          console.error(err);
        }
      );
  }

  deleteaccreditation(Id){
    this.instituteapi.deleteaccreditation(Id).subscribe(
      (data: any) => {
        if(data['status']== 200){
          this.loaddata();
        }
      err => console.error(err)
      });
  }
  deletegalleries(Id){
    this.instituteapi.deletegalleriess(Id).subscribe(
      (data: any) => {
        if(data['status']== 200){
          this.loaddata();
        }
      err => console.error(err)
      });
  }

  downloadcollegeform1(){
    this.instituteapi.downloadclgform(Data)
        .subscribe( 
          (data: any) => {
            if(data['status']== 200){
          }
          err => console.error(err)
       });
  }

  open1(){
    var accreditation = this.AccreditationForm.controls.naaccCtrl.value;
    this.dialogService.open(NewDiologComponent, {
      context: {
      }
    }).onClose
    .subscribe(
      (data: any) => {
        this.loaddata();
        err => console.error(err)
      });
  }
  
  
  uploadcollegeform(){
    
    this.dialogService.open(DiologcollegeformComponent, {
      context: {
       
      }
    }).onClose
    .subscribe(
      (data: any) => {
        this.loaddata();
        err => console.error(err)
      });
  }

  openDialog(){
    this.dialogService.open(dialogcomponent, {
      context: {
        data: this.data
      },
   }).onClose
   .subscribe(
     (data: any) => {
       this.loaddata();
       err => console.error(err)
     });
  }


  onSearchChange(searchValue : string ) {
    if(searchValue.length > 3){
      this.showUpload = true;
    }else{
      this.showUpload = false;
    }
  }

  onUpload1(event) {
    for(let file of event.files) {
        this.uploadedFiles.push(file);
    }
  }
  
 index;position;status;
  onUpload(event: any) {
    const reader = new FileReader();
    var duration = 10000;
    this.image1 += 1;
    this.position = 'top-right';
    this.status = 'success';
    this.loaddata();
  }

  loaddata(){
    this.instituteapi.getcollegedetail('collegedetails').subscribe(
      user => {
        this.detail = user['data'];
        this.college_id = user['data']['id'];
        this.type_of_institute = user['data']['type_of_institute'];
        this.selectedyear = user['data']['established_in'];
        var yearrr = this.selectedyear.split("-");
        this.established_year = yearrr[0];
        this.selected_country=user['data']['country_id']
        this.userrid = user['data']['user_id']
        this.clggForm = user['data']['collegeForm']
        this.prinimage1 = user['data']['principal']['image']
        this.vicePrinimg =user['data']['vice_principal']['image']
        this.headdetail = user['data']['vice_principal'];
        this.headdetail2 = user['data']['principal'];
        this.pricID = user['data']['principal']['id'];
        this.clgaccreditations=user['data']['college_accreditations']
        this.image= user['data']['college_accreditations']['image']
        this.image11 = user['data']['banner']
        this.galleries=user['data']['galleries'];
        this.promotionalMat = user['data']['promotional_materials']
        if(this.image11== null || this.image11== 'null' || this.image11== "" ){
          this.show = false;
        }else{
          this.show = true;
        }
        if(user['data']['naac_id'] == 1.00){
          this.NaacCrating = 'A'
        }else if(user['data']['naac_id'] == 2.00){
            this.NaacCrating = 'B'
        }else if(user['data']['naac_id'] == 3.00){
            this.NaacCrating = 'C'
        }else if(user['data']['naac_id'] == 4.00){
          this.NaacCrating = 'D'
        }else if(user['data']['naac_id'] == 0.00){
          this.NaacCrating = 'N/A'
        }
    });     
  }

  onBeforeSend(event) {
    this.loading = true;
    this.authService.onTokenChange().subscribe((token: NbAuthJWTToken) => {
      if (token.isValid()) {
       this.currenttoken = token;
        event.xhr.setRequestHeader("Authorization", `Bearer ` +this.currenttoken);
        event.formData.append('token',''+this.currenttoken);
        }
    });
  }

  validateNAAC(){
    var naac_id = this.NaacForm.controls.selectRatingCtrl.value;
    this.instituteapi.enterselectrating(naac_id)
        .subscribe( 
          (data: any) => {
            if(data['status']== 200){

          }
          err => console.error(err)
       });
  }

  onFilesAdded(files: File[]) {
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent) => {
        const content = (e.target as FileReader).result;
      };
    });
  }

  deletePromotionalMaterial(Id){
    this.instituteapi.deletePromotionalMaterials(Id).subscribe(
      (data: any) => {
        if(data['status']== 200){
          this.loaddata();
        }
      err => console.error(err)
      });
  }

  edit(){
    this.alertflag = 2;
    this.loaddata();
  }

  cancel(){
    this.alertflag = 0;
    this.loaddata();
  }

  savevideoURL(Id){
    var Video_URL = this.updateVideoURL.controls.VideoURLCtrl.value;
    this.instituteapi.addvideoURL(Id,Video_URL).subscribe(
      (data: any) => {
        if(data['status']== 200){
          this.alertflag= 0;
          this.loaddata();
        }
      err => console.error(err)
      });
  }

  deleteVideoURL(Id){
    this.instituteapi.deleteVideourl(Id).subscribe(
      (data: any) => {
        if(data['status']== 200){
          this.loaddata();
        }
      err => console.error(err)
      });
  }

}