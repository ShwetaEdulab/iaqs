import {Component} from '@angular/core';
import { NbSearchService } from '@nebular/theme';
import { SearchService } from '../../shared/search.service';
import { Router,ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup,Validators, FormControl, } from '@angular/forms';
import { ApiService } from '../../shared/api.service';
import { Observable } from 'rxjs';
import { NbDialogService } from '@nebular/theme';
import {PeerComponent } from '../collegeinfo/peer.component';
@Component({
  selector: 'peers',
  styleUrls: ['./peers.scss'],
  templateUrl: './peers.component.html',
})
export class PeersComponent  {
  myControl = new FormControl();
  available_counsellors;
  collegelist;
  peerstatus:any;
  mobile :any;
  available_from:any;
  available_to:any;
  peer : any;
  peer_id : any;
  college_id;
  courseid;
  constructor(private searchService: NbSearchService,
             protected api : ApiService, 
            private route : ActivatedRoute,
              private dialogService: NbDialogService) {
   
  }

  ngOnInit() {
  this.college_id =  this.route.snapshot.queryParamMap.get('college_id');
  this.courseid = this.route.snapshot.queryParamMap.get('cour_id');
    this.api.getPeers(this.college_id,this.courseid) 
    .subscribe(data => { 
      this.available_counsellors =  data['data']['available_counsellors'];
      this.collegelist= data['data']['college_detail'];
    });
  }

    onClick(peer,status){
      this.peerstatus = status;
      this.mobile =peer;
      this.dialogService.open(PeerComponent, {
        closeOnBackdropClick : false,
        context: {
          peerstatus : this.peerstatus,
          mobile :this.mobile
        },
    });
    }

    offlineClick(peer_id,peer,status,to,from){
      this.peerstatus = status;
      this.available_to = to;
      this.available_from = from;
      this.mobile =peer;
      this.peer_id = peer_id
      this.dialogService.open(PeerComponent, {
        closeOnBackdropClick : false,
        context: {
          peer_id : this.peer_id,
          peerstatus : this.peerstatus,
          available_to : this.available_to,
          available_from : this.available_from,
          mobile :this.mobile
      },
    });

    }
}
