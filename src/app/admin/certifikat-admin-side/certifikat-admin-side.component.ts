import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
// import { RedigerProfilDialogBoxComponent } from 'src/app/main/rediger-profil-dialog-box/rediger-profil-dialog-box.component';
// import { SletDialogBoxComponent } from 'src/app/main/slet-dialog-box/slet-dialog-box.component';
import { Kontaktoplysninger } from 'src/app/Models/Kontaktoplysninger';
import { Bruger } from 'src/app/Models/Bruger';
import { RestApiService } from 'src/app/shared/rest-api.service';
import { Certifikat } from 'src/app/Models/Certifikat';

@Component({
  selector: 'app-certifikat-admin-side',
  templateUrl: './certifikat-admin-side.component.html',
  styleUrls: ['./certifikat-admin-side.component.css']
})
export class CertifikatAdminSideComponent implements OnInit {
  kontaktOplysningsListe: Kontaktoplysninger[]; //oplysninger
  kontaktOplysninger: Kontaktoplysninger;
  certifikatListe: any;
  brugerListe: any;
  certifikat: Certifikat; //oplysninger
  kontaktOplysningerId: any;
  endpointK = '/Kontaktoplysningers';
  endpointB = '/Brugers';
  endpointC = '/Certifikats';
  clickButton: boolean = true;
  searchkey: string;
  // dialogRefSlet: MatDialogRef<SletDialogBoxComponent>;
  // dialogRefOpdaterProfil: MatDialogRef<RedigerProfilDialogBoxComponent>;

  constructor(
    public dialog: MatDialog,
    public restApi: RestApiService,
    public router: Router,
    public actRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.onHentBrugerCertifikat();
  }

  onHentBrugerCertifikat() {
    this.restApi.getDatas(this.endpointC).subscribe((certifikatData) => {
      this.certifikatListe = certifikatData.filter((c: any) => {
        return c.cStatus === "VentTilGodkendt";
      });
      this.restApi.getDatas(this.endpointB).subscribe((brugerData) => {
        this.brugerListe = brugerData;
      })
    })
  }

  onFindBrugerCertifikat() {
    if (this.searchkey == "") {
      this.ngOnInit();
    }
    else {
      // this.restApi.getParticipantByEventsTitle(this.searchkey, this.endpointK).subscribe(data => {
      //   this.certifikatListe = data;
      // })
    }
  }

  //Godkend certifikat
  onBekraftCertifikat(id: any) {
    this.restApi.getData(id, this.endpointC).subscribe(data => {
      this.certifikat = data;

      this.certifikat.cStatus = 3;
      this.restApi.updateData(id, this.endpointC, this.certifikat).subscribe(data => {
        this.ngOnInit();
      })
    })
  };

  //Benægt certifikat
  onBenagtCertifikat(id: any) {
    this.restApi.getData(id, this.endpointC).subscribe(data => {
      this.certifikat = data;
      this.restApi.deleteData(id, this.endpointC).subscribe(data => {
        this.ngOnInit();
      })
    })
  }

  onVisBrugerCertifikat(id: any) {
    this.clickButton = false;
    return this.restApi.getData(id, this.endpointB).subscribe((data) => {
      this.kontaktOplysninger = data.kontaktoplysninger;
    })
  }
}
