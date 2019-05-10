import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Colleges } from './Colleges';
import { config } from '../../../config';

@Injectable()
export class SearchService {
    private baseUrl = config.serverUrl;
  
    constructor(public http: HttpClient) {
      
      }

       getSearchdata(search){
        try{
            return this.http.get<Colleges>(`${this.baseUrl}/api/search?name=`+search)
                .map(res => {
                    return res.data  ;
            })
        }catch(error) {
            this.handleError("unable to get cart value network error : "+JSON.stringify(error));
        }
    
      }


      getCoursedata(name){
       try{
           return this.http.get<Colleges>(`${this.baseUrl}/api/search/getCourse?name=`+name)
               .map(res => {
                   return res .data ;
           })
       }catch(error) {
           this.handleError("getCoursedata : "+JSON.stringify(error));
       }
   
     }
     getCourseCollegeList(specialization){
      try{
          return this.http.get<Colleges>(`${this.baseUrl}/api/search/coursecollegeinfo?specialization=`+specialization)
              .map(res => {
                  return res .data ;
          })
      }catch(error) {
          this.handleError("getCourseCollegeList : "+JSON.stringify(error));
      }
  
    }

      private handleError(error){
        console.error(error);
       }
}