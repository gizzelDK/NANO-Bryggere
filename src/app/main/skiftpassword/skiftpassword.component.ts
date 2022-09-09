import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Bruger } from 'src/app/Models/Bruger';
import { RestApiService } from 'src/app/shared/rest-api.service';

@Component({
  selector: 'app-skiftpassword',
  templateUrl: './skiftpassword.component.html',
  styleUrls: ['./skiftpassword.component.css']
})
export class SkiftpasswordComponent implements OnInit {
  brugerId: number;
  endpointBru = '/Brugers';
  id:number;
  redigerPWForm:FormGroup;
  brugerList:Bruger;
@Input() chPW ={OldPW:'' ,NewPW:'' , brugerId:0  }

  constructor( public restApi: RestApiService,
    private router: Router,) { }


  ngOnInit(): void {
    this.brugerId = JSON.parse(localStorage.getItem('brugerId') || '{}');
    this.redigerPWForm= new FormGroup({
      OldPW: new FormControl('', [Validators.required]),
      NewPW: new FormControl('', [Validators.required])

    })
  }

  onChangePw(){
    this.brugerList.id = this.brugerId;
   // this.chPW.brugerId=this.brugerId;
    this.restApi.updateData(this.brugerList,this.endpointBru , this.chPW).subscribe((result) =>{
      this.router.navigate(['/main/profil']);
    })

  }

}
