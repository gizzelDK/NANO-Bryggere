import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Bruger } from 'src/app/Models/Bruger';
import { ActivatedRoute, Router } from '@angular/router';
import { RestApiService } from 'src/app/shared/rest-api.service';
import { LoginService } from 'src/app/shared/login.service'
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
@Component({
  selector: 'app-login-side',
  templateUrl: './login-side.component.html',
  styleUrls: ['./login-side.component.css']
})

export class LoginSideComponent implements OnInit {
  login: any = {};
  logins: Bruger[];
  expirationDate: any;
  endpoints = '/Logins';
  endpointK = '/Kontaktoplysningers';
  endpointB = '/Brugers';
  hide = true;
  loginForm: FormGroup = new FormGroup({});

  @Input() loginDetaljer = { brugernavn: '', pw: '', brugerId: null };

  constructor(
    public router: Router,
    public loginService: LoginService,
    public actRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    localStorage.clear();
    this.loginForm = new FormGroup({
      brugernavn: new FormControl('', Validators.required),
      pw: new FormControl('', [Validators.required, Validators.minLength(3)])
    }
    );
  }


 async  onSubmitLogin(){

    if(!this.loginForm.invalid){
      await this.loginService.login(this.loginForm.get('brugernavn')?.value, this.loginForm.get('pw')?.value);
    }
    else{
      alert('username or password is empty');
    }

  }
  
  onSubmitRegistre() {
    this.router.navigate(['../login/registrer']);
  };



}
