import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
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
  @Input() insertPhoto = {certifikatBilled: '', cstatus: '', brugerId: 0}
  endpointB = '/Brugers';
  endpointK = '/KontaktOplysningers';
  endpointC = '/Certifikats';
  certifikat: Certifikat = new Certifikat();
  bruger: Bruger;
  kontakt: Kontaktoplysninger;
  brugerList: Bruger[];
  certifikatId: number;
  brugerId: number;
  kontaktId: number;
  afta: string;
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
        this.insertPhoto.certifikatBilled = e.target.result;
        // this.certifikat.cStatus = 2;
        console.log("reader",this.insertPhoto.certifikatBilled);
      }
    }
  };

  onUploadCertifikat() {
    // this.certifikat.certifikatBilled = this.url;
    // if (this.bruger.certifikatStatus == 2) {
    //   return;
    // }
    console.log("test1",this.certifikat.certifikatBilled);
    this.insertPhoto.cstatus = "VentTilGodkendt";
    this.insertPhoto.brugerId =  JSON.parse(localStorage.getItem('brugerId') || '{}');
    console.log("test2",this.insertPhoto);
    this.restApi.createData(this.insertPhoto, this.endpointC).subscribe((data) => {
      this.router.navigate(['../main/main'])
    });
  }
}
