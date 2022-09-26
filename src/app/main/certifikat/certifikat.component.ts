import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { RestApiService } from 'src/app/shared/rest-api.service';

@Component({
  selector: 'app-certifikat',
  templateUrl: './certifikat.component.html',
  styleUrls: ['./certifikat.component.css']
})
export class CertifikatComponent implements OnInit {
  @Input() insertPhoto = {certifikatBilled: '', cstatus: '', brugerId: 0}
  endpointC = '/Certifikats';
  brugerId: number;

  constructor(
    public restApi: RestApiService,
    public router: Router,
    public http: HttpClient
  ) { }

  ngOnInit(): void {
    this.brugerId = JSON.parse(localStorage.getItem('brugerId') || '{}');
  }

  onSubmitCertifikat(event: any) {
    if (event.target.files) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (e: any) => {
        this.insertPhoto.certifikatBilled = e.target.result;
      }
    }
  };

  onUploadCertifikat() {
    this.insertPhoto.cstatus = "VentTilGodkendt";
    this.insertPhoto.brugerId =  JSON.parse(localStorage.getItem('brugerId') || '{}');
    this.restApi.createData(this.insertPhoto, this.endpointC).subscribe((data) => {
      this.router.navigate(['../main/main'])
    });
  }
}
