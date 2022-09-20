import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Bryggeri } from 'src/app/Models/Bryggeri';
import { Kontaktoplysninger } from 'src/app/Models/Kontaktoplysninger';
import { Samarbejde } from 'src/app/Models/Samarbejde';
import { Øl } from 'src/app/Models/Øl';
import { RestApiService } from 'src/app/shared/rest-api.service';

@Component({
  selector: 'app-find-brygger',
  templateUrl: './find-brygger.component.html',
  styleUrls: ['./find-brygger.component.css']
})
export class FindBryggerComponent implements OnInit {
  ol: Øl;
  oller: Øl[];
  kontaktOplysning: Kontaktoplysninger;
  samarbejde: Samarbejde
  bryggeri: any;
  bryggerier: Bryggeri[];
  selected = ''
  endpointB = '/Bryggeris';
  endpointS = '/Samarbejdes';
  endpointK = '/Kontaktoplysningers';
  searchkey: string;
  search: any;
  data = sessionStorage.getItem('id');
  kontaktOplysningId: number;
  olId: number;
  bryggeriId: number;
  clickButton: boolean = true;
  id = this.actRoute.snapshot.params['id'];

  constructor(
    public dialog: MatDialog,
    public restApi: RestApiService,
    public router: Router,
    public actRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.onHentBrygger();
  }

  onHentBrygger() {
    if (this.bryggeriId = JSON.parse(localStorage.getItem('bryggeriId') || '{}')) {
        this.restApi.getDatas(this.endpointB).subscribe((data) => {
        this.bryggeri = data.filter((res: any) => {
          return res.id != this.bryggeriId;
        });
        console.log("bryggeris",this.bryggeri);
      });
    }
  }

  onFindBrygger() {
    if (this.searchkey == "") {
      this.ngOnInit();
    }
    else {
      this.oller = this.oller.filter(res => {
        return res.navn.toLowerCase().match(this.searchkey.toLowerCase());
     })
      console.log('ollist...', this.oller);
      console.log('serachkey...', this.searchkey);
    }
  }

  onShowBrygger(id: number) {
    this.clickButton = false;
    console.log('idOlsogning..', id);
    this.restApi.getData(id, this.endpointB).subscribe(data => {
      this.ol = data;
      console.log('idOl..', data.id);
      this.olId = this.ol.id;
      localStorage.setItem('olId', JSON.stringify(this.olId));
      if(this.ol.bryggeriId){
        this.restApi.getData(this.ol.bryggeriId, this.endpointB).subscribe(bryg => {
          this.bryggeri = bryg;
          console.log('bryggriId...',this.bryggeri.id);
          localStorage.setItem('olBryggeriId', JSON.stringify(this.bryggeri.id));
          this.kontaktOplysningId = JSON.parse(localStorage.getItem('kontaktoplysningerId') || '{}');
          this.restApi.getData(this.kontaktOplysningId, this.endpointK).subscribe(kontaktOplysningData => {
            this.kontaktOplysning = kontaktOplysningData;
            console.log(kontaktOplysningData);
            this.kontaktOplysningId = this.kontaktOplysning.id;
            console.log('kontaktOplysningId..', this.kontaktOplysning.id);
            localStorage.setItem('olKontaktOplysningerId', JSON.stringify(this.kontaktOplysning.id));
            this.router.navigate(['../ol/ol-side/', this.olId]);
          });
        });
      }
    });
  }
}
