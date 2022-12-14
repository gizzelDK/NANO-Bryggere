import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Login } from 'src/app/Models/Login';
import { RestApiService } from 'src/app/shared/rest-api.service';

@Component({
  selector: 'app-login-admin-side',
  templateUrl: './login-admin-side.component.html',
  styleUrls: ['./login-admin-side.component.css']
})
export class LoginAdminSideComponent implements OnInit {
  login: Login[];
  endpointL = '/Logins';
  endpointB = '/Brugers';
  clickButton: boolean = true;
  id = this.actRoute.snapshot.params['id'];
  loginListe: any;
  brugere: any;

  constructor(
    public dialog: MatDialog,
    public restApi: RestApiService,
    public router: Router,
    public actRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.onHentLogin();
  }
  onHentLogin() {
    return this.restApi.getDatas(this.endpointL).subscribe(data => {
      this.login = data;
    });
  }

  onVisLogin(id: any) {
    this.clickButton = false;
    return this.restApi.getData(id, this.endpointL).subscribe(data => {
      this.loginListe = data;
      this.restApi.getData(this.loginListe.brugerId, this.endpointB).subscribe((res) => {
        this.brugere = res;
      });
    });
  }
}
