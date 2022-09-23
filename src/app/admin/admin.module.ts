import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatTreeModule} from '@angular/material/tree';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS} from '@angular/material/snack-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatInputModule } from '@angular/material/input';
import {MatTabsModule} from '@angular/material/tabs';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminForsideComponent } from './admin-forside/admin-forside.component';
import { BrugerAdminSideComponent } from './bruger-admin-side/bruger-admin-side.component';
import { BryggeriAdminSideComponent } from './bryggeri-admin-side/bryggeri-admin-side.component';
import { DeltagerAdminSideComponent } from './deltager-admin-side/deltager-admin-side.component';
import { EventAdminSideComponent } from './event-admin-side/event-admin-side.component';
import { ForumAdminSideComponent } from './forum-admin-side/forum-admin-side.component';
import { OlAdminSideComponent } from './ol-admin-side/ol-admin-side.component';
import { LoginAdminSideComponent } from './login-admin-side/login-admin-side.component';
import { RolleAdminSideComponent } from './rolle-admin-side/rolle-admin-side.component';
import { SamarbejdeAdminSideComponent } from './samarbejde-admin-side/samarbejde-admin-side.component';
import { OpretForumDialogBoxComponent } from './opret-forum-dialog-box/opret-forum-dialog-box.component';
import { OpdaterForumDialogBoxComponent } from './opdater-forum-dialog-box/opdater-forum-dialog-box.component';
import { OpdaterSamarbejdeDialogBoxComponent } from './opdater-samarbejde-dialog-box/opdater-samarbejde-dialog-box.component';
import { OpdaterTagDialogBoxComponent } from './opdater-tag-dialog-box/opdater-tag-dialog-box.component';
import { OpretRapportDialogBoxComponent } from './opret-rapport-dialog-box/opret-rapport-dialog-box.component';
import { OpretSamarbejdeDialogBoxComponent } from './opret-samarbejde-dialog-box/opret-samarbejde-dialog-box.component';
import { OpretTagDialogBoxComponent } from './opret-tag-dialog-box/opret-tag-dialog-box.component';
import { OpretEventDialogBoxComponent } from './opret-event-dialog-box/opret-event-dialog-box.component';
import { OpdaterEventDialogBoxComponent } from './opdater-event-dialog-box/opdater-event-dialog-box.component';
import { RapportAdminSideComponent } from './rapport-admin-side/rapport-admin-side.component';
import { TagAdminSideComponent } from './tag-admin-side/tag-admin-side.component';
import { CertifikatAdminSideComponent } from './certifikat-admin-side/certifikat-admin-side.component';
import { SlettedeBrugereAdminComponent } from './slettede-brugere-admin/slettede-brugere-admin.component';


@NgModule({
  declarations: [
    AdminForsideComponent,
    BrugerAdminSideComponent,
    BryggeriAdminSideComponent,
    DeltagerAdminSideComponent,
    EventAdminSideComponent,
    ForumAdminSideComponent,
    OlAdminSideComponent,
    LoginAdminSideComponent,
    RolleAdminSideComponent,
    SamarbejdeAdminSideComponent,
    OpretForumDialogBoxComponent,
    OpdaterForumDialogBoxComponent,
    OpdaterSamarbejdeDialogBoxComponent,
    OpdaterTagDialogBoxComponent,
    OpretRapportDialogBoxComponent,
    OpretSamarbejdeDialogBoxComponent,
    OpretTagDialogBoxComponent,
    OpretEventDialogBoxComponent,
    OpdaterEventDialogBoxComponent,
    RapportAdminSideComponent,
    TagAdminSideComponent,
    CertifikatAdminSideComponent,
    SlettedeBrugereAdminComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatTreeModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatFormFieldModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    MatExpansionModule,
    MatDialogModule,
    MatSnackBarModule,
    MatSidenavModule,
    MatInputModule,
    MatTabsModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  exports:[
    AdminForsideComponent,
    BrugerAdminSideComponent
  ],
  providers: [
    MatDatepickerModule,
    MatNativeDateModule
  ]
})
export class AdminModule { }
