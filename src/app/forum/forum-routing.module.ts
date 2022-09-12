import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OpretForumDialogBoxComponent } from '../admin/opret-forum-dialog-box/opret-forum-dialog-box.component';
import { ForsideComponent } from './forside/forside.component';
import { OpdaterForumDialogBoxComponent } from './opdater-forum-dialog-box/opdater-forum-dialog-box.component';
import { OpdaterPostDialogBoxComponent } from './opdater-post-dialog-box/opdater-post-dialog-box.component';

const routes: Routes = [
  {path:'forside', component:ForsideComponent},
  {path:'opret-forum', component:OpretForumDialogBoxComponent},
  {path:'opdater-forum', component:OpdaterForumDialogBoxComponent},
  {path:'opdater-post', component:OpdaterPostDialogBoxComponent},
  {path:'', component: ForsideComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ForumRoutingModule { }
