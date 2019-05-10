import {Component} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router , ActivatedRoute } from '@angular/router';
import { NbAuthService } from '@nebular/auth';
import { ApiService } from '../../shared/api.service';
import { saveAs } from 'file-saver';
import { HeaderComponent } from '../../@theme/components/header/header.component';
@Component({
  selector: 'downloads',
  styleUrls: ['./downloads.component.scss'],
  templateUrl: './downloads.component.html',
  providers:[HeaderComponent],
})
export class DownloadsComponent  {
  transcriptdata;
  transcriptlength;
  appdata;
  provisionalletterdata;
  finalletterdata;
  applicationsdata;
  name;
  applications_count;
  application_letter_count;
  provisional_eligiblity_letter_count;
  final_letter_count;
  challan_data;
  data;
  first_challan_count;
  second_challan_count;
  third_challan_count;
  document_name;
  file;
  show = true;
  show1 = true;
  show2 = true;
  show3 = true;
  constructor(private authService: NbAuthService,
    public http: HttpClient,
     protected api : ApiService,
     private comp: HeaderComponent,
     ) {
  }
  ngOnInit() {
    this.api.getTheme();
   this.api.getDownloadsInfo()
      .subscribe(data => {
        
        if(data['status'] == 200){
          this.transcriptdata =  data['data']['transcript'];
          this.transcriptlength = this.transcriptdata.length;
          this.applications_count =  data['data'].applications_count;
          if(this.applications_count >= 2){
            this.applicationsdata =  data['data']['applicationsdata1'];
          }else{
            this.challan_data = data['data']['applications'];
            this.appdata =  data['data']['appdata1'];
            this.provisionalletterdata =  data['data']['provisional_eligiblity_letter_data1'];
            this.finalletterdata =  data['data']['final_letter_data1'];
            this.application_letter_count =  data['data'].application_letter_count;
            this.provisional_eligiblity_letter_count =  data['data'].provisional_eligiblity_letter_count;
            this.final_letter_count =  data['data'].final_letter_count;
            this.first_challan_count =  data['data'].first_challan_count;
            this.second_challan_count =  data['data'].second_challan_count;
            this.third_challan_count =  data['data'].third_challan_count;
        }
      }else{
        this.applications_count=0;
    }
      });
  }
  downloadTranscript(file_name){
    this.api.downloadFiles(file_name)
    .subscribe(data => {
     saveAs(data, file_name);    
    });
  }

  downloadletter(id,file){
    var file_name = id+file;
    this.api.downloadFiles(file_name)
    .subscribe(data => {
     saveAs(data, file_name);    
    });
  }

  downloadchallan(file_name){
    this.api.downloadFiles(file_name)
    .subscribe(data => {
     saveAs(data, file_name);  
    });
  }
  

  
  close(d){
    if(d == 'show'){
      this.show= false; 
    }else if(d == 'show1'){
      this.show1= false; 
    }else if(d == 'show2'){
      this.show2= false; 
    }else if(d == 'show3'){
      this.show3= false; 
    }
  }

  getLetter(id){
    this.api.getFilesdata(id)
      .subscribe(data => {
        this.show = true;
        this.show1 = true;
        this.show2 = true;
        this.show3 = true;
        this.challan_data = data['data']['applications'];
        this.appdata =  data['data']['applicationsdata1'];
        this.provisionalletterdata =  data['data']['provisional_eligiblity_letter1'];
        this.finalletterdata =  data['data']['final_letter1'];
        this.application_letter_count =  data['data']['application_letter_count'];
        this.provisional_eligiblity_letter_count =  data['data'].provisional_eligiblity_letter_count;
        this.final_letter_count =  data['data'].final_letter_count;
        this.first_challan_count =  data['data'].first_challan_count;
        this.second_challan_count =  data['data'].second_challan_count;
        this.third_challan_count =  data['data'].third_challan_count;
      });
  }
  getDocument(doc){
    if(doc == 'Sponsorship Letter'){
      document.getElementById('Sponsorship').style.visibility = 'visible';
      this.document_name = 'Sponsorship Letter',
      this.file = 'SponsorshipLetter.pdf'
    }
    else  if(doc == 'SelfAffidavit'){
      document.getElementById('Sponsorship').style.visibility = 'visible';
      this.document_name = 'Self Affidavit',
      this.file = 'Self Affidavit 2018-19.pdf'
    }else  if(doc == 'Self_Affidavit_pp'){
      document.getElementById('Sponsorship').style.visibility = 'visible';
      this.document_name = 'Self Affidavit - Pune to Pune',
      this.file = 'Self Affidavit - Pune to Pune 2018-19.pdf'
    }else  if(doc == '3rd_Person_Affidavit'){
      document.getElementById('Sponsorship').style.visibility = 'visible';
      this.document_name = '3rd Person Affidavit (Candidates below 18 years of age)',
      this.file = '3rd Person Affidavit (Candidates below 18 years of age) 2018-19.pdf'
    }else  if(doc == '3rd_Person_Affidavit_pp'){
      document.getElementById('Sponsorship').style.visibility = 'visible';
      this.document_name = '3rd Person Affidavit - Pune to Pune (Candidates below 18 years of age)',
      this.file = '3rd Person Affidavit - Pune to Pune (Candidates below 18 years of age) 2018-19.pdf'
    }
  }
  downloaddocument(document,file){
    if(document == 'Sponsorship Letter'){
      var location = 'Affidavit';
      this.api.downloadDocument(location,file)
      .subscribe(data => {
      saveAs(data, file);    
    });
    }
    else if(document == 'Self Affidavit'){
        var location = 'Affidavit';
        this.api.downloadDocument(location,file)
        .subscribe(data => {
        saveAs(data, file);    
      });
    }else if(document == 'Self Affidavit - Pune to Pune'){
        var location = 'Affidavit';
        this.api.downloadDocument(location,file)
        .subscribe(data => {
        saveAs(data, file);    
      });
    }else if(document == '3rd Person Affidavit (Candidates below 18 years of age)'){
        var location = 'Affidavit';
        this.api.downloadDocument(location,file)
        .subscribe(data => {
        saveAs(data, file);    
      });
  }else if(document == '3rd Person Affidavit - Pune to Pune (Candidates below 18 years of age)'){
      var location = 'Affidavit';
      this.api.downloadDocument(location,file)
      .subscribe(data => {
      saveAs(data, file);    
    });
  }
  }
}

