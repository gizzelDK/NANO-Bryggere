import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PwDto } from 'src/app/Models/PwDto';
import { RestApiService } from 'src/app/shared/rest-api.service';

@Component({
  selector: 'app-skiftpassword',
  templateUrl: './skiftpassword.component.html',
  styleUrls: ['./skiftpassword.component.css']
})
export class SkiftpasswordComponent implements OnInit {
  brugerId: number;
  endpointBru = '/Brugers/pw';
  redigerPWForm:FormGroup;
  pwDto: PwDto = new PwDto();
@Input() chPW ={OldPw:'' ,NewPw:''}

  constructor( public restApi: RestApiService,
               private router: Router,) { }

  ngOnInit(): void {
    this.brugerId = JSON.parse(localStorage.getItem('brugerId') || '{}');
    this.redigerPWForm= new FormGroup({
      OldPw: new FormControl('', [Validators.required]),
      NewPw: new FormControl('', [Validators.required])
    })
  }

  onChangePw(){
    this.pwDto.oldPw = this.chPW.OldPw;
    this.pwDto.newPw = this.chPW.NewPw;
    console.log('the new pw: ' + this.pwDto )
    this.restApi.updateData(this.brugerId, this.endpointBru ,this.pwDto).subscribe((result) =>{
      console.log(result)
      this.router.navigate(['/main/profil']);
    })
  }

}
