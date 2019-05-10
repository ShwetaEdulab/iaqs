import {
  Component,
  ChangeDetectorRef,
  ViewChild
} from '@angular/core';
import {
  NbDateService,
  NbDialogService,
  NbToastrService,
  NbStepperComponent,
  NbThemeService
} from '@nebular/theme';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ValidatorFn,
  AbstractControl
} from '@angular/forms';
import {
  UserService
} from '../../@core/data/users.service';
import {
  ApiService
} from './../../shared/api.service';
import {
  CountriesService
} from '../../@core/data/countries.service';
import {
  FirstDialogComponent
} from './dialog/firstdialogcomponent';
import {
  SecondDialogComponent
} from './dialog/seconddialogcomponent';
import {
  ThirdDialogComponent
} from './dialog/thirddialogcomponent';
import {
  FourthDialogComponent
} from './dialog/fourthdialogcomponent';
import {
  NbAuthService,
  NbAuthJWTToken
} from '@nebular/auth';
import {
  TranscriptDialogComponent
} from './dialog/transcriptdialogcomponent';
import {
  Router,
  ActivatedRoute
} from '@angular/router';
import { HeaderComponent } from '../../@theme/components/header/header.component';
import { config } from '../../../../config';
import {ConfirmationService} from 'primeng/api';
import { distinctUntilChanged } from 'rxjs/operators';
import { transcriptpreview } from './dialog/transcriptpreview.component';
import { SocketService } from '../../shared/socket.service';

@Component({
  selector: 'profile',
  styleUrls: ['./profile.component.scss'],
  templateUrl: './profile.component.html',
  providers:[HeaderComponent,ConfirmationService],
})
export class ProfileComponent {

  @ViewChild('stepper') stepper: NbStepperComponent;
  serverUrl=config.serverUrl;
  date = new Date();
  min: Date;
  max = new Date();
  passIssueDate;
  passExpiryDate;
  countryValidation = true;
  permcountryValidation = true;
  altcountryValidation = true;
  passportcountryValidation = true;
  guardiancountryValidation = true;
  guardianOtherCountryValidation = true;
  guardianCitizenshipNumber;
  countryofbirth;
  selectedItem;
  selectedGender;
  selectedMaritalStatus;
  passportCountry;
  Countries: any[];
  altCountry;
  altCountry_guardian;
  permCountry;
  Country_id_personal;
  permCountry_guardian;
  profile_info;
  firstdob;
  father_name;
  mother_name;
  guardian_info;
  guardian_other_address;
  guardian_other_address_values;
  guardianCountry;
  emailCorrespondace = 'false';
  isChecked = false;
  testradio;
  alertflag = 0;
  errorflag = 0;
  eduerrorflag = 0;
  edudegreecheck;
  messages;
  // cbse_marks;
  cbse = {
    university: '',
    school_name: '',
    result_date: '',
    school_marks: ''
  };
  hsc = {
    college_university: '',
    college_name: '',
    college_result_date: '',
    college_marks: ''
  };
  diploma = {
    diploma_university: '',
    diploma_coll_name: '',
    diploma_result_date: '',
    diploma_marks: ''
  };
  degree = {
    degree_university: '',
    degree_coll_name: '',
    degree_result_date: '',
    degree_marks: ''
  };
  tabcheck1;
	tabcheck2;
	tabcheck3;
	tabcheck4;
	tabcheck5;
  education_next_validation: boolean;
  uploadedFiles: any[] = [];
  employment = {
    company_name: '',
    years: '',
    months: '',
    country: '',
    title: '',
    typeofwork: '',
    workdesc: '',
  };
  updated_emp: any;
  fullTime = 'fullTime';
  partTime = 'partTime';
  internship = 'internship';
  errortext;
  //transcript variables
  profileCompleteness: any;
  moreDocs: any;
  userDocs: any;
  preferences: any;
  currenttoken;
  country_birth: any;
  appearance: any;
  degreeCheck: any;
  married: any;

  Photo: any;
  Sign: any;
  ExperienceCertificate: any;
  SSCcertificate: any;
  HSCcertificate: any;
  Leavingcertificate: any;
  FirstYearMarksheet: any;
  SecondYearMarksheet: any;
  ThirdYearMarksheet: any;
  PassingCertificate: any;
  AdharCard: any;
  dobCertificate: any;
  CasteCertificate: any;
  RationCard: any;
  CasteValidityCertificate: any;
  NonCreamyLayerCertificate: any;
  DistrictChangeCertificate: any;
  GapCertificate: any;
  DomicileCertificate: any;
  MarriageCertificate: any;
  MigrationCertificate: any;

  private index: number = 0;
  position: any;
  status: any;
  loading = false;
  loading1 = false;
  loading2 = false;
  loading3 = false;
  loading4 = false;
  loading5 = false;
  loading6 = false;
  loading7 = false;
  loading8 = false;
  loading9 = false;
  loading10 = false;
  loading11 = false;
  loading12 = false;
  loading13 = false;
  loading14 = false;
  loading15 = false;
  loading16 = false;
  loading17 = false;
  loading18 = false;
  loading19 = false;
  loading20 = false;
  loading21 = false;
  loading22 = false;
  loading23 = false;
  loading24 = false;
  loading25 = false;
  loading26 = false;

  SamplePhoto: any;
  SampleSign: any;
  SampleExperienceCertificate: any;
  SampleSSCcertificate: any;
  SampleHSCcertificate: any;
  SampleLeavingcertificate: any;
  SampleFirstYearMarksheet: any;
  SampleSecondYearMarksheet: any;
  SampleThirdYearMarksheet: any;
  SamplePassingCertificate: any;
  SampleAdharCard: any;//AdharCard
  SampledobCertificate: any;
  SampleCasteCertificate: any;
  SampleRationCard: any;
  SampleCasteValidityCertificate: any;
  SampleNonCreamyLayerCertificate: any;
  SampleDistrictChangeCertificate: any;
  SampleGapCertificate: any;
  SampleDomicileCertificate: any;
  SampleMarriageCertificate: any;
  SampleMigrationCertificate: any;



  readonly emailValidate = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  readonly charValidate = /^[.a-zA-Z ]*$/;
  readonly nationalValidate = /^(?![0-9]*$)[A-Za-z0-9 ]+$/;
  readonly passportValidate = /^[a-zA-Z0-9]*$/;
  readonly postalValidate = /^[a-zA-Z0-9 ]+$/;
  readonly mobileValidate = /^[0-9]\d{5,12}$/;
  user = {
    name: "",
    profileCompleteness: ""
  };
  transcript_data;
  show = false;
  firstForm: FormGroup;
  secondForm: FormGroup;
  thirdForm: FormGroup;
  fourthForm: FormGroup;
  fifthForm: FormGroup;
  sixthForm: FormGroup;
  Dropdownvar;
  EducationalDialogNo: any;
  degree_course;
  course_id;
  passport_exp_date;
  date_of_issuance;
  guardianDOB: any;
  mobile_country_code: any;
  eduerrortext: string;
  alertflagEducation :boolean = false;
  user_id: any;
  result_date: any;
  college_result_date: any;
  diploma_result_date: any;
  degree_result_date: any;
  selectedCategory: any;
  isDisabled = false;

  constructor(private userService: UserService,
    private fb: FormBuilder,
    protected dateService: NbDateService < Date > ,
    protected api: ApiService,
    protected countries: CountriesService,
    private dialogService: NbDialogService,
    private authService: NbAuthService,
    private toastrService: NbToastrService,
    private router: Router,
    private route: ActivatedRoute,
    public themeService : NbThemeService,
    private comp: HeaderComponent,
    private ref: ChangeDetectorRef,
    private confirmationService: ConfirmationService,
    private socket : SocketService,
  ) {
    this.Countries = this.countries.getData();
  }


  ngOnInit() {
    var degree = this.route.snapshot.queryParamMap.get("degree");
    var course_id = this.route.snapshot.queryParamMap.get("courseId");
    this.degree_course = this.route.snapshot.queryParamMap.get("degree");
    this.course_id = this.route.snapshot.queryParamMap.get("courseId");

     this.api.getTheme().subscribe((data: any) => {
        if(data['data']){
          this.themeService.changeTheme(data['data']);
        }else{
          this.themeService.changeTheme('default');
        }
      });
    // This route comes from pages.component.ts
    if(this.route.snapshot.paramMap.get("selectedIndex")){
      this.stepper.selectedIndex = parseInt(this.route.snapshot.paramMap.get("selectedIndex"));
    }
    // This route comes from edit page when the user has errata.
    if (this.route.snapshot.queryParamMap.get('selectedIndex') != null) {
      this.stepper.selectedIndex = parseInt(this.route.snapshot.queryParamMap.get('selectedIndex')); //this.route.snapshot.queryParamMap.get('selectedIndex');
    } else {
      this.stepper.selectedIndex = 0;
    }
    try {
      this.api.getUnlockedTranscript().subscribe(
        data => {
          this.transcript_data = data['data'];
        },
        error => {
          console.error("Error", error);
        }
      );
    } catch (error) {
      console.error("Error from ngOnInit => " + error);
    }

    this.api.getProfileValue('Personal')
			.subscribe(
        (data: any) => {
          if(data['data']['user_data']['profile_completeness'] == '100'){
            if(this.route.snapshot.paramMap.has("selectedIndex") || this.route.snapshot.queryParamMap.has("selectedIndex") || this.route.snapshot.queryParamMap.has("degree")){
                this.show = false;
              // This route comes from pages.component.ts
              if(this.route.snapshot.paramMap.get("selectedIndex")){
                this.stepper.selectedIndex = parseInt(this.route.snapshot.paramMap.get("selectedIndex"));
              }
              // This route comes from edit page when the user has errata.
              if (this.route.snapshot.queryParamMap.get('selectedIndex') != null) {
                this.stepper.selectedIndex = parseInt(this.route.snapshot.queryParamMap.get('selectedIndex')); //this.route.snapshot.queryParamMap.get('selectedIndex');
              } 
              if(this.route.snapshot.queryParamMap.get("degree") == "Master's" || this.route.snapshot.queryParamMap.get("degree") == "Post graduate diplomas"){		 
                this.show = false;
                this.stepper.selectedIndex = 2;
                this.alertflagEducation = true;
              }
            }else{
              this.show = true;
            }
          }else{
            this.show = false;
          }
		  });
   
    if(this.route.snapshot.queryParamMap.get("degree") == "Master's")
    { 
      this.show = false;
      this.stepper.selectedIndex = 2;
      this.alertflagEducation = true;
    }

    this.buildForm1();
    this.buildForm2();
    this.buildForm3();
    this.buildForm4();
    this.buildForm5();
    this.buildForm6();


    this.api.checkTabs(degree,course_id).subscribe((data: any) => {
			this.tabcheck1 = data.data.tab1;
			this.tabcheck2 = data.data.tab2;
			this.tabcheck3 = data.data.tab3;
			this.tabcheck4 = data.data.tab4;
      this.tabcheck5 = data.data.tab5;
      
      // if(this.profile_info.country_birth!== null){
      //   if(this.profile_info.country_birth == 154 || this.profile_info.country_birth == 25){
      //     this.firstForm.controls['passportCtrl'].setValidators([]); 
      //     this.firstForm.controls['passportCtrl'].updateValueAndValidity();  
      //     this.firstForm.controls['passportCountry'].setValidators([]); 
      //     this.firstForm.controls['passportCountry'].updateValueAndValidity(); 
      //     this.firstForm.controls['passIssueCtrl'].setValidators([]); 
      //     this.firstForm.controls['passIssueCtrl'].updateValueAndValidity(); 
      //     this.firstForm.controls['passExpiryCtrl'].setValidators([]); 
		  // this.firstForm.controls['passExpiryCtrl'].updateValueAndValidity(); 
		  // this.passportcountryValidation=true;
      //   } 
      // }
			if(data.data.tab1 == false){
				setTimeout(()=>{
					this.checktabs(0);
					
				  },2500);
				
			}else if(data.data.tab2 == false){
				
				setTimeout(()=>{
					this.checktabs(1);
					
				  },2500);
			}else if(data.data.tab3 == false){
				setTimeout(()=>{
					this.checktabs(2);
					
				  },2500);
				
			}else if(data.data.tab4 == false){
				setTimeout(()=>{
					this.checktabs(3);
					
				  },2500);
				
			}else if(data.data.tab5 == false){
				setTimeout(()=>{
					this.checktabs(4);
					
				  },2500);
				
			}
		});

  }

  public checktabs(tab_index){
   this.next_disable();

    //todo also for 0
		if(this.firstForm.valid){
			this.tabcheck1 = true;
		}else{
			this.tabcheck1 = false;
		}

		if(this.secondForm.valid){
			this.tabcheck2 = true;
		}else{
			this.tabcheck2 = false;
		}

    //third form cbse,hsc, degree forms validation variable below
		if(this.thirdForm.valid){
			this.tabcheck3 = true;
		}else{
			this.tabcheck3 = false;
		}

		if(this.fourthForm.valid){
			this.tabcheck4 = true;
		}else{
			this.tabcheck4 = false;
		}

		if(this.fifthForm.valid){
			this.tabcheck5 = true;
		}else{
			this.tabcheck5 = false;
		}

		if(tab_index == 0){
			if(tab_index<1){
				this.stepper.selectedIndex = tab_index;
			}else{
				if(this.firstForm.valid == false){
					this.stepper.selectedIndex = 0;
				} else {
					this.stepper.selectedIndex = tab_index;
				}
			}	
		}else if(tab_index == 1){
			if(tab_index<2){
				if(this.firstForm.valid == false){
					this.stepper.selectedIndex = 0;
				}else	{
					this.stepper.selectedIndex = tab_index;
				}
				
			}else{
				
				if(this.secondForm.valid == false){
					this.stepper.selectedIndex = 1;
				}else if(this.thirdForm.valid == false){
					this.stepper.selectedIndex = 2;
				}else if(this.fourthForm.valid == false){
					this.stepper.selectedIndex = 3;
				}else if(this.fifthForm.valid == false){
					this.stepper.selectedIndex = 4;
				}
			}	
		}else if(tab_index == 2){
			if(tab_index<3){
				
				if(this.firstForm.valid == false){
					this.stepper.selectedIndex = 0;
				}else if(this.secondForm.valid == false){
					this.stepper.selectedIndex = 1;
				}else {
					this.stepper.selectedIndex = tab_index;
				}
			}else{
				// if(this.firstForm.valid == false){
				// 	this.stepper.selectedIndex = 0;
				if(this.secondForm.valid == false){
					this.stepper.selectedIndex = 1;
				}else if(this.thirdForm.valid == false){
					this.stepper.selectedIndex = 2;
				}else if(this.fourthForm.valid == false){
					this.stepper.selectedIndex = 3;
				}else if(this.fifthForm.valid == false){
					this.stepper.selectedIndex = 4;
				}
			}	
		}else if(tab_index == 3){
			if(tab_index<4){
				
				if(this.firstForm.valid == false){
					this.stepper.selectedIndex = 0;
				}else if(this.secondForm.valid == false){
					this.stepper.selectedIndex = 1;
				}else if(this.thirdForm.valid == false){
					this.stepper.selectedIndex = 2;
				}else {
					this.stepper.selectedIndex = tab_index;
				}
			}else{
				// if(this.firstForm.valid == false){
				// 	this.stepper.selectedIndex = 0;
				if(this.secondForm.valid == false){
					this.stepper.selectedIndex = 1;
				}else if(this.thirdForm.valid == false){
					this.stepper.selectedIndex = 2;
				}else if(this.fourthForm.valid == false){
					this.stepper.selectedIndex = 3;
				}else if(this.fifthForm.valid == false){
					this.stepper.selectedIndex = 4;
				}
			}	
		}else if(tab_index == 4){
			if(tab_index<5){
				
				if(this.firstForm.valid == false){
					this.stepper.selectedIndex = 0;
				}else if(this.secondForm.valid == false){
					this.stepper.selectedIndex = 1;
				}else if(this.thirdForm.valid == false){
					this.stepper.selectedIndex = 2;
				}else if(this.fourthForm.valid == false){
					this.stepper.selectedIndex = 3;
				} else {
					this.stepper.selectedIndex = tab_index;
				}
			}else{
				// if(this.firstForm.valid == false){
				// 	this.stepper.selectedIndex = 0;
				if(this.secondForm.valid == false){
					this.stepper.selectedIndex = 1;
				}else if(this.thirdForm.valid == false){
					this.stepper.selectedIndex = 2;
				}else if(this.fourthForm.valid == false){
					this.stepper.selectedIndex = 3;
				}else if(this.fifthForm.valid == false){
					this.stepper.selectedIndex = 4;
				}
			}	
		}
	}


  Edit() {
    this.show = false;
  }

  onClickTranscript() {
    this.show = false;
    this.stepper.selectedIndex = 4;
  }

  onValueChange_PhoneCode(event) {
    var phonecode;
    var permittedValues = this.Countries.map(function (value) {
      if (value.id == event) {
        phonecode = value.phonecode;
      }
    });
    if (!(phonecode == null || phonecode == undefined)) {
      this.profile_info.mobile_country_code = phonecode;
    }
  }

  // onValueChangeGuardian_PhoneCode(event) {
  //   var phonecode;
  //   var permittedValues = this.Countries.map(function (value) {
  //     if (value.id == event) {
  //       phonecode = value.phonecode;
  //     }
  //   });
  //   if (!(phonecode == null || phonecode == undefined)) {
  //     this.mobile_country_code = phonecode;
  //   }
  // } 

  private buildForm1(): void {

    this.api.getProfileValue('Personal')
      .subscribe(
        (data: any) => {

		  this.profile_info = data['data']['user_data'];
		  var date_of_issuance1=data['data']['user_data']['date_of_issuance'];
            var passport_exp_date1=data['data']['user_data']['passport_exp_date'];
            this.date_of_issuance = date_of_issuance1 ? new Date(data['data']['user_data']['date_of_issuance']) : null; 
            this.passport_exp_date = passport_exp_date1 ? new Date(data['data']['user_data']['passport_exp_date']) : null;
      
          //this.firstdob = new Date(data['data']['user_data']['dob']);
          if(data['data']['user_data']['dob'] == null || data['data']['user_data']['dob'] == '' || data['data']['user_data']['dob'] == undefined){
            this.firstdob = null;
          }else{
            this.firstdob =  new Date(data['data']['user_data']['dob']);
          }

          this.Country_id_personal = data['data']['user_data']['country_id'];
          this.permCountry = data['data']['user_data']['country_id'];
          this.permCountry_guardian = "" + data['data']['user_data']['country_id'];
          this.altCountry_guardian = "" + data['data']['user_data']['alternate_country'];
          this.altCountry = data['data']['user_data']['alternate_country'];
          //this.passportCountry = data['data']['user_data']['country_of_issuance'];
          this.selectedGender = data['data']['user_data']['gender'];
          this.selectedMaritalStatus = data['data']['user_data']['maritalstatus'];
          this.countryofbirth = data['data']['user_data']['country_birth'];
          this.selectedCategory = data['data']['user_data']['student_category'];
          if(this.selectedCategory!=null){
            this.isDisabled = true;
          }else{
            this.isDisabled = false;
          }
          err => console.log(err)
        });



    this.firstForm = this.fb.group({
      fullNameCtrl: ['', [Validators.required, Validators.maxLength(70), Validators.minLength(3)]],
      surnameCtrl: ['', [Validators.pattern(this.charValidate), Validators.required, Validators.maxLength(70), Validators.minLength(3)]],
      //nationalityCtrl: ['', [Validators.pattern(this.nationalValidate), Validators.required, Validators.maxLength(50), Validators.minLength(2)]],
      emailCtrl: ['', [Validators.required, Validators.pattern(this.emailValidate)]], // Validators.pattern("^[0-9]*$")
      permAddCtrl: ['', [Validators.required, Validators.maxLength(250), Validators.minLength(3)]],
      genderCtrl: ['', [Validators.required]],
      maritalCtrl: ['', [Validators.required]],
      permCityCtrl: ['', [Validators.required, Validators.maxLength(30), Validators.minLength(2)]],
      permStateCtrl: ['', [Validators.required, Validators.maxLength(30), Validators.minLength(2)]],
      permPostCodeCtrl: ['', [Validators.required, Validators.pattern(this.postalValidate), Validators.maxLength(10), Validators.minLength(5)]],
      alterAddCtrl: ['',],
      alterCityCtrl: ['',],
      alterStateCtrl: ['', ],
      alterPostCodeCtrl: ['', ],
      //passportCtrl: ['', [Validators.pattern(this.passportValidate), Validators.required, Validators.maxLength(15)]],
      dobCtrl: ['', [Validators.required]],
      phonecodeCtrl: ['', [Validators.required]],
      phoneCtrl: ['', [Validators.required, Validators.pattern(this.mobileValidate)]],
      adharCardCtrl : ['', [Validators.required, Validators.pattern(this.mobileValidate), Validators.minLength(12)]], 
      categoryCtrl: ['', [Validators.required]],
      //passIssueCtrl: ['', [Validators.required]],
      //permCountryCtrl: ['', [Validators.required]],
      //countryidCtrl: ['', [Validators.required]],
      //altCountryCtrl: [''],
      //passportCountry: ['', [Validators.required]],
      //passExpiryCtrl: ['', [Validators.required]],
    });

  }

  private buildForm2(): void {
    this.secondForm = this.fb.group({
      fatherNameCtrl : ['', [Validators.required, Validators.maxLength(70), Validators.minLength(3)]],
      motherNameCtrl : ['', [Validators.required, Validators.maxLength(70), Validators.minLength(3)]],
      guardianNameCtrl2: ['', [Validators.required, Validators.maxLength(70), Validators.minLength(3)]],
      relationCtrl: ['', [Validators.required, Validators.maxLength(70), Validators.minLength(3)]],
      guardianDOBCtrl: ['', Validators.required],
      guardianEmailCtrl: ['', [Validators.required, Validators.pattern(this.emailValidate)]],
      //guardianCountryCtrl: ['', [Validators.required, ]],
      guardianCountryCodeCtrl: [''],
      guardianMobileCtrl: ['', [Validators.required, ]],
      address_Radio: ['', [Validators.required, ]],
      //citizenshipNumberCtrl: ['', [Validators.required, ]],
     // citizenshipCtrl: ['', [Validators.required, ]],
      perm_guardian_address: ['', [Validators.required, Validators.maxLength(250), Validators.minLength(3)]],
      perm_guardian_city: ['', [Validators.required, Validators.maxLength(250), Validators.minLength(3)]],
      perm_guardian_postal_code: ['', [Validators.required]],
      perm_guardian_state: ['', [Validators.required, Validators.maxLength(250), Validators.minLength(3)]],
     // perm_guardian_country: ['', [Validators.required]],
     //perm_guardian_citizenship: ['', [Validators.required, Validators.maxLength(250), Validators.minLength(3)]],

      alt_guardian_address: ['', [Validators.required, Validators.maxLength(250), Validators.minLength(5)]],
      alt_guardian_city: ['', [Validators.required, Validators.maxLength(250), Validators.minLength(3)]],
      alt_guardian_postal_code: ['', [Validators.required]],
      alt_guardian_state: ['', [Validators.required, Validators.maxLength(250), Validators.minLength(3)]],
      //alt_guardian_country: ['', [Validators.required]],
      //alt_guardian_citizenship: ['', [Validators.required, Validators.maxLength(250), Validators.minLength(3)]],

      other_guardian_address: ['', [Validators.required, Validators.maxLength(250), Validators.minLength(5)]],
      other_guardian_city: ['', [Validators.required, Validators.maxLength(250), Validators.minLength(3)]],
      other_guardian_postal_code: ['', [Validators.required]],
      other_guardian_state: ['', [Validators.required, Validators.maxLength(250), Validators.minLength(3)]],
      //other_guardian_country: ['', [Validators.required]],
      //other_guardian_citizenship: ['', [Validators.required, Validators.maxLength(250), Validators.minLength(3)]],
    });


    this.api.getProfileValue('Guardian')
      .subscribe(
        (data: any) => {
          this.guardian_info = data['data']['guardian_info'];
          this.father_name = data['data']['father_name'];
          this.mother_name = data['data']['mother_name'];
          if(!(this.guardian_info==null)){
          if (this.guardian_info.address_type == "Permanent") {
            this.testradio = "" + 1;
            this.Dropdownvar = 1;
            //disabled enabled again here for getting validation off on other address type when values are already inputted
            this.secondForm.get('perm_guardian_address').enable();
            this.secondForm.get('perm_guardian_city').enable();
            this.secondForm.get('perm_guardian_postal_code').enable();
            this.secondForm.get('perm_guardian_state').enable();
            //this.secondForm.get('perm_guardian_country').enable();
            //this.secondForm.get('perm_guardian_citizenship').enable();
            this.secondForm.get('alt_guardian_address').disable();
            this.secondForm.get('alt_guardian_city').disable();
            this.secondForm.get('alt_guardian_postal_code').disable();
            this.secondForm.get('alt_guardian_state').disable();
            //this.secondForm.get('alt_guardian_country').disable();
           // this.secondForm.get('alt_guardian_citizenship').disable();
            this.secondForm.get('other_guardian_address').disable();
            this.secondForm.get('other_guardian_city').disable();
            this.secondForm.get('other_guardian_postal_code').disable();
            this.secondForm.get('other_guardian_state').disable();
            //this.secondForm.get('other_guardian_country').disable();
           // this.secondForm.get('other_guardian_citizenship').disable();


          } else if (this.guardian_info.address_type == "temporary") {
            this.testradio = "" + 2;
            this.Dropdownvar = 2;

            this.secondForm.get('perm_guardian_address').disable();
            this.secondForm.get('perm_guardian_city').disable();
            this.secondForm.get('perm_guardian_postal_code').disable();
            this.secondForm.get('perm_guardian_state').disable();
           // this.secondForm.get('perm_guardian_country').disable();
            //this.secondForm.get('perm_guardian_citizenship').disable();
            this.secondForm.get('alt_guardian_address').enable();
            this.secondForm.get('alt_guardian_city').enable();
            this.secondForm.get('alt_guardian_postal_code').enable();
            this.secondForm.get('alt_guardian_state').enable();
            //this.secondForm.get('alt_guardian_country').enable();
            //this.secondForm.get('alt_guardian_citizenship').enable();
            this.secondForm.get('other_guardian_address').disable();
            this.secondForm.get('other_guardian_city').disable();
            this.secondForm.get('other_guardian_postal_code').disable();
            this.secondForm.get('other_guardian_state').disable();
            //this.secondForm.get('other_guardian_country').disable();
            //this.secondForm.get('other_guardian_citizenship').disable();


          } else if (this.guardian_info.address_type == "Other") {
            this.testradio = "" + 3;
            this.Dropdownvar = 3;

            this.secondForm.get('perm_guardian_address').disable();
            this.secondForm.get('perm_guardian_city').disable();
            this.secondForm.get('perm_guardian_postal_code').disable();
            this.secondForm.get('perm_guardian_state').disable();
            //this.secondForm.get('perm_guardian_country').disable();
            //this.secondForm.get('perm_guardian_citizenship').disable();
            this.secondForm.get('alt_guardian_address').disable();
            this.secondForm.get('alt_guardian_city').disable();
            this.secondForm.get('alt_guardian_postal_code').disable();
            this.secondForm.get('alt_guardian_state').disable();
            //this.secondForm.get('alt_guardian_country').disable();
            //this.secondForm.get('alt_guardian_citizenship').disable();
            this.secondForm.get('other_guardian_address').enable();
            this.secondForm.get('other_guardian_city').enable();
            this.secondForm.get('other_guardian_postal_code').enable();
            this.secondForm.get('other_guardian_state').enable();
            //this.secondForm.get('other_guardian_country').enable();
            //this.secondForm.get('other_guardian_citizenship').enable();
            this.guardian_other_address = data['data']['guardian_info']['address_country'];
            this.guardian_other_address_values = data['data']['guardian_info'];
          } else {
            this.testradio = "" + 4;
            this.Dropdownvar = 4;
          }
           this.guardianCitizenshipNumber = this.guardian_info['citizenship_number'];
          if(this.guardianCitizenshipNumber == null || this.guardianCitizenshipNumber == "null"){
            this.guardianCitizenshipNumber ='';
          }
        
        if(data['data']['guardian_info']['dob'] == null || data['data']['guardian_info']['dob'] == '' || data['data']['guardian_info']['dob'] == undefined){
          this.guardianDOB = null;
        }else{
          this.guardianDOB =  new Date(data['data']['guardian_info']['dob']);
        }
        this.guardianCountry = data['data']['guardian_info']['country_id'] ? data['data']['guardian_info']['country_id'] : null;
        } 
            err => console.error(err)
        });
  }



  public buildForm3(): void {
    this.thirdForm = this.fb.group({
			cbseUniversityCtrl: ['', [Validators.required,]],
			hscUniversityCtrl: ['', [Validators.required,]],
			degreeUniversityCtrl: [''],
		});

    this.api.getProfileValue('All_Education_Details')
      .subscribe(
        (data: any) => {
          if (data['data']['cbse'] != null) {
            this.cbse = data['data']['cbse'];
            this.cbse.university = data['data']['cbse']['university'];
            this.cbse.school_name = data['data']['cbse']['school_name'];
            this.result_date = data['data']['result_date'];
          } else {
            this.cbse.university = '';
            this.cbse.school_name = '';
            this.result_date = '';
            this.cbse.school_marks = '';
          }

          if (data['data']['hsc'] != null) {
            this.hsc = data['data']['hsc'];
            this.hsc.college_university = data['data']['hsc']['college_university'];
            this.hsc.college_name = data['data']['hsc']['college_name'];
            this.college_result_date = data['data']['college_result_date'];
          } else {
            this.hsc.college_university = '';
            this.hsc.college_name = '';
            this.college_result_date = '';
            this.hsc.college_marks = '';
          }

          if (data['data']['diploma'] != null) {
            this.diploma = data['data']['diploma'];
            this.diploma.diploma_university = data['data']['diploma']['diploma_university'];
            this.diploma.diploma_coll_name = data['data']['diploma']['diploma_coll_name']; 
            this.diploma_result_date = data['data']['diploma_result_date'];            
          } else {
            this.diploma.diploma_university = '';
            this.diploma.diploma_coll_name = '';
            this.diploma_result_date = '';
            this.diploma.diploma_marks = '';
          }

          if (data['data']['degree'] != null) {
            this.degree = data['data']['degree'];
            this.degree.degree_university = data['data']['degree']['degree_university'];
            this.degree.degree_coll_name = data['data']['degree']['degree_coll_name'];
            this.degree_result_date = data['data']['degree_result_date'];  
          } else {
            this.degree.degree_university = '';
            this.degree.degree_coll_name = '';
            this.degree_result_date = '';
            this.degree.degree_marks = '';
          }
          //this.next_disable();


          err => console.error(err)
        });
        var degreeUniCtrl = this.thirdForm.get('degreeUniversityCtrl');
        this.edudegreecheck = this.route.snapshot.queryParamMap.get("degree");
        if(this.edudegreecheck == "Master\'s" || this.edudegreecheck == "Post graduate diplomas"){
          //degreeUniversityCtrl
          degreeUniCtrl.setValidators([Validators.required]);
					this.thirdForm.get('degreeUniversityCtrl').updateValueAndValidity();
        }

  }


	next_disable() {   

		if (this.hsc == null || this.cbse == null  ) {
			this.education_next_validation = false;
			return;
		}
			if (this.cbse.university == null || this.cbse.university == '' || this.cbse.university == undefined &&
			this.cbse.school_name == null || this.cbse.school_name == '' || this.cbse.school_name == undefined) {
			this.education_next_validation = false;

      } else if (this.hsc.college_university == null || this.hsc.college_university == '' || this.hsc.college_university == undefined &&
			this.hsc.college_name == null || this.hsc.college_name == '' || this.hsc.college_name == undefined) {
			this.education_next_validation = false;

			} else if ( this.degree_course =="Master's" && this.course_id !="" && this.course_id !=null ) {

				if(this.degree.degree_university == null || this.degree.degree_university == '' || this.degree.degree_university == undefined &&
				this.degree.degree_coll_name == null || this.degree.degree_coll_name == '' || this.degree.degree_coll_name == undefined){

				this.education_next_validation = false;
				}
		} 
	}

  private buildForm4(): void {
    this.fourthForm = this.fb.group({
      stuHobbyCtrl: ['', Validators.required],
      stuSportCtrl: ['', Validators.required],
    });

    this.api.getProfileValue('Employment')
      .subscribe(
        (data: any) => {
          this.updated_emp = data['data']['employment_info'];

          err => console.error(err)
        });
  }

  private buildForm5(): void {
    this.api.getProfileImage().subscribe(data => {
      this.profileCompleteness = data['data']['profileCompleteness'];
      this.moreDocs = data['data']['moreDocs'];
      this.preferences = data['data']['preferences'];
      this.degreeCheck = data['data']['degreeCheck'];
      this.married = data['data']['married']
      this.Photo = data['data']['photo'];
      this.Sign = data['data']['sign'];
      this.SSCcertificate = data['data']['ssc_certificate'];
      this.HSCcertificate = data['data']['hsc_certificate'];
      this.Leavingcertificate = data['data']['leaving_certificate'];
      this.FirstYearMarksheet = data['data']['firstYearMarksheet'];
      this.SecondYearMarksheet = data['data']['secondYearMarksheet'];
      this.ThirdYearMarksheet = data['data']['thirdYearMarksheet'];
      this.PassingCertificate = data['data']['passingCertificate'];
      this.AdharCard = data['data']['adharcard'];
      this.dobCertificate = data['data']['dobCertificate'];
      this.ExperienceCertificate = data['data']['experienceCertificate'];
      this.CasteCertificate = data['data']['casteCertificate'];
      this.RationCard = data['data']['rationcard'];
      this.CasteValidityCertificate = data['data']['castevalidityCertificate'];
      this.NonCreamyLayerCertificate = data['data']['noncreamylayerCertificate'];
      this.DistrictChangeCertificate = data['data']['districtchangeCertificate']
      this.GapCertificate = data['data']['gapCertificate'];
      this.DomicileCertificate = data['data']['domicileCertificate'];
      this.MarriageCertificate = data['data']['marriageCertificate'];
      this.MigrationCertificate = data['data']['migrationCertificate'];

      this.SamplePhoto = data['data']['samplephoto'];
      this.SampleSign = data['data']['samplesign'];
      this.SampleExperienceCertificate = data['data']['sampleexperi_certificate'];
      this.SampleSSCcertificate = data['data']['samplessc_certificate'];
      this.SampleHSCcertificate = data['data']['samplehsc_certificate'];
      this.SampleLeavingcertificate = data['data']['sampleleaving_certificate'];
      this.SampleFirstYearMarksheet = data['data']['samplefirstYearMarksheet'];
      this.SampleSecondYearMarksheet = data['data']['samplesecondYearMarksheet'];
      this.SampleThirdYearMarksheet = data['data']['samplethirdYearMarksheet'];
      this.SamplePassingCertificate = data['data']['samplepassingCertificate'];
      this.SampledobCertificate = data['data']['sampledobCertificate'];
      this.SampleCasteCertificate = data['data']['samplecasteCertificate'];
      this.SampleRationCard = data['data']['samplerationCard'];
      this.SampleCasteValidityCertificate = data['data']['samplecastevalidityCertificate'];
      this.SampleNonCreamyLayerCertificate = data['data']['samplenoncreamylayerCertificate'];
      this.SampleDistrictChangeCertificate = data['data']['sampledistrictchangeCertificate'];
      this.SampleGapCertificate = data['data']['samplegapCertificate'];
      this.SampleDomicileCertificate = data['data']['sampledomicileCertificate'];
      this.SampleMarriageCertificate = data['data']['samplemarriageCertificate'];
      this.SampleMigrationCertificate = data['data']['samplemigrationCertificate'];
      
    }, error => {
      console.error(" buildForm5 : " + error);
    });

    this.fifthForm = this.fb.group({
      passportSizePhotoCtrl: ['', Validators.required],
      studSignCtrl: ['', Validators.required],
      experienceCertificateCtrl: ['', Validators.required],
      gradeXImarkCtrl: ['', Validators.required],
      gradeXIImarkCtrl: ['', Validators.required],
      LeavingcertiCtrl: ['', Validators.required],
      firstYearMarksheetCtrl: ['', Validators.required],
      secondYearMarksheetCtrl: ['', Validators.required],
      thirdYearMarksheetCtrl: ['', Validators.required],
      passingCertificateCtrl: ['', Validators.required],
      adharCardCtrl: ['', Validators.required],
      //dobCertificateCtrl: ['', Validators.required],
      casteCertificateCtrl: ['', Validators.required],
      //rationCardCtrl: ['', Validators.required],
      domicileCertificateCtrl: ['', Validators.required],
      CasteValidityCertificateCtrl: [''],
      //NonCreamyLayerCertificateCtrl: [''],
      districtChangeCertificateCtrl: ['', Validators.required],
      MarriageCertificateCtrl: ['', Validators.required],
      //gapCertificateCtrl: ['', Validators.required],
    });
  }

  private buildForm6(): void {

  }

  onFirstSubmit() {
    var check_validation;
    var validation_messages;
    var alternate_message_show;
    var date_message_show = false;
    this.firstForm.controls.fullNameCtrl.markAsDirty();
    this.firstForm.controls.surnameCtrl.markAsDirty();
    this.firstForm.controls.categoryCtrl.markAsDirty();
    //this.firstForm.controls.nationalityCtrl.markAsDirty();
    this.firstForm.controls.emailCtrl.markAsDirty();
    //this.firstForm.controls.genderCtrl.markAsDirty(); //dropdown
    this.firstForm.controls.maritalCtrl.markAsDirty();
    this.firstForm.controls.permAddCtrl.markAsDirty();
    this.firstForm.controls.permCityCtrl.markAsDirty();
    this.firstForm.controls.permStateCtrl.markAsDirty();
    this.firstForm.controls.permPostCodeCtrl.markAsDirty();
    this.firstForm.controls.alterAddCtrl.markAsDirty();
    this.firstForm.controls.alterCityCtrl.markAsDirty();
    this.firstForm.controls.alterStateCtrl.markAsDirty();
    this.firstForm.controls.alterPostCodeCtrl.markAsDirty();
    this.firstForm.controls.dobCtrl.markAsDirty();
    this.firstForm.controls.phonecodeCtrl.markAsDirty();
    this.firstForm.controls.phoneCtrl.markAsDirty();
    this.firstForm.controls.adharCardCtrl.markAsDirty();

    // if(this.firstForm.controls.maritalCtrl.value=="" || this.firstForm.controls.maritalCtrl.value == null){
    //   //this.date_message_show = true;
    //   this.errortext = "Please fill Marital Status fields";
    //   this.timer();
    // }

    if (this.firstForm.valid) {
      this.countryValidation = false;
      check_validation = true;
      this.alertflag = 0;
    } else {
      this.countryValidation = true;
      check_validation = false;
      this.alertflag = 1;
      if(alternate_message_show){
				validation_messages = "If you fill any alternate details, need to fill all alternate details !";
			}else{
				validation_messages = "Please fill in all details !";
			}
    }
    if (!this.firstForm.valid){
      if(date_message_show){
        this.errortext = this.errortext;
      }else if(this.firstForm.controls.maritalCtrl.value=="" || this.firstForm.controls.maritalCtrl.value == null){
        this.errorflag = 1;
        this.errortext = "Please fill Marital Status fields";
        this.timer();
      }else{
        this.errorflag = 1;
				this.errortext = "Please fill all mandatory fields";
			  this.timer();
      // this.errorflag = 1;
      // this.errortext = "Please fill all mandatory fields";
      // this.timer();

      }
    }

    if( (this.firstForm.controls.alterAddCtrl.value =='' || this.firstForm.controls.alterAddCtrl.value ==null || this.firstForm.controls.alterAddCtrl.value ==undefined) 
    || ( this.firstForm.controls.alterCityCtrl.value =='' || this.firstForm.controls.alterCityCtrl.value ==null || this.firstForm.controls.alterCityCtrl.value ==undefined) 
    || (this.firstForm.controls.alterStateCtrl.value =='' || this.firstForm.controls.alterStateCtrl.value ==null || this.firstForm.controls.alterStateCtrl.value ==undefined)
    || (this.firstForm.controls.alterPostCodeCtrl.value =='' || this.firstForm.controls.alterPostCodeCtrl.value ==null || this.firstForm.controls.alterPostCodeCtrl.value ==undefined)){
        //|| (this.firstForm.controls.altCountryCtrl.value =='' || this.firstForm.controls.altCountryCtrl.value ==null || this.firstForm.controls.altCountryCtrl.value ==undefined	)

      if( (this.firstForm.controls.alterAddCtrl.value =='' || this.firstForm.controls.alterAddCtrl.value ==null || this.firstForm.controls.alterAddCtrl.value ==undefined) 
      && ( this.firstForm.controls.alterCityCtrl.value =='' || this.firstForm.controls.alterCityCtrl.value ==null || this.firstForm.controls.alterCityCtrl.value ==undefined) 
      && (this.firstForm.controls.alterStateCtrl.value =='' || this.firstForm.controls.alterStateCtrl.value ==null || this.firstForm.controls.alterStateCtrl.value ==undefined)
      && (this.firstForm.controls.alterPostCodeCtrl.value =='' || this.firstForm.controls.alterPostCodeCtrl.value ==null || this.firstForm.controls.alterPostCodeCtrl.value ==undefined)){
          
        //&& (this.firstForm.controls.altCountryCtrl.value =='' || this.firstForm.controls.altCountryCtrl.value ==null || this.firstForm.controls.altCountryCtrl.value ==undefined	)
          this.firstForm.controls['alterAddCtrl'].setValidators([]); 
          this.firstForm.controls['alterAddCtrl'].updateValueAndValidity(); 
          this.firstForm.controls['alterCityCtrl'].setValidators([]); 
          this.firstForm.controls['alterCityCtrl'].updateValueAndValidity(); 
          this.firstForm.controls['alterStateCtrl'].setValidators([]); 
          this.firstForm.controls['alterStateCtrl'].updateValueAndValidity(); 
          this.firstForm.controls['alterPostCodeCtrl'].setValidators([]); 
          this.firstForm.controls['alterPostCodeCtrl'].updateValueAndValidity(); 
          //this.firstForm.controls['altCountryCtrl'].setValidators([]); 
          //this.firstForm.controls['altCountryCtrl'].updateValueAndValidity(); 

      }else{
        
          this.firstForm.controls['alterAddCtrl'].setValidators([Validators.required, Validators.maxLength(200)]); 
          this.firstForm.controls['alterAddCtrl'].updateValueAndValidity(); 
          this.firstForm.controls['alterCityCtrl'].setValidators([Validators.required, Validators.maxLength(200)]); 
          this.firstForm.controls['alterCityCtrl'].updateValueAndValidity(); 
          this.firstForm.controls['alterStateCtrl'].setValidators([Validators.required, Validators.maxLength(200)]); 
          this.firstForm.controls['alterStateCtrl'].updateValueAndValidity(); 
          this.firstForm.controls['alterPostCodeCtrl'].setValidators([Validators.required, Validators.maxLength(200)]); 
          this.firstForm.controls['alterPostCodeCtrl'].updateValueAndValidity(); 
          //this.firstForm.controls['altCountryCtrl'].setValidators([Validators.required, Validators.maxLength(200)]); 
          //this.firstForm.controls['altCountryCtrl'].updateValueAndValidity(); 
          this.firstForm.controls.alterAddCtrl.markAsDirty();
          this.firstForm.controls.alterCityCtrl.markAsDirty();
          this.firstForm.controls.alterStateCtrl.markAsDirty();
          this.firstForm.controls.alterPostCodeCtrl.markAsDirty();
          check_validation = true;
          this.stepper.selectedIndex = 0;
          this.alertflag = 1;
          alternate_message_show=true;
          //validation_messages = "If you fill any alternate details, need to fill all alternate details !";

      }
      
			
		}else{
			
      
      if((this.firstForm.controls.alterAddCtrl.value !=='' || this.firstForm.controls.alterAddCtrl.value !==null || this.firstForm.controls.alterAddCtrl.value !==undefined) 
      && ( this.firstForm.controls.alterCityCtrl.value !=='' || this.firstForm.controls.alterCityCtrl.value !==null || this.firstForm.controls.alterCityCtrl.value !==undefined) 
      && (this.firstForm.controls.alterStateCtrl.value !=='' || this.firstForm.controls.alterStateCtrl.value !==null || this.firstForm.controls.alterStateCtrl.value !==undefined)
      && (this.firstForm.controls.alterPostCodeCtrl.value !=='' || this.firstForm.controls.alterPostCodeCtrl.value !==null || this.firstForm.controls.alterPostCodeCtrl.value !==undefined)){
      //&& (this.firstForm.controls.altCountryCtrl.value !=='' || this.firstForm.controls.altCountryCtrl.value !==null || this.firstForm.controls.altCountryCtrl.value !==undefined	)
        
          this.firstForm.controls['alterAddCtrl'].setValidators([]); 
          this.firstForm.controls['alterAddCtrl'].updateValueAndValidity(); 
          this.firstForm.controls['alterCityCtrl'].setValidators([]); 
          this.firstForm.controls['alterCityCtrl'].updateValueAndValidity(); 
          this.firstForm.controls['alterStateCtrl'].setValidators([]); 
          this.firstForm.controls['alterStateCtrl'].updateValueAndValidity(); 
          this.firstForm.controls['alterPostCodeCtrl'].setValidators([]); 
          this.firstForm.controls['alterPostCodeCtrl'].updateValueAndValidity(); 
          //this.firstForm.controls['altCountryCtrl'].setValidators([]); 
          //this.firstForm.controls['altCountryCtrl'].updateValueAndValidity(); 

      }else{
        
          this.firstForm.controls['alterAddCtrl'].setValidators([Validators.required, Validators.maxLength(200)]); 
          this.firstForm.controls['alterAddCtrl'].updateValueAndValidity(); 
          this.firstForm.controls['alterCityCtrl'].setValidators([Validators.required, Validators.maxLength(200)]); 
          this.firstForm.controls['alterCityCtrl'].updateValueAndValidity(); 
          this.firstForm.controls['alterStateCtrl'].setValidators([Validators.required, Validators.maxLength(200)]); 
          this.firstForm.controls['alterStateCtrl'].updateValueAndValidity(); 
          this.firstForm.controls['alterPostCodeCtrl'].setValidators([Validators.required, Validators.maxLength(200)]); 
          this.firstForm.controls['alterPostCodeCtrl'].updateValueAndValidity(); 
          //this.firstForm.controls['altCountryCtrl'].setValidators([Validators.required, Validators.maxLength(200)]); 
          //this.firstForm.controls['altCountryCtrl'].updateValueAndValidity(); 
          this.firstForm.controls.alterAddCtrl.markAsDirty();
          this.firstForm.controls.alterCityCtrl.markAsDirty();
          this.firstForm.controls.alterStateCtrl.markAsDirty();
          this.firstForm.controls.alterPostCodeCtrl.markAsDirty();
          check_validation = true;
          this.stepper.selectedIndex = 0;
          this.alertflag = 1;
          alternate_message_show=true;
          //validation_messages = "If you fill any alternate details, need to fill all alternate details !";
      }
      
    }
	  

    var profile_data = {
      Full_Name: this.firstForm.controls.fullNameCtrl.value,
      Surname: this.firstForm.controls.surnameCtrl.value,
      Gender: this.firstForm.controls.genderCtrl.value,
      maritalstatus: this.firstForm.controls.maritalCtrl.value,
      dob: this.firstForm.controls.dobCtrl.value,
      Email: this.firstForm.controls.emailCtrl.value,
      CountryCode: this.firstForm.controls.phonecodeCtrl.value,
      Mobile: this.firstForm.controls.phoneCtrl.value,
      student_category : this.firstForm.controls.categoryCtrl.value,
      Permanent_address: this.firstForm.controls.permAddCtrl.value,
      Permanent_city: this.firstForm.controls.permCityCtrl.value,
      Permanent_state: this.firstForm.controls.permStateCtrl.value,
      Permanent_postalcode: this.firstForm.controls.permPostCodeCtrl.value,
      Alternate_address: this.firstForm.controls.alterAddCtrl.value,
      Alternate_city: this.firstForm.controls.alterCityCtrl.value,
      Alternate_state: this.firstForm.controls.alterStateCtrl.value,
      Alternate_postalcode: this.firstForm.controls.alterPostCodeCtrl.value,
      adharNo : this.firstForm.controls.adharCardCtrl.value,
    }
    //initializing "profile_info" to get value of it in guardian step 
    this.profile_info.address1 = this.firstForm.controls.permAddCtrl.value;
    this.profile_info.city = this.firstForm.controls.permCityCtrl.value;
    this.profile_info.postal_code = this.firstForm.controls.permPostCodeCtrl.value;
    this.profile_info.state = this.firstForm.controls.permStateCtrl.value;
   // this.permCountry_guardian = this.firstForm.controls.permCountryCtrl.value;
    this.profile_info.address2 = this.firstForm.controls.alterAddCtrl.value;
    this.profile_info.nationality_city = this.firstForm.controls.alterCityCtrl.value;
    this.profile_info.nationality_postal_code = this.firstForm.controls.alterPostCodeCtrl.value;
    this.profile_info.nationalState = this.firstForm.controls.alterStateCtrl.value;
    //this.altCountry_guardian = this.firstForm.controls.altCountryCtrl.value;

    if (check_validation) {
      this.alertflag = 0;
      this.api.setProfileValues(profile_data, 'Personal')
        .subscribe(
          (data: any) => {
            if(data['status']== 200){
              this.api.getcheckTabs().subscribe((data: any) => {
                if(data['status'] == 200){
                }
              });
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

  public convertpassIssue(str) {
    var mnths = { 
      Jan:"01", Feb:"02", Mar:"03", Apr:"04", May:"05", Jun:"06",
      Jul:"07", Aug:"08", Sep:"09", Oct:"10", Nov:"11", Dec:"12"
    },
    date = str.split(" ");
    this.passIssueDate = [ date[3], mnths[date[1]], date[2] ].join("-");
  }

  public convertpassExpiry(str) {
    var mnths = { 
      Jan:"01", Feb:"02", Mar:"03", Apr:"04", May:"05", Jun:"06",
      Jul:"07", Aug:"08", Sep:"09", Oct:"10", Nov:"11", Dec:"12"
    },
    date = str.split(" ");
    this.passExpiryDate = [ date[3], mnths[date[1]], date[2] ].join("-");
  }

  onSecondSubmit() {
    this.secondForm.controls.fatherNameCtrl.markAsDirty();
    this.secondForm.controls.motherNameCtrl.markAsDirty();
    this.secondForm.controls.guardianNameCtrl2.markAsDirty();
    this.secondForm.controls.relationCtrl.markAsDirty();
    this.secondForm.controls.guardianDOBCtrl.markAsDirty();
    this.secondForm.controls.guardianEmailCtrl.markAsDirty();
    //this.secondForm.controls.guardianCountryCtrl.markAsDirty();
    //this.secondForm.controls.address_Radio.markAsDirty();
    //this.secondForm.controls.citizenshipNumberCtrl.markAsDirty();
    //this.secondForm.controls.citizenshipCtrl.markAsDirty();
    //this.secondForm.controls.guardianCountryCodeCtrl.markAsDirty();
    this.secondForm.controls.guardianMobileCtrl.markAsDirty();
    var check_validation = false;
    var validation_messages;

    var guardian_data = {
      father_name: this.secondForm.controls.fatherNameCtrl.value,//motherNameCtrl
      mother_name: this.secondForm.controls.fatherNameCtrl.value,
      Guardian_Name: this.secondForm.controls.guardianNameCtrl2.value,
      Relation: this.secondForm.controls.relationCtrl.value,
      dob: this.secondForm.controls.guardianDOBCtrl.value,
      CountryCode : '91',
      Mobile : this.secondForm.controls.guardianMobileCtrl.value,
      Email: this.secondForm.controls.guardianEmailCtrl.value,
     // Country_id: this.secondForm.controls.guardianCountryCtrl.value,
      //citizenshipNumber: this.secondForm.controls.citizenshipNumberCtrl.value,
      //CountryCode : this.secondForm.controls.phonecodeCtrl.value,
      //Mobile : this.secondForm.controls.phoneCtrl.value,
      //Citizenship: this.secondForm.controls.citizenshipCtrl.value,
      emailCorrespondace : this.emailCorrespondace,
      address: '',
      city: '',
      state: '',
      postalcode: '',
      Country: '',
      //Citizenship: '',
      address_type: ''
    }



    if (this.testradio == 1) {
      guardian_data.address_type = 'Permanent';
      // this.checkradio(1);
      guardian_data.address = this.secondForm.controls.perm_guardian_address.value;
      guardian_data.city = this.secondForm.controls.perm_guardian_city.value;
      guardian_data.state = this.secondForm.controls.perm_guardian_state.value;
      guardian_data.postalcode = this.secondForm.controls.perm_guardian_postal_code.value;
      //guardian_data.Country = this.secondForm.controls.perm_guardian_country.value;
      //guardian_data.Citizenship = this.secondForm.controls.perm_guardian_citizenship.value;
      this.secondForm.controls.perm_guardian_address.markAsDirty();
      this.secondForm.controls.perm_guardian_city.markAsDirty();
      this.secondForm.controls.perm_guardian_postal_code.markAsDirty();
      this.secondForm.controls.perm_guardian_state.markAsDirty();
      //this.secondForm.controls.perm_guardian_country.markAsDirty();
      //this.secondForm.controls.perm_guardian_citizenship.markAsDirty();

      if (this.secondForm.valid) {

        check_validation = true;
        this.alertflag = 0;
      } else {

        check_validation = false;
        this.alertflag = 1;
        validation_messages = "Your details are incomplete!";
      }

    } else if (this.testradio == 2) {

      guardian_data.address_type = 'temporary';
      // this.checkradio(2);
      guardian_data.address = this.secondForm.controls.alt_guardian_address.value;
      guardian_data.city = this.secondForm.controls.alt_guardian_city.value;
      guardian_data.state = this.secondForm.controls.alt_guardian_state.value;
      guardian_data.postalcode = this.secondForm.controls.alt_guardian_postal_code.value;
      //guardian_data.Country = this.secondForm.controls.alt_guardian_country.value;
      //guardian_data.Citizenship = this.secondForm.controls.alt_guardian_citizenship.value;
      this.secondForm.controls.alt_guardian_address.markAsDirty();
      this.secondForm.controls.alt_guardian_city.markAsDirty();
      this.secondForm.controls.alt_guardian_postal_code.markAsDirty();
      this.secondForm.controls.alt_guardian_state.markAsDirty();
      //this.secondForm.controls.alt_guardian_country.markAsDirty();
      //this.secondForm.controls.alt_guardian_citizenship.markAsDirty();

      if (this.secondForm.valid) {

        check_validation = true;
        this.alertflag = 0;
      } else {

        check_validation = false;
        this.alertflag = 1;
        validation_messages = "Your details are incomplete!";
      }

    } else if (this.testradio == 3) {
      guardian_data.address_type = 'Other';
      //this.checkradio(3);
      guardian_data.address = this.secondForm.controls.other_guardian_address.value;
      guardian_data.city = this.secondForm.controls.other_guardian_city.value;
      guardian_data.state = this.secondForm.controls.other_guardian_state.value;
      guardian_data.postalcode = this.secondForm.controls.other_guardian_postal_code.value;
      //guardian_data.Country = this.secondForm.controls.other_guardian_country.value;
     // guardian_data.Citizenship = this.secondForm.controls.other_guardian_citizenship.value;
      this.secondForm.controls.other_guardian_address.markAsDirty();
      this.secondForm.controls.other_guardian_city.markAsDirty();
      this.secondForm.controls.other_guardian_postal_code.markAsDirty();
      this.secondForm.controls.other_guardian_state.markAsDirty();
      //this.secondForm.controls.other_guardian_country.markAsDirty();
     // this.secondForm.controls.other_guardian_citizenship.markAsDirty();


      if (this.secondForm.valid) {

        check_validation = true;
        this.alertflag = 0;
      } else {

        check_validation = false;
        this.alertflag = 1;
        validation_messages = "Your details are incomplete!";
      }

      // if (this.secondForm.controls.other_guardian_country.value === null || this.secondForm.controls.other_guardian_country.value === '' || this.secondForm.controls.other_guardian_country.value === undefined) {

      //   this.guardianOtherCountryValidation = false;
      //   check_validation = false;

      // } else {

      //   this.guardianOtherCountryValidation = true;
      // }

    } else {

      if (this.secondForm.valid) {

        check_validation = true;
        this.alertflag = 0;
      } else {

        check_validation = false;
        this.alertflag = 1;
        validation_messages = "Please select below options";
      }

    }

    if (!this.secondForm.valid){
			if(!(this.secondForm.controls.guardianDOBCtrl.value == null || this.secondForm.controls.guardianDOBCtrl.value == "null" || this.secondForm.controls.guardianDOBCtrl.value == "" || this.secondForm.controls.guardianDOBCtrl.value == undefined )){
				
				if(this.secondForm.controls.guardianDOBCtrl.value.length !== 0 || this.secondForm.controls.guardianDOBCtrl.value.length !== null){
			
					this.secondForm.controls['guardianDOBCtrl'].setValidators([]); 
					this.secondForm.controls['guardianDOBCtrl'].updateValueAndValidity(); 
					this.stepper.selectedIndex = 2;
					this.ref.detectChanges();
				}else{
					
					this.stepper.selectedIndex = 1;
					this.secondForm.controls['guardianDOBCtrl'].setValidators([Validators.required]); 
					this.secondForm.controls['guardianDOBCtrl'].updateValueAndValidity(); 
					
					this.errorflag = 1;
					this.errortext = "Please fill all mandatory fields";
					this.timer();
				}
			}else{
        //DOB validation
        
        this.secondForm.patchValue({ 
          guardianDOBCtrl: ''
        });
        this.secondForm.controls['guardianDOBCtrl'].setValidators([Validators.required]); 
				this.secondForm.controls['guardianDOBCtrl'].updateValueAndValidity(); 
        this.stepper.selectedIndex = 1;
        this.ref.detectChanges();
      }
			  
		}else{
			  
		    this.stepper.selectedIndex = 2;
		    this.errorflag = 0;
		}

    // if (this.secondForm.controls.guardianCountryCtrl.value === null || this.secondForm.controls.guardianCountryCtrl.value === '' || this.secondForm.controls.guardianCountryCtrl.value === undefined) {

    //   this.guardiancountryValidation = false;
    //   check_validation = false;

    // } else {

    //   this.guardiancountryValidation = true;
    //   check_validation = true;
    // }

    if (check_validation) {
      this.alertflag = 0;
      this.api.setProfileValues(guardian_data, 'Guardian')
        .subscribe(
          (data: any) => {
            if(data['status']== 200){
              this.api.getcheckTabs().subscribe((data: any) => {
                if(data['status'] == 200){
                }
              });
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

  onThirdSubmit() {
    const invalid = [];
      const controls = this.thirdForm.controls;
      for (const name in controls) {
        if (controls[name].invalid) {
            invalid.push(name);
        }
      }
      //return invalid;
    if(this.edudegreecheck == null || this.edudegreecheck == "Bachelor's" ||  this.edudegreecheck == "Under graduate diploma"){
      if(this.hsc.college_university == '' || this.hsc == null || this.cbse.university == '' || this.cbse == null){ 
        this.eduerrorflag = 1;
        this.eduerrortext = "Please fill all mandatory fields( ssc and hsc )";	
      }else if(this.hsc.college_university != '' && this.hsc != null && this.cbse.university != '' && this.cbse != null){
        this.thirdForm.patchValue({ 
          cbseUniversityCtrl: this.cbse.university,
          hscUniversityCtrl: this.hsc.college_university,
        });
        this.api.getcheckTabs().subscribe((data: any) => {
        });
      }
    }else if(this.edudegreecheck == "Master's" || this.edudegreecheck == "Post graduate diplomas"){
      if(this.hsc.college_university == '' || this.hsc == null  || this.degree.degree_university == '' || this.degree == null || this.cbse.university == '' || this.cbse == null){ 
        this.eduerrorflag = 1;
        this.eduerrortext = "Please fill all mandatory fields( ssc, hsc & degree )";
      }else if(this.hsc.college_university != '' || this.hsc != null || this.degree.degree_university != '' || this.degree != null || this.cbse.university != '' || this.cbse != null){ 
        // this.api.getcheckTabs().subscribe((data: any) => {
        // });
        this.thirdForm.patchValue({ 
          cbseUniversityCtrl: this.cbse.university,
          hscUniversityCtrl: this.hsc.college_university,
          degreeUniversityCtrl: this.degree.degree_university,
        });
        this.api.getProfileCompleteness()
        .subscribe((user: any) =>{
          if (user['data'] == 100) {
          } else {
            //window.location.reload();
          }
        });
      }
    }

  }
  onFourthSubmit() {
    var check_validations;
    this.fourthForm.controls.stuHobbyCtrl.markAsDirty();
    this.fourthForm.controls.stuSportCtrl.markAsDirty();

    if (this.fourthForm.valid) {

      check_validations = true;
      this.alertflag = 0;
    } else {

      check_validations = false;
      this.alertflag = 1;
      this.messages = "Fill in sports and hobbies details !";
    }

    var sport_hobbies_data = {
      hobbies: this.fourthForm.controls.stuHobbyCtrl.value,
      sport: this.fourthForm.controls.stuSportCtrl.value,
    }

    if (check_validations) {
      this.api.setProfileValues(sport_hobbies_data, 'hobbies_sports')
        .subscribe(
          (data: any) => {
            if(data['status']== 200){
              this.api.getcheckTabs().subscribe((data: any) => {
                if(data['status'] == 200){

                }
              });
            }
            err => console.error(err)
          });
    }

    if (!this.fourthForm.valid){
      this.errorflag = 1;
      this.errortext = "Please fill all mandatory fields";
      this.timer();
    }

  }
  // onFifthSubmit(category) {

  //   if (category == "Foreign National") {
  //     this.fifthForm.controls.passport_of_sponsor_parentCtrl.disable();
  //     this.fifthForm.controls.resident_permitCtrl.disable();
  //     this.fifthForm.controls.NRI_certificate_sponsor_parentCtrl.disable();
  //     this.fifthForm.controls.work_permit_sponsor_parentCtrl.disable();
  //     this.fifthForm.controls.employment_letter_sponsor_parentCtrl.disable();
  //     this.fifthForm.controls.residence_proof_sponsor_parentCtrl.disable();
  //     this.fifthForm.controls.six_month_bank_state_sponsor_parentCtrl.disable();
  //     this.fifthForm.controls.sponsership_letter_from_sponsor_parentCtrl.disable();
  //     this.fifthForm.controls.birthCertificateCtrl.disable();
  //     this.fifthForm.controls.pioCardCtrl.disable();
  //     this.fifthForm.controls.ociCardCtrl.disable();
  //   } else if (category == "PIO") {
  //     this.fifthForm.controls.passport_of_sponsor_parentCtrl.disable();
  //     this.fifthForm.controls.resident_permitCtrl.disable();
  //     this.fifthForm.controls.NRI_certificate_sponsor_parentCtrl.disable();
  //     this.fifthForm.controls.work_permit_sponsor_parentCtrl.disable();
  //     this.fifthForm.controls.employment_letter_sponsor_parentCtrl.disable();
  //     this.fifthForm.controls.residence_proof_sponsor_parentCtrl.disable();
  //     this.fifthForm.controls.six_month_bank_state_sponsor_parentCtrl.disable();
  //     this.fifthForm.controls.sponsership_letter_from_sponsor_parentCtrl.disable();
  //     this.fifthForm.controls.ociCardCtrl.disable();
  //   } else if (category == "OCI") {
  //     this.fifthForm.controls.passport_of_sponsor_parentCtrl.disable();
  //     this.fifthForm.controls.resident_permitCtrl.disable();
  //     this.fifthForm.controls.NRI_certificate_sponsor_parentCtrl.disable();
  //     this.fifthForm.controls.work_permit_sponsor_parentCtrl.disable();
  //     this.fifthForm.controls.employment_letter_sponsor_parentCtrl.disable();
  //     this.fifthForm.controls.residence_proof_sponsor_parentCtrl.disable();
  //     this.fifthForm.controls.six_month_bank_state_sponsor_parentCtrl.disable();
  //     this.fifthForm.controls.sponsership_letter_from_sponsor_parentCtrl.disable();
  //     this.fifthForm.controls.pioCardCtrl.disable();
  //   } else if (category == "NRI of Gulf" || category == "NRI of SEAsia") {
  //     this.fifthForm.controls.pioCardCtrl.disable();
  //     this.fifthForm.controls.ociCardCtrl.disable();
  //   }
  //   this.fifthForm.controls.passport_of_sponsor_parentCtrl.markAsDirty();
  //   this.fifthForm.controls.resident_permitCtrl.markAsDirty();
  //   this.fifthForm.controls.NRI_certificate_sponsor_parentCtrl.markAsDirty();
  //   this.fifthForm.controls.work_permit_sponsor_parentCtrl.markAsDirty();
  //   this.fifthForm.controls.employment_letter_sponsor_parentCtrl.markAsDirty();
  //   this.fifthForm.controls.residence_proof_sponsor_parentCtrl.markAsDirty();
  //   this.fifthForm.controls.six_month_bank_state_sponsor_parentCtrl.markAsDirty();
  //   this.fifthForm.controls.sponsership_letter_from_sponsor_parentCtrl.markAsDirty();
  //   this.fifthForm.controls.admitCardCtrl.markAsDirty();
  //   this.fifthForm.controls.gradeXmarkCtrl.markAsDirty();
  //   this.fifthForm.controls.gradeXIImarkCtrl.markAsDirty();
  //   this.fifthForm.controls.firstYearMarksheetCtrl.markAsDirty();
  //   this.fifthForm.controls.secondYearMarksheetCtrl.markAsDirty();
  //   this.fifthForm.controls.graduationMarksheetCtrl.markAsDirty();
  //   this.fifthForm.controls.birthCertificateCtrl.markAsDirty();
  //   this.fifthForm.controls.passportSizePhotoCtrl.markAsDirty();
  //   this.fifthForm.controls.studSignCtrl.markAsDirty();
  //   this.fifthForm.controls.countryIdCardCtrl.markAsDirty();
  //   this.fifthForm.controls.studPassportCtrl.markAsDirty();
  //   this.fifthForm.controls.pioCardCtrl.markAsDirty();
  //   this.fifthForm.controls.ociCardCtrl.markAsDirty();
  // }
  // onSixthSubmit() {

  // }


  optionalValidator(validators ? : (ValidatorFn | null | undefined)[]): ValidatorFn {
    return (control: AbstractControl): {
      [key: string]: any
    } => {

      return control.value ? Validators.compose(validators)(control) : null;
    };
  }

  open(EducationalDialogNo) {
    if (EducationalDialogNo == 1) {
      this.dialogService.open(FirstDialogComponent).onClose
        .subscribe(
          (data: any) => {

            if (data !== undefined) {
              this.cbse.university = data.sscUniversity;
              this.cbse.school_name = data.sscCollege;
              this.result_date = data.sscResultDate;
              this.cbse.school_marks = data.sscMarks;
            }
            this.eduerrorflag = 0;
            //this.next_disable();
            err => console.error(err)
          });

    } else if (EducationalDialogNo == 2) {
      this.dialogService.open(SecondDialogComponent).onClose
        .subscribe(
          (data: any) => {

            if (data !== undefined) {

              this.hsc.college_university = data.hscUniversity;
              this.hsc.college_name = data.hscCollege;
              this.college_result_date = data.hscResultDate;
              this.hsc.college_marks = data.hscMarks;
            }
            this.eduerrorflag = 0;
            //this.next_disable();
            err => console.error(err)
          });
    } else if (EducationalDialogNo == 3) {
      this.dialogService.open(ThirdDialogComponent).onClose
        .subscribe(
          (data: any) => {

            if (data !== undefined) {

              this.diploma.diploma_university = data.diplomaUniversity;
              this.diploma.diploma_coll_name = data.diplomaCollege;
              this.diploma_result_date = data.diplomaResultDate;
              this.diploma.diploma_marks = data.diplomaMarks;
            }
            this.eduerrorflag = 0;
            err => console.error(err)
          });

    } else if (EducationalDialogNo == 4) {
      this.dialogService.open(FourthDialogComponent).onClose
        .subscribe(
          (data: any) => {

            if (data !== undefined) {

              this.degree.degree_university = data.degreeUniversity;
              this.degree.degree_coll_name = data.degreeCollege;
              this.degree_result_date = data.degreeResultDate;
              this.degree.degree_marks = data.degreeMarks;
              //this.buildForm5();
            }
            this.eduerrorflag = 0;
            //this.next_disable();
            err => console.error(err)
          });;

    } else if (EducationalDialogNo == 5) {
      this.dialogService.open(TranscriptDialogComponent).onClose
        .subscribe(
          (data: any) => {
            if (data !== undefined) {
              this.buildForm5();
            }
            err => console.error(err)
          })
    } else {
      console.error("Function Open () : invalid number ");
    }
  }

  checkradio(x) {

    this.Dropdownvar = x;
    if (this.Dropdownvar == '1') {
      this.testradio = '1';
      this.secondForm.get('perm_guardian_address').enable();
      this.secondForm.get('perm_guardian_city').enable();
      this.secondForm.get('perm_guardian_postal_code').enable();
      this.secondForm.get('perm_guardian_state').enable();
      //this.secondForm.get('perm_guardian_country').enable();
      //this.secondForm.get('perm_guardian_citizenship').enable();

      this.secondForm.get('alt_guardian_address').disable();
      this.secondForm.get('alt_guardian_city').disable();
      this.secondForm.get('alt_guardian_postal_code').disable();
      this.secondForm.get('alt_guardian_state').disable();
      //this.secondForm.get('alt_guardian_country').disable();
      //this.secondForm.get('alt_guardian_citizenship').disable();

      this.secondForm.get('other_guardian_address').disable();
      this.secondForm.get('other_guardian_city').disable();
      this.secondForm.get('other_guardian_postal_code').disable();
      this.secondForm.get('other_guardian_state').disable();
      //this.secondForm.get('other_guardian_country').disable();
     // this.secondForm.get('other_guardian_citizenship').disable();
    } else if (this.Dropdownvar == '2') {
      this.testradio = '2';

      this.secondForm.get('perm_guardian_address').disable();
      this.secondForm.get('perm_guardian_city').disable();
      this.secondForm.get('perm_guardian_postal_code').disable();
      this.secondForm.get('perm_guardian_state').disable();
      //this.secondForm.get('perm_guardian_country').disable();
      //this.secondForm.get('perm_guardian_citizenship').disable();

      this.secondForm.get('alt_guardian_address').enable();
      this.secondForm.get('alt_guardian_city').enable();
      this.secondForm.get('alt_guardian_postal_code').enable();
      this.secondForm.get('alt_guardian_state').enable();
      //this.secondForm.get('alt_guardian_country').enable();
      //this.secondForm.get('alt_guardian_citizenship').enable();

      this.secondForm.get('other_guardian_address').disable();
      this.secondForm.get('other_guardian_city').disable();
      this.secondForm.get('other_guardian_postal_code').disable();
      this.secondForm.get('other_guardian_state').disable();
      //this.secondForm.get('other_guardian_country').disable();
      //this.secondForm.get('other_guardian_citizenship').disable();

    } else if (this.Dropdownvar == '3') {
      this.testradio = '3';

      this.secondForm.get('perm_guardian_address').disable();
      this.secondForm.get('perm_guardian_city').disable();
      this.secondForm.get('perm_guardian_postal_code').disable();
      this.secondForm.get('perm_guardian_state').disable();
      //this.secondForm.get('perm_guardian_country').disable();
      //this.secondForm.get('perm_guardian_citizenship').disable();

      this.secondForm.get('alt_guardian_address').disable();
      this.secondForm.get('alt_guardian_city').disable();
      this.secondForm.get('alt_guardian_postal_code').disable();
      this.secondForm.get('alt_guardian_state').disable();
      //this.secondForm.get('alt_guardian_country').disable();
      //this.secondForm.get('alt_guardian_citizenship').disable();

      this.secondForm.get('other_guardian_address').enable();
      this.secondForm.get('other_guardian_city').enable();
      this.secondForm.get('other_guardian_postal_code').enable();
      this.secondForm.get('other_guardian_state').enable();
     // this.secondForm.get('other_guardian_country').enable();
     // this.secondForm.get('other_guardian_citizenship').enable();
    }
  }
  onClose() {
    this.alertflag = 0;
  }
  onCloseEducation() {
    this.alertflagEducation = false;
  }

  onCheckSelect(event : any){
    if(event.target.checked == true){
      this.emailCorrespondace = 'true';
    }else{
      this.emailCorrespondace = 'false';
    }
  }

  onBeforeSend(event, LoadNo) {
    if(LoadNo == '1'){
      this.loading1 = true;
    }else if(LoadNo == '2'){
      this.loading2 = true;
    }else if(LoadNo == '3'){
      this.loading3 = true;
    }else if(LoadNo == '4'){
      this.loading4 = true;
    }else if(LoadNo == '5'){
      this.loading5 = true;
    }else if(LoadNo == '6'){
      this.loading6 = true;
    }else if(LoadNo == '7'){
      this.loading7 = true;
    }else if(LoadNo == '8'){
      this.loading8 = true;
    }else if(LoadNo == '9'){
      this.loading9 = true;
    }else if(LoadNo == '10'){
      this.loading10 = true;
    }else if(LoadNo == '11'){
      this.loading11 = true;
    }else if(LoadNo == '12'){
      this.loading12 = true;
    }else if(LoadNo == '13'){
      this.loading13 = true;
    }else if(LoadNo == '14'){
      this.loading14 = true;
    }else if(LoadNo == '15'){
      this.loading15 = true;
    }else if(LoadNo == '16'){
      this.loading16 = true;
    }else if(LoadNo == '17'){
      this.loading17 = true;
    }else if(LoadNo == '18'){
      this.loading18 = true;
    }else if(LoadNo == '19'){
      this.loading19 = true;
    }else if(LoadNo == '20'){
      this.loading20 = true;
    }else if(LoadNo == '21'){
      this.loading21 = true;
    }else if(LoadNo == '22'){
      this.loading22 = true;
    }else if(LoadNo == '23'){
      this.loading23 = true;
    }else if(LoadNo == '24'){
      this.loading24 = true;
    }else if(LoadNo == '25'){
      this.loading25 = true;
    }else if(LoadNo == '26'){
      this.loading26 = true;
    }
    //this.loading = true;
    this.authService.onTokenChange().subscribe((token: NbAuthJWTToken) => {
      if (token.isValid()) {
        this.currenttoken = token;
        event.xhr.setRequestHeader("Authorization", `Bearer ` + this.currenttoken);
      }
    });
  }

  delete_education_details(type) {
    this.api.delete_education(type)
      .subscribe(
        (data: any) => {
          this.api.getcheckTabs().subscribe((data: any) => {
            if(data['status'] == 200){
              this.buildForm3();
            }
          });
          //this.next_disable();
          this.toastrService.show(
            status || 'Success',
            `Deleted Successfully ! `,
          );
          err => console.error(err)
        });
  }


  onUpload(event: any, dynamicController, LoadNo) {
    const reader = new FileReader();
    var duration = 10000;
    this.index += 1;
    this.position = 'top-right';
    this.status = 'success';

    if (event.files && event.files.length) {
      const [file] = event.files;
      reader.readAsDataURL(file);
      var json = JSON.parse(event.xhr.response);
      var yourData = json.Data; // or json["Data"]
      var yourStatus = json.status; // or json["Data"]
      var yourMessage = json.message; // or json["Data"]
      if(LoadNo == '1'){
        this.loading1 = false;
      }else if(LoadNo == '2'){
        this.loading2 = false;
      }else if(LoadNo == '3'){
        this.loading3 = false;
      }else if(LoadNo == '4'){
        this.loading4 = false;
      }else if(LoadNo == '5'){
        this.loading5 = false;
      }else if(LoadNo == '6'){
        this.loading6 = false;
      }else if(LoadNo == '7'){
        this.loading7 = false;
      }else if(LoadNo == '8'){
        this.loading8 = false;
      }else if(LoadNo == '9'){
        this.loading9 = false;
      }else if(LoadNo == '10'){
        this.loading10 = false;
      }else if(LoadNo == '11'){
        this.loading11 = false;
      }else if(LoadNo == '12'){
        this.loading12 = false;
      }else if(LoadNo == '13'){
        this.loading13 = false;
      }else if(LoadNo == '14'){
        this.loading14 = false;
      }else if(LoadNo == '15'){
        this.loading15 = false;
      }else if(LoadNo == '16'){
        this.loading16 = false;
      }else if(LoadNo == '17'){
        this.loading17 = false;
      }else if(LoadNo == '18'){
        this.loading18 = false;
      }else if(LoadNo == '19'){
        this.loading19 = false;
      }else if(LoadNo == '20'){
        this.loading20 = false;
      }else if(LoadNo == '21'){
        this.loading21 = false;
      }else if(LoadNo == '22'){
        this.loading22 = false;
      }else if(LoadNo == '23'){
        this.loading23 = false;
      }else if(LoadNo == '24'){
        this.loading24 = false;
      }else if(LoadNo == '25'){
        this.loading25 = false;
      }else if(LoadNo == '26'){
        this.loading26 = false;
      }
      if (yourStatus == 200) {
        //this.loading = false;
        this.buildForm5();
        this.toastrService.show(
          ` ` + yourMessage, {
            duration
          }
        );
      } else if (yourStatus == 401) {
       // this.loading = false;
        this.toastrService.show(
          ` ` + yourMessage, {
            duration
          }
        );
      } else if (yourStatus == 400) {
       // this.loading = false;
        this.toastrService.show(
          ` ` + yourMessage, {
            duration
          }
        );
      }
    }
  }

  onErrorFileUpload(event: any,LoadNo){
    //let msg: string = "";
    //msg += "Error: File NOT Uploaded. (" + event.files[0].name + ").  ";
    if(LoadNo == '1'){
      this.loading1 = false;
    }else if(LoadNo == '2'){
      this.loading2 = false;
    }else if(LoadNo == '3'){
      this.loading3 = false;
    }else if(LoadNo == '4'){
      this.loading4 = false;
    }else if(LoadNo == '5'){
      this.loading5 = false;
    }else if(LoadNo == '6'){
      this.loading6 = false;
    }else if(LoadNo == '7'){
      this.loading7 = false;
    }else if(LoadNo == '8'){
      this.loading8 = false;
    }else if(LoadNo == '9'){
      this.loading9 = false;
    }else if(LoadNo == '10'){
      this.loading10 = false;
    }else if(LoadNo == '11'){
      this.loading11 = false;
    }else if(LoadNo == '12'){
      this.loading12 = false;
    }else if(LoadNo == '13'){
      this.loading13 = false;
    }else if(LoadNo == '14'){
      this.loading14 = false;
    }else if(LoadNo == '15'){
      this.loading15 = false;
    }else if(LoadNo == '16'){
      this.loading16 = false;
    }else if(LoadNo == '17'){
      this.loading17 = false;
    }else if(LoadNo == '18'){
      this.loading18 = false;
    }else if(LoadNo == '19'){
      this.loading19 = false;
    }else if(LoadNo == '20'){
      this.loading20 = false;
    }else if(LoadNo == '21'){
      this.loading21 = false;
    }else if(LoadNo == '22'){
      this.loading22 = false;
    }else if(LoadNo == '23'){
      this.loading23 = false;
    }else if(LoadNo == '24'){
      this.loading24 = false;
    }else if(LoadNo == '25'){
      this.loading25 = false;
    }else if(LoadNo == '26'){
      this.loading26 = false;
    }
    var duration = 10000;
       if (event.xhr.response == ""){
      this.toastrService.show(
        `Network Error. Please try again after some time.`,
        { duration }
    );
     
    }
   
    console.error("onErrorFileUpload Event", event);
  }

  onSelect($event: any,value): void {
		var maxFileSize =  2000000;
		var imgArr = $event.files[0].name.split('.');
		var extension = imgArr[imgArr.length - 1].trim();
		if ($event.files[0].size > maxFileSize) {
			this.confirmationService.confirm({
				message: 'Maximum file size should be 2 MB.',
				header: 'Invalid File Size',
				icon: 'pi pi-info-circle',
				rejectVisible : false,
				acceptLabel: 'Ok'
			});
		}

		if(value!=undefined && (extension!='jpg' && extension!='jpeg' && extension!='png' && extension!='JPG' && extension!='JPEG' && extension!='PNG' ) ) {
			this.confirmationService.confirm({
				message: 'Please upload your transcript in .jpeg or .jpg or .png formats',
				header: 'Invalid File Type',
				icon: 'pi pi-info-circle',
				rejectVisible : false,
				acceptLabel: 'Ok'
			});
		}

		if(value==undefined && (extension!='jpg' && extension!='jpeg' && extension!='png' && extension!='pdf' && extension!='JPG' && extension!='JPEG' && extension!='PNG' && extension!='PDF' )){
			this.confirmationService.confirm({
				message: 'Please upload your transcript in .jpeg or .jpg or .png or .pdf formats',
				header: 'Invalid File Type',
				icon: 'pi pi-info-circle',
				rejectVisible : false,
				acceptLabel: 'Ok'
			});
		}
	}
  

  imagePopup(imagename){
		this.dialogService.open(transcriptpreview, {
			context: {
			 arr : imagename
			},
		 });
	}

  CompleteProfile() {
    try {
      this.api.setProfileCompleteness('100').subscribe(
        data => {
        },
        error => {
          console.error("Error", error);
        }
      );
    } catch (error) {
      console.error("Error from ngOnInit => " + error);
    }
  }
  downloadTranscript(file_name) {
    var splitname = file_name.split('.');
    if (splitname[0] == 'http://93') {
      var pdfname = file_name.split('/');
      this.api.downloadFiles(pdfname[6])
        .subscribe(data => {
          
          saveAs(data, pdfname[6]);
        });
    } else {
      this.api.downloadFiles(file_name)
        .subscribe(data => {
          saveAs(data, file_name);
        });
    }
  }

  Letter(userId) {
    this.api.previewLetter(userId)
      .subscribe(
        (data: any) => {
          this.downloadTranscript(data.data)
          err => console.error(err)
        });
  }

  deleteTranscript(name, userId, transcriptId, LoadNo) {
    if(LoadNo == '1'){
      this.loading1 = true;
    }else if(LoadNo == '2'){
      this.loading2 = true;
    }else if(LoadNo == '3'){
      this.loading3 = true;
    }else if(LoadNo == '4'){
      this.loading4 = true;
    }else if(LoadNo == '5'){
      this.loading5 = true;
    }else if(LoadNo == '6'){
      this.loading6 = true;
    }else if(LoadNo == '7'){
      this.loading7 = true;
    }else if(LoadNo == '8'){
      this.loading8 = true;
    }else if(LoadNo == '9'){
      this.loading9 = true;
    }else if(LoadNo == '10'){
      this.loading10 = true;
    }else if(LoadNo == '11'){
      this.loading11 = true;
    }else if(LoadNo == '12'){
      this.loading12 = true;
    }else if(LoadNo == '13'){
      this.loading13 = true;
    }else if(LoadNo == '14'){
      this.loading14 = true;
    }else if(LoadNo == '15'){
      this.loading15 = true;
    }else if(LoadNo == '16'){
      this.loading16 = true;
    }else if(LoadNo == '17'){
      this.loading17 = true;
    }else if(LoadNo == '18'){
      this.loading18 = true;
    }else if(LoadNo == '19'){
      this.loading19 = true;
    }else if(LoadNo == '20'){
      this.loading20 = true;
    }else if(LoadNo == '21'){
      this.loading21 = true;
    }else if(LoadNo == '22'){
      this.loading22 = true;
    }else if(LoadNo == '23'){
      this.loading23 = true;
    }else if(LoadNo == '24'){
      this.loading24 = true;
    }else if(LoadNo == '25'){
      this.loading25 = true;
    }else if(LoadNo == '26'){
      this.loading26 = true;
    }
    this.api.deleteTranscripts(name, userId, transcriptId)
      .subscribe(data => {
          if(data['status'] == '400'){
            console.error("status 400");
          }else if(data['status'] == '200'){
            if(LoadNo == '1'){
              this.loading1 = false;
            }else if(LoadNo == '2'){
              this.loading2 = false;
            }else if(LoadNo == '3'){
              this.loading3 = false;
            }else if(LoadNo == '4'){
              this.loading4 = false;
            }else if(LoadNo == '5'){
              this.loading5 = false;
            }else if(LoadNo == '6'){
              this.loading6 = false;
            }else if(LoadNo == '7'){
              this.loading7 = false;
            }else if(LoadNo == '8'){
              this.loading8 = false;
            }else if(LoadNo == '9'){
              this.loading9 = false;
            }else if(LoadNo == '10'){
              this.loading10 = false;
            }else if(LoadNo == '11'){
              this.loading11 = false;
            }else if(LoadNo == '12'){
              this.loading12 = false;
            }else if(LoadNo == '13'){
              this.loading13 = false;
            }else if(LoadNo == '14'){
              this.loading14 = false;
            }else if(LoadNo == '15'){
              this.loading15 = false;
            }else if(LoadNo == '16'){
              this.loading16 = false;
            }else if(LoadNo == '17'){
              this.loading17 = false;
            }else if(LoadNo == '18'){
              this.loading18 = false;
            }else if(LoadNo == '19'){
              this.loading19 = false;
            }else if(LoadNo == '20'){
              this.loading20 = false;
            }else if(LoadNo == '21'){
              this.loading21 = false;
            }else if(LoadNo == '22'){
              this.loading22 = false;
            }else if(LoadNo == '23'){
              this.loading23 = false;
            }else if(LoadNo == '24'){
              this.loading24 = false;
            }else if(LoadNo == '25'){
              this.loading25 = false;
            }else if(LoadNo == '26'){
              this.loading26 = false;
            }
            this.api.getcheckTabs().subscribe((data: any) => {
              if(data['status'] == 200){
                this.buildForm5();
              }
              
            });
          }
        },
        error => {
          console.error("Error", error);
        })
  }

  quickApply() {
    var courID = this.route.snapshot.queryParamMap.get('courseId');
    if(courID == null){
      this.router.navigate(['pages/totalcourse']);
    }else if(courID != null){
      this.api.addtoCart(courID).subscribe(
        data => {
          this.user_id=data['data']['user_id'];
          this.socket.getCartvalue(this.user_id);
          this.router.navigateByUrl('/pages/cart');
        },
        error => {
          console.log("Error", error);
        }
      );
    }
  }

  sampleDownload(filename, country_birth) {
    if(country_birth!=null){
      var location = 'SampleDocuments/' + country_birth;
    }else{
      var location = 'Affidavit';
    }
    
    this.api.downloadDocument(location, filename)
      .subscribe(data => {
        saveAs(data, filename);
      });
  }


  save_employment_details(): void {
    var validation;

    var emp = {
      emp_id: undefined,
      company_name: this.employment.company_name,
      work_exp_years: this.employment.years,
      work_exp_months: this.employment.months,
      work_title: this.employment.title,
      type_of_work: this.employment.typeofwork,
      work_description: this.employment.workdesc,
      country_id: this.employment.country,
    };
    if (this.employment.company_name == "" || this.employment.company_name == undefined || this.employment.company_name == null) {

      validation = false;

    } else if (this.employment.workdesc == "" || this.employment.workdesc == undefined || this.employment.workdesc == null) {

      validation = false;
    } else if (this.employment.years == "" || this.employment.years == undefined || this.employment.years == null) {

      validation = false;
    } else if (this.employment.months == "" || this.employment.months == undefined || this.employment.months == null) {

      validation = false;
    } else if (this.employment.country == "" || this.employment.country == undefined || this.employment.country == null) {

      validation = false;
    } else if (this.employment.title == "" || this.employment.title == undefined || this.employment.title == null) {

      validation = false;
    } else if (this.employment.typeofwork == "" || this.employment.typeofwork == undefined || this.employment.typeofwork == null) {

      validation = false;
    } else {
      validation = true;
    }

    if (validation) {
      this.api.setProfileValues(emp, "Employment").subscribe(data => {
        this.ngOnInit();
        this.stepper.selectedIndex = 3;

        this.employment.company_name = '';
        this.employment.years = '-1';
        this.employment.months = '0';
        this.employment.country = 'No Country';
        this.employment.title = '';
        this.employment.typeofwork = 'No Work';
        this.employment.workdesc = '';

      }, error => {
        console.error(" Employment error : " + error);
      });
    } else {
      this.alertflag = 1;
      this.messages = "Fill all employment details !!";
    }


  }

  update_employment_details(id, company_name, years, months, work_title, country_id, type_of_work, work_description): void {

    var validation;

    var emp = {
      emp_id: id,
      company_name: company_name,
      work_exp_years: years,
      work_exp_months: months,
      work_title: work_title,
      type_of_work: type_of_work,
      work_description: work_description,
      country_id: country_id,
    };
    if (company_name == "" || company_name == undefined || company_name == null) {

      validation = false;

    } else if (work_description == "" || work_description == undefined || work_description == null) {

      validation = false;
    } else if (years == "" || years == undefined || years == null) {

      validation = false;
    } else if (months == "" || months == undefined || months == null) {

      validation = false;
    } else if (country_id == "" || country_id == undefined || country_id == null) {

      validation = false;
    } else if (type_of_work == "" || type_of_work == undefined || type_of_work == null) {

      validation = false;
    } else if (work_title == "" || work_title == undefined || work_title == null) {

      validation = false;
    } else {
      validation = true;
    }

    if (validation) {
      this.api.setProfileValues(emp, "Employment").subscribe(data => {
        this.ngOnInit();
        this.stepper.selectedIndex = 3;
      }, error => {
        console.error(" Employment error : " + error);
      });
    } else {
      this.alertflag = 1;
      this.messages = "Fill all employment details !!";
    }

  }


  delete_employment_details(id): void {
    this.api.delete_employment(id).subscribe(data => {
      this.buildForm4();
      // this.showToast('bottom-left', 'Deleted succesfully !');
      this.position = 'top-right';
      this.status = 'success';
      this.toastrService.show(
        status || 'Success',
        `Deleted Successfully ! `,
      );
    }, error => {
      console.error(" Employment error : " + error);
    });
  }


  timer (){
    setTimeout(()=>{
      //this.onClose();
      this.errorflag = 0;
    },5000);
  }

  setMobileCountryCode(event: any){
		this.Countries.forEach(element => {
			if(element.id == event){
				this.guardian_info.mobile_country_code = element.phonecode;
				this.guardian_info.mobile ="";
			}
		});
		
	}

}


