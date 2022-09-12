import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Øl } from 'src/app/Models/Øl';
import { RestApiService } from 'src/app/shared/rest-api.service';
import { SletDialogBoxComponent } from '../slet-dialog-box/slet-dialog-box.component';
// import { SletDialogBoxComponent } from '../slet-dialog-box/slet-dialog-box.component';

@Component({
  selector: 'app-katalog',
  templateUrl: './katalog.component.html',
  styleUrls: ['./katalog.component.css']
})
export class KatalogComponent implements OnInit {
  olListe:any[]=[];
  ol:any;
  endpointO = '/Øl';
  searchkey: string;
  bryggeriId: number;
  bryggeriListe: any;
  argang: Date;
  olId:number;
  id = this.actRoute.snapshot.params['id'];
  clickButton: boolean = true;



  constructor(
    public dialog: MatDialog,
    public restApi: RestApiService,
    public router: Router,
    public actRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
   // this.bryggeriId = JSON.parse(localStorage.getItem('bryggeriId') || '{}');
   // this.olId = JSON.parse(localStorage.getItem('olId') || '{}');
   // console.log('olId....', this.olId);
   this.onHentOl();
  }
  onHentOl() {

     // console.log('BrId...', this.bryggeriId);

      this.restApi.getDatas(this.endpointO).subscribe((data) => {
        this.olListe=data;
        console.log('olInfo...', this.olListe);

  /*       this.olListe = data.filter((res: any) => {
          return res.bryggeriId === this.bryggeriId;
        }); */
      })

  }

  onViseOl(id:any){
    this.clickButton = false;
    console.log('id.....', id);
    return this.restApi.getData(this.id, this.endpointO).subscribe((data) =>{
      this.olListe=data;
      console.log('olDetajler....', this.ol);
    })

  }

  onOpdaterOl(id: any) {
    this.router.navigate(['../main/opdater-øl/', id]);
  };

  onOlLager(id: any) {
    localStorage.setItem('lagerId', JSON.stringify(id));
    this.router.navigate(['../ol/ol-lager/', id]);
  };

  onOpretOl() {
    this.router.navigate(['../main/opret-øl']);
  };

  onSletOl(id: any) {
     let dialogRef = this.dialog.open(SletDialogBoxComponent);
     dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        this.restApi.deleteData(id, this.endpointO).subscribe(data => {
          this.ngOnInit();
        })
       }
     });
  };



  onFindOl() {
    if (this.searchkey == "") {
      this.ngOnInit();
    }
    else {

      //kigges igen
/*       this.olListe = this.olListe.filter(res => {
        return res.navn.toLowerCase().match(this.searchkey.toLowerCase());
      }) */
    }
  }
}
