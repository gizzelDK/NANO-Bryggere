import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from './layout/layout.module';
import { HttpClientModule } from '@angular/common/http';
import { JwtHelperService, JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';
import { AuthInterceptorProvider } from './shared/token-interceptor.service';
import {MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS} from '@angular/material/snack-bar';



@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatSnackBarModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter:  () => localStorage.getItem('bearer'),
        allowedDomains: ["https://localhost:7252"],
      }
    })
  ],
  providers: [
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS }, JwtHelperService,
    AuthInterceptorProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
