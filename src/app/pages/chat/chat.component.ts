import { Component } from '@angular/core';
import { NbToastrService, NbThemeService } from '@nebular/theme';
import { UserService } from '../../@core/data/users.service';
import { ApiService } from '../../shared/api.service';
import { SupportapiService } from '../../shared/supportapi.service';
import {Location} from '@angular/common';
import { HeaderComponent } from '../../@theme/components/header/header.component';

@Component({
    selector: 'chat',
    styleUrls: ['./chat.component.scss'],
    templateUrl: './chat.component.html',
    providers:[HeaderComponent],
})

export class ChatComponent  {
    chats;
    show = false;
    show1 = false;
    participants = [];
    users = [];
    flag = 0;
    messages = [];
    socket;
    admin;
    owner;
    chatPartner;
    student;
    user = {role :"",email:""};
    user1;
    constructor(private toastrService: NbToastrService,
        public themeService : NbThemeService,
        private userService: UserService,
        protected api : ApiService,
        private supportapi : SupportapiService,
        private _location: Location,
        private comp: HeaderComponent,
    ) {  
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
    var response = this.supportapi.getChatUsersList();
    response.subscribe(
        data =>{
            if(this.user.role == "admin" ){
                this.users = data['users']['student'];
                this.admin = data['users']['admin'];
                this.student = this.users;
                this.admin.forEach(element => {
                    if(element.email != this.user.email){
                        element.lastOnline = "";
                        this.users.push(element);
                    }
                });
                
            }else if(this.user.role == "student"){
                this.users = data['users']['admin'];
                this.admin = this.users;
                this.student = data['users']['student'];
                this.show1 = true;
            }
        })
        
    }

    backClicked(){
        this._location.back();
    }

    viewChats(user){
        this.user1 = user.fullname;
        var requester;
        var participants = [];
        if(this.user.role == "admin"){
            this.admin.forEach(element => {
                if(element.email == this.user.email){
                    this.owner = element.id;
                    requester = element.id;
                    participants.push(element.id);
                    participants.push(user.id);
                }
            });
        }else if(this.user.role == "student"){
            this.student.forEach(element => {
                if(element.email == this.user.email){
                    this.owner = element.id;
                    requester = element.id;
                    participants.push(element.id);
                    participants.push(user.id);
                }
            });
        }

       var response = this.supportapi.getChats(requester,participants);
        response.subscribe(data =>{
            if(data['status'] == 200){
                this.chats = data['chats'];
                if( this.chats.messages !=null || this.chats.messages !='' || this.chats.messages !=undefined )
                {
                    this.messages =  this.chats.messages;
                    this.messages.reverse();
                }
                
                this.flag = 1;
            }
        });
    }

    sendMessage(event){
        var response =  this.supportapi.sendMessage(this.chats.cId, this.owner, event.message);
        response.subscribe(
            data =>{
                this.toastrService.show(
                    status || 'Success',       
                    `Comment added successfully ! ! `, 
                );
                var message = {
                    text : event.message,
                    sender : "You",
                    reply : "true",
                    date : new Date()
                }
                this.messages.push(message);
            }
        )
    }

    chatList(){
        this.show = true;
    }

    searchPartner(){
        this.users = [];
        if(this.user.role == "admin" ){
            this.student.forEach(single => {
                if(single.fullname.toLowerCase() == this.chatPartner.toLowerCase()){
                    this.users.push(single);
                }
            });
        }
        this.show1 = true;
    }
}