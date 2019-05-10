import { Component, Input } from '@angular/core';
import { NbDialogRef,NbDialogService,NbSearchService, NbThemeService } from '@nebular/theme';
import { ApiService } from '../../../shared/api.service';
import { CountriesService } from '../../../@core/data/countries.service';


@Component({
selector: 'nb-dialog',
template: `
<nb-card [style.width.px]="850" [style.height.px]="700">
  <nb-card-header>Find College</nb-card-header>
  <nb-card-body>
  <div class="row">
  <div class="col-md-12">
    <nb-card status="success">
        <nb-card-header>
            <h1>Search for colleges</h1>
        </nb-card-header>
        <nb-card-body>
            <nb-tabset fullWidth>
				<nb-tab tabTitle="Find College">
				<div class="row">
               <div class="col-lg-4">
               <input type="text" (keyup)="startSearch('Search','')" class="form-control" [(ngModel)]="Input_Search"  id="inputFirstName"  placeholder="Search College Name">
					      </div>	
				        <div class="col-lg-4">	
                <mat-form-field>
                  <mat-select [(ngModel)]="SelectedCountries" name="selectedCountry"  (ngModelChange)="startSearch('Country_Search',$event)">
                    <mat-option *ngFor="let country of Countries" [value]="country.name">
                    {{country.name}}
                    </mat-option>
                  </mat-select>
                </mat-form-field>
					    </div>
				    
				</div>	
            <div class="row">
              <div class="col-md-12">
                  <nb-card size="large">
                      <nb-list>
                          <nb-list-item style="padding: 0;">
                            <div class="row" style="padding: 0;margin-left:8px">
                              <div class="col-lg-4" style="padding: 12;border:1px solid #DFDFDF;">
                                <h4> Name </h4>
                              </div>
                              <div class="col-lg-6"  style="padding: 12;border:1px solid #DFDFDF;background-color:#F2F2F2;">
                                <h4> Location </h4>
                              </div>
                            </div>
                          </nb-list-item>
                          <nb-list-item *ngFor="let college of colleges?.diploma_info" style="padding: 0;">
                            <div class="row"  style="padding: 0;border:1px solid #DFDFDF; margin-left:8px;">
                              <div class="col-lg-4" style="padding: 12;">
                                <input type='radio' name='Tick' data-id='{{ college.school_id }}' title='{{college.school_name}}' value='{{college.school_id}}' [(ngModel)]="radio_check"/>
                                <h5> {{ college.school_name }} </h5>
                              </div>
                              <div class="col-lg-6" style="padding: 12;background-color:#F2F2F2;">
                                <h5> {{ college.school_add }} </h5>
                              </div>
                            </div>
                            
                          </nb-list-item>
                          <nb-list-item style="padding: 0">
                            <div class="row"  style="padding: 0;border:1px solid #DFDFDF; margin-left:8px;">
                              <div class="col-lg-4"  style="padding: 12;">
                                <input type='radio' name='Tick' data-id='' title='' value=''/>
                                <h5>I dont see my College in this list</h5>
                              </div>
                            <div class="col-lg-6"></div>
                          </div>
                        </nb-list-item>
                      </nb-list>
                  <pagination-controls ></pagination-controls>
                </nb-card>
              </div>
          </div>        
        </nb-tab>
                
            </nb-tabset>
        </nb-card-body>
    </nb-card>
  </div>
</div>
</nb-card-body>
  <nb-card-footer>
    <button nbButton hero status="primary" (click)="dismiss()">Close</button> 
    <button nbButton hero status="primary" (click)="searched_college_value()">Continue</button>
  </nb-card-footer>
</nb-card>
`,
})
export class find_College_Diploma {
@Input() title: string;

colleges;
Countries: any [];//countries coming from json file 
SelectedCountries;// ngModel on countries dropdown
Input_Search; //ngModel on input search engine
collegeFlag : boolean;
radio_check;
searched_selected_data;
constructor(protected ref: NbDialogRef<find_College_Diploma>,
  protected api : ApiService,
  protected countries :CountriesService,
  public themeService : NbThemeService
) {
	this.Countries = this.countries.getData();
  }


  dismiss() {
    this.ref.close();
  }

  ngOnInit() {
     this.api.getTheme().subscribe((data: any) => {
        if(data['data']){
          this.themeService.changeTheme(data['data']);
        }else{
          this.themeService.changeTheme('default');
        }
      });
      this.api.getAllEducationData().subscribe(res=> {
        this.colleges = res;
      });     
  
  }

  startSearch(search_type,country_value) {
    this.SelectedCountries = country_value;
    this.api.getAllEducationDataFilter(this.Input_Search,this.SelectedCountries,"diploma").subscribe(res=> {
      this.colleges = res;
    });     
  }

  searched_college_value() {
    
    this.api.searchedCollegeDetais(this.radio_check,"diploma").subscribe(res=> {
      this.searched_selected_data = res;
      this.ref.close(this.searched_selected_data);
    });  
    
  }

 
}
