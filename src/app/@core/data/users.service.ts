
import { of as observableOf,  Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { NbAuthService, NbAuthJWTToken } from '@nebular/auth';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
let counter = 0;

@Injectable()
export class UserService {

  protected user$: BehaviorSubject<any> = new BehaviorSubject(null);

private publishUser(user: any) {
   this.user$.next(user)
}

onUserChange(): Observable<any> {
  return this.user$;
}


  private users = {
    // nick: { name: 'Francis Pinto', picture: 'assets/images/nick.png' },
    // eva: { name: 'Eva Moor', picture: 'assets/images/eva.png' },
    // jack: { name: 'Jack Williams', picture: 'assets/images/jack.png' },
    // lee: { name: 'Lee Wong', picture: 'assets/images/lee.png' },
    // alan: { name: 'Alan Thompson', picture: 'assets/images/alan.png' },
    // kate: { name: 'Kate Martinez', picture: 'assets/images/kate.png' },
  };

  private userArray: any[];

  constructor(private authService: NbAuthService) {
    // this.userArray = Object.values(this.users); 
    this.authService.onTokenChange()
    .subscribe((token: NbAuthJWTToken) => {
      if (token.isValid()) {
        //console.log("token =>"+token);
       // this.user['name']=token.getPayload()['name'];
      //  console.log(token.getPayload()['name']);
      //  console.log("profileCompleteness ==== >"+token.getPayload()['profileCompleteness']);
       this.publishUser (token.getPayload());
    }

    });
  }

  getUsers(): Observable<any> {
    return observableOf(this.users);
  }

  getUserArray(): Observable<any[]> {
    return observableOf(this.userArray);
  }

  getUser(): Observable<any> {
    counter = (counter + 1) % this.userArray.length;
    return observableOf(this.userArray[counter]);
  }
}
