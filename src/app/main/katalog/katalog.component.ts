import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Kommentar } from 'src/app/Models/Kommentar';
import { Tag } from 'src/app/Models/Tag';
import { Øltags } from 'src/app/Models/Øltags';
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
  tags: Øltags[];
  endpointO = '/Øl';
  endpointKom = '/Kommentars';
  endpointT = '/Tags';
  endpointTØ = '/ØlTags'
  //searchkey: string;
  bryggeriId: number;
  bryggeriListe: any;
  argang: Date;
  kommanterList: any;
  brugerId: number;
  olId: number;
  arrayList = new Array();
  avg: number;
  id = this.actRoute.snapshot.params['id'];
  ratingList: any;
  tagsList: any;
  mineTagsList: any;
  TagForm: any = new FormGroup({});
  @Input() tagges = { tagId: 0, ølId: 0 }

  constructor(
    public dialog: MatDialog,
    public restApi: RestApiService,
    public router: Router,
    public actRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.onHentOl();
    this.onHentTag();
    this.onHentMineTags();
    this.onHentKammanter();

    this.TagForm = new FormGroup({
      navn: new FormControl('')
    });
  }

  onChange($event: any) {
    console.log("On change value:" + $event.target.value);
  }

  ngModelDataShow($event: any) {
    // this.valueRating=+$event;
    console.log("Ng Model On change value:" + $event);
  }

  onSendTag(id: any) {
    this.tagges.ølId = id;
    //  this.tags.rating=this.valueRating;
    console.log('drop.....', this.tagges.tagId);
    console.log('tagged', this.tagges);
    this.restApi.createData(this.tagges, this.endpointTØ).subscribe((data) => {
      // this.kommanterId=data.id;
      console.log('tagged....', data);
      // this.KommenterForm.reset({
      //   'tekst':'',
      //   'rating':''
      // });
    })
  }

  onHentMineTags() {
    // this.olListe
    // if (this.bryggeriId = JSON.parse(localStorage.getItem('bryggeriId') || '{}')) {

    // }
  }

  onHentTag() {
    // if (this.bryggeriId = JSON.parse(localStorage.getItem('bryggeriId') || '{}')) {
    this.restApi.getDatas(this.endpointT).subscribe((data) => {
      this.tagsList = data;
      console.log(this.tagsList);
      // .filter((res: any) => {
      //   return res.bryggeriId === this.bryggeriId;
      // });
    })
    // }
  }

  onHentOl() {
    if (this.bryggeriId = JSON.parse(localStorage.getItem('bryggeriId') || '{}')) {
      this.restApi.getDatas(this.endpointO).subscribe((data) => {
        this.olListe = data.filter((res: any) => {
          return res.bryggeriId === this.bryggeriId;
        });
        this.restApi.getDatas(this.endpointTØ).subscribe((dataTO) => {
          this.mineTagsList = dataTO.filter((res:any) => {
            return res = this.olListe[res].tags;
          })
          console.log("",this.mineTagsList);
          this.restApi.getDatas(this.endpointT).subscribe((dataT) => {
            // this.mineTagsList = dataT;
            console.log("minliste", this.mineTagsList);
            // .filter((res: any) => {
            //   return res.bryggeriId === this.bryggeriId;
            // });;

            for (let t = 0; t < dataT.length; t++) {
              const element = { navn: dataT[t].navn, id: dataT[t].id };
              //   this.mineTagsList[t].tags = 
              // var item = this.olListe[t].tags;
              if (element.id = this.olListe[t].tags.id) {

              }
              // console.log("--ata--",item);
              // console.log("----",item.tagId);
              console.log("tagsmine", element);
            }
          })
          //   // this.mineTagsList = data;
          //   // .filter((res:any) => {
          //   //   return res.ølId = this.olListe[res].id;
          //   // });
          //   console.log("olListe",this.olListe);
          //   for (let t = 0; t < data.length; t++) {
          //     const listeTest = {tagId: data[t].tagId, ølId: data[t].ølId} 
          //     console.log("listeTest",listeTest);
          //     if(this.olListe[t].id = listeTest.ølId)
          //     {
          //       this.mineTagsList[t].tagId = listeTest.tagId;
          //       console.log("mineTagListe", this.mineTagsList);
          //       this.mineTagsList[t].ølId = listeTest.ølId;
          //     }
          //   }
          //   // this.restApi.getDatas(this.endpointT).subscribe((dataT) => {

          //   // })
          //   // console.log(this.tagsList);
          //   // .filter((res: any) => {
          //   //   return res.bryggeriId === this.bryggeriId;
          //   // });
          // })
        })
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


  onHentKammanter() {
    if (this.brugerId = JSON.parse(localStorage.getItem('brugerId') || '{}')) {
      this.restApi.getDatas(this.endpointKom).subscribe((data) => {
        this.kommanterList = data.filter((res: any) => {
          console.log('kommanterList.....', res);
          // console.log('kommanterList.....', this.kommanterList);
          return res.brugerId != this.brugerId;
        });
      })
    }
  }

  //vise øl detajler og regne rating
  onVisDetajler(id: any) {
    console.log('id...', id);
    this.restApi.getDatas(this.endpointKom).subscribe((data) => {
      this.ratingList = data.filter((res: any) => {
        return res.olId === id;
      });
      console.log('ratingList.....', this.ratingList);
      for (var rating of this.ratingList) {
        this.arrayList.push(rating.rating);
      }
      console.log('this.arrayList', this.arrayList);
      var sum = 0;
      for (var i = 0; i < this.arrayList.length; i++) {
        sum += parseInt(this.arrayList[i]);
      }
      console.log('sum......', sum);
      this.avg = sum / this.arrayList.length;
      console.log('avg......', this.avg);
      this.arrayList = [];
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
