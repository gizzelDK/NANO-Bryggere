import { Component, OnInit,Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RestApiService } from 'src/app/shared/rest-api.service';

@Component({
  selector: 'app-registrer',
  templateUrl: './registrer.component.html',
  styleUrls: ['./registrer.component.css']
})
export class RegistrerComponent implements OnInit {
  @Input() nyBruger = { pw: '', brugernavn: '', rolleId: 0, kontaktoplysningerId: null,
  fnavn: '', enavn: '', addresselinje1: '', addresselinje2: '', postnr: '', by: '', email: '', telefonNr: '',
};
//@Input() nyCertifikat = {cStatus:'', brugerId: null}


   brugerFormGroup:any = new FormGroup({});
   endpointK = '/Kontaktoplysningers';
   endpointB= '/Brugers';
   endpointR= '/Rolles';
   endpointC='/Certifikats';

  constructor(
    private _formBuilder: FormBuilder,
    public restApi: RestApiService,
    public router: Router) { }

  ngOnInit(): void {
    this.brugerFormGroup = this._formBuilder.group({
      'kontaktoplysningerId': new FormControl(''),
      'fnavn' : new FormControl('' , Validators.required),
      'enavn': new FormControl('' , Validators.required),
      'addresselinje1': new FormControl('' , Validators.required),
      'addresselinje2': new FormControl(''),
      'postnr' : new FormControl('' , Validators.required),
      'by': new FormControl('' , Validators.required),
      'email' : new FormControl('' , Validators.email ),
      'telefonNr': new FormControl('' , Validators.required),
      'brugernavn' : new FormControl('' , Validators.required),
      'pw': new FormControl('' , Validators.required),
      'rolleId': new FormControl(''),
    //  'rolleNavn': new FormControl(''),
     // 'level': new FormControl(''),
    });
  }
  onOpretBruger(){
    console.log('test:',  this.nyBruger);
   // this.nyBruger.rolleNavn="Bruger";
   // this.nyBruger.level=10;
    this.nyBruger.rolleId=2;
    this.restApi.createData(this.nyBruger, this.endpointK).subscribe((dataK) => {
      console.log('kontakt:', dataK);
       this.nyBruger.kontaktoplysningerId= dataK.id;
       this.restApi.createData(this.nyBruger , this.endpointB).subscribe((dataB) => {
        //console.log("certifikat", this.nyCertifikat.brugerId = dataB.id);
       // this.nyCertifikat.brugerId = dataB.id;
       // this.nyCertifikat.cStatus='IkkeSendt';
        // this.restApi.createData(this.nyCertifikat, this.endpointC).subscribe((dataC) => {
        //   console.log('cer....' ,this.nyBruger )
           this.router.navigate(["../login/login"]);
       // })
      }) ;
     } , err => {
        {alert('udfyldt alle felter')
       }
     })
   }

}
