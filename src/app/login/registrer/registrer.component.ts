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
  @Input() nyBruger = { pw: '', brugernavn: '', rolleNavn: '', rolleId: 0, level: 0, kontaktoplysningerId: null,
  fnavn: '', enavn: '', addresselinje1: '', addresselinje2: '', postnr: '', by: '', email: '', telefonNr: '',
   deleted:false, acceptedPolicy: false , certifikatId:null};
//certifikatStatus: 1

   brugerFormGroup:any = new FormGroup({});
   endpointK = '/Kontaktoplysningers';
   endpointB= '/Brugers';
   endpointR= '/Rolles';

  constructor(
    private _formBuilder: FormBuilder,
    public restApi: RestApiService,
    public router: Router) { }

  ngOnInit(): void {
    this.brugerFormGroup = this._formBuilder.group({
      'kontaktoplysningerId': new FormControl(''),
      'fnavn' : new FormControl('' , Validators.required),
      'enavn': new FormControl('' , Validators.required),
      'addresselinje1': new FormControl(''),
      'addresselinje2': new FormControl(''),
      'postnr' : new FormControl(''),
      'by': new FormControl(''),
      'email' : new FormControl('' , Validators.email ),
      'telefonNr': new FormControl(''),
      'brugernavn' : new FormControl(''),
      'pw': new FormControl(''),
      'rolleId': new FormControl(''),
      'rolleNavn': new FormControl(''),
      'level': new FormControl(''),
      'deleted': new FormControl(''),
      'acceptedPolicy': new FormControl(''),
      'certifikatId': new FormControl(''),
    });
  }
  onOpretBruger(){
    console.log('test:',  this.nyBruger);
    //this.nyBruger.certifikatStatus = 1;
    this.nyBruger.acceptedPolicy=false;
    this.nyBruger.deleted=false;
    this.nyBruger.rolleNavn="Bruger";
    this.nyBruger.level=100;
    //this.nyBruger.certifikatId=1;
    this.nyBruger.rolleId=2;
    this.restApi.createData(this.nyBruger, this.endpointK).subscribe((dataC) => {
      console.log('kontakt:', dataC);
       this.nyBruger.kontaktoplysningerId= dataC.id;
   /*     this.nyBruger.rolleNavn='Bruger';
       this.nyBruger.level=100 + ""; */
 /*       if(this.nyBruger.rolleNavn == 'AnonymBruger')
       this.nyBruger.level=0 + "";
       if(this.nyBruger.rolleNavn == 'Bruger')
       this.nyBruger.level=100 + "";
       if(this.nyBruger.rolleNavn == 'Moderator')
       this.nyBruger.level=200 + "";
       if(this.nyBruger.rolleNavn == 'Administrator')
       this.nyBruger.level=300 + ""; */
      // this.restApi.createData(this.nyBruger , this.endpointR).subscribe((dataR) => {
      //  this.nyBruger.rolleId=dataR.id;
       this.restApi.createData(this.nyBruger , this.endpointB).subscribe((dataB) => {
        console.log("bruger:", this.nyBruger);
        // var userId = dataB.id;
         this.router.navigate(["../login/login"]);
        }) ;
      //})
     } , err => {
        {alert('udfyldt alle felter')
       }
     })
   }

}
