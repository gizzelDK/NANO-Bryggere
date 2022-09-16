import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
// import { SletDialogBoxComponent } from 'src/app/main/slet-dialog-box/slet-dialog-box.component';
import { Bruger } from 'src/app/Models/Bruger';
import { RestApiService } from 'src/app/shared/rest-api.service';
import { SearchServiceService } from 'src/app/shared/search-service.service';

@Component({
  selector: 'app-rolle-admin-side',
  templateUrl: './rolle-admin-side.component.html',
  styleUrls: ['./rolle-admin-side.component.css']
})
export class RolleAdminSideComponent implements OnInit {
  searchkeyRolleNavn: string;
  searchkeyBrugernavn: string;
  clickButton: boolean = true;
  endpointR = '/Rolles';
  endpointB = '/Brugers';
  id = this.actRoute.snapshot.params['id'];
  bruger: Bruger[];
  rolleId: number;
  rolle: any;
  level: number;
  rolleName:string;

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
      this.bruger = res;
    })
  }

  onVisBruger(id: any) {
    this.clickButton = false;
    return this.restApi.getData(id, this.endpointB).subscribe((res) => {
      this.rolleId = res.rolleId;
      this.restApi.getData(this.rolleId, this.endpointR).subscribe((res) => {
        this.rolle = res;
         if(this.rolle.rolleNavn == 20){
          this.rolleName = 'Administrator'
        }
        if(this.rolle.rolleNavn == 10){
          this.rolleName = 'Bruger'
        }
        if(this.rolle.rolleNavn == 0){
          this.rolleName = 'Anonymbruger'
        }
      })
    })
  }

  onFindBrugernavn() {
    if (this.searchkeyBrugernavn == "") {
      this.ngOnInit();
    }
    else {
      this.bruger = this.bruger.filter(res => {
        return res.brugernavn.toLowerCase().match(this.searchkeyBrugernavn.toLowerCase());
      })
    }
  }

  onFindRolleNavn() {
    if (this.searchkeyRolleNavn == "") {
      this.ngOnInit();
    }
    else {
      if (this.searchkeyRolleNavn.toLowerCase() == 'anonymbruger')
        this.level = 0;
      if (this.searchkeyRolleNavn.toLowerCase() == 'bruger')
        this.level = 10;
      if (this.searchkeyRolleNavn.toLowerCase() == 'administrator')
        this.level = 20;
       this.searchService.getDataByLevel(this.level, this.endpointB).subscribe((data) => {
         return this.bruger = data;
       })
    }
  }

  onSletBruger(id: any) {
    if (this.bruger.length !== 0) {
      alert('Du skal først slette alle brger!')
    } else {
      // let dialogRef = this.dialog.open(SletDialogBoxComponent);
      // dialogRef.afterClosed().subscribe(result => {
      //   if (result) {
      //     this.restApi.deleteData(id, this.endpointR).subscribe((data) => {
      //       this.ngOnInit();
      //     })
      //   }
      // });
    }
  }

  onNedgraderRolleNavn(id: any) {
    var bruger = this.bruger.find((x: any) => x.id === id)
    var rolleId = bruger?.rolleId;
    this.restApi.getData(rolleId, this.endpointR).subscribe(data => {
      var upgradeLevel = data;
      if (upgradeLevel.level == 300) {
        upgradeLevel.level = 200;
        upgradeLevel.rolleNavn = "Moderator";
      }
      else if (upgradeLevel.level == 200) {
        upgradeLevel.level = 100;
        upgradeLevel.rolleNavn = "Bruger";
      }
      else if (upgradeLevel.level == 100) {
        upgradeLevel.level = 0;
        upgradeLevel.rolleNavn = "AnonymBruger";
      }
      else if (upgradeLevel.level == 0) {
        upgradeLevel.level = 0;
        upgradeLevel.rolleNavn = "AnonymBruger";
      }
      this.restApi.updateData(rolleId, this.endpointR, upgradeLevel).subscribe(data => {
        this.ngOnInit();
      })
    })
  }

  onOpgraderRolleNavn(id: any) {
    var bruger = this.bruger.find((x: any) => x.id === id)
    var rolleId = bruger?.rolleId;
    this.restApi.getData(rolleId, this.endpointR).subscribe(data => {
      var upgradeLevel = data;
      if (upgradeLevel.level == 0) {
        upgradeLevel.level = 100;
        upgradeLevel.rolleNavn = "Bruger";
      }
      else if (upgradeLevel.level == 100) {
        upgradeLevel.level = 200;
        upgradeLevel.rolleNavn = "Moderator";
      }
      else if (upgradeLevel.level == 200) {
        upgradeLevel.level = 300;
        upgradeLevel.rolleNavn = "Administrator";
      }
      else if (upgradeLevel.level == 300) {
        upgradeLevel.level = 300;
        upgradeLevel.rolleNavn = "Administrator";
      }
      this.restApi.updateData(rolleId, this.endpointR, upgradeLevel).subscribe(data => {
        this.ngOnInit();
      })
    })
  }
}
