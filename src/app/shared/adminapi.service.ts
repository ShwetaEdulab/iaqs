import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Subscriber} from 'rxjs/Rx';
import {Observable } from 'rxjs/Observable';
import { NbAuthService } from '@nebular/auth';
import { NbThemeService } from '@nebular/theme';
import { config } from '../../../config';

@Injectable({
  providedIn: 'root'
})
export class AdminApiService {
  private baseUrl = config.serverUrl;
  constructor(private httpClient : HttpClient,
    public authService : NbAuthService,
    public themeService : NbThemeService) { }


/** Admin Request*/
sendOtp(){
  try{
    return this.httpClient.get(`${this.baseUrl}/admin_api/Application/get_otp`);
  }catch(error) {
      this.handleError("sendOtp : "+JSON.stringify(error));
  }
}
updateOtp(){
  try{
    return this.httpClient.get(`${this.baseUrl}/admin_api/Application/update_otp`);
  }catch(error) {
      this.handleError("updateOtp : "+JSON.stringify(error));
  }
}
getApplication(tab_type,year){
    try{
        return this.httpClient.get(`${this.baseUrl}/admin_api/Application?tab=`+tab_type+`&year=`+year);
    }catch(error) {
        this.handleError("getApplication : "+JSON.stringify(error));
    }
}

getUntickedApplication(unticked){
  try{
      return this.httpClient.get(`${this.baseUrl}/admin_api/Application/unticked_applications?tab=`+unticked);
  }catch(error) {
      this.handleError("getApplication : "+JSON.stringify(error));
  }
}

getIccrApplication(tab){
  try{
      return this.httpClient.get(`${this.baseUrl}/admin_api/iccr?tab=`+tab);
  }catch(error) {
      this.handleError("getIccrApplication : "+JSON.stringify(error));
  }
}
getApplicationinEligibility(tab_type,academic_year){
  try{
      return this.httpClient.get(`${this.baseUrl}/admin_api/Eligibility?tab=`+tab_type+`&year=`+academic_year);
  }catch(error) {
      this.handleError("getApplicationinEligibility : "+JSON.stringify(error));
  }
}

getEmailTracker(){
  try{
    return this.httpClient.get(`${this.baseUrl}/admin_api/report/getEmailTracker`);
  }catch(error) {
      this.handleError("getEmailTracker : "+JSON.stringify(error));
  }
}

getSMSTrackerMonthWise(params){
  try{
    return this.httpClient.post(`${this.baseUrl}/admin_api/Dashboard/getSMSTrackerMonthWise`,{
      yearMonth : params,          
    });
  } catch(error) {
      this.handleError("getSMSTrackerMonthWise : "+JSON.stringify(error));
  }
}

getSMSActivityMonthWise(params){
  try{
    return this.httpClient.post(`${this.baseUrl}/admin_api/report/getSMSActivityMonthWise`,{
      yearMonth : params, 
    });
  }catch(error) {
      this.handleError("getSMSActivityMonthWise : "+JSON.stringify(error));
  }
}

getEmailActivityTrackerMonthWise(params){
  try{
    return this.httpClient.post(`${this.baseUrl}/admin_api/Dashboard/getEmailActivityTrackerMonthWise`,{
      yearMonth : params,          
    });
  } catch(error) {
      this.handleError("getEmailActivityTrackerMonthWise : "+JSON.stringify(error));
  }
}

getEmailActivityTracker(){
  try{
    return this.httpClient.get(`${this.baseUrl}/admin_api/Dashboard/getEmailActivityTracker`);
  }catch(error) {
    this.handleError("getEmailActivityTracker : "+JSON.stringify(error));
  }
}

getICCRApplicationinEligibility(status){
  try{
      return this.httpClient.get(`${this.baseUrl}/admin_api/iccr/iccr_elgibility?tab=`+status);
  }catch(error) {
      this.handleError("getICCRApplicationinEligibility : "+JSON.stringify(error));
  }
}

geticcr_allocated_college_data(){
  try{
      return this.httpClient.get(`${this.baseUrl}/admin_api/iccr/iccr_allocated_college_data`);
  }catch(error) {
      this.handleError("geticcr_allocated_college_data : "+JSON.stringify(error));
  }
}

getrequested_unlocked_transcript(){
  try{
      return this.httpClient.get(`${this.baseUrl}/admin_api/Eligibility/requested_unlocked_transcript`);
  }catch(error) {
      this.handleError("getrequested_unlocked_transcript : "+JSON.stringify(error));
  }
}

geticcr_requested_unlocked_transcript(){
  try{
      return this.httpClient.get(`${this.baseUrl}/admin_api/iccr/iccr_requested_unlocked_transcript`);
  }catch(error) {
      this.handleError("geticcr_requested_unlocked_transcript : "+JSON.stringify(error));
  }
}

async getAllUserData(userId,courseId,applicationId,tab){
  try{
    return await this.httpClient.get(`${this.baseUrl}/admin_api/View/view?userId=`+userId+`&courseId=`+courseId+`&applicationId=`+applicationId+`&tab=`+tab).toPromise();
  }catch(error) {
    this.handleError("getAllUserData : "+error);
  }
}
async getAllTranscriptData(userId){
    try{
      return await this.httpClient.get(`${this.baseUrl}/admin_api/Errata?userId=`+userId).toPromise();
    }catch(error) {
      this.handleError("getAllTranscriptData : "+error);
    }
  }

  async getAllTranscriptDataOfICCR(userId){
    try{
      return await this.httpClient.get(`${this.baseUrl}/admin_api/iccr/transcript_data?userId=`+userId).toPromise();
    }catch(error) {
      this.handleError("getAllTranscriptDataOfICCR : "+error);
    }
  }

  updateErrataTranscript(errataTranscript){
    try{
        return this.httpClient.post(`${this.baseUrl}/admin_api/Errata/updateErrataTranscript`,{"errataTranscript":errataTranscript});
    }catch(error) {
        this.handleError("updateErrataTranscript : "+JSON.stringify(error));
    }
  }

  updateErrataTranscriptofICCR(errataTranscriptofICCR){
    try{
        return this.httpClient.post(`${this.baseUrl}/admin_api/iccr/updateErrataTranscript`,{"errataTranscriptofICCR":errataTranscriptofICCR});
    }catch(error) {
        this.handleError("updateErrataTranscriptofICCR : "+JSON.stringify(error));
    }
  }

rejectApplication(userId,courseId){
  try{
      return this.httpClient.post(`${this.baseUrl}/admin_api/Eligibility/rejectApplication`,{"user_id":userId,"course_id":courseId});
  }catch(error) {
      this.handleError("rejectApplication : "+JSON.stringify(error));
  }
}

acceptApplication(userId,courseId,eligib_number){
  try{
      return this.httpClient.post(`${this.baseUrl}/admin_api/Eligibility/acceptApplication`,{"user_id":userId,"course_id":courseId,"eligib_number":eligib_number});
  }catch(error) {
      this.handleError("acceptApplication : "+JSON.stringify(error));
  }
}

acceptApplicationICCR(id,userId,courseId,eligib_number){
  try{
      return this.httpClient.post(`${this.baseUrl}/admin_api/iccr/acceptApplicationICCR`,{"id":id,"user_id":userId,"course_id":courseId,"eligib_number":eligib_number});
  }catch(error) {
      this.handleError("acceptApplicationICCR : "+JSON.stringify(error));
  }
}

rejectApplicationICCR(userId,courseId){
  try{
      return this.httpClient.post(`${this.baseUrl}/admin_api/iccr/rejectApplicationICCR`,{"user_id":userId,"course_id":courseId});
  }catch(error) {
      this.handleError("rejectApplicationICCR : "+JSON.stringify(error));
  }
}

async getAllStudentData(userId){
  try{
      return await this.httpClient.get(`${this.baseUrl}/admin_api/View/studentview?userId=`+userId).toPromise();
  }catch(error) {
  this.handleError("getAllUserData : "+error);
  }
}
async getAllIccrStudentData(userId,courseId,applicationId,tab){
  try{
    return await this.httpClient.get(`${this.baseUrl}/admin_api/iccr/iccrview?userId=`+userId+`&courseId=`+courseId+`&applicationId=`+applicationId+`&tab=`+tab).toPromise();
  }catch(error) {
    this.handleError("getAllUserData : "+error);
  }
}
getallstudents(){
  try{
      return this.httpClient.get(`${this.baseUrl}/admin_api/students`);
  }catch(error) {
      this.handleError("getallstudents : "+JSON.stringify(error));
    }
}

downloadFiles(pdf):Observable<Blob>{
  try{
  let headers = new HttpHeaders();
  headers.append('Content-Type', 'application/json');
  return this.httpClient.get(`${this.baseUrl}/admin_api/Eligibility/download?pdf=`+pdf, { headers: headers, responseType: 'blob'}).map(
      (res) => {
          return new Blob([res], { type: 'application/pdf' });
      });
  }catch(error) {
    this.handleError("unable to get Files : "+JSON.stringify(error));
  }
}
//foregin office
downloadDocument(location,file_name):Observable<Blob>{
  try{
      let headers = new HttpHeaders();
      headers.append('Content-Type', 'application/json');
      return this.httpClient.get(`${this.baseUrl}/admin_api/foreignoffice/download_document?file_name=`+file_name+`&location=`+location, { headers: headers, responseType: 'blob'}).map(
          (res) => {
              return new Blob([res], { type: 'application/pdf' });
          });
  }catch(error) {
    this.handleError("unable to download_document  : "+JSON.stringify(error));
  }
}

sendEmailToEmbassy(user_id,course_id,application_id,email,countryName){
  try{
      return this.httpClient.post(`${this.baseUrl}/admin_api/foreignoffice/sendEmailToEmbassy`,{
          'user_id': user_id ,
          'course_id' : course_id,
          'id' : application_id,
          'email' : email,
          'Country_name' : countryName
      });

  }catch(error) {
      this.handleError("sendEmailToEmbassy : "+JSON.stringify(error));
  }
}

getApplicationinForeignOffice(tab_type){
  try{
      if(tab_type == "new"){
          return this.httpClient.get(`${this.baseUrl}/admin_api/foreignoffice?tab=`+tab_type);
      }else if(tab_type == "seat_allocation"){
        return this.httpClient.get(`${this.baseUrl}/admin_api/foreignoffice/seat_allocation?tab=`+tab_type);
      }else if(tab_type == "third_payment"){
          return this.httpClient.get(`${this.baseUrl}/admin_api/foreignoffice/third_payment_details?tab=`+tab_type);
      }else if(tab_type == "seat_alloted_student"){
        var tab = 'accept';
        return this.httpClient.get(`${this.baseUrl}/admin_api/foreignoffice/seat_alloted?tab=`+tab);
      }else if(tab_type == "failed_student"){
        var tab = 'reject';
        return this.httpClient.get(`${this.baseUrl}/admin_api/foreignoffice/seat_alloted?tab=`+tab);
      }
      
  }catch(error) {
      this.handleError("getApplicationinforeignoffice : "+JSON.stringify(error));
  }
}


sendEmailFromForeignOffice(tab_type,user_id,course_id,application_id){
  try{
      if(tab_type == "student"){
          return this.httpClient.post(`${this.baseUrl}/admin_api/foreignoffice/sendEmailTostudent`,{
              'user_id': user_id ,
              'course_id' : course_id,
              'id' : application_id
          });
      }else if(tab_type == "guardian"){
          return this.httpClient.post(`${this.baseUrl}/admin_api/foreignoffice/sendEmailToguardian`,{
              'user_id': user_id ,
              'course_id' : course_id,
              'id' : application_id
          });
      }else if(tab_type == "embassy"){
          return this.httpClient.post(`${this.baseUrl}/admin_api/foreignoffice/sendEmailToEmbassy`,{
              'user_id': user_id ,
              'course_id' : course_id,
              'id' : application_id
          });
      }
      
  }catch(error) {
      this.handleError("getApplicationinforeignoffice : "+JSON.stringify(error));
  }
}

async reuploadedTranscriptData(userId){
  try{
    return await this.httpClient.get(`${this.baseUrl}/admin_api/Eligibility/re_uploaded_student_transcript?userId=`+userId).toPromise();
  }catch(error) {
    this.handleError("reuploadedTranscriptData : "+error);
  }
}

async ICCR_reuploadedTranscriptData(userId){
  try{
    return await this.httpClient.get(`${this.baseUrl}/admin_api/iccr/re_uploaded_iccr_student_transcript?userId=`+userId).toPromise();
  }catch(error) {
    this.handleError("ICCR_reuploadedTranscriptData : "+error);
  }
}

requestToUpload(id){
  try{
    return this.httpClient.post(`${this.baseUrl}/admin_api/Eligibility/request_transcript_upload`,{transcript_id : id});
}catch(error) {
    this.handleError("requestToUpload : "+JSON.stringify(error));
  }
}

transcriptSetDefault(id,email){
  try{
    return this.httpClient.post(`${this.baseUrl}/admin_api/Eligibility/transcript_set_default`,{transcript_id : id,email: email});
}catch(error) {
    this.handleError("transcriptSetDefault : "+JSON.stringify(error));
  }
}

checkeligiblity(data){
  try{
      return this.httpClient.post(`${this.baseUrl}/admin_api/Eligibility/eligibCheck`,{
        data : data,
      });
  }catch(error) {
      this.handleError("checkeligiblity : "+JSON.stringify(error));
    }
}

checkforeign(data){
  try{
      return this.httpClient.post(`${this.baseUrl}/admin_api/Eligibility/sendEmailPI`,{
        data : data,
      });
  }catch(error) {
      this.handleError("checkforeign : "+JSON.stringify(error));
    }
}

preview(userId,courseId,id){
  try{
    return this.httpClient.post(`${this.baseUrl}/admin_api/Application/preview`,{userId:userId,courseId:courseId,id:id});
  }catch(error) {
    this.handleError("preview : "+JSON.stringify(error));
  }
}

preview_iccr(userId,courseId,id){
  try{
    return this.httpClient.post(`${this.baseUrl}/admin_api/iccr/preview_iccr`,{userId:userId,courseId:courseId,id:id});
  }catch(error) {
    this.handleError("preview_iccr : "+JSON.stringify(error));
  }
}

DownloadFirmPDFICCR(applicationId,userId){
  try{
    return this.httpClient.post(`${this.baseUrl}/admin_api/iccr/downloadletter`,{application_id:applicationId,user_id:userId});
  }catch(error) {
    this.handleError("DownloadFirmPDFICCR : "+JSON.stringify(error));
  }
}

showprovisionalLetterApp(user_id,course_id,application_id){
  try{
    return this.httpClient.post(`${this.baseUrl}/admin_api/Eligibility/conditional_provisional_letter_regenerate`,{user_id:user_id,course_id:course_id,id:application_id});
  }catch(error) {
    this.handleError("showprovisionalLetterApp : "+JSON.stringify(error));
  }
}

preview_data_with_Preferences(userId,courseId,id){
  try{
    return this.httpClient.post(`${this.baseUrl}/admin_api/Application/preview_with_pref`,{userId:userId,courseId:courseId,id:id});
  }catch(error) {
    this.handleError("preview_data_with_Preferences : "+JSON.stringify(error));
  }
}

downloadStudentExcel(){
  try{
    return this.httpClient.get(`${this.baseUrl}/admin_api/Eligibility/downloadStudentExcel`);
  }catch(error) {
    this.handleError("downloadStudentExcel : "+JSON.stringify(error));
  }
}

showSeatsExcel(){
  try{
    return this.httpClient.get(`${this.baseUrl}/admin_api/Eligibility/seats_excel_sheet`);
  }catch(error) {
    this.handleError("showSeatsExcel : "+JSON.stringify(error));
  }
}

ICCRExcel(){
  try{
    return this.httpClient.get(`${this.baseUrl}/admin_api/iccr/Excel_ICCR`);
  }catch(error) {
    this.handleError("ICCRExcel : "+JSON.stringify(error));
  }
}

paymentDetailsExcel(){
  try{
    return this.httpClient.get(`${this.baseUrl}/admin_api/Eligibility/Excel_allpaymentdetails`);
  }catch(error) {
    this.handleError("paymentDetailsExcel : "+JSON.stringify(error));
  }
}

showThirdPaymentExcel(){
  try{
    return this.httpClient.get(`${this.baseUrl}/admin_api/Eligibility/showThirdPaymentExcel`);
  }catch(error) {
    this.handleError("paymentDetailsExcel : "+JSON.stringify(error));
  }
}

showCollegeAllocatedExcel(collegename){
  try{
    return this.httpClient.post(`${this.baseUrl}/admin_api/Eligibility/showCollegeAllocatedExcel`,{"collegename":collegename});
  }catch(error) {
    this.handleError("showCollegeAllocatedExcel : "+JSON.stringify(error));
  }
}

status(status,userId){
  try{
    return this.httpClient.put(`${this.baseUrl}/admin_api/students/status`,{"status":status,"userId": userId});
  }catch(error) {
    this.handleError("status : "+JSON.stringify(error));
  }
}

Check_Eligibility(user_id,college_university,college_name,Subject_first_hsc,Subject_Second_hsc,Subject_Third_hsc,Subject_fourth_hsc,Subject_fifth_hsc,Subject_Six_hsc,specialization,course){
  try{
    return this.httpClient.post(`${this.baseUrl}/admin_api/Application/check_eligibility`,{'user_id':user_id,'college_university':college_university,'college_name':college_name,'Subject_first_hsc':Subject_first_hsc,'Subject_Second_hsc':Subject_Second_hsc,'Subject_Third_hsc':Subject_Third_hsc,'Subject_fourth_hsc':Subject_fourth_hsc,'Subject_fifth_hsc':Subject_fifth_hsc,'Subject_Six_hsc':Subject_Six_hsc});
  }catch(error) {
    this.handleError("Check_Eligibility : "+JSON.stringify(error));
  }
}

Check_Eligibility_data(nrp,specialization,course){
  try{
    return this.httpClient.post(`${this.baseUrl}/admin_api/Application/findusers`,{data : nrp,specialization:specialization,course_name : course});
  }catch(error) {
    this.handleError("Check_Eligibility_data : "+JSON.stringify(error));
  }
}

getApplicationsByStatus(year){
  try{
    return this.httpClient.get(`${this.baseUrl}/admin_api/report/admission-request?year=`+year);
  }catch(error) {
    this.handleError("getApplicationsByStatus : "+JSON.stringify(error));
  }
}

getApplicationAcceptance(year){
  try{
    return this.httpClient.get(`${this.baseUrl}/admin_api/report/application-acceptance?year=`+year);
  }catch(error) {
    this.handleError("getApplicationAcceptance : "+JSON.stringify(error));
  }
}

activitytracker(){
  try{
    return this.httpClient.get(`${this.baseUrl}/admin_api/report/activitytracker`);
  }catch(error) {
    this.handleError("activitytracker : "+JSON.stringify(error));
  }
}

firstPaymentChallanData(){
  try{
    return this.httpClient.get(`${this.baseUrl}/admin_api/report/First_Payment_Challan`);
  }catch(error) {
    this.handleError("firstPaymentChallanData : "+JSON.stringify(error));
  }
}

secondPaymentChallanData(){
  try{
    return this.httpClient.get(`${this.baseUrl}/admin_api/report/Second_Payment_Challan`);
  }catch(error) {
    this.handleError("secondPaymentChallanData : "+JSON.stringify(error));
  }
}

collegeAttendedStudents(){
  try{
    return this.httpClient.get(`${this.baseUrl}/admin_api/report/college_attended`);
  }catch(error) {
    this.handleError("collegeAttendedStudents : "+JSON.stringify(error));
  }
}

studentStatisticsPiechart(){
  try{
    return this.httpClient.get(`${this.baseUrl}/admin_api/report/student-statistics-piechart`);
  }catch(error) {
    this.handleError("studentStatisticsPiechart : "+JSON.stringify(error));
  }
}

getRegistrationTracker(){
  try{
    return this.httpClient.get(`${this.baseUrl}/admin_api/report/getRegistrationTracker`);
  }catch(error) {
      this.handleError("getRegistrationTracker : "+JSON.stringify(error));
  }
}

getRefererLink(){
  try{
    return this.httpClient.get(`${this.baseUrl}/admin_api/report/getRefererLink`);
  }catch(error) {
      this.handleError("getRefererLink : "+JSON.stringify(error));
  }
}

DownloadProvisionalLetter(user_id,id){
  try{
    return this.httpClient.post(`${this.baseUrl}/admin_api/Eligibility/DownloadProvisionalLetter`,{user_id: user_id,id:id});
  }catch(error) {
    this.handleError("DownloadProvisionalLetter : "+JSON.stringify(error));
  }
}

getallColleges(){
  try{
    return this.httpClient.get(`${this.baseUrl}/admin_api/institute_management`);
  }catch(error) {
    this.handleError("getallColleges : "+JSON.stringify(error));
  }
}

getAllCourse(value){
  try{
    return this.httpClient.get(`${this.baseUrl}/admin_api/institute_management/getAllCourse?college_name=`+value);
  }catch(error) {
    this.handleError("getAllCourse : "+JSON.stringify(error));
  }
}

courseStatus(status,id){
  try{
    return this.httpClient.put(`${this.baseUrl}/admin_api/institute_management/courseStatus`,{"status":status,"id": id});
  }catch(error) {
    this.handleError("courseStatus : "+JSON.stringify(error));
  }
}

college_status(status,id){
  try{
    return this.httpClient.put(`${this.baseUrl}/admin_api/institute_management/college_status`,{"status":status,"id": id});
  }catch(error) {
    this.handleError("college_status : "+JSON.stringify(error));
  }
}

getallAuthDetails(){
  try{
    return this.httpClient.get(`${this.baseUrl}/admin_api/institute_management/auth_details`);
  }catch(error) {
    this.handleError("getallAuthDetails : "+JSON.stringify(error));
  }
}

getallInstituteRequest(){
  try{
    return this.httpClient.get(`${this.baseUrl}/admin_api/institute_management/request`);
  }catch(error) {
    this.handleError("getallInstituteRequest : "+JSON.stringify(error));
  }
}

getInstitute_list(){
  try{
    return this.httpClient.get(`${this.baseUrl}/admin_api/institute_management/Institute_list`);
  }catch(error) {
    this.handleError("getInstitute_list : "+JSON.stringify(error));
  }
}

getTotal(tab_type){
  try{
    return this.httpClient.get(`${this.baseUrl}/admin_api/Dashboard/total?tab=`+tab_type);
  }catch(error) {
      this.handleError("getApplication : "+JSON.stringify(error));
  }
}

profile_completeness(year){
  try{
    return this.httpClient.get(`${this.baseUrl}/admin_api/Dashboard?year=`+year);
  }catch(error) {
      this.handleError("profile_completeness : "+JSON.stringify(error));
  }
}

getStudentEducationDetails(user_id){
  try{
      return this.httpClient.post(`${this.baseUrl}/admin_api/foreignoffice/getEducationalDetail`,{
          user_id : user_id,             
      });
  }catch(error) {
      this.handleError("getStudentEducationDetails : "+JSON.stringify(error));
  }
}

studentDeallocateCollege(id,userid,collegename){
  try{
      return this.httpClient.post(`${this.baseUrl}/admin_api/foreignoffice/deallocateCollege`,{
          user_id : userid,             
          application_id : id,             
          collegename : collegename,             
      });
  }catch(error) {
      this.handleError("getStudentEducationDetails : "+JSON.stringify(error));
  }
}

studentPreferencesList(user_id,course_id,application_id){
  try{
      return this.httpClient.post(`${this.baseUrl}/admin_api/foreignoffice/collegeListView`,{
          applicationId : application_id,
          userId : user_id,
          course_id :course_id                 
      });
  }catch(error) {
      this.handleError("getStudentPreferencesList : "+JSON.stringify(error));
  }
}

addMoreCollegesList(user_id,course_id,application_id,specialization){
  try{
      return this.httpClient.post(`${this.baseUrl}/admin_api/foreignoffice/addAnotherColleges`,{
          applicationId : application_id,
          userid : user_id,
          course_id :course_id,
          specialization : specialization 
      });
  }catch(error) {
      this.handleError("getaddMoreCollegesList : "+JSON.stringify(error));
  }
}


downloadAllocationDraftLetter(userid,enrollment,id):Observable<Blob>{
  try{
      let headers = new HttpHeaders();
      headers.append('Content-Type', 'application/json');
      return this.httpClient.get(`${this.baseUrl}/admin_api/foreignoffice/seatAllocateDraftLetter?user_id=`+userid+`&enrollment_no=`+enrollment+`&application_id=`+id, { headers: headers, responseType: 'blob'}).map(
          (res) => {
              return new Blob([res], { type: 'application/pdf' });
          });
  }catch(error) {
    this.handleError("unable to download_document  : "+JSON.stringify(error));
  }
}

downloadFirmLetter(userid,file_name):Observable<Blob>{
  try{
      let headers = new HttpHeaders();
      headers.append('Content-Type', 'application/json');
      return this.httpClient.get(`${this.baseUrl}/admin_api/foreignoffice/download_firm_letter?location=`+userid+`&file_name=`+file_name, { headers: headers, responseType: 'blob'}).map(
          (res) => {
              return new Blob([res], { type: 'application/pdf' });
          });
  }catch(error) {
    this.handleError("unable to downloadFirmLetter  : "+JSON.stringify(error));
  }
}

checkDownloadedFirmLetter(userid,specialization,id){
  try{
      return this.httpClient.get(`${this.baseUrl}/admin_api/foreignoffice/downloadletter?application_id=`+id+`&specialization=`+specialization+`&user_id=`+userid);
  }catch(error) {
    this.handleError("unable to downloadFirmLetter_new  : "+JSON.stringify(error));
  }
}

generateFirmLetter(userid,specialization,id,collegeFees,course_id){
  try{
      return this.httpClient.get(`${this.baseUrl}/admin_api/foreignoffice/generateletter?course_fees=`+collegeFees+`&application_id=`+id+`&specialization=`+specialization+`&user_id=`+userid+`&course_fees_id=`+course_id);
  }catch(error) {
    this.handleError("unable to downloadFirmLetter_new  : "+JSON.stringify(error));
  }
}
collegeAllocation(college_name,application_id){
  try{
      return this.httpClient.post(`${this.baseUrl}/admin_api/foreignoffice/selectedCollege`,{
          applicationId : application_id,
          selectedCollege: college_name          
      });
  } catch(error) {
      this.handleError("collegeAllocation : "+JSON.stringify(error));
  }
}

downloadChallan(location):Observable<Blob>{
  try{
      let headers = new HttpHeaders();
      headers.append('Content-Type', 'application/json');
      return this.httpClient.get(`${this.baseUrl}/admin_api/foreignoffice/download_challan?location=`+location, { headers: headers, responseType: 'blob'}).map(
          (res) => {
              return new Blob([res], { type: 'application/pdf' });
          });
  }catch(error) {
    this.handleError("unable to downloadChallan  : "+JSON.stringify(error));
  }
}

getStudenttracking(){
  try{
    return this.httpClient.get(`${this.baseUrl}/admin_api/Dashboard/tracking_data`);
  }catch(error) {
      this.handleError("getStudenttracking : "+JSON.stringify(error));
  }
}

getTickets(tab_type){
  try{
    return this.httpClient.get(`${this.baseUrl}/admin_api/Dashboard/getTickets?tab=`+tab_type);
  }catch(error) {
      this.handleError("getTickets : "+JSON.stringify(error));
  }
}

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

savedate(value,Online_test_date){
  try{
      return this.httpClient.post(`${this.baseUrl}/admin_api/Application/saveDate`,{
          Online_test_date : Online_test_date,
          date_type : value
      });
  }catch(error) {
      this.handleError("getStudentEducationDetails : "+JSON.stringify(error));
  }

}

saveTime(value,Online_test_time){
  try{
      return this.httpClient.post(`${this.baseUrl}/admin_api/Application/saveTime`,{
        Online_test_time : Online_test_time,
        dateId : value
      });
  }catch(error) {
      this.handleError("getStudentEducationDetails : "+JSON.stringify(error));
  }

}

enterPIMarks(id,pi_test_marks,course_id){
  try{
    return this.httpClient.post(`${this.baseUrl}/admin_api/foreignoffice/savePIMarks`,{
        application_id : id,
        pi_test_marks : pi_test_marks,
        course_id : course_id
    });
  }catch(error) {
      this.handleError("enterPIMarks : "+JSON.stringify(error));
  }
}

totalseats(user_id,course_id,application_id){
  try{
      return this.httpClient.post(`${this.baseUrl}/admin_api/foreignoffice/seatsListView`,{
          applicationId : application_id,
          userId : user_id,
          course_id :course_id                 
      });
  }catch(error) {
      this.handleError("getStudentPreferencesList : "+JSON.stringify(error));
  }
}

allocateSeat(user_id,course_id,application_id,category){
  try{
      return this.httpClient.post(`${this.baseUrl}/admin_api/foreignoffice/allocateSeat`,{
          applicationId : application_id,
          userId : user_id,
          course_id :course_id,
          category : category             
      });
  }catch(error) {
      this.handleError("getStudentPreferencesList : "+JSON.stringify(error));
  }
}

failStudent(user_id,course_id,application_id){
  try{
      return this.httpClient.post(`${this.baseUrl}/admin_api/foreignoffice/failStudent`,{
          applicationId : application_id,
          userId : user_id,
          course_id :course_id                 
      });
  }catch(error) {
      this.handleError("getStudentPreferencesList : "+JSON.stringify(error));
  }
}

getAllCollegeDetail(college_id){
  try{
    return this.httpClient.get(`${this.baseUrl}/admin_api/institute_management/institute_view?id=`+college_id);
  }catch(error) {
      this.handleError("getAllCollegeDetail : "+JSON.stringify(error));
  }
}


  private handleError(error){
    console.error(error);
   }




}
