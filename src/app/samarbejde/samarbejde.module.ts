import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SamarbejdeRoutingModule } from './samarbejde-routing.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {ScrollingModule} from '@angular/cdk/scrolling';
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

import { SamarbejdeSideComponent } from './samarbejde-side/samarbejde-side.component';
import { SamarbejdeVisningComponent } from './samarbejde-visning/samarbejde-visning.component';
import { SamarbejdeKatalogComponent } from './samarbejde-katalog/samarbejde-katalog.component';
import { SamarbejdeOlLagerComponent } from './samarbejde-ol-lager/samarbejde-ol-lager.component';
import { OpretSamarbejdeDialogBoxComponent } from './opret-samarbejde-dialog-box/opret-samarbejde-dialog-box.component';
import { OpdaterSamarbejdeDialogBoxComponent } from './opdater-samarbejde-dialog-box/opdater-samarbejde-dialog-box.component';
import { SamarbejdeAnsogningsSideComponent } from './samarbejde-ansognings-side/samarbejde-ansognings-side.component';
import { OpretSamarbejdeOlDialogBoxComponent } from './opret-samarbejde-ol-dialog-box/opret-samarbejde-ol-dialog-box.component';
import { OpdaterSamarbejdeOlDialogBoxComponent } from './opdater-samarbejde-ol-dialog-box/opdater-samarbejde-ol-dialog-box.component';


@NgModule({
  declarations: [
    SamarbejdeSideComponent,
    SamarbejdeVisningComponent,
    SamarbejdeKatalogComponent,
    SamarbejdeOlLagerComponent,
    OpretSamarbejdeDialogBoxComponent,
    OpdaterSamarbejdeDialogBoxComponent,
    SamarbejdeAnsogningsSideComponent,
    OpretSamarbejdeOlDialogBoxComponent,
    OpdaterSamarbejdeOlDialogBoxComponent
  ],
  imports: [
    CommonModule,
    SamarbejdeRoutingModule,
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
  exports:[
    SamarbejdeSideComponent,
    SamarbejdeVisningComponent,
    SamarbejdeKatalogComponent,
    SamarbejdeOlLagerComponent,
    OpretSamarbejdeDialogBoxComponent,
    OpdaterSamarbejdeDialogBoxComponent
  ]
})
export class SamarbejdeModule { }
