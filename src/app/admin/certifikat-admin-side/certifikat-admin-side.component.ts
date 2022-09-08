import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
// import { RedigerProfilDialogBoxComponent } from 'src/app/main/rediger-profil-dialog-box/rediger-profil-dialog-box.component';
// import { SletDialogBoxComponent } from 'src/app/main/slet-dialog-box/slet-dialog-box.component';
import { Kontaktoplysninger } from 'src/app/Models/Kontaktoplysninger';
import { Bruger } from 'src/app/Models/Bruger';
import { RestApiService } from 'src/app/shared/rest-api.service';

@Component({
  selector: 'app-certifikat-admin-side',
  templateUrl: './certifikat-admin-side.component.html',
  styleUrls: ['./certifikat-admin-side.component.css']
})
export class CertifikatAdminSideComponent implements OnInit {
  kontaktOplysningsListe: Kontaktoplysninger[]; //oplysninger
  kontaktOplysninger: Kontaktoplysninger;
  certifikatListe: any;
  certifikat: Bruger; //oplysninger
  kontaktOplysningerId: number;
  endpointK = '/KontaktOplysningers';
  endpointB = '/Brugers';
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
    return this.restApi.getDatas(this.endpointB).subscribe((certifikatData) => {
      this.certifikatListe = certifikatData.filter((a: any) => {
        return a.certifikatStatus === 2;
      });
      this.restApi.getDatas(this.endpointK).subscribe((kontaktOplysningerData) => {
        // this.kontaktOplysningsListe = kontaktOplysningerData;
        this.kontaktOplysningsListe = kontaktOplysningerData.filter((a: any) => {
          return a.id === this.certifikatListe.kontaktOplysningerId;
        });
      })
    })
    //   return this.restApi.getDatas(this.endpointB).subscribe((brugerCertifikat) => {
    //   this.certifikatListe = brugerCertifikat.filter((a: Bruger) => {
    //     a.certifikatStatus === 2;
    //   })
    //   // const b = this.certifikatListe.filter((a: any) => {
    //   //   a.certifikatStatus === 2;
    //   // })
    // });
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
    this.restApi.getData(id, this.endpointB).subscribe(data => {
      this.certifikat = data;

      // this.certifikat.certifikatStatus = 3;
      this.restApi.updateData(id, this.endpointB, this.certifikat).subscribe(data => {
        this.ngOnInit();
      })
    })
  };

  //Benægt certifikat
  onBenagtCertifikat(id: any) {
    this.restApi.getData(id, this.endpointB).subscribe(data => {
      this.certifikat = data;
      // this.certifikat.certifikatStatus = 1;
      // this.certifikat.certifikatBilled = "";
      this.restApi.updateData(id, this.endpointB, this.certifikat).subscribe(data => {
        this.ngOnInit();
      })
    })
  }

  onVisBrugerCertifikat(id: any) {
    this.clickButton = false;
    return this.restApi.getData(id, this.endpointB).subscribe((data) => {
      this.kontaktOplysningerId = data.kontaktOplysningerId;
      this.certifikat = data;
      this.restApi.getData(this.kontaktOplysningerId, this.endpointK).subscribe((data) => {
        this.kontaktOplysninger = data;
      })
    })
  }

  onViCertifikat(id: any) {
    this.clickButton = false;
    return this.restApi.getData(id, this.endpointB).subscribe((data) => {
      this.kontaktOplysningerId = data.kontaktOplysningerId;
      this.certifikat = data;
      this.restApi.getData(this.kontaktOplysningerId, this.endpointK).subscribe((data) => {
        this.kontaktOplysninger = data;
      })
    })
  }
}
