import { Component, Input, OnInit } from '@angular/core';
import { Form, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Øl } from 'src/app/Models/Øl';
import { RestApiService } from 'src/app/shared/rest-api.service';
import { Opskrift } from 'src/app/Models/Opskrift';

// import { SletDialogBoxComponent } from '../slet-dialog-box/slet-dialog-box.component';

@Component({
  selector: 'app-ol-opskrift',
  templateUrl: './ol-opskrift.component.html',
  styleUrls: ['./ol-opskrift.component.css']
})
export class OlOpskriftComponent implements OnInit {
  ol: Øl;
  endpointO = '/Øl';
  bryggeriId: number;
  opskriftliste: Opskrift[];
  brugerId: number;
  olId: number;
  arrayList = new Array();
  id = this.actRoute.snapshot.params['id'];
  @Input() opskrift = { ølId: 0, stepOne:"", stepTwo:"", stepThree:"", stepFour:"", stepFive:"", offentlig: false }
  opskriftForm: FormGroup;
  constructor(
    public dialog: MatDialog,
    public restApi: RestApiService,
    public router: Router,
    public actRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.onOpretOpskrift();
    this.bryggeriId = JSON.parse(localStorage.getItem('bryggeriId') || '{}');
    this.opskriftForm = new FormGroup({
      navn: new FormControl('')
    });
    }
    //knapper til siden


    onOpretOpskrift()
    {
      this.restApi.createData(this.opskrift, this.endpointO).subscribe();
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
          res.bryggeriId = this.bryggeriId;
        })
      });

    }

}
