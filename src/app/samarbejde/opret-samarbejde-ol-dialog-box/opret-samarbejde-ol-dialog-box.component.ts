import { Component, OnInit ,Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { RestApiService } from 'src/app/shared/rest-api.service';

@Component({
  selector: 'app-opret-samarbejde-ol-dialog-box',
  templateUrl: './opret-samarbejde-ol-dialog-box.component.html',
  styleUrls: ['./opret-samarbejde-ol-dialog-box.component.css']
})
export class OpretSamarbejdeOlDialogBoxComponent implements OnInit {
  @Input() olOprettelse = {olBillede:'', navn: '', beskrivelse: '', land:'', samarbejdeId: null, type: '', smag: '', procent: '', antal: '', aargang: null, bryggerId: null};

  opretForm: any = new FormGroup({});
  endpointO = '/Øl';
  olList:any;
  olBillede:any;

  constructor(
    public dialogRefOpretSamarbejdeOl : MatDialogRef<OpretSamarbejdeOlDialogBoxComponent>,
    public restApi: RestApiService,
    public actRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.opretForm = new FormGroup({
      navn: new FormControl('', Validators.required),
      type: new FormControl('', Validators.required),
      smag: new FormControl('', Validators.required),
      procent: new FormControl('', Validators.required),
      samarbejdeId: new FormControl('', Validators.required),
      aargang: new FormControl('', Validators.required),
      land: new FormControl('', Validators.required),
      process: new FormControl('', Validators.required),
      olBillede: new FormControl('' , Validators.required),
      beskrivelse: new FormControl('', Validators.required),
      antal: new FormControl('', Validators.required)
    });
  }

  onSubmitOlBilled(event: any) {
    if(event.target.files) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (e: any) => {
        this.olBillede = e.target.result;
        localStorage.setItem('olBillede', JSON.stringify(this.olBillede));
      }
    }
  };

  onSubmitOl() {
    this.olOprettelse.samarbejdeId = JSON.parse(localStorage.getItem('samarbejdeId') || '{}');
    this.olOprettelse.olBillede = JSON.parse(localStorage.getItem('olBillede') || '{}');
    this.olOprettelse.bryggerId = JSON.parse(localStorage.getItem('bryggeriId') || '{}');
    console.log(this.olOprettelse);
    this.restApi.createData(this.olOprettelse, this.endpointO).subscribe((olData) => {
      localStorage.setItem('olId', JSON.stringify(olData.id));
      this.dialogRefOpretSamarbejdeOl.close();
      //this.router.navigate(['../main/katalog']);
    });
  }
}
