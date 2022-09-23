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
  @Input() olOprettelse = {olBillede:'', navn: '', beskrivelse: '', land:'', type: '', smag: '', procent:null, aargang:'', bryggeriId: 0, samarbejdeId: 0};
 // , antal: ''
  opretForm: any = new FormGroup({});
  endpointO = '/Øl';
  olList:any;
  olBillede:any;
  samarbejdeId:number;
  bryggeriId:number;

  constructor(
    public dialogRefOpretSamarbejdeOl : MatDialogRef<OpretSamarbejdeOlDialogBoxComponent>,
    public restApi: RestApiService,
    public actRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.bryggeriId = JSON.parse(localStorage.getItem('bryggeriId') || '{}');
    this.samarbejdeId = JSON.parse(localStorage.getItem('samarbejdeId') || '{}')
    console.log('samarbejdeId....', this.samarbejdeId);
    this.opretForm = new FormGroup({
      navn: new FormControl('', Validators.required),
      type: new FormControl('', Validators.required),
      smag: new FormControl('', Validators.required),
      procent: new FormControl('', Validators.required),
      bryggeriId: new FormControl('', Validators.required),
      aargang: new FormControl('', Validators.required),
      land: new FormControl('', Validators.required),
      process: new FormControl('', Validators.required),
      olBillede: new FormControl('' , Validators.required),
      beskrivelse: new FormControl('', Validators.required),
     // antal: new FormControl('', Validators.required)
    });
  }

 /*  onSubmitOlBilled(event: any) {
    if(event.target.files) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (e: any) => {
        this.olBillede = e.target.result;
        localStorage.setItem('olBillede', JSON.stringify(this.olBillede));
      }
    }
  }; */

  onSubmitOlBilled(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e:any) => this.olOprettelse.olBillede = e.target.result;
      reader.readAsDataURL(event.target.files[0])
      // var reader = new FileReader();
      // reader.readAsDataURL(event.target.files[0]);
      // reader.onload = (e: any) => {
      //   this.olOprettelse.etiket = e.target.result;
      //   localStorage.setItem('logo', JSON.stringify(this.olOprettelse.etiket));
      // }
    }
    else{
      this.olOprettelse.olBillede = '';
    }
    };



  onSubmitOl() {
    // this.olOprettelse.samarbejdeId = JSON.parse(localStorage.getItem('samarbejdeId') || '{}');
    // this.olOprettelse.olBillede = JSON.parse(localStorage.getItem('olBillede') || '{}');
    this.olOprettelse.bryggeriId = this.bryggeriId;
    this.olOprettelse.samarbejdeId = this.samarbejdeId;
    console.log('samarbejdeId',  this.samarbejdeId);
    console.log('ol...',this.olOprettelse);
    this.restApi.createData(this.olOprettelse, this.endpointO).subscribe((olData) => {
      console.log('olll...', olData)
      localStorage.setItem('olId', JSON.stringify(olData.id));
      this.dialogRefOpretSamarbejdeOl.close();
      //this.router.navigate(['../main/katalog']);
    });

  }
}
