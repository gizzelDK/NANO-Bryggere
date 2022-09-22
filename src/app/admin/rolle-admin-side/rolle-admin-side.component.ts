import { LoginService } from './../../shared/login.service';
import { Rolle, RolleNavn } from './../../Models/Rolle';
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
  rolleBruger:any;

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

      this.bruger = res.filter((data:any) =>{
        return data.brugernavn != 'admin'

    })
  })
}

/*   onVisBruger(id: any) {
    this.clickButton = false;
    return this.restApi.getData(id, this.endpointB).subscribe((res) => {
      console.log('rolle....', res)
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
  } */


  onVisBruger(id: any) {
    this.clickButton = false;
    return this.restApi.getData(id, this.endpointB).subscribe((res) => {
      this.rolle = res;
      console.log('rolle....', this.rolle)

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

/*   onSletBruger(id: any) {
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
  } */



//https://localhost:7252/api/Brugers/rolle/3
  onNedgraderRolleNavn(id: any) {
    console.log('id.......' , id)
    this.rolle= this.bruger.find((x:any) => x.id == id);
    console.log('this.rolleBruger.......' , this.rolle)
    if(this.rolle.rolle.id == 3){
      this.rolle.rolle.level = 10;
      this.rolle.rolle.rolleNavn='Bruger';
      this.rolle.rolle.id=2;
    }
    else if(this.rolle.rolle.id == 2){
      this.rolle.rolle.level = 0;
      this.rolle.rolle.rolleNavn='AnonymBruger';
      this.rolle.rolle.id=1;
    }

    this.restApi.updateData(this.rolle.rolle.id, this.endpointB+ '/rolle' , this.rolle).subscribe((data) =>{
      console.log('nedgrader...', data)
    })

  }

  //https://localhost:7252/api/Brugers/rolle/3
  onOpgraderRolleNavn(id: any) {
     this.rolle=this.bruger.find((x:any) => x.id == id);
     console.log('bruger1...', this.rolle)
    if(this.rolle.rolle.id == 1){
      this.rolle.rolle.level = 10;
      this.rolle.rolle.rolleNavn = 'Bruger';
      this.rolle.rolle.id=2;
    }
    else if(this.rolle.rolle.id == 2){
      this.rolle.rolle.level =20;
      this.rolle.rolle.rolleNavn ='Administrator';
      this.rolle.rolle.id=3;
    }
    console.log('this.rolle.rolle.id...', this.rolle.rolle.id)
    console.log('bruger2...', this.rolle.id)
    this.restApi.updateData(this.rolle.rolle.id, this.endpointB+ '/rolle' , this.rolle).subscribe((data) => {
      console.log('opgrader...', data)
    })

  }



}
