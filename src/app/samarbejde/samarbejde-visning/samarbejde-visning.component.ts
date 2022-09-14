import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Øl } from 'src/app/Models/Øl';
import { RestApiService } from 'src/app/shared/rest-api.service';
import { SletDialogBoxComponent } from 'src/app/main/slet-dialog-box/slet-dialog-box.component';
import { OpdaterSamarbejdeDialogBoxComponent } from '../opdater-samarbejde-dialog-box/opdater-samarbejde-dialog-box.component';
import { Samarbejde } from 'src/app/Models/Samarbejde';

@Component({
  selector: 'app-samarbejde-visning',
  templateUrl: './samarbejde-visning.component.html',
  styleUrls: ['./samarbejde-visning.component.css']
})
export class SamarbejdeVisningComponent implements OnInit {
  dialogRefSlet: MatDialogRef<SletDialogBoxComponent>;
  // dialogRefOpretSamarbejdeOl: MatDialogRef<OpretSamarbejdeOlDialogBoxComponent>;
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
    if (this.samarbejdeId = JSON.parse(localStorage.getItem('samarbejdeId') || '{}')) {
      this.restApi.getDatas(this.endpointO).subscribe(data => {
      this.olListe = data.filter((res: any) => {
        return  res.samarbejdeId === this.samarbejdeId;
        });
      })
    }
  }

  onOpdaterOl(id: any) {
    this.router.navigate(['../samarbejde/opdater-samarbejde/', id]);
  };

  onSletOl(id: any) {
    let dialogRef = this.dialog.open(SletDialogBoxComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        this.router.navigate(['../samarbejde/samarbejde-side/']);
      }
    });
  };
}
