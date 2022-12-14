import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Bryggeri } from 'src/app/Models/Bryggeri';
import { RestApiService } from 'src/app/shared/rest-api.service';

@Component({
  selector: 'app-rediger-bryggeri-dialog-box',
  templateUrl: './rediger-bryggeri-dialog-box.component.html',
  styleUrls: ['./rediger-bryggeri-dialog-box.component.css']
})
export class RedigerBryggeriDialogBoxComponent implements OnInit {

  bryggeriListe: Bryggeri;
  endpointB='/Bryggeris';
  redigerForm: FormGroup = new FormGroup({});
  bryggeriId: number ;

  constructor(public dialogRefRedigerProfil : MatDialogRef<RedigerBryggeriDialogBoxComponent>,
    public restApi: RestApiService ,
    private router: Router ,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.bryggeriId=JSON.parse(localStorage.getItem('bryggeriId') || '{}');
    this.restApi.getData(this.bryggeriId , this.endpointB)
    .toPromise()
    .then(data => {
      this.bryggeriListe = data;
      this.redigerForm=this.formBuilder.group({
        'bryggeriLogoCtl' : new FormControl(this.bryggeriListe.bryggeriLogo),
        'navnCtl' : new FormControl(this.bryggeriListe.navn),
        'beskrivelseCtl' : new FormControl(this.bryggeriListe.beskrivelse)
      });
    })
  }

  onSubmitCertifikats(event: any) {
    if(event.target.files){
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload=(e: any)=>{
        this.bryggeriListe.bryggeriLogo =e.target.result;
        localStorage.setItem('bryggeriLogo' ,JSON.stringify(this.bryggeriListe.bryggeriLogo));
      }
    }
  };

  onAnuller(){
    // this.dialogRefRedigerProfil.close();
    return this.router.navigate(['../main/profil']);
  }

}
