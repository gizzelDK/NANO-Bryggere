import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminForsideComponent } from './admin-forside/admin-forside.component';
import { BrugerAdminSideComponent } from './bruger-admin-side/bruger-admin-side.component';
import { BryggeriAdminSideComponent } from './bryggeri-admin-side/bryggeri-admin-side.component';
import { CertifikatAdminSideComponent } from './certifikat-admin-side/certifikat-admin-side.component';
import { DeltagerAdminSideComponent } from './deltager-admin-side/deltager-admin-side.component';
import { EventAdminSideComponent } from './event-admin-side/event-admin-side.component';
import { ForumAdminSideComponent } from './forum-admin-side/forum-admin-side.component';
import { LoginAdminSideComponent } from './login-admin-side/login-admin-side.component';
import { OlAdminSideComponent } from './ol-admin-side/ol-admin-side.component';
import { OpdaterEventDialogBoxComponent } from './opdater-event-dialog-box/opdater-event-dialog-box.component';
import { OpdaterForumDialogBoxComponent } from './opdater-forum-dialog-box/opdater-forum-dialog-box.component';
import { OpretEventDialogBoxComponent } from './opret-event-dialog-box/opret-event-dialog-box.component';
import { OpretForumDialogBoxComponent } from './opret-forum-dialog-box/opret-forum-dialog-box.component';
import { OpretRapportDialogBoxComponent } from './opret-rapport-dialog-box/opret-rapport-dialog-box.component';
import { OpretSamarbejdeDialogBoxComponent } from './opret-samarbejde-dialog-box/opret-samarbejde-dialog-box.component';
import { OpretTagDialogBoxComponent } from './opret-tag-dialog-box/opret-tag-dialog-box.component';
import { RapportAdminSideComponent } from './rapport-admin-side/rapport-admin-side.component';
import { RolleAdminSideComponent } from './rolle-admin-side/rolle-admin-side.component';
import { SamarbejdeAdminSideComponent } from './samarbejde-admin-side/samarbejde-admin-side.component';
import { TagAdminSideComponent } from './tag-admin-side/tag-admin-side.component';

const routes: Routes = [
  {path:'forside-admin', component:AdminForsideComponent},
  {path:'bruger-admin', component: BrugerAdminSideComponent},
  {path:'bryggeri-admin', component:BryggeriAdminSideComponent},
  {path:'certifikat-admin', component:CertifikatAdminSideComponent},
  {path:'deltager-admin', component:DeltagerAdminSideComponent},
  {path:'event-admin', component:EventAdminSideComponent},
  {path:'forum-admin', component:ForumAdminSideComponent},
  {path:'login-admin', component:LoginAdminSideComponent},
  {path:'ol-admin', component:OlAdminSideComponent},
  {path:'opdater-event-admin', component:OpdaterEventDialogBoxComponent},
  {path:'opdater-forum-admin', component:OpdaterForumDialogBoxComponent},
  {path:'opret-event-admin', component:OpretEventDialogBoxComponent},
  {path:'opret-forum-admin', component:OpretForumDialogBoxComponent},
  {path:'opret-rapport-admin', component:OpretRapportDialogBoxComponent},
  {path:'opret-samarbejde-admin', component:OpretSamarbejdeDialogBoxComponent},
  {path:'opret-tag-admin', component:OpretTagDialogBoxComponent},
  {path:'rapport-admin', component:RapportAdminSideComponent},
  {path:'rolle-admin', component:RolleAdminSideComponent},
  {path:'samarbejde-admin', component:SamarbejdeAdminSideComponent},
  {path:'tag-admin', component:TagAdminSideComponent},
  {path:'', component: AdminForsideComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
