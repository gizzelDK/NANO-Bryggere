import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Bruger } from 'src/app/Models/Bruger';
import { Certifikat, CertifikatStatus } from 'src/app/Models/Certifikat';
import { RestApiService } from 'src/app/shared/rest-api.service';
import { RedigerBryggeriDialogBoxComponent } from '../rediger-bryggeri-dialog-box/rediger-bryggeri-dialog-box.component';
import { RedigerProfilDialogBoxComponent } from '../rediger-profil-dialog-box/rediger-profil-dialog-box.component';
import { SletDialogBoxComponent } from '../slet-dialog-box/slet-dialog-box.component';
import { HeaderComponent } from 'src/app/layout/header/header.component';

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
  endpointC = '/Certifikats';
  endpointBru = '/Brugers';
  endpointR = '/Rolles';

  kontaktOplysningsListe: any;
  bryggeriLogo: any;
  rolleListe: any;
  bryggeriListe: any;
  kontaktoplysningerId: number;
  bryggeriId: number;
  brugerId: number;
  rolleId: number;
  rolleNavn: string;
  visOB: boolean;
  visB: boolean;
  visFillerOB = false;
  visFillerB = false;
  visFillerP = true;
  visOffentlig = true;
  brugerListe: Bruger;
  myDate:Date;
  certifikatListe: any;
  header: HeaderComponent;
  // certifikatType:CertifikatStatus;
  url: string;
  Offentligvisning = true;

  @Input() nytBryggeri = { bryggeriLogo: '', navn: '', beskrivelse: '', kontaktoplysningerId: 0 };

  bryggeriOprettelsesForm: any = new FormGroup({});
  ChangeOffentligStatusForm: any = new FormGroup({});

  constructor(
    public dialog: MatDialog,
    public restApi: RestApiService,
    private router: Router,
    private snackBar: MatSnackBar,
    private _formBuilder: FormBuilder,
    public actRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.visOB = true;
    this.visB = true;
    this.brugerId = JSON.parse(localStorage.getItem('brugerId') || '{}');
    this.rolleId = JSON.parse(localStorage.getItem('rolleId') || '{}');
    // localStorage.removeItem('bryggeriId');
    this.onHentBruger();
    this.kontaktoplysningerId = JSON.parse(localStorage.getItem('kontaktoplysningerId') || '{}');
    console.log('kontaktId .................:', this.kontaktoplysningerId);
    this.onHentBryggeri();
    this.onTjekCertifikat();

    this.bryggeriOprettelsesForm = this._formBuilder.group({
      'bryggeriLogo': new FormControl(''),
      'navn': new FormControl('', Validators.required),
      'beskrivelse': new FormControl(''),
      'kontaktOplysningerId': new FormControl('')
    });

    this.ChangeOffentligStatusForm = this._formBuilder.group({
      'offentligStatus': new FormControl('')
    });
  }

  onHentBruger() {
    return this.restApi.getData(this.brugerId, this.endpointBru).subscribe((brugerData) => {
      this.brugerListe = brugerData;
     // console.log('Bruger .................:', this.brugerListe)
      localStorage.setItem('kontaktoplysningerId', JSON.stringify(this.brugerListe.kontaktoplysningerId));
      //console.log("kontaktId", this.brugerListe.kontaktoplysningerId);
      //console.log("kontaktId2", this.brugerListe.certifikats);
      this.restApi.getDatas(this.endpointC).subscribe((dataC) => {
        this.certifikatListe = dataC.filter((res:any) =>{
          return res.brugerId === this.brugerId;
        });
       // console.log(this.certifikatListe);
        for (let c = 0; c < this.certifikatListe.length; c++) {
            const element = { cStatus: dataC[c].cStatus };
            if (element.cStatus == "Godkendt") {
              this.visOB = false;
              console.log("godkendt");
            }
          }
      this.restApi.getDatas(this.endpointB).subscribe((data) => {
        //console.log('brygeri....', data);
        this.bryggeriListe = data.find((x: any) => x.kontaktoplysningerId === this.brugerListe.kontaktoplysningerId);
        if(this.bryggeriListe){
         // console.log('brygerilist....', this.bryggeriListe);
         // console.log("bryggeriId---",this.bryggeriListe.id);
          if (this.bryggeriListe !== undefined) {
            localStorage.setItem('bryggeriId', JSON.stringify(this.bryggeriListe.id));
           // console.log("bryggeriId---",this.bryggeriListe.id);
            this.url = this.bryggeriListe.bryggeriLogo;
          }
          if (this.brugerListe) {
           // console.log(this.brugerId);
                if (this.bryggeriListe.id !== null) {
                  this.visOB = true;
                  this.visB = false;
                  //console.log("bryggeri---", this.bryggeriListe);
                }

          }
          else {
           // console.log("intet", this.certifikatListe)
            this.visOB = true;
          }
        }
        this.header;
      })
    })
    })
  };

  onTjekCertifikat() {
    //skal kigges igen
    // if (this.brugerListe) {
    //   console.log(this.brugerId);
    //   this.restApi.getDatas(this.endpointC).subscribe((dataC) => {
    //     this.certifikatListe = dataC.filter((res: any) => {
    //       return res.brugerId === this.brugerId;
    //     });
    //     this.visB = false;
    //     for (let c = 0; c < dataC.length; c++) {
    //       const element = { cStatus: dataC[c].cStatus };
    //       if (this.certifikatListe[c].cStatus == "Godkendt" && localStorage.getItem('bryggeriId') == null) {
    //         this.visOB = false;
    //         console.log("godkendt", this.certifikatListe)
    //       }
    //       if (localStorage.getItem('bryggeriId') !== null) {
    //         this.visOB = true;
    //         this.visB = false;
    //         console.log("bryggeri", this.certifikatListe);
    //       }
    //     }
    //   })
    // }
    // else {
    //   console.log("intet", this.certifikatListe)
    //   this.visOB = true;
    // }
  }

  onHentBryggeri() {
    // this.restApi.getDatas(this.endpointB).subscribe((data) => {
    //   console.log('brygeri....', data);
    //   this.bryggeriListe = data.find((x: any) => x.kontaktoplysningerId === this.kontaktoplysningerId);
    //   console.log('brygerilist....', this.bryggeriListe);
    //   if (this.bryggeriListe !== undefined) {
    //     localStorage.setItem('bryggeriId', JSON.stringify(this.bryggeriListe.id));
    //     this.url = this.bryggeriListe.bryggeriLogo;

    //     this.visOB = true;
    //     this.visB = false;
    //   }
    // })
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
      this.nytBryggeri.kontaktoplysningerId = this.kontaktoplysningerId;
      this.nytBryggeri.bryggeriLogo = JSON.parse(localStorage.getItem('bryggeriLogo') || '{}');
      this.restApi.createData(this.nytBryggeri, this.endpointB).subscribe((data) => {
        localStorage.setItem('bryggeriId', JSON.stringify(data.id));
        if (data) {
          this.visOB = true;
          this.visB = false;
          this.visFillerOB = false;
          this.snackBar.open('Nyt bryggeri oprettet');
          this.ngOnInit();
          //this.onClose();
        }
      })
    }
  }

  onOpdaterProfil() {
    this.kontaktoplysningerId = JSON.parse(localStorage.getItem('kontaktoplysningerId') || '{}');
    console.log('kontaktId1 .................:', this.kontaktoplysningerId);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "40%";
    this.dialogRefRedigerProfil = this.dialog.open(RedigerProfilDialogBoxComponent, dialogConfig);
    this.dialogRefRedigerProfil.afterClosed().subscribe(result => {
      if (result) {
        this.kontaktOplysningsListe = result;
        console.log("result", result);
        this.restApi.updateData(this.kontaktoplysningerId, this.endpointK, this.kontaktOplysningsListe).subscribe((data) => {
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

  onSkiftPassword() {
    this.router.navigate(['/main/skiftpassword']);
  }

  //skal kigges sammen med backend gruppe
  /*  onSletProfil() {
     this.dialogRefSlet = this.dialog.open(SletDialogBoxComponent, {
       width: '300px',
       disableClose: true
     });
     this.dialogRefSlet.afterClosed().subscribe(result => {
       if (result) {
         this.restApi.deleteData(this.kontaktoplysningerId, this.endpointK).subscribe((data) => {
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
   } */

  onSletProfil() {
    this.dialogRefSlet = this.dialog.open(SletDialogBoxComponent, {
      width: '300px',
      disableClose: true
    });
    this.dialogRefSlet.afterClosed().subscribe(result => {
      if (result) {
        this.restApi.deleteData(this.brugerId, this.endpointBru).subscribe((data) => {
          this.snackBar.open('Bruger slets');
          localStorage.removeItem('brugerId');
          this.ngOnInit();
          this.router.navigate(['/main/main']);
        })
      }
    });
  }

  //skal kigges igen
  onSletBryggeri() {
    this.bryggeriId = JSON.parse(localStorage.getItem('bryggeriId') || '{}');
    this.dialogRefSlet = this.dialog.open(SletDialogBoxComponent, {
      width: '300px',
      disableClose: true
    });
    this.dialogRefSlet.afterClosed().subscribe(result => {
      if (result) {
        this.restApi.deleteData(this.bryggeriId, this.endpointB).subscribe((data) => {
          // localStorage.removeItem('bryggeriId');
          //skal kigges igen
          // this.brugerListe.certifikat.cStatus = 1;
          //  this.brugerListe.certifikat.certifikatBilled = '';
          //this.restApi.updateData(this.brugerId, this.endpointBru, this.brugerListe).subscribe((data) => {
          console.log(data);
          this.snackBar.open('Bryggeri slets');
          localStorage.removeItem('bryggeriId');
          console.log('bryggeriId........', this.bryggeriId);
          this.ngOnInit();

          // })
          // this.snackBar.open("Bryggeri oplysninger slettet med succes");
          // }, err => {
          //   this.snackBar.open("Øl skal slettes først");
        })
      }
    });
  }

  onChangeStatus() {
    console.log('offentlig......', this.brugerListe.kontaktoplysninger.offentlig);
    console.log('brugerId......', this.brugerId);
    this.restApi.ChangeStatus(this.brugerId, this.endpointBru, this.brugerListe.kontaktoplysninger.offentlig).subscribe((data) => {
      console.log('nyedata..', data);
    })
  }

  onClose() {
    this.bryggeriOprettelsesForm.reset();
    this.router.navigate(['/main/profil']);
    this.visFillerOB = false;
  }

  logud() {
    localStorage.clear();
    this.router.navigate(['/login/login']);
  }

}
