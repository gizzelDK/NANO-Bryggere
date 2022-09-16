import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Kommentar } from 'src/app/Models/Kommentar';
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
  olListe: Øl[];
  ol: Øl;
  endpointO = '/Øl';
  endpointKom='/Kommentars';
//searchkey: string;
  bryggeriId: number;
  bryggeriListe: any;
  argang: Date;
  kommanterList:any;
  brugerId:number;
  olId:number;
  arrayList = new Array();
  avg:number;
  id = this.actRoute.snapshot.params['id'];
  ratingList:any;

  constructor(
    public dialog: MatDialog,
    public restApi: RestApiService,
    public router: Router,
    public actRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.onHentOl();
    this.onHentKammanter();


  }
  onHentOl() {
    if (this.bryggeriId = JSON.parse(localStorage.getItem('bryggeriId') || '{}')) {
      this.restApi.getDatas(this.endpointO).subscribe((data) => {
        this.olListe = data.filter((res: any) => {
          return res.bryggeriId === this.bryggeriId;
        });
      })
    }
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

  onHentKammanter(){
    if(this.brugerId=JSON.parse(localStorage.getItem('brugerId') || '{}')){
       this.restApi.getDatas(this.endpointKom).subscribe((data) =>{
        this.kommanterList=data.filter((res:any) => {
          return res.brugerId != this.brugerId;
        });
      })
    }
  }


  onVisDetajler(id:any){
    console.log('id...' ,id);
      this.restApi.getDatas(this.endpointKom).subscribe((data) =>{
       this.ratingList=data.filter((res:any) => {
         return res.olId === id;
       });
       console.log('ratingList.....', this.ratingList);
       for(var rating of this.ratingList){
         this.arrayList.push(rating.rating);
       }
      console.log('this.arrayList',this.arrayList);
      var sum =0;
      for(var i=0; i<this.arrayList.length; i++ ){
        sum += parseInt(this.arrayList[i]);
      }
      console.log('sum......', sum);
        this.avg = sum / this.arrayList.length;
      console.log('avg......', this.avg);
      this.arrayList=[];
      console.log('tomtarray......', this.arrayList);
     })

  }



/*   onFindOl() {
    if (this.searchkey == "") {
      this.ngOnInit();
    }
    else {
      this.olListe = this.olListe.filter(res => {
        return res.navn.toLowerCase().match(this.searchkey.toLowerCase());
      })
    }
  } */
}
