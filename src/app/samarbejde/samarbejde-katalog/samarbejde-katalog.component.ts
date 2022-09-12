import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Samarbejde } from 'src/app/Models/Samarbejde';
import { Øl } from 'src/app/Models/Øl';
import { RestApiService } from 'src/app/shared/rest-api.service';
import { OpdaterSamarbejdeDialogBoxComponent } from '../opdater-samarbejde-dialog-box/opdater-samarbejde-dialog-box.component';
import { OpretSamarbejdeDialogBoxComponent } from '../opret-samarbejde-dialog-box/opret-samarbejde-dialog-box.component';
import { SletDialogBoxComponent } from 'src/app/main/slet-dialog-box/slet-dialog-box.component';

@Component({
  selector: 'app-samarbejde-katalog',
  templateUrl: './samarbejde-katalog.component.html',
  styleUrls: ['./samarbejde-katalog.component.css']
})
export class SamarbejdeKatalogComponent implements OnInit {
  dialogRefSlet: MatDialogRef<SletDialogBoxComponent>;
  dialogRefOpretSamarbejdeOl: MatDialogRef<OpretSamarbejdeDialogBoxComponent>;
  dialogRefOpdaterSamarbejdeOl: MatDialogRef<OpdaterSamarbejdeDialogBoxComponent>;
  ol: Øl;
  olListe: Øl[];
  samarbejde: Samarbejde;
  oller: any;
  olId: number;
  endpointO = '/Øl';
  endpointS = '/Samarbejdes';
  olBilled: any;
  samarbejdeId: number;

  constructor(
    public dialog: MatDialog,
    public restApi: RestApiService,
    public router: Router,
    public actRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.onHentOl();
  }

  onHentOl() {
    // if (this.samarbejdeId = JSON.parse(localStorage.getItem('samarbejdeId') || '{}')) {
    //   this.restApi.getDatas(this.endpointO).subscribe(data => {
    //   this.olListe = data.filter((res: any) => {
    //     return  res.samarbejdeId === this.samarbejdeId;
    //     });
    //   })
    // }
  }

  onOpretSamarbejde() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "40%";
    dialogConfig.height = "70%";
    this.dialogRefOpretSamarbejdeOl = this.dialog.open(OpretSamarbejdeDialogBoxComponent, dialogConfig);
    this.dialogRefOpretSamarbejdeOl.afterClosed().subscribe(result => {
      this.ngOnInit();
    })
  }

  onOpdaterOl(id: any) {
    localStorage.setItem('ølId', JSON.stringify(id));
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "40%";
    dialogConfig.height = 'auto';
    this.dialogRefOpdaterSamarbejdeOl = this.dialog.open(OpdaterSamarbejdeDialogBoxComponent, dialogConfig);
    this.dialogRefOpdaterSamarbejdeOl.afterClosed().subscribe(result => {
      if (result) {
        this.oller = result;
        this.restApi.updateData(id, this.endpointO, this.oller).subscribe((data) => {
          this.ngOnInit();
        });
      }
    })
  }

  onSletOl(id: any) {
    if (this.olListe.length !== 0) {
      alert('der er et problem, tjek op på det')
    }
    else {
      let dialogRef = this.dialog.open(SletDialogBoxComponent);
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.restApi.deleteData(id, this.endpointO).subscribe((data) => {
            this.onHentOl();
          })
        }
      });
    }
  }

  onOlLager(id: any) {
    localStorage.setItem('SamarbejdelagerId', JSON.stringify(id));
    this.router.navigate(['./samarbejde/samarbejde-ol-lager/', id]);
  }
}
