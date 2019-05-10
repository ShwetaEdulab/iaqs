import {
  Component
} from '@angular/core';
import {
  HttpClient
} from '@angular/common/http';
import {
  ApiService
} from '../../shared/api.service';
import {
  Router,
  ActivatedRoute
} from '@angular/router';
import {
  NbSearchService
} from '@nebular/theme';
import { SocketService } from '../../shared/socket.service';
import { HeaderComponent } from '../../@theme/components/header/header.component';
@Component({
  selector: 'selectcollege',
  styleUrls: ['./selectcollege.component.scss'],
  templateUrl: './selectcollege.component.html',
  providers:[HeaderComponent],
})
export class SelectCollegeComponent {
  loading = true;
  loadingbutton = true;
  course_id;
  college_name;
  defaultName;
  pref1;
  pref2;
  pref3;
  pref4;
  pref5;
  pref6;
  pref7;
  pref8;
  pref9;
  pref10;
  tag;
  Dropdown = 1;
  errortext;
  college_name_second;
  user_id: any;
  constructor(private searchService: NbSearchService,
    private route: ActivatedRoute, 
    private router: Router,
    public http: HttpClient, 
    protected api: ApiService,
    private socket : SocketService,
    private comp: HeaderComponent,
    ) {}
  async ngOnInit() {
    this.api.getTheme();
    this.searchService.onSearchSubmit()
      .subscribe((data: any) => {
        this.loading = true;
        this.loadingbutton = true;
        this.api.searchPreferences(data.term, this.route.snapshot.queryParamMap.get('courseId'))
          .subscribe(data => {
              this.loading = false;
              this.loadingbutton = false;
              this.college_name = data['colleges'];
              this.Dropdown = 2;
              for (let entry of this.college_name) {
                const index: number = this.college_name.indexOf(entry);
                if (this.pref1 == entry.name) {
                  this.college_name.splice(index, 1);
                }
                if (this.pref2 == entry.name) {
                  this.college_name.splice(index, 1);
                }
                if (this.pref3 == entry.name) {
                  this.college_name.splice(index, 1);
                }
                if (this.pref4 == entry.name) {
                  this.college_name.splice(index, 1);
                }
                if (this.pref5 == entry.name) {
                  this.college_name.splice(index, 1);
                }
                if (this.pref6 == entry.name) {
                  this.college_name.splice(index, 1);
                }
                if (this.pref7 == entry.name) {
                  this.college_name.splice(index, 1);
                }
                if (this.pref8 == entry.name) {
                  this.college_name.splice(index, 1);
                }
                if (this.pref9 == entry.name) {
                  this.college_name.splice(index, 1);
                }
                if (this.pref10 == entry.name) {
                  this.college_name.splice(index, 1);
                }
              }

            },

            error => {
              console.log("Error", error);
            }

          );
      });
    try {
      var response = await this.api.getcollegescoursewise(this.route.snapshot.queryParamMap.get('courseId'));
      response.subscribe(
        data => {
          this.pref1 = data['data']['name'];
          this.defaultName = data['data']['name'];
          this.college_name = data['data']['colleges'];
          for (let entry of this.college_name) {
            const index: number = this.college_name.indexOf(entry);
            if (entry.name == data['data']['name']) {
              this.college_name.splice(index, 1);
              this.college_name.unshift(entry);
            }
          }
          this.loading = false;
          this.loadingbutton = false;

        },
        error => {
          console.log("Error", error);
        }
      );

    } catch (error) {}
  }

  OptionsSelected(event: any) {
    if (event.target.checked == true) {
      if (this.pref1 == '' || this.pref1 == undefined) {
        this.pref1 = event.target.value;
      } else if (this.pref2 == '' || this.pref2 == undefined) {
        this.pref2 = event.target.value;
      } else if (this.pref3 == '' || this.pref3 == undefined) {
        this.pref3 = event.target.value;
      } else if (this.pref4 == '' || this.pref4 == undefined) {
        this.pref4 = event.target.value;
      } else if (this.pref5 == '' || this.pref5 == undefined) {
        this.pref5 = event.target.value;
      } else if (this.pref6 == '' || this.pref6 == undefined) {
        this.pref6 = event.target.value;
      } else if (this.pref7 == '' || this.pref7 == undefined) {
        this.pref7 = event.target.value;
      } else if (this.pref8 == '' || this.pref8 == undefined) {
        this.pref8 = event.target.value;
      } else if (this.pref9 == '' || this.pref9 == undefined) {
        this.pref9 = event.target.value;
      } else if (this.pref10 == '' || this.pref10 == undefined) {
        this.pref10 = event.target.value;
      }
    } else {
      if (this.pref1 == event.target.value) {
        this.pref1 = '';
      } else if (this.pref2 == event.target.value) {
        this.pref2 = '';
      } else if (this.pref3 == event.target.value) {
        this.pref3 = '';
      } else if (this.pref4 == event.target.value) {
        this.pref4 = '';
      } else if (this.pref5 == event.target.value) {
        this.pref5 = '';
      } else if (this.pref6 == event.target.value) {
        this.pref6 = '';
      } else if (this.pref7 == event.target.value) {
        this.pref7 = '';
      } else if (this.pref8 == event.target.value) {
        this.pref8 = '';
      } else if (this.pref9 == event.target.value) {
        this.pref9 = '';
      } else if (this.pref10 == event.target.value) {
        this.pref10 = '';
      }
    }


  }

  async clearsearch() {
    this.loading = true;
    this.loadingbutton = true;
    try {
      var response = await this.api.getcollegescoursewise(this.route.snapshot.queryParamMap.get('courseId'));
      response.subscribe(
        data => {
          this.college_name = data['data']['colleges'];
          this.loading = false;
          this.loadingbutton = false;
          this.Dropdown = 1;
          for (let entry of this.college_name) {
            const index: number = this.college_name.indexOf(entry);
            if (this.pref1 == entry.name) {
              this.college_name.splice(index, 1);
            }
            if (this.pref2 == entry.name) {
              this.college_name.splice(index, 1);
            }
            if (this.pref3 == entry.name) {
              this.college_name.splice(index, 1);
            }
            if (this.pref4 == entry.name) {
              this.college_name.splice(index, 1);
            }
            if (this.pref5 == entry.name) {
              this.college_name.splice(index, 1);
            }
            if (this.pref6 == entry.name) {
              this.college_name.splice(index, 1);
            }
            if (this.pref7 == entry.name) {
              this.college_name.splice(index, 1);
            }
            if (this.pref8 == entry.name) {
              this.college_name.splice(index, 1);
            }
            if (this.pref9 == entry.name) {
              this.college_name.splice(index, 1);
            }
            if (this.pref10 == entry.name) {
              this.college_name.splice(index, 1);
            }
          }

        },
        error => {
          console.log("Error", error);
        }
      );

    } catch (error) {}
  }

  async check_preferences() {
    if (this.college_name.length > 5) {
      if (this.pref1 == '' || this.pref2 == '' || this.pref3 == '' || this.pref4 == '' || this.pref5 == '' || this.pref1 == undefined || this.pref2 == undefined || this.pref3 == undefined || this.pref4 == undefined || this.pref5 == undefined) {
        this.errortext = "You Should select minimum 5 colleges";
      } else {
        this.errortext = "";
        try {
          var response = await this.api.addPreferences(this.route.snapshot.queryParamMap.get('courseId'), this.pref1, this.pref2, this.pref3, this.pref4, this.pref5, this.pref6, this.pref7, this.pref8, this.pref9, this.pref10);
          response.subscribe(
            data => {
              this.user_id=data['data']['user_id'];
              this.socket.getCartvalue(this.user_id);
              this.router.navigateByUrl('/pages/cart');
            },
            error => {
              console.log("Error", error);
            }
          );

        } catch (error) {}
      }
    } else {
      if (this.college_name.length == 5) {
        if (this.pref1 == '' || this.pref2 == '' || this.pref3 == '' || this.pref4 == '' || this.pref5 == '' || this.pref1 == undefined || this.pref2 == undefined || this.pref3 == undefined || this.pref4 == undefined || this.pref5 == undefined) {
          this.errortext = "You Should select all colleges";
        } else {
          this.errortext = "";
          try {
            var response = await this.api.addPreferences(this.route.snapshot.queryParamMap.get('courseId'), this.pref1, this.pref2, this.pref3, this.pref4, this.pref5, this.pref6, this.pref7, this.pref8, this.pref9, this.pref10);
            response.subscribe(
              data => {
                this.router.navigateByUrl('/pages/cart');
              },
              error => {
                console.log("Error", error);
              }
            );

          } catch (error) {}
        }
      }

      if (this.college_name.length == 4) {
        if (this.pref1 == '' || this.pref2 == '' || this.pref3 == '' || this.pref4 == '' || this.pref1 == undefined || this.pref2 == undefined || this.pref3 == undefined || this.pref4 == undefined) {
          this.errortext = "You Should select all colleges";
        } else {
          this.errortext = "";
          try {
            var response = await this.api.addPreferences(this.route.snapshot.queryParamMap.get('courseId'), this.pref1, this.pref2, this.pref3, this.pref4, this.pref5, this.pref6, this.pref7, this.pref8, this.pref9, this.pref10);
            response.subscribe(
              data => {
                this.router.navigateByUrl('/pages/cart');
              },
              error => {
                console.log("Error", error);
              }
            );

          } catch (error) {
            console.log("Error", error);
          }
        }
      }

      if (this.college_name.length == 3) {
        if (this.pref1 == '' || this.pref2 == '' || this.pref3 == '' || this.pref1 == undefined || this.pref2 == undefined || this.pref3 == undefined) {
          this.errortext = "You Should select all colleges";
        } else {
          this.errortext = "";
          try {
            var response = await this.api.addPreferences(this.route.snapshot.queryParamMap.get('courseId'), this.pref1, this.pref2, this.pref3, this.pref4, this.pref5, this.pref6, this.pref7, this.pref8, this.pref9, this.pref10);
            response.subscribe(
              data => {
                this.router.navigateByUrl('/pages/cart');
              },
              error => {
                console.log("Error", error);
              }
            );

          } catch (error) {
            console.log("Error", error);
          }
        }
      }

      if (this.college_name.length == 2) {
        if (this.pref1 == '' || this.pref2 == '' || this.pref1 == undefined || this.pref2 == undefined) {
          this.errortext = "You Should select all colleges";
        } else {
          this.errortext = "";
          try {
            var response = await this.api.addPreferences(this.route.snapshot.queryParamMap.get('courseId'), this.pref1, this.pref2, this.pref3, this.pref4, this.pref5, this.pref6, this.pref7, this.pref8, this.pref9, this.pref10);
            response.subscribe(
              data => {
                this.router.navigateByUrl('/pages/cart');
              },
              error => {
                console.log("Error", error);
              }
            );

          } catch (error) {
            console.log("Error", error);
          }
        }
      }

      if (this.college_name.length == 1) {
        if (this.pref1 == '' || this.pref1 == undefined) {
          this.errortext = "You Should select all colleges";
        } else {
          this.errortext = "";
          try {
            var response = await this.api.addPreferences(this.route.snapshot.queryParamMap.get('courseId'), this.pref1, this.pref2, this.pref3, this.pref4, this.pref5, this.pref6, this.pref7, this.pref8, this.pref9, this.pref10);
            response.subscribe(
              data => {
                this.router.navigateByUrl('/pages/cart');
              },
              error => {
                console.log("Error", error);
              }
            );

          } catch (error) {
            console.log("Error", error);
          }
        }
      }
    }
  }
}