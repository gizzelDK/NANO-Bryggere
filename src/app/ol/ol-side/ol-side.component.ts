import { Component, OnInit,Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
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
  valueRating:number;
  offentligProfil:boolean;
 @Input() kommanter={olId:0, tekst:'', forfatterId:0 , rating:0}


  constructor(
    public dialog: MatDialog,
    public restApi: RestApiService,
    private _formBuilder: FormBuilder,
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
      rating:new FormControl('')

    });



  }

  onHentKontaktOplysninger(){
    return this.restApi.getData(this.kontaktOplysningerId, this.endpointK).subscribe((data) => {
      this.kontaktOplysninger = data;
      console.log('infokont..', this.kontaktOplysninger);


    })
  }

  onHentBryggeri(){
    return this.restApi.getData(this.bryggeriId, this.endpointB).subscribe((data) => {
      this.bryggeri = data;
      console.log('infoBryggeri..',  this.bryggeri);
      this.offentligProfil=this.bryggeri.kontaktoplysninger.offentlig;
      console.log('offentligProfil..', this.offentligProfil);
    })
  }

  onHentOl(){
    return this.restApi.getData(this.olId, this.endpointO).subscribe((data) => {
      this.ol = data;
      console.log('infoOl..', this.ol.id);
    })
  }


  onTilbage() {
    localStorage.removeItem('olKontaktOplysningerId');
    localStorage.removeItem('olBryggeriId');
    this.router.navigate(['../ol/ol-sogning']);
  };

  onChange($event:any){
    console.log("On change value:"+$event.target.value);
  }
  ngModelDataShow($event:any){
    this.valueRating=+$event;
    console.log("Ng Model On change value:"+$event);
  }

  onSendKommanter(){
    this.kommanter.forfatterId=this.brugerId;
    this.kommanter.olId=this.olId;
   this.kommanter.rating=this.valueRating;
    console.log('drop.....', this.kommanter.rating);
    this.restApi.createData(this.kommanter, this.endpointKom).subscribe((data) =>{
      this.kommanterId=data.id;
      console.log('kommanter....', data);
      this.KommenterForm.reset({
        'tekst':'',
        'rating':''
      });
    })


  }
}
