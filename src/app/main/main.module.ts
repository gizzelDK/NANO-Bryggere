import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainRoutingModule } from './main-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {ScrollingModule} from '@angular/cdk/scrolling';

import { ForsideComponent } from './forside/forside.component';
import { CertifikatComponent } from './certifikat/certifikat.component';

import {MatProgressBarModule} from '@angular/material/progress-bar';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTreeModule } from '@angular/material/tree';
import {MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS} from '@angular/material/snack-bar';
import { KatalogComponent } from './katalog/katalog.component';

@NgModule({
  declarations: [
    ForsideComponent,
    CertifikatComponent,
    KatalogComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    MatCardModule,
    MatGridListModule,
    MatToolbarModule,
    MatListModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatSidenavModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatExpansionModule,
    MatDialogModule,
    MatSelectModule,
    MatOptionModule,
    MatTreeModule,
    ScrollingModule
  ],
  providers:[
    {provide:MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue : {duration:2500}}
  ],
  exports: [
    ForsideComponent,
    CertifikatComponent
  ]
})
export class MainModule { }
