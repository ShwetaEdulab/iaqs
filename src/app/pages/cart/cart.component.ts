import {Component} from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../shared/api.service';
import { NbDateService, NbDialogService } from '@nebular/theme';
import { Firstpaymentdialog } from './dialog/Firstpaymentdialog';
import { HeaderComponent } from '../../@theme/components/header/header.component';

@Component({
  selector: 'cart',
  styleUrls: ['./cart.component.scss'],
  templateUrl: './cart.component.html',
  providers:[HeaderComponent],
  
})
export class CartComponent  {
  items = [
    { title: 'View' },
    { title: 'Checkout' },
  ];
  constructor(private router : Router,
    private api : ApiService,
    protected dateService: NbDateService<Date>,
    private dialogService: NbDialogService,
    private comp: HeaderComponent,
) {
   
  }
 cartList;
 totalPayment;
 courseId;
 preferencesList;
 preferences_created;
 total_pref;
 colleges;

  async ngOnInit() {
    this.api.getTheme();
    try{
      var response = await this.api.getCartValue();
      this.cartList = response['data']['course'];
      this.totalPayment = response['data']['totalCartPayment'];
    }catch(error){
      console.error("Error from ngOnInit => "+error);
    }
  }

  async remove(courseId){
    var result = await this.api.cartRemove(courseId);
    result.subscribe(data => {
        this.ngOnInit();
      },
      error => {
        console.error("Error", error);
      }
    )
  }

  async preferencesRedirect(courseId){
    this.router.navigate(['/pages/preferences'],{queryParams:{courseId:courseId}})
  }

  paymentProcess(courseId,fee){
    this.dialogService.open(Firstpaymentdialog, {
      context: {
       title: '',
       eligibilityFee: fee ,
      },
   });
  }

}

