import { Component } from '@angular/core';
import { Router,ActivatedRoute} from '@angular/router';
import { UserService } from '../../../@core/data/users.service';
import { NbToastrService, NbThemeService } from '@nebular/theme';
import {Location} from '@angular/common';
import { SupportapiService } from '../../../shared/supportapi.service';
import { ApiService } from '../../../shared/api.service';
//import { CommentComponent } from '../comment/comment.component';

@Component({
    selector: 'viewTicket',
    styleUrls: ['./viewTicket.component.scss'],
    templateUrl: './viewTicket.component.html',
})

export class ViewTicketComponent{
    ticketData;
    comments;
    today;
    comment="";
    user = {email :"",name:"",role:""};
    ticketStatus;
    statusFlag : boolean = true;
    status = [{name:"New", value:0},{name:"Open", value:1},{name:"Pending", value:2},{name:"Closed", value:3}];
    constructor(private toastrService: NbToastrService,
        private router: Router,
        private route : ActivatedRoute,
        private userService: UserService,
        private supportapi : SupportapiService,
        private _location: Location,
        private api : ApiService,
        public themeService : NbThemeService){

        }
    
    ngOnInit(){
        this.api.getTheme().subscribe((data: any) => {
            if(data['data']){
              this.themeService.changeTheme(data['data']);
            }else{
              this.themeService.changeTheme('default');
            }
          });
        this.userService.onUserChange()
        .subscribe((user: any) => this.user = user);
        this.comment="";
        var uid = this.route.snapshot.queryParamMap.get('ticket_uid');
        this.today = new Date().toUTCString();        
        var response =  this.supportapi.getSingleTicket(uid);
        response.subscribe(
            data => {
                this.ticketData = data['data'];   
                this.ticketStatus = this.ticketData.status;                
                this.comments = this.ticketData['comments'];                           
            },
            error => {
                console.error("ngOnInit get Single Ticket : ", error);
            }
        );
        if(this.user.role == "admin"){
          this.statusFlag = false;
        }
    }

    backClicked(){
        this._location.back();
    }

    writeComment(role,email){
      var response =  this.supportapi.commentOnTicket(this.ticketData.ticket_id,this.comment,role,email);
        response.subscribe(
        data => {
          this.toastrService.show(
            status || 'Success',       
            `Comment added successfully ! ! `, 
          );
        this.ngOnInit();
        
        },
        error => {
          console.error("commentOnTicket : ", error);
        }
      ); 
    }

    changeStatus(event){
      var response =  this.supportapi.updateStatus(this.ticketData.ticket_id,event.value);
        response.subscribe(
        data => {
          
        },
        error => {
          console.error("changeStatus : ", error);
        }
      ); 
    }

}