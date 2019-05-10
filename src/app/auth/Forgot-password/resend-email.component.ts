import { Component, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { Router } from '@angular/router';
import { ApiService } from '../../shared/api.service';
import { NbDialogService } from '@nebular/theme';

@Component({
    selector: 'nb-dialog',
    template: `
    <nb-card  class="col-md-6 offset-md-3">
   
        <nb-card-body>
        <div class="row">
            <input [(ngModel)]="email" id="resendemail"  nbInput type="text" placeholder="Enter Your Email"  class="form-control">      
            <span style="color:green;">An email has been sent to [ {{email}} ] containing the instructions to change your password. Please check your email.</span>       
        </div>
        </nb-card-body>
        <nb-card-footer>
            <div class="row">
            <div class="col-lg-6"><button nbButton outline status="success"  (click)="ResendEmail()">Resend-Email</button></div>
            <div class="col-lg-6"><button nbButton outline status="success"  (click)="close()">Close</button></div>
            </div> 
        </nb-card-footer>
    </nb-card>
    `,
    })
    export class ResendEmailComponent {
        @Input() email:string;
      
        alertflag=0;
            constructor(protected ref: NbDialogRef<ResendEmailComponent>,
                protected api : ApiService,
                private dialogService: NbDialogService,
                private router : Router,
                ) {
            }
               
            ngOnInit() {
            
            this.email;
            }
            ResendEmail(){
                this.api.ForgotPassword(this.email)
                .subscribe(
                        (data: any) => {
                        if(data['status'] == 200){
                           
                            this.router.navigate(['auth/login']);     
                            this.ref.close();   
    
                        }else if(data['status'] == 400){
                                // this.messagealertflag = 1;                               
    
                        }else{
    
                        }       
                                 err => console.error(err)
                        });
                             
            }
        
            close()
            {
                this.router.navigate(['auth/request-password']);
                
                this.ref.close();         
            }
            dismiss() {            
                this.ref.close();
                }
            
        }