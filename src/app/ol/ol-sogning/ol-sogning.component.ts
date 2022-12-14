import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Bryggeri } from 'src/app/Models/Bryggeri';
import { Kontaktoplysninger } from 'src/app/Models/Kontaktoplysninger';
import { Samarbejde } from 'src/app/Models/Samarbejde';
import { Øl } from 'src/app/Models/Øl';
import { RestApiService } from 'src/app/shared/rest-api.service';

@Component({
  selector: 'app-ol-sogning',
  templateUrl: './ol-sogning.component.html',
  styleUrls: ['./ol-sogning.component.css']
})
export class OlSogningComponent implements OnInit {
  ol: Øl;
  oller: Øl[];
  kontaktOplysning: Kontaktoplysninger;
  samarbejde: Samarbejde
  bryggeri: any;
  bryggerier: Bryggeri[];
  selected = ''
  endpointO = '/Øl';
  endpointB = '/Bryggeris';
  endpointS = '/Samarbejdes';
  endpointK = '/Kontaktoplysningers';
  searchkey: string;
  search: any;
  data = sessionStorage.getItem('id');
  kontaktOplysningId: number;
  olId: number;
  bryggeriId: number;
  id = this.actRoute.snapshot.params['id'];

  constructor(
    public dialog: MatDialog,
    public restApi: RestApiService,
    public router: Router,
    public actRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.onHentOl();
  }

  onHentOl() {
    if (this.bryggeriId = JSON.parse(localStorage.getItem('bryggeriId') || '{}')) {
        this.restApi.getDatas(this.endpointO).subscribe((data) => {
        this.oller = data.filter((res: any) => {
          return res.bryggeriId != this.bryggeriId;
        });
      });
    }
  }

  onFindOl() {
    if (this.searchkey == "") {
      this.ngOnInit();
    }
    else {
      this.oller = this.oller.filter(res => {
        return res.navn.toLowerCase().match(this.searchkey.toLowerCase());
     })
    }
  }



  onShowOl(id: number) {
    console.log('idOlsogning..', id);
    this.restApi.getData(id, this.endpointO).subscribe(data => {
      this.ol = data;
      console.log('idOl..', data.id);
      this.olId = this.ol.id;
      localStorage.setItem('olId', JSON.stringify(this.olId));
      console.log()
      if(this.ol.bryggeriId){
        this.restApi.getData(this.ol.bryggeriId, this.endpointB).subscribe(bryg => {
          this.bryggeri = bryg;
          console.log('bryggriId...',this.bryggeri.id);
          localStorage.setItem('olBryggeriId', JSON.stringify(this.bryggeri.id));
          console.log("knkt", this.bryggeri.kontaktoplysningerId);
          // this.kontaktOplysningId = JSON.parse(localStorage.getItem('kontaktoplysningerId') || '{}');
          // console.log(this.kontaktOplysningId);
          this.restApi.getData(this.bryggeri.kontaktoplysningerId, this.endpointK).subscribe(kontaktOplysningData => {
            this.kontaktOplysning = kontaktOplysningData;
            console.log("tt",this.bryggeri.kontaktoplysningerId);
            // this.kontaktOplysningId = this.kontaktOplysning.id;
            console.log('kontaktOplysningId..', this.bryggeri.kontaktoplysningerId);
            localStorage.setItem('olKontaktOplysningerId', JSON.stringify(this.bryggeri.kontaktoplysningerId));
            this.router.navigate(['../ol/ol-side/', id]);
          });
        });
      }
/*       if(this.ol.samarbejder.id){

        this.restApi.getData(this.ol.samarbejder.id, this.endpointS).subscribe(samarbejde => {
          this.samarbejde = samarbejde;
          this.restApi.getData(this.samarbejde.id, this.endpointS).subscribe(samarbejdeData => {
            this.samarbejde = samarbejdeData;
            // this.kontaktOplysningId = this.kontaktOplysning.id;
            localStorage.setItem('olSamarbejdeId', JSON.stringify(this.samarbejde.id));
            this.router.navigate(['../ol/ol-side-samarbejde/', this.olId]);
          });
        });
      } */
    });
  }
}
