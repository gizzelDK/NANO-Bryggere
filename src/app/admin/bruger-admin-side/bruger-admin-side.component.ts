import { SearchServiceService } from 'src/app/shared/search-service.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
// import { SletDialogBoxComponent } from 'src/app/main/slet-dialog-box/slet-dialog-box.component';
import { Bruger } from 'src/app/Models/Bruger';
import { RestApiService } from 'src/app/shared/rest-api.service';
import { Kontaktoplysninger } from 'src/app/Models/Kontaktoplysninger';
import { RedigerProfilDialogBoxComponent } from 'src/app/main/rediger-profil-dialog-box/rediger-profil-dialog-box.component';
import { SletDialogBoxComponent } from 'src/app/main/slet-dialog-box/slet-dialog-box.component';


@Component({
  selector: 'app-bruger-admin-side',
  templateUrl: './bruger-admin-side.component.html',
  styleUrls: ['./bruger-admin-side.component.css']
})
export class BrugerAdminSideComponent implements OnInit {
   dialogRefSlet: MatDialogRef<SletDialogBoxComponent>;
   dialogRefOpdaterProfil: MatDialogRef<RedigerProfilDialogBoxComponent>;
  brugere: Bruger[];
  bruger = new Bruger();
  endpointB = '/Brugers'; //endpointB
  endpointL = '/Logins'; //endpointL
  endpointK = '/Kontaktoplysningers'; //endpointK
  searchkeyBrugernavn: string;
  searchkeyBrugerEnavn: string;
  searchkeyEmail: string;
  searchkeyEventsTitel: string;
  kontaktOplysninger: Kontaktoplysninger; //kontaktoplysninger
  login: any;
  certifikat: any;
  id = this.actRoute.snapshot.params['id'];
  kontaktOplysningerId: number; //kontaktoplysningerId
  clickButton: boolean = true;
  kontaktOplysningsListe: any; //kontaktoplysningerList
  oplysningsListe: Kontaktoplysninger[]; //kontakt

  constructor(
    public dialog: MatDialog,
    public restApi: RestApiService,
    public router: Router,
    public actRoute: ActivatedRoute,
    public searchService: SearchServiceService
  ) { }

  ngOnInit(): void {
    this.onHentBruger();
  }

  onHentBruger() {
    return this.restApi.getDatas(this.endpointB).subscribe((res) => {

        this.brugere = res.filter((data:any) =>{
          return data.brugernavn != 'admin'

        });
        console.log('res.....', this.brugere)
      }

    )
  }

  onVisBruger() {
    this.clickButton = false;
    // return this.restApi.getData(id, this.endpointB).subscribe((data) => {
    //  console.log('bryger....', data);
    //   this.kontaktOplysningerId = data.kontaktoplysningerId;
    //  console.log("testK", this.kontaktOplysningerId);
    //   this.restApi.getData(this.kontaktOplysningerId, this.endpointK).subscribe((data) => {
    //     this.kontaktOplysninger = data;
    //     console.log("data1", this.kontaktOplysninger.email);
    //     console.log("data2", this.kontaktOplysninger);
    //   })
    // })
  }

  onFindBrugernavn() {
    if (this.searchkeyBrugernavn == "") {
      this.ngOnInit();
    }
    else {
      this.brugere = this.brugere.filter(res => {
        return res.brugernavn.toLowerCase().match(this.searchkeyBrugernavn.toLowerCase());
      })
    }
  }

  onFindBrugerEnavn() {
    if (this.searchkeyBrugerEnavn == '') {
      this.ngOnInit();
    }
    else {
       this.searchService.getDataByEnavn(this.searchkeyBrugerEnavn, this.endpointB).subscribe((data) => {
       // console.log('efternavn...', data);
         return this.brugere = data;
       })
    }
  }

  onFindEmail() {
    if (this.searchkeyEmail == "") {
      this.ngOnInit();
    }
    else {
       this.searchService.getDataByEmail(this.searchkeyEmail, this.endpointB).subscribe((data) => {
        console.log('email...', data);
         return this.brugere = data;
       })
    }
  }

/*   onFindBrugernavnByEventsTitel() {
    if (this.searchkeyEventsTitel == "") {
      this.ngOnInit();
    }
    else {
       this.searchService.getUserByEventsTitle(this.searchkeyEventsTitel, this.endpointB).subscribe((data) => {
         return this.brugere = data;
       })
    }
  } */

  //husk at kigge p?? slet bruger , kan ikke sltettes f??r slet deltager og login
  onSletBruger(id: any) {
    let dialogRef = this.dialog.open(SletDialogBoxComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.restApi.deleteData(id, this.endpointB).subscribe((data) => {
          this.ngOnInit();
        })
      }
      if (result) {
        this.restApi.getDatas(this.endpointL).subscribe((data) => {
          for (let l = 0; l < data.length; l++) {
            const loginInfo = { brugerId: data[l].brugerId, id: data[l].id };
            if (loginInfo.brugerId = id) {
              this.login = loginInfo;
            }
          }
          console.log(this.login);
          this.restApi.deleteData(this.login.id, this.endpointL).subscribe(data => {
            this.restApi.deleteData(id, this.endpointB).subscribe((data) => {
              this.ngOnInit();
            })
          })
        })
      }
    });
  }

  onOpdaterBruger(id: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "30%";
    this.restApi.getData(id, this.endpointB).subscribe((data) => {
      this.kontaktOplysningerId = data.kontaktOplysningerId;
      localStorage.setItem('KontaktOplysningerId', this.kontaktOplysningerId.toString());
       this.dialogRefOpdaterProfil = this.dialog.open(RedigerProfilDialogBoxComponent, dialogConfig);
       this.dialogRefOpdaterProfil.afterClosed().subscribe(result => {
         if (result) {
           this.oplysningsListe = result;
           this.restApi.updateData(this.kontaktOplysningerId, this.endpointK, this.oplysningsListe).subscribe((data) => {
            //  this.onVisBruger(id);
           })
         }
       });
    })
  };
}
