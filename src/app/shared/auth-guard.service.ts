import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { NbAuthService } from '@nebular/auth';
import { tap } from 'rxjs/operators/tap';


@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private authService :NbAuthService, private router: Router){
      //console.log( "constructor->Token = [" + JSON.stringify( this.authService.getToken() ) + "]" );
         

    }



  canActivate() {
//     var index;
// var count = localStorage.length;
// console.log( "canActivate->Token = [" + JSON.stringify( this.authService.getToken() ) + "]" );
// console.log( "No. of Local Storage Items = " + count );
// console.log( "Before - Displaying Local Storage Items." );
// for( index = 0; index < count; index++ )
// {
// console.log( "Index = " + index + ", Value = " + localStorage.getItem( localStorage.key( index ) ) );
// }
// console.log( "After - Displaying Local Storage Items." );




    return this.authService.isAuthenticated()
      .pipe(
        tap(authenticated => {
          if (!authenticated) {
            this.router.navigate(['auth/login']);
          }
        }),
      );
   // return this.authService.isAuthenticated();
   //return true;
  }
}