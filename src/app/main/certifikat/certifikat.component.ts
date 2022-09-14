import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Bruger } from 'src/app/Models/Bruger';
import { Certifikat } from 'src/app/Models/Certifikat';
import { Kontaktoplysninger } from 'src/app/Models/Kontaktoplysninger';

import { RestApiService } from 'src/app/shared/rest-api.service';

@Component({
  selector: 'app-certifikat',
  templateUrl: './certifikat.component.html',
  styleUrls: ['./certifikat.component.css']
})
export class CertifikatComponent implements OnInit {
  endpointB = '/Brugers';
  endpointK = '/KontaktOplysningers';
  endpointC = '/Certifikats';
  certifikat: Certifikat;
  bruger: Bruger;
  kontakt: Kontaktoplysninger;
  brugerList: Bruger[];
  certifikatId: number;
  brugerId: number;
  kontaktId: number;
  file: any;
  url: string = "assets/images/Profil billede.png";

  constructor(
    public restApi: RestApiService,
    public router: Router,
    public http: HttpClient
  ) { }

  ngOnInit(): void {
    this.brugerId = JSON.parse(localStorage.getItem('brugerId') || '{}');
    this.onHentBruger();
  }
onHentBruger() {
    if (this.brugerId = JSON.parse(localStorage.getItem('brugerId') || '{}')) {
      this.restApi.getData(this.brugerId, this.endpointB).subscribe((data) => {
        // this.brugerList = data.filter((res: any) => {
        //   return res.id === this.brugerId;
        // });
        this.bruger = data;
        
      })
    }
  }

  onSubmitCertifikat(event: any) {
    if (event.target.files) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (e: any) => {
        this.url = e.target.result;
        // this.bruger.certifikatBilled = e.target.result;
        // this.bruger.certifikatStatus = 2; 
        this.certifikat.certifikatBilled = e.target.result;
        this.certifikat.cStatus = 2;
        console.log(this.bruger);
      }
    }
  };

  onUploadCertifikat() {
    // if (this.bruger.certifikatStatus == 2) {
    //   return;
    // }
    this.restApi.updateData(this.brugerId, this.endpointB, this.certifikat).subscribe((data) => {
      this.router.navigate(['../main/main'])
    });
  }
}
