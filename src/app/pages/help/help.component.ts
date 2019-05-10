import { Component } from '@angular/core';
import { NbDialogService, NbThemeService } from '@nebular/theme';
import { Router,ActivatedRoute} from '@angular/router';
import { UserService } from '../../@core/data/users.service';
import { ApiService } from '../../shared/api.service';
import { SupportapiService } from '../../shared/supportapi.service';
import { NewTicketComponent } from './newTicket/newTicket.component';
import { HeaderComponent } from '../../@theme/components/header/header.component';
@Component({
    selector: 'help',
    styleUrls: ['./help.component.scss'],
    templateUrl: './help.component.html',
    providers:[HeaderComponent],
})

export class HelpComponent  {
  tickets;
  show = false;
  p: number = 1;
  user = {role :""};
  length;
  
  constructor(private dialogService: NbDialogService,
    private router: Router,
    private userService: UserService,
    protected api : ApiService,
    private supportapi : SupportapiService,
    public themeService : NbThemeService,
    private route: ActivatedRoute,
    private comp: HeaderComponent,) { }
    
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
      var response =  this.supportapi.getUserTickets();
      response.subscribe(
      data => {
        if(data['data']){
          this.show = true;
          this.tickets = data['data'];
          this.length = this.tickets.length;
        }else{
          this.show = false;
          this.length = 0;
        }
      },
      error => {
        console.error("ngOnInit getUserTickets : ", error);
      }
    );  
    if(this.route.snapshot.queryParamMap.get('userEmail')){
      this.createTicket();
    }
  }

  viewTicket(uid){
    this.router.navigate(['pages/viewTicket'],{queryParams:{ticket_uid:uid}});
  }

  createTicket(){
    this.dialogService.open(NewTicketComponent, {
      context: {
        title : 'Raise Ticket',
        userEmail : this.route.snapshot.queryParamMap.get('userEmail')
      },
    }).onClose.subscribe( data =>{
      this.reload_data();
      //this.router.navigate(['pages/help']);
    });
  }

  reload_data(){
    var response =  this.supportapi.getUserTickets();
    response.subscribe(
    data => {
      if(data['data']){
        this.show = true;
        this.tickets = data['data'];
        this.length = this.tickets.length;
      }else{
        this.show = false;
        this.length = 0;
      }
    },
    error => {
      console.error("reload_data getUserTickets : ", error);
    }
  );  
  }
}