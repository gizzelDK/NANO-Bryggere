import { Kontaktoplysninger } from 'src/app/Models/Kontaktoplysninger';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { RestApiService } from 'src/app/shared/rest-api.service';

@Component({
  selector: 'app-rediger-profil-dialog-box',
  templateUrl: './rediger-profil-dialog-box.component.html',
  styleUrls: ['./rediger-profil-dialog-box.component.css']
})
export class RedigerProfilDialogBoxComponent implements OnInit {

  opdaterForm: FormGroup = new FormGroup({});
  kontaktOplysningsListe: any;
  //brugerListe:any;
  kontaktOplysningerId: number;
  //brugerId:number;
  endpointK = '/Kontaktoplysningers';
  endpointB = '/Brugers';

  constructor(public dialogRefUpdateProfile: MatDialogRef<RedigerProfilDialogBoxComponent>,
    private formBuilder: FormBuilder,
    public restApi: RestApiService) { }

  ngOnInit(): void {
    this.kontaktOplysningerId = JSON.parse(localStorage.getItem('kontaktOplysningerId') || '{}');
    //this.brugerId = JSON.parse(localStorage.getItem('brugerId') || '{}');
    this.restApi.getData(this.kontaktOplysningerId, this.endpointK)
      .toPromise()
      .then(data => {
        this.kontaktOplysningsListe = data;
        console.log('list..........' , this.kontaktOplysningsListe);
          this.opdaterForm = this.formBuilder.group({
            fnavnCtl: new FormControl(this.kontaktOplysningsListe.fnavn),
            enavnCtl: new FormControl(this.kontaktOplysningsListe.enavn),
            adr1Ctl: new FormControl(this.kontaktOplysningsListe.addresselinje1),
            adr2Ctl: new FormControl(this.kontaktOplysningsListe.addresselinje2),
            telefonNrCtl: new FormControl(this.kontaktOplysningsListe.telefonNr),
            emailCtl: new FormControl(this.kontaktOplysningsListe.email),
            postNrCtl: new FormControl(this.kontaktOplysningsListe.postnr),
            byCtl: new FormControl(this.kontaktOplysningsListe.by),
           // BrugernavnCtl : new FormControl(this.brugerListe.brugernavn)
          });
        // })
      });
  }

}
