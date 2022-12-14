import { Component, Input, OnInit } from '@angular/core';
import { Form, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Øl } from 'src/app/Models/Øl';
import { RestApiService } from 'src/app/shared/rest-api.service';
import { Opskrift } from 'src/app/Models/Opskrift';
import { OlOpskriftListeComponent } from '../ol-opskrift-liste/ol-opskrift-liste.component';
// import { SletDialogBoxComponent } from '../slet-dialog-box/slet-dialog-box.component';

@Component({
  selector: 'app-ol-opskrift',
  templateUrl: './ol-opskrift.component.html',
  styleUrls: ['./ol-opskrift.component.css']
})
export class OlOpskriftComponent implements OnInit {
  _opskrift: Opskrift = new Opskrift();
  endpointO = '/Opskrifts';
  bryggeriId: number;
  opskriftliste: Opskrift[];
  brugerId: number;
  olId: number;
  arrayList = new Array();
  id = this.actRoute.snapshot.params['id'];
  @Input() opskrift = { ølId: null, stepOne:"", stepTwo:"", stepThree:"", stepFour:"", stepFive:"", offentliggjort: false, bryggeriId: 0 }
  opskriftForm:any = new FormGroup({});

  constructor(
    public dialog: MatDialog,
    public restApi: RestApiService,
    public router: Router,
    public actRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.bryggeriId = +JSON.parse(localStorage.getItem('bryggeriId') || '');
    this.olId = JSON.parse(localStorage.getItem('olId') || '{}');
    this.opskriftForm = new FormGroup({
      stepOne: new FormControl('')
      ,stepTwo: new FormControl('')
      ,stepThree: new FormControl('')
      ,stepFour: new FormControl('')
      ,stepFive: new FormControl('')
      ,offentliggjort: new FormControl('')
    });
    }
    //knapper til siden


    onOpretOpskrift()
    {
      this.opskrift.bryggeriId = this.bryggeriId;
      // this.opskrift.ølId = this.olId;
      console.log('We made it here', this.bryggeriId)
      this.restApi.createData(this.opskrift, this.endpointO).subscribe((data) =>{
        console.log('Opskrift.......', data);
      });
    }
    onNulstilOpskrift(){
      this.opskriftForm.reset();
    }
    onAnuller()
    {
      this.opskriftForm.reset();
    }

    onOpdaterOpskrift(id:any)
    {
     this.restApi.updateData(id, this.endpointO, this.opskrift).subscribe();
    }
    onSletOpskrift(id:any)
    {
     this.restApi.deleteData(id, this.endpointO);
    }
    onHentOpskrift()
    {
      this.restApi.getDatas(this.endpointO).subscribe((data)=> {
        this.opskriftliste = data.filter((res: any) => {
          //filtere
          return res.bryggeriId === this.bryggeriId;
        })
      });

    }

}
