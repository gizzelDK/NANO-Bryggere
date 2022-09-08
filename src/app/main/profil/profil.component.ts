import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Bruger } from 'src/app/Models/Bruger';
import { RestApiService } from 'src/app/shared/rest-api.service';
import { RedigerBryggeriDialogBoxComponent } from '../rediger-bryggeri-dialog-box/rediger-bryggeri-dialog-box.component';
import { RedigerProfilDialogBoxComponent } from '../rediger-profil-dialog-box/rediger-profil-dialog-box.component';
import { SletDialogBoxComponent } from '../slet-dialog-box/slet-dialog-box.component';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
  dialogRefSlet: MatDialogRef<SletDialogBoxComponent>;
  dialogRefRedigerProfil: MatDialogRef<RedigerProfilDialogBoxComponent>;
  dialogRefRedigerBryggeri: MatDialogRef<RedigerBryggeriDialogBoxComponent>;
  endpointK = '/Kontaktoplysningers';
  endpointB = '/Bryggeris';
  endpointBru = '/Brugers';
  endpointR = '/Rolles';

  kontaktOplysningsListe: any;
  bryggeriLogo: any;
  rolleListe: any;
  bryggeriListe: any;
  kontaktOplysningerId: number;
  bryggeriId: number;
  brugerId: number;
  rolleId: number;
  rolleNavn: string;
  visOB: boolean;
  visB: boolean;
  visFillerOB = false;
  visFillerB = false;
  visFillerP = true;
  brugerListe: Bruger;
  url: string;

  @Input() nytBryggeri = { bryggeriLogo: '', navn: '', beskrivelse: '', kontaktOplysningerId: 0 };
  bryggeriOprettelsesForm: any = new FormGroup({});

  constructor(
    public dialog: MatDialog,
    public restApi: RestApiService,
    private router: Router,
    private snackBar: MatSnackBar,
    private _formBuilder: FormBuilder,
    public actRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.brugerId = JSON.parse(localStorage.getItem('brugerId') || '{}');
    this.rolleId = JSON.parse(localStorage.getItem('rolleId') || '{}');
    this.onHentBruger();
    this.kontaktOplysningerId = JSON.parse(localStorage.getItem('kontaktOplysningerId') || '{}');

  }

  onHentBruger() {
    console.log('BrugerId .................:', this.brugerId)
    return this.restApi.getData(this.brugerId, this.endpointBru).subscribe((brugerData) => {
      this.brugerListe = brugerData;
      console.log('BrugerId .................:', this.brugerListe)
      localStorage.setItem('kontaktOplysningerId', JSON.stringify(this.brugerListe.kontaktoplysningerId));
    })
  };

  onTjekCertifikat() {
    // this.bryggeriId = JSON.parse(localStorage.getItem('bryggeriId') || '{}');
    //skal kigges igen
    /////if (this.brugerListe.certifikatStatus == 3) {
    if (this.brugerListe) {
      // this.restApi.getDatas(this.endpointB).subscribe((bryggeri) => {
      //   this.bryggeriListe = bryggeri.find((x: any) => x.kontaktOplysningerId === this.kontaktOplysningerId);
      // if (typeof(this.bryggeriId) !== 'undefined' || typeof(this.bryggeriId !== '{}')){
      if (localStorage.getItem('bryggeriId') !== null) {
        this.visOB = true;
        this.visB = false;
      }
      else {
        this.visOB = false;
      }
      // })
    }
    else {
      this.visOB = true;
    }
  }

  onHentBryggeri() {
    this.restApi.getDatas(this.endpointB).subscribe((data) => {
      this.bryggeriListe = data.find((x: any) => x.kontaktOplysningerId === this.kontaktOplysningerId);
      if (this.bryggeriListe !== undefined) {
        localStorage.setItem('bryggeriId', JSON.stringify(this.bryggeriListe.id));
        this.url = this.bryggeriListe.bryggeriLogo;
        // this.visOB = true;
        // this.visB = false;
      }
    })
  }

  onSubmitProfilBilled(event: any) {
    if (event.target.files) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (e: any) => {
        this.bryggeriLogo = e.target.result;
        localStorage.setItem('bryggeriLogo', JSON.stringify(this.bryggeriLogo));
      }
    }
  };

  onOpretBryggeri() {
    if (this.nytBryggeri.navn != '') {
      this.nytBryggeri.kontaktOplysningerId = this.kontaktOplysningerId;
      this.nytBryggeri.bryggeriLogo = JSON.parse(localStorage.getItem('bryggeriLogo') || '{}');
      this.restApi.createData(this.nytBryggeri, this.endpointB).subscribe((data) => {
        localStorage.setItem('bryggeriId', JSON.stringify(data.id));
        if (data) {
          this.visOB = true;
          this.visB = false;
          this.snackBar.open('Nyt bryggeri oprettet')
          this.ngOnInit();
          this.onClose();
        }
      })
    }
  }

  onOpdaterProfil() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "40%";
    this.dialogRefRedigerProfil = this.dialog.open(RedigerProfilDialogBoxComponent, dialogConfig);
    this.dialogRefRedigerProfil.afterClosed().subscribe(result => {
      if (result) {
        this.kontaktOplysningsListe = result;
        this.restApi.updateData(this.kontaktOplysningerId, this.endpointK, this.kontaktOplysningsListe).subscribe((data) => {
          this.ngOnInit();
        })
      }
    });
  }

  onOpdaterBryggeri() {
    this.bryggeriId = JSON.parse(localStorage.getItem('bryggeriId') || '{}');
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "40%";
    this.dialogRefRedigerBryggeri = this.dialog.open(RedigerBryggeriDialogBoxComponent, dialogConfig);
    this.dialogRefRedigerBryggeri.afterClosed().subscribe(result => {
      if (result) {
        this.bryggeriListe = result;
        this.restApi.updateData(this.bryggeriId, this.endpointB, this.bryggeriListe).subscribe((data) => {
          this.ngOnInit();
        })
      }
    });
  }

  onSletProfil() {
    this.dialogRefSlet = this.dialog.open(SletDialogBoxComponent, {
      width: '300px',
      disableClose: true
    });
    this.dialogRefSlet.afterClosed().subscribe(result => {
      if (result) {
        this.restApi.deleteData(this.kontaktOplysningerId, this.endpointK).subscribe((data) => {
          this.restApi.deleteData(this.bryggeriId, this.endpointB).subscribe((data) => {
            if (this.bryggeriId = JSON.parse(localStorage.getItem('bryggeriId') || '{}')) {
              this.restApi.deleteData(this.brugerId, this.endpointBru).subscribe((data) => {

              })
            }
          })
          this.snackBar.open("kontakt oplysninger slettet med succes");
        }, err => {
          this.snackBar.open("Bruger skal slettes først");
        })
      }
    });
  }

  onSletBryggeri() {
    this.bryggeriId = JSON.parse(localStorage.getItem('bryggeriId') || '{}');
    this.dialogRefSlet = this.dialog.open(SletDialogBoxComponent, {
      width: '300px',
      disableClose: true
    });
    this.dialogRefSlet.afterClosed().subscribe(result => {
      if (result) {
        this.restApi.deleteData(this.bryggeriId, this.endpointB).subscribe((data) => {
          //skal kigges igen
          // this.brugerListe.certifikatStatus = 1;
          // this.brugerListe.certifikatBilled = "";
          this.restApi.updateData(this.brugerId, this.endpointBru, this.brugerListe).subscribe((data) => {
            localStorage.removeItem('bryggeriId');
            console.log(data);
            this.ngOnInit();
          })
          // this.snackBar.open("Bryggeri oplysninger slettet med succes");
          // }, err => {
          //   this.snackBar.open("Øl skal slettes først");
        })
      }
    });
  }

  onClose() {
    this.bryggeriOprettelsesForm.reset();
    this.router.navigate(['/main/profil']);
    this.visFillerOB = false;
  }


}
