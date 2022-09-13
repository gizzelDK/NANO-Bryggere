import { Component, OnInit,Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Kontaktoplysninger } from 'src/app/Models/Kontaktoplysninger';
import { Øl } from 'src/app/Models/Øl';
import { RestApiService } from 'src/app/shared/rest-api.service';

@Component({
  selector: 'app-ol-side',
  templateUrl: './ol-side.component.html',
  styleUrls: ['./ol-side.component.css']
})
export class OlSideComponent implements OnInit {
  kontaktOplysninger: Kontaktoplysninger;
  ol: Øl;
  bryggeri: any;
  endpointK = '/Kontaktoplysningers';
  endpointO = '/Øl';
  endpointB = '/Bryggeris';
  endpointKom='/Kommentars';
  bryggeriId: number;
  brugerId:number;
  olId: number;
  kommanterId:number;
  kontaktOplysningerId: number;
  id = this.actRoute.snapshot.params['id'];
  KommenterForm:any = new FormGroup({});
 @Input() kommanter={olId:0, tekst:'', forfatterId:0 , rating:0}


  constructor(
    public dialog: MatDialog,
    public restApi: RestApiService,
    public router: Router,
    public actRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.kontaktOplysningerId = JSON.parse(localStorage.getItem('olKontaktOplysningerId') || '{}');
    console.log('kontId..',  this.kontaktOplysningerId);
    this.bryggeriId = JSON.parse(localStorage.getItem('olBryggeriId') || '{}');
    console.log('bryggeriId..', this.bryggeriId );
    this.olId = JSON.parse(localStorage.getItem('olId') || '{}');
    console.log('olId..', this.olId);
    this.brugerId=JSON.parse(localStorage.getItem('brugerId') || '{}');
    console.log('brugerId..',  this.brugerId);

    this.onHentOl();
    this.onHentKontaktOplysninger();
    this.onHentBryggeri();
    
    this.KommenterForm= new FormGroup({
      tekst:new FormControl(''),
      rating:new FormGroup('',[Validators.min(0), Validators.max(5)])

    });

  }

  onHentKontaktOplysninger(){
    return this.restApi.getData(this.kontaktOplysningerId, this.endpointK).subscribe((data) => {
      this.kontaktOplysninger = data;
      console.log('infokont..', data);
    })
  }

  onHentBryggeri(){
    return this.restApi.getData(this.bryggeriId, this.endpointB).subscribe((data) => {
      this.bryggeri = data;
      console.log('infoBryggeri..', data);
    })
  }

  onHentOl(){
    return this.restApi.getData(this.id, this.endpointO).subscribe((data) => {
      this.ol = data;
      console.log('infoOl..', data);
    })
  }


  onTilbage() {
    localStorage.removeItem('olKontaktOplysningerId');
    localStorage.removeItem('olBryggeriId');
    this.router.navigate(['../øl/øl-søgning']);
  };

  onSendKommanter(){
    this.kommanter.forfatterId=this.brugerId;
    this.kommanter.olId=this.olId;
    this.restApi.createData(this.kommanter, this.endpointKom).subscribe((data) =>{
      this.kommanterId=data.id;
      console.log('kommanter....', this.kommanterId);
    })


  }
}
