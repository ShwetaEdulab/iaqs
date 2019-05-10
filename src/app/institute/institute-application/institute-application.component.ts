import { Component, OnInit } from '@angular/core';
import { UserService } from './../../@core/data/users.service';
import { InstituteApiService } from '../../shared/instituteapi.service';
import { stringify } from '@angular/core/src/util';

@Component({
  selector: 'institute-application',
  templateUrl: './institute-application.component.html',
  styleUrls: ['./institute-application.component.scss']
})
export class InstituteApplicationComponent implements OnInit {
  tab_type;
  collegeId;
  application_data;

  constructor(
    private userService: UserService,
    protected instituteApi : InstituteApiService,
  ) { }

  ngOnInit() {
    this.userService.onUserChange()
    .subscribe(
      (user: any) => {
        this.collegeId = user['collegeId'];
    });

  }
  
  getApplicationDetails(e) {
    var index = e.index;
    if(index == 0){
      this.tab_type = 'requested'
    }else if(index == 1){
      this.tab_type = 'accepted'
    }else if(index == 2){
      this.tab_type = 'rejected'
    }else if(index == 3){
      this.tab_type = 'conditional_provisional'
    }else if(index == 4){
      this.tab_type = 'final_letter'
    }else if(index == 5){
      this.tab_type = 'college_attended'
    }

    if(this.tab_type === 'requested' ||   this.tab_type ==='accept' ||  this.tab_type === 'reject'){
      this.instituteApi.getApplication(this.tab_type).subscribe(data=>{
        this.application_data = data['data'];
      })
      //   this.filterInput
      //   .valueChanges
      //   .debounceTime(200)
      //   .subscribe(term => {
      //   this.filterText = term;
      // });

    }

  }

}
