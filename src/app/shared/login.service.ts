import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { RestApiService } from './rest-api.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Clearance } from '../Models/Clearance';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class LoginService  {
  private _isLoggedIn$ = new BehaviorSubject<boolean>(false)
  private readonly TOKEN_NAME = 'bearer'
  private _clearance$ = new Clearance()
  isLoggedIn$ = this._isLoggedIn$
  clearance$ = this._clearance$
  endpointB = '/Brugers';

  get token(): any{
    return localStorage.getItem(this.TOKEN_NAME);
  }
  get rolle(): any{
    return localStorage.getItem('rolle');
  }
  get level(): any{
    return localStorage.getItem('level');
  }
  constructor(private apiservice: RestApiService, private jwtHelper: JwtHelperService, private router: Router) {
    this._isLoggedIn$.next(!!this.token)
    this._clearance$.role = this.rolle
    this._clearance$.level = this.level
   }

  login(username: string, pw: string){
    return this.apiservice.createData({ "brugernavn": username, "pw": pw },'/Logins').subscribe((response) =>{
      // localStorage.clear();
      console.log('login response', response)
      localStorage.setItem(this.TOKEN_NAME, 'bearer ' +response.bearer)
      var dt =this.getTokenDecoded(response.bearer);
      this._clearance$.id = dt.Id
      this._clearance$.name = dt.Name
      this._clearance$.role = dt.Role
      this._clearance$.level = dt.Level
        localStorage.setItem('brugerId' , this.clearance$.id.toString()) ;
        localStorage.setItem('rolle' , this.clearance$.role);
        localStorage.setItem('level' , this.clearance$.level);
      //console.log('responce.....', response);
        this._isLoggedIn$.next(true)
        console.log('log of response', response)
        console.log('this.bruger......................................', this.rolle)

        console.log("test",this.isLoggedIn$.value);
        if(this.isLoggedIn$.value == true){
          console.log("test1");
          if( this.clearance$.role === "Administrator"){
              console.log('isadmin....', this.clearance$.role );
            this.router.navigate(['../admin/forside-admin']);
          }
          else{
            console.log('isadmin....', this.clearance$.role);
            this.router.navigate(['../main/profil']);
            // .then(() => {
            //   window.location.reload();
            // });
          }
        }
    })
  }
  // private getUser(token: string): Rolle{
  //   return JSON.parse(atob(token.split('.')[1])) as Rolle;
  // }
  getTokenDecoded(token: any) {
    console.log("decoded token ------------------- : ",this.jwtHelper.decodeToken(token))
    return this.jwtHelper.decodeToken(token) ;
  }
}
