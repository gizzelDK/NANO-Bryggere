import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForsideComponent } from './forside/forside.component';
import { OpdaterForumDialogBoxComponent } from './opdater-forum-dialog-box/opdater-forum-dialog-box.component';
import { OpdaterPostDialogBoxComponent } from './opdater-post-dialog-box/opdater-post-dialog-box.component';

const routes: Routes = [
  {path:'forside', component:ForsideComponent},
  {path:'opdater-forum', component:OpdaterForumDialogBoxComponent},
  {path:'opdater-post', component:OpdaterPostDialogBoxComponent},
  {path:'', component: ForsideComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ForumRoutingModule { }
