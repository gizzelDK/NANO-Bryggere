import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OlLagerComponent } from './ol-lager/ol-lager.component';
import { OlOpskriftListeComponent } from './ol-opskrift-liste/ol-opskrift-liste.component';
import { OlOpskriftComponent } from './ol-opskrift/ol-opskrift.component';
import { OlSideSamarbejdeComponent } from './ol-side-samarbejde/ol-side-samarbejde.component';
import { OlSideComponent } from './ol-side/ol-side.component';
import { OlSogningComponent } from './ol-sogning/ol-sogning.component';

const routes: Routes = [
  {path:'ol-lager/:id', component:OlLagerComponent},
  {path:'ol-side/:id', component:OlSideComponent},
  {path:'ol-samarbejde', component:OlSideSamarbejdeComponent},
  {path:'ol-opskrift', component:OlOpskriftComponent},
  {path:'ol-opskriftListe', component:OlOpskriftListeComponent},
  {path:'', component:OlSideComponent},
  {path:'ol-sogning', component:OlSogningComponent},];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OlRoutingModule { }
