import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { NbAuthService } from '@nebular/auth';
import { NbThemeService } from '@nebular/theme';
import { config } from '../../../config';
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class InstituteApiService {
  private baseUrl = config.serverUrl;
  constructor(
    private httpClient : HttpClient,
    public authService : NbAuthService,
    public themeService : NbThemeService) { 
    }

  //Course Listing Starts Here//
  getCourseList(){
    try{
      return this.httpClient.get(`${this.baseUrl}/institute_api/course-listing`);
    }catch(error) {
      this.handleError("getApplication : "+JSON.stringify(error));
    }
  }

  getCourse(name){
    try{
      return this.httpClient.get(`${this.baseUrl}/institute_api/searchDegree?country=India&degree=`+name);
    }catch(error) {
      this.handleError("getApplication : "+JSON.stringify(error));
    }
  }

  getspecialization(coursename, degreename){
    try{
      return this.httpClient.get(`${this.baseUrl}/institute_api/searchDegree?country=India&degree=`+degreename+`&course=`+coursename);
    }catch(error) {
      this.handleError("getApplication : "+JSON.stringify(error));
    }
  }

  getCourseId(degreename,coursename,specialization){
    try{
      return this.httpClient.post(`${this.baseUrl}/institute_api/getCourseId`,{
        degree : degreename,
        course : coursename,
        specialization : specialization
      });
    }catch(error) {
      this.handleError("getApplication : "+JSON.stringify(error));
    }
  }
  
  courseList(courseId){
    //var courseId;
    try{
      return this.httpClient.get(`${this.baseUrl}/institute_api/course?courseId=`+courseId);
    }catch(error) {
      this.handleError("getApplication : "+JSON.stringify(error));
    }
  }

  
  saveCourseOverview(instituteId,overview_data,courseId){
    try{
      return  this.httpClient.post(`${this.baseUrl}/institute_api/`+instituteId+`/course/course-overview`,{
        data : overview_data,courseId
      });
    }catch(error){
      this.handleError("setProfileValues: "+JSON.stringify(error));
    }
  }

  facultyData(faculty_data,courseID){
    try{
      return  this.httpClient.post(`${this.baseUrl}/institute_api/`+courseID+`/faculty`,{
        data : faculty_data,courseID
      });
    }catch(error){
      this.handleError("setProfileValues: "+JSON.stringify(error));
    }
  }

  deleteFaculty(id){
    try{
      return  this.httpClient.delete(`${this.baseUrl}/institute_api/faculty/course/`+id);
    }catch(error){
      this.handleError("setProfileValues: "+JSON.stringify(error));
    }
  }

  addUpdateCurriculum(collegeId,courseID,semester_no,subjects,currId){
    // var collegeId = 1;
    // var courseId = 39;
    try{
      return this.httpClient.post(`${this.baseUrl}/institute_api/`+collegeId+`/course/`+courseID+`/academics`,{
        semester : semester_no, 
        subjects : subjects,
        academicId : currId
      });
    }catch(error){
      this.handleError("setProfileValues: "+JSON.stringify(error));
    }
  }

  getCurriculum(currId,courseID,collegeId){
    try{
      return this.httpClient.get(`${this.baseUrl}/institute_api/`+collegeId+`/course/`+courseID+`/academics/`+currId);
    }catch(error) {
      this.handleError("getApplication : "+JSON.stringify(error));
    }
  }

  deleteCurriculum(collegeId,courseID,id){
    try{
      return this.httpClient.delete(`${this.baseUrl}/institute_api/`+collegeId+`/course/`+courseID+`/academics/`+id);
    }catch(error) {
      this.handleError("getApplication : "+JSON.stringify(error));
    }
  }

  //Course Listing Ends Here//

  //Applicaton Starts Here//
  getApplication(tab){
    try{
      return this.httpClient.get(`${this.baseUrl}/institute_api/application`);
    }catch(error) {
      this.handleError("getApplication : "+JSON.stringify(error));
    }
  }

  //Applicaton Ends Here//


  //Dashboard Starts Here//
  async getDashboardData(){
    try{
       return await this.httpClient.get(`${this.baseUrl}/institute_api/dashboard`);     
    }catch(error) {
      this.handleError("getApplicationLength : "+error);
    }
  }

  //Dashboard Ends Here//


  //College Management //

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

deletePromotionalMaterials(Id){
  try{
    return this.httpClient.post(`${this.baseUrl}/institute_api/deletePromotionalMaterials`,{"Id":Id})
    .map(res => {
      return res;
    })
    
  }catch(error) {
    this.handleError("deletegalleriess : "+error);
  }
  
}

addvideoURL(Id,data){
  try{
    return this.httpClient.post(`${this.baseUrl}/institute_api/updateVideoURL`,{"Id":Id,data:data})
    .map(res => {
      return res;
    })
    
  }catch(error) {
    this.handleError("addvideoURL : "+error);
  }
}

deleteVideourl(Id){
  try{
    return this.httpClient.post(`${this.baseUrl}/institute_api/deleteVideourl`,{"Id":Id})
    .map(res => {
      return res;
    })
    
  }catch(error) {
    this.handleError("deleteVideourl : "+error);
  }
}


  //College Management ends here//




  private handleError(error){
    console.error(error);
  }

}