import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { CollegePreferences } from './CollegePreferences';
import { Colleges } from './Colleges';
import { Subscriber,Subject} from 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { NbAuthService } from '@nebular/auth';
import { NbThemeService } from '@nebular/theme';
import { config } from '../../../config';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = config.serverUrl;
  //private APIbaseUrl = 'http://sppu.admissiondesk.org:3000'
  constructor(private httpClient : HttpClient,
    public authService : NbAuthService,
    public themeService : NbThemeService) { }



  get(url: string): Observable<any> {
    return new Observable((observer: Subscriber<any>) => {
        let objectUrl: string = null;
        this.httpClient
            .get(url, {
                responseType: 'blob'
            })
            .subscribe(m => {
                objectUrl = URL.createObjectURL(m);
                observer.next(objectUrl);
            });

        return () => {
            if (objectUrl) {
                URL.revokeObjectURL(objectUrl);
                objectUrl = null;
            }
        };
    });
}

getProfileCompleteness(){
  try{
        return this.httpClient.get(`${this.baseUrl}/api/getProfileCompleteness`);
  }catch(error) {
      this.handleError("getProfileCompleteness : "+JSON.stringify(error));
  }
}

    getProfileImage(){
      try{
            return this.httpClient.get(`${this.baseUrl}/api/transcriptData`);
      }catch(error) {
          this.handleError("getProfileImage : "+JSON.stringify(error));
      }
    }


  getUserCourseApplication(){
    try{
    return  this.httpClient.get(`${this.baseUrl}/uca`);
  }catch(error) {
    this.handleError("unable to get user couse application : "+JSON.stringify(error));
  }

  }

  getProfileValue(type){
    try{
      if(type == "Personal"){
        return  this.httpClient.get(`${this.baseUrl}/api/profile/profile?type=Personal`);
      }else if (type == "Guardian"){
        return  this.httpClient.get(`${this.baseUrl}/api/profile/profile?type=Guardian`);
      }else if (type == "Education_HSC"){
        return  this.httpClient.get(`${this.baseUrl}/api/profile/education?type=hsc`);
      }else if (type == "Education_SSC"){
        return  this.httpClient.get(`${this.baseUrl}/api/profile/education?type=ssc`);
      }else if (type == "Education_diploma"){
        return  this.httpClient.get(`${this.baseUrl}/api/profile/education?type=diploma`);
      }else if (type == "Education_degree"){
        return  this.httpClient.get(`${this.baseUrl}/api/profile/education?type=degree`);
      }else if (type == "All_Education_Details"){
        return  this.httpClient.get(`${this.baseUrl}/api/profile/profile?type=All_Education_Details`);
      }else if (type == "Employment"){
        return  this.httpClient.get(`${this.baseUrl}/api/profile/profile?type=Employment`);
      }
      
    }catch(error) {
      this.handleError("getProfileValue: "+JSON.stringify(error));
    }
  }

  trackVisits(specialization){
    try{
      return this.httpClient.post(`${this.baseUrl}/api/search/trackVisits`,{
        "specialization" : specialization
      });
    }catch(error) {
      this.handleError("getSpecialization : "+error);
    }
  }

  delete_education(type){
    try{      
        return this.httpClient.delete(`${this.baseUrl}/api/profile/delete_education?type=`+type);
            
    }catch(error) {
      this.handleError("delete education: "+JSON.stringify(error));
    }
  }

  delete_employment(id){
    try{      
        return this.httpClient.delete(`${this.baseUrl}/api/profile/delete_employment?id=`+id);
            
    }catch(error) {
      this.handleError("delete employment: "+JSON.stringify(error));
    }
  }


  async getCollegeListValue(collId){
    try{
      return await this.httpClient.get(`${this.baseUrl}/api/search/collegeinfo?collId=`+collId).toPromise();
    }catch(error) {
      console.log("getCollegeListValue : "+ error);
    }
  }

  async getCollegeCourse(id){
    try{
      return await this.httpClient.post(`${this.baseUrl}/coursevalue`,{"id" : id});
    }catch(error) {
      this.handleError("getCollegeCourse : "+error);
    }

  }

  async getcollegescoursewise(course_id){
    try{
      return await this.httpClient.post(`${this.baseUrl}/api/myApplication/collegevalue`,{"course_id" : course_id});
    }catch(error) {
      this.handleError("getcollegescoursewise : "+error);
    }

  }


  getwhishlist(course_id){
    try{
      
      return this.httpClient.post(`${this.baseUrl}/getwhishlist`,{"course_id":course_id});
      
    }catch(error) {
      this.handleError("getwhishlist : "+error);
    }

  }

  getUnlockedTranscript(){
    try{
      return  this.httpClient.get(`${this.baseUrl}/api/profile/getUnlockedTranscript`);
    }catch(error) {
      this.handleError("getUnlockedTranscript : "+JSON.stringify(error));
    }
  }
  

  
  async getCourseCollegeList(courseid,specialization){
    try{
      return await this.httpClient.get(`${this.baseUrl}/api/search/coursecollegeinfo?courseid=`+courseid+`&specialization=`+specialization).toPromise();
    }catch(error) {
      this.handleError("getCourseCollegeList : "+error);
    }
  }


  getMyApplication(user_id){
    try{
      return this.httpClient.post(`${this.baseUrl}/getMyApplication`,{"user_id":user_id});      
    }catch(error) {
      this.handleError("getMyApplication : "+error);
    }

  }

  myApplicationCheckTabs(applicationId){
    try{
          return this.httpClient.get(`${this.baseUrl}/api/myApplication/myApplicationCheckTabs?app_Id=`+applicationId);
    }catch(error) {
        this.handleError("myApplicationCheckTabs : "+JSON.stringify(error));
    }
  }

  getenrollmentdetails(enrollmentType,applicationId){
    try{
      return this.httpClient.get(`${this.baseUrl}/api/myApplication/getenrollmentdetails?enrollmentType=`+enrollmentType+'&applicationId='+applicationId);     
    }catch(error) {
      this.handleError("getenrollmentdetails : "+error);
    }
  }

  getDownloadsInfo(){
    try{
    return  this.httpClient.get(`${this.baseUrl}/api/downloads/application`);
  }catch(error) {
    this.handleError("getDownloadsInfo : "+error);
  }
  }

  getFilesdata(id){
    try{
      return  this.httpClient.post(`${this.baseUrl}/api/downloads/getFiles`,{"app_id":id});
    }catch(error) {
      this.handleError("getFilesdata : "+error);
    }
  }

  getdownloaddoc(type,applicationId){
    try{
      return this.httpClient.get(`${this.baseUrl}/api/myApplication/getdownloaddoc?type=`+type+'&applicationId='+applicationId);      
    }catch(error) {
      this.handleError("getdownloaddoc : "+error);
    }
  }
  
  async getCollegeList(courseid,specialization){
    try{
      return await this.httpClient.get(`${this.baseUrl}/api/search/collegeList?courseid=`+courseid+`&specialization=`+specialization).toPromise();
    }catch(error) {
      this.handleError("getCollegeList : "+error);
    }
  }

  getAllEducationData(){
    try{
        return this.httpClient.get<Colleges>(`${this.baseUrl}/api/profile/api_get_education_details`)
            .map(res => {
                return res.data  ;
        })
    }catch(error) {
        this.handleError("unable to get value network error : "+JSON.stringify(error));
    }

  }

  getAllEducationDataFilter(search,country,type){
    try{
        return this.httpClient.post<Colleges>(`${this.baseUrl}/api/profile/hsc_filter`,{"name":search,"country":country,"type":type})
        .map(res => {
          return res.data;
        })
    }catch(error) {
        this.handleError("unable to get filter value network error : "+JSON.stringify(error));
    }

  }

  
  getTranscriptLock(userId){
    try{
        return  this.httpClient.post(`${this.baseUrl}/api/transcriptlockvalue`,{"userId":userId})
        .map(res => {
          return res;
        });
    }catch(error) {
      this.handleError("getTranscriptLock: "+JSON.stringify(error));
    }
  }

  getCourse(){
    try{
     return this.httpClient.get(`${this.baseUrl}/api/search/course`);
    }catch(error) {
      this.handleError("getCourse : "+error);
    }
  }

  getSpecialization(name){
    try{
      return this.httpClient.get(`${this.baseUrl}/api/search/specialization?course=`+name);
    }catch(error) {
      this.handleError("getSpecialization : "+error);
    }
  }

  QuickSearch(coursename,specialization){
    try{
      return this.httpClient.get(`${this.baseUrl}/api/search/QuickSearch?coursename=`+coursename+`&specialization=`+specialization);
    }catch(error) {
      this.handleError("QuickSearch : "+error);
    }
  }

  QuickSearchResult(value,coursename,specialization){
    try{
      return this.httpClient.post(`${this.baseUrl}/api/search/search_QuickSearchResult`,{"value":value,"coursename":coursename,"specialization":specialization})
      .map(res => {
        return res;
    })
    }catch(error) {
      this.handleError("QuickSearchResult : "+error);
    }
  }
  
  
  downloadFiles(file_name):Observable<Blob>{
    try{
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.httpClient.get(`${this.baseUrl}/download?file_name=`+file_name, { headers: headers, responseType: 'blob'}).map(
        (res) => {
            return new Blob([res], { type: 'application/pdf' });
        });
    }catch(error) {
      this.handleError("unable to get Files : "+JSON.stringify(error));
    }
  }

  //Payment gateway routes

  firstpaymentrequest(appId,couser_id,eligibilityFee){
    try{
      return this.httpClient.post(`${this.baseUrl}/api/payment/firstpaymentrequest`,{"appid":appId,"courseId":couser_id,"eligibilityFee":eligibilityFee});     
    }catch(error) {
      this.handleError("firstpaymentrequest : "+error);
    }
  }

  secondpaymentrequest(appId,couser_id){
    try{
      return this.httpClient.post(`${this.baseUrl}/api/payment/secondpaymentrequest`,{"appid":appId,"courseId":couser_id});     
    }catch(error) {
      this.handleError("secondpaymentrequest : "+error);
    }

  }

  thirdpaymentrequest(appId,couser_id,amount){
    try{
      return this.httpClient.post(`${this.baseUrl}/api/payment/thirdpaymentrequest`,{"appid":appId,"courseId":couser_id,"amount":amount});     
    }catch(error) {
      this.handleError("thirdpaymentrequest : "+error);
    }

  }

  OnlinePaymentChallan(num,transaction_id,payment_amount,payment_status,application_id,payment_date_time,enrollment_no,user_id){
    try{
      return this.httpClient.post(`${this.baseUrl}/api/payment/OnlinePaymentChallan`,{payment_num : num,user_id:user_id,application_no:enrollment_no,payment_amount:payment_amount,transaction_id:transaction_id,date_time:payment_date_time,status_payment:payment_status,application_id:application_id});
    }catch(error) {
      this.handleError("OnlinePaymentChallan : "+error);
    }
  } 
  
  searchedCollegeDetais(id,type){
    try{
        return this.httpClient.post<Colleges>(`${this.baseUrl}/api/profile/get_search_college`,{"schoolID":id,"type":type})
        .map(res => {
          return res.data;
        })
    }catch(error) {
        this.handleError("unable to get searched college value network error : "+JSON.stringify(error));
    }

  }

  getCollegesByPincode(pincode){
    try{
      
      return this.httpClient.get(`${this.baseUrl}/api/search/getCollegesByPincode?postal_code=`+ pincode);
      
    }catch(error) {
      this.handleError("getCollegesByPincode : "+error);
    }

  }
  
  generateonlinereceipt(transaction_id,application_id,userId,pay_num){
    try{
      return this.httpClient.post(`${this.baseUrl}/api/payment/online_receipt`,{transaction_id:transaction_id, application_id:application_id, userId : userId, pay_num : pay_num});
    }catch(error) {
      this.handleError("generateonlinereceipt : "+error);
    }

  }

  checkfirmletter(enrollment,colg_name,applicationId){
    try{
      return this.httpClient.post(`${this.baseUrl}/api/myApplication/AcceptReject`,{enrollment:enrollment,colg_name:colg_name,applicationId:applicationId});   
    }catch(error) {
      this.handleError("checkfirmletter : "+error);
    }

  }

  searchCourse(value,id){
   try{
     return  this.httpClient.post(`${this.baseUrl}/api/search/search_course`,{"id" : id , "value":value});
   }catch(error) {
     this.handleError("searchCourse : "+error);
   }
 }


  setvisadetails(visa_no,visa_place,visa_issue,visa_expiry){
    try{
      return this.httpClient.post(`${this.baseUrl}/api/myApplication/visa_details`,{"visa_no":visa_no,"visa_place":visa_place,"visa_expiry":visa_expiry,"visa_issue":visa_issue});
      
    }catch(error) {
      this.handleError("setvisadetails : "+error);
    }
  }

  setmedicaldetails(medicalissuanceDate,doctorname,doctorcountry,doctormobile,medicalNumber){
    try{
      return this.httpClient.post(`${this.baseUrl}/api/myApplication/medical_details`,{"medicalissuanceDate":medicalissuanceDate,"doctorname":doctorname,"doctorcountry":doctorcountry,"doctormobile":doctormobile,"medicalNumber":medicalNumber});
      
    }catch(error) {
      this.handleError("setmedicaldetails : "+error);
    }
  }

  setrpdetails(address,mobile_no,email,value){
    try{
      return this.httpClient.post(`${this.baseUrl}/api/myApplication/resident_permit_data`,{"address":address,"mobile_no":mobile_no,"email":email,"value":value});
      
    }catch(error) {
      this.handleError("setrpdetails : "+error);
    }
  }

  setProfileValues(name,type){
    try{
      if(type == "Personal"){
          return  this.httpClient.post(`${this.baseUrl}/api/profile/set_profile`,{
            data : name,
            type:"Personal"
          });
      }else if(type == "Guardian"){
        return  this.httpClient.post(`${this.baseUrl}/api/profile/set_profile`,{
          data : name,
          type:"Guardian"
        });
      }else if(type == "Education_Degree"){
        return  this.httpClient.post(`${this.baseUrl}/api/profile/set_profile`,{
          data : name,
          type:"Education_Degree"
        });
      }
      else if(type == "Education_Diploma"){
        return  this.httpClient.post(`${this.baseUrl}/api/profile/set_profile`,{
          data : name,
          type:"Education_Diploma"
        });
      } else if(type == "Education_HSC"){
        return  this.httpClient.post(`${this.baseUrl}/api/profile/set_profile`,{
          data : name,
          type:"Education_HSC"
        });
      } else if(type == "Education_SSC"){
        return  this.httpClient.post(`${this.baseUrl}/api/profile/set_profile`,{
          data : name,
          type:"Education_CBSE"
        });
      }else if (type == "hobbies_sports"){
        return  this.httpClient.post(`${this.baseUrl}/api/profile/set_profile`,{
          data : name,
          type:"hobbies_sports"
        });
      }else if (type == "Employment"){
        return  this.httpClient.post(`${this.baseUrl}/api/profile/set_profile`,{
          data : name,
          type:"employment"
        });
      }  
    }catch(error){
      this.handleError("setProfileValues: "+JSON.stringify(error));
    }
  }

  checkTabs(degree,course_id){
    try{
        return this.httpClient.get(`${this.baseUrl}/api/profile/checkTabs?degree=`+degree+`&course_Id=`+course_id);
    }catch(error) {
        this.handleError("Checktabs : "+JSON.stringify(error));
    }
  }


  getcheckTabs(){
    try{
      return  this.httpClient.get(`${this.baseUrl}/api/profile/checkTabs`);
    }catch(error) {
      this.handleError("getcheckTabs : "+JSON.stringify(error));
    }
  
  }

  setProfileCompleteness(percent){
    try{
      return  this.httpClient.post(`${this.baseUrl}/api/profile/setProfileCompleteness`,{"percent": percent});
    }catch(error) {
      this.handleError("setProfileCompleteness : "+JSON.stringify(error));
    }
  }
  async addPreferences(course_id,pref1,pref2,pref3,pref4,pref5,pref6,pref7,pref8,pref9,pref10){
    try{
      return await this.httpClient.post(`${this.baseUrl}/addPreferences`,{"courseId" : course_id,"pref1":pref1,"pref2":pref2,"pref3":pref3,"pref4":pref4,"pref5":pref5,"pref6":pref6,"pref7":pref7,"pref8":pref8,"pref9":pref9,"pref10":pref10});
    }catch(error) {
      this.handleError("addPreferences : "+error);
    }

  }

  addtoCart(courseId){
    try{
      return this.httpClient.post(`${this.baseUrl}/addToCart`,{"courseId" : courseId});
    }catch(error){
      this.handleError("addtoCart : "+error);
    }
  }

  updatePreferences(course_id,pref1,pref2,pref3,pref4,pref5,pref6,pref7,pref8,pref9,pref10){
    try{
      return  this.httpClient.post(`${this.baseUrl}/updatePreferences`,{"courseId" : course_id,"pref1":pref1,"pref2":pref2,"pref3":pref3,"pref4":pref4,"pref5":pref5,"pref6":pref6,"pref7":pref7,"pref8":pref8,"pref9":pref9,"pref10":pref10});
    }catch(error) {
      this.handleError("updatePreferences : "+error);
    }

  }

  searchCollege(value,specialization){
    try{
      return this.httpClient.post(`${this.baseUrl}/api/search/search_college`,{"value":value,"specialization":specialization})
      .map(res => {
        return res;
    })
    }catch(error) {
      this.handleError("searchCollege : "+error);
    }
  }
   searchPreferences(value,course_id){
    try{
      return this.httpClient.post<CollegePreferences>(`${this.baseUrl}/search_preference`,{"value":value,"course_id":course_id})
      .map(res => {
        return res.data;
    })
      
    }catch(error) {
      this.handleError("searchPreferences : "+error);
    }

  }

  async recordactivity(appId,course_id,letter){
    try{
      return this.httpClient.post(`${this.baseUrl}/api/myApplication/activity`,{"applicationId":appId,"course_id":course_id,"letter":letter});     
    }catch(error) {
      this.handleError("recordactivity : "+error);
    }
  }
//Cart 

  async getCartValue(){
  try{
  return await this.httpClient.get(`${this.baseUrl}/cartvalue`).toPromise();
    }catch(error) {
  this.handleError("unable to get cart value network error : "+JSON.stringify(error));
  }
}


  async cartRemove(courseId){
    try{
      return await this.httpClient.delete(`${this.baseUrl}/cartvalue/${courseId}`);
      }catch(error){
      this.handleError("cartRemove : "+JSON.stringify(error));
    }
  }

  async viewPreferences(courseId){
    try{
      return await this.httpClient.get(`${this.baseUrl}/viewPreferences?courseId=`+courseId);
      }catch(error){
      this.handleError("viewPreferences : "+JSON.stringify(error));
    }
  }

  async getMoreColleges(course_id){
    try{
      return await this.httpClient.get(`${this.baseUrl}/addmore_colleges?course_id=`+course_id);
      }catch(error){
      this.handleError("getMoreColleges : "+JSON.stringify(error));
    }
  }

  addMorePref(preferences_created){
      try{
        return  this.httpClient.post(`${this.baseUrl}/addMorePreferences`,{"preferences_created" : preferences_created});
      }catch(error){
        this.handleError("addMorePref : "+JSON.stringify(error));
      }
  }


  RegisterValues(data){
    try{
      
          return  this.httpClient.post(`${this.baseUrl}/api/support/register`,{
            data : data
        
          });
     
    }catch(error){
      this.handleError("RegisterValues: "+JSON.stringify(error));
    }
  }

  resetPasswordValues(data){  
    try{  
      
          return  this.httpClient.post(`${this.baseUrl}/api/login/resetpassword`,{
            data : data
          }); 
    }catch(error){
      this.handleError("resetPasswordValues: "+JSON.stringify(error));
    }
  }

  ForgotPassword(email){
    try{
      
      return  this.httpClient.post(`${this.baseUrl}/api/login/forgot-password`,{
        data : email
    
      });
 
      }catch(error){
        this.handleError("ForgotPassword: "+JSON.stringify(error));
      }

  }
  
  Otpvalue(data){
    try{
      return this.httpClient.post(`${this.baseUrl}/api/support/verify-otp-reg`,{
         data : data
      });
  }catch(error) {
    this.handleError("Otpvalue : "+JSON.stringify(error));
  }
  }

  UpdateNumberOTP(data){
    try{
      return this.httpClient.post(`${this.baseUrl}/api/login/resend-otp`,{
         data : data
      });
  }catch(error) {
    this.handleError("UpdateNumberOTP : "+JSON.stringify(error));
  }
  }

  getCaptcha(){
    try{
        return  this.httpClient.get(`${this.baseUrl}/api/support/captcha`);
            
    }catch(error) {
      this.handleError("getCaptcha: "+JSON.stringify(error));
    }
    
  }

  emailValues(data){
    try{
      
          return  this.httpClient.post(`${this.baseUrl}/api/support/email`,{
            data : data
        
          });
     
    }catch(error){
      this.handleError("emailValues: "+JSON.stringify(error));
    }
  }


  changePreference(pref_cnt,course_id,collegeName){
    try{
      return  this.httpClient.post(`${this.baseUrl}/changePreferences`,{"pref_cnt" : pref_cnt, "course_id" : course_id, "collegeName" : collegeName});
    }catch(error){
      this.handleError("changePreference : "+JSON.stringify(error));
    }
  }

  async viewEditPreferences(course_id){
    try{
      return await this.httpClient.get(`${this.baseUrl}/edit_preferences?course_id=`+course_id);
      }catch(error){
      this.handleError("viewEditPreferences : "+JSON.stringify(error));
    }
  }


  downloadDocument(location,file_name):Observable<Blob>{
    try{
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.httpClient.get(`${this.baseUrl}/api/downloads/download_document?file_name=`+file_name+`&location=`+location, { headers: headers, responseType: 'blob'}).map(
        (res) => {
            return new Blob([res], { type: 'application/pdf' });
        });
    }catch(error) {
      this.handleError("unable to download_document  : "+JSON.stringify(error));
    }
  }

  peerCall(studentcnct,peercontact){
    try{
      return this.httpClient.post(`${this.baseUrl}/api/twilio`,{"studentcnct":studentcnct,"peercontact":peercontact});      
    }catch(error) {
      this.handleError("peerCall : "+error);
    }

  }
  
  callSchedule(peer_id,intlphone,peer_number,time,peer_available_to,peer_available_from){
    try{
      return this.httpClient.post(`${this.baseUrl}/api/insertCallCron`,{"peer_id":peer_id,"intlphone":intlphone,"peer_number":peer_number,"timepicker":time,"peer_available_to":peer_available_to,"peer_available_from":peer_available_from});      
    }catch(error) {
      this.handleError("callSchedule : "+error);
    }
  }

  find_intake(courseid){
    try{
      return this.httpClient.post(`${this.baseUrl}/api/find_intake`,{"courseid":courseid});
     }catch(error) {
       this.handleError("find_intake : "+error);
     }
   }

   //find_intake_new

   find_intake_new(courseid){
    try{
      return this.httpClient.post(`${this.baseUrl}/api/find_intake_new`,{"courseid":courseid});
     }catch(error) {
       this.handleError("find_intake : "+error);
     }
   }

   allcoursedetails(){
    try{
      return this.httpClient.get(`${this.baseUrl}/api/allcourselist`);
     }catch(error) {
       this.handleError("find_intake : "+error);
     }
   }

   totalcoursedetails(){
    try{
      return this.httpClient.get(`${this.baseUrl}/api/allcourselist`);
     }catch(error) {
       this.handleError("find_intake : "+error);
     }
   }

   getDegree(courseid){
    try{
       return this.httpClient.post(`${this.baseUrl}/api/getDegree`,{"courseid":courseid});
     }catch(error) {
       this.handleError("getDegree : "+error);
     }
   }

   checkapplications(){
    try{
      return this.httpClient.get(`${this.baseUrl}/api/myApplication/checkapplications`);
    }catch(error) {
      this.handleError("checkapplications : "+error);
    }
  }

  previewLetter(userId){
    try{
      return this.httpClient.post(`${this.baseUrl}/api/preview`,{"id":userId});
      
    }catch(error) {
      this.handleError("previewLetter : "+error);
    }
    
  }

  deleteTranscripts(name,userId,transcriptId){
    try{
      return this.httpClient.post(`${this.baseUrl}/api/deleteTranscript`,{"name":name,"userId":userId,"transcriptId":transcriptId})
      .map(res => {
        return res;
      })
      
    }catch(error) {
      this.handleError("deleteTranscripts : "+error);
    }
    
  }

  getPeers(college_id,course_id){
    try{
      return  this.httpClient.get(`${this.baseUrl}/api/search/peers_list?collId=`+college_id+`&courId=`+course_id);
    }catch(error) {
      this.handleError("setTheme : "+error);
    }
  }

  setTheme(theme){
    try{
      return  this.httpClient.post(`${this.baseUrl}/api/downloads/saveTheme`,{"theme":theme});
    }catch(error) {
      this.handleError("setTheme : "+error);
    }
  }

  getTheme(){
    try{
      return  this.httpClient.get(`${this.baseUrl}/api/downloads/getTheme`);
    }catch(error) {
      this.handleError("getTheme : "+error);
    }
  }

  async getUserApplication(id){
    try{
       return await this.httpClient.get(`${this.baseUrl}/api/myApplication/getUserApplication?application_id=`+id);     
    }catch(error) {
      this.handleError("getUserApplication : "+error);
    }
  }

  async getApplicationLength(){
    try{
       return await this.httpClient.get(`${this.baseUrl}/api/myApplication/getApplicationLength`);     
    }catch(error) {
      this.handleError("getApplicationLength : "+error);
    }
  }

  changePasswordValues(data){  
    try{  
          return  this.httpClient.post(`${this.baseUrl}/api/support/changepassword`,{
            data : data
          }); 
    }catch(error){
      this.handleError("changePasswordValues: "+JSON.stringify(error));
    }
  }

//Socket IO 
socketmessage = new Subject();
socketNotificationNo = new Subject();
private notification_no : any;
private messages = [];


notification(userId,type){
  return this.httpClient.post(`${this.baseUrl}/api/downloads/notification`,{"id":userId,"type":type}).subscribe(response =>{
    this.messages = response['data'];
    this.notification_no = response['notification_no'];
    if(response['data'].length == 0){
      this.socketNotificationNo.next('');
      this.socketmessage.next('');
    }else if(response['data'].length > 0){
      this.socketNotificationNo.next(this.notification_no);
      this.socketmessage.next(this.messages);
    }
  },error => {
    console.error("error api service notification : "+error);
  });
}

reloadnotification(userId,type){
  try{
    return this.httpClient.post(`${this.baseUrl}/api/downloads/notification`,{"id":userId,"type":type});
  }catch(error) {
    this.handleError("notification : "+error);
  }
}

makeReadNotification(userId,type){
  try{
    return this.httpClient.post(`${this.baseUrl}/api/downloads/makeReadNotification`,{"id":userId,"type":type});
  }catch(error) {
    this.handleError("makeReadNotification : "+error);
  }
}

deleteNotification(userId,noti_id,type){
  try{
    return this.httpClient.post(`${this.baseUrl}/api/downloads/deleteNotification`,{"id":userId,"noti_id":noti_id,"type":type});
  }catch(error) {
    this.handleError("deleteNotification : "+error);
  }
}


// notification(userId){
  
//   return this.httpClient.post(`${this.baseUrl}/api/downloads/notification`,{"id":userId}).subscribe(response =>{
//     this.messages = response['data'];
//     this.notification_no = response['notification_no'];
//     if(response['data'].length == 0){
//       this.socketNotificationNo.next('');
//       this.socketmessage.next('');
//     }else if(response['data'].length > 0){
//       this.socketNotificationNo.next(this.notification_no);
//       this.socketmessage.next(this.messages);
//     }
//   },error => {
//     console.error("error api service notification : "+error);
//   });
// }

// reloadnotification(userId){
//   try{
//     return this.httpClient.post(`${this.baseUrl}/api/downloads/notification`,{"id":userId});
//   }catch(error) {
//     this.handleError("notification : "+error);
//   }
// }

// makeReadNotification(userId){
//   try{
//     return this.httpClient.post(`${this.baseUrl}/api/downloads/makeReadNotification`,{"id":userId});
//   }catch(error) {
//     this.handleError("makeReadNotification : "+error);
//   }
// }

// deleteNotification(userId,noti_id){
//   try{
//     return this.httpClient.post(`${this.baseUrl}/api/downloads/deleteNotification`,{"id":userId,"noti_id":noti_id});
//   }catch(error) {
//     this.handleError("deleteNotification : "+error);
//   }
// }

//routes regarding api

check_in_local_server(email){
  try{
    return  this.httpClient.post(`${this.baseUrl}/api/support/check_in_local_server`,{email : email});
  }catch(error){
    this.handleError("check_in_local_server: "+JSON.stringify(error));
  }
}

insert_to_database(data){
  try{
    return this.httpClient.post(`${this.baseUrl}/api/support/insert_to_database`,{"data":data});
  }catch(error) {
    this.handleError("insert_to_database : "+error);
  }
}

login(email,password){
  try{
    return this.httpClient.post(`${this.baseUrl}/api/auth/login`,{"email":email,"password":password});
  }catch(error) {
    this.handleError("login from api : "+error);
  }
}

// direct request to api

// confirmPass(email,pass){
//   try{
//     return this.httpClient.post(`${this.APIbaseUrl}/mobile/user/confirm_api_password`,{"email":email,"pass":pass});
//   }catch(error) {
//     this.handleError("confirmPass : "+error);
//   }
// }

//Institute service

getInstCalender(){
  try{
    return this.httpClient.get(`${this.baseUrl}/institute_api/instituteCalendar`);
}catch(error) {
  this.handleError("getInstCalender : "+JSON.stringify(error));
}
}

instit_save(dataa,prinID){
  try{
    return this.httpClient.post(`${this.baseUrl}/institute_api/updateInstituteDetail`,{dataa : dataa,"prinID":prinID});
  }catch(error) {
  this.handleError("instit_save : "+JSON.stringify(error));
  }
}
instit_save2(dataa,vprinID){
  try{
    return this.httpClient.post(`${this.baseUrl}/institute_api/updateInstituteDetail22`,{dataa : dataa,vprinID:vprinID});
  }catch(error) {
  this.handleError("instit_save : "+JSON.stringify(error));
  }
}


Videogallery(data){
  try{
    return this.httpClient.post(`${this.baseUrl}/institute_api/Videogallery`,{data : data});
  }catch(error) {
  this.handleError("Videogallery : "+JSON.stringify(error));
  }
}

enterselectrating(rating){
  try{
    return this.httpClient.post(`${this.baseUrl}/institute_api/naac`,{"rating" : rating});
  }catch(error) {
  this.handleError("enterselectrating : "+JSON.stringify(error));
  }
}




updateclgdetail(data){
  try{
    return this.httpClient.post(`${this.baseUrl}/institute_api/updateclgdetail`,{data : data});
}catch(error) {
  this.handleError("updateclgdetail : "+JSON.stringify(error));
}
}

updateclgform(data){
  try{
    return this.httpClient.post(`${this.baseUrl}/institute_api/updateclgform`,{data : data});
}catch(error) {
  this.handleError("updateclgform : "+JSON.stringify(error));
  }
}

getcollegedetail(data){
  try{
    return this.httpClient.get(`${this.baseUrl}/institute_api/collegedetails`);
  }
  catch(error) {
    this.handleError("getcollegedetail: "+JSON.stringify(error));
  }
}

getclgdetails(user_id,college_id){
  try{
    return this.httpClient.get(`${this.baseUrl}/institute_api/collegedetails`);     
  }catch(error) {
    this.handleError("getclgdetails : "+error);
  }
}


downloadclgform1(data):Observable<Blob>{
  try{
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.httpClient.get(`${this.baseUrl}/institute_api/getcollegeform?userid={{user?.id}}&transcript_name={{transcript_name}}`,{headers: headers, responseType: 'blob'}).map(
      (res) => {
        return new Blob([res], { type: 'application/pdf' });
      });
  }catch(error) {
  this.handleError("downloadclgform : "+JSON.stringify(error));
}
}

 downloadclgform(file): Observable<any> {
  // Create url
  let url = `${this.baseUrl}${"/institute_api/getcollegeform"}`;
  var body = { filename: file };

  return this.httpClient.post(url, body, {
    responseType: "blob",
    headers: new HttpHeaders().append("Content-Type", "application/json")
  });
}


deleteaccreditation(Id){
  try{
    return this.httpClient.post(`${this.baseUrl}/institute_api/deleteaccreditation`,{"Id":Id})
    .map(res => {
      return res;
    })
    
  }catch(error) {
    this.handleError("deleteaccreditation : "+error);
  }
  
}
deletegalleriess(Id){
  try{
    return this.httpClient.post(`${this.baseUrl}/institute_api/deletegalleries`,{"Id":Id})
    .map(res => {
      return res;
    })
    
  }catch(error) {
    this.handleError("deletegalleriess : "+error);
  }
  
}

  private handleError(error){
    console.error(error);
   }

}
