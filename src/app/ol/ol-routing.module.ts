import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OlLagerComponent } from './ol-lager/ol-lager.component';
import { OlLommeregnerComponent } from './ol-lommeregner/ol-lommeregner.component';
import { OlOpskriftComponent } from './ol-opskrift/ol-opskrift.component';
import { OlSideSamarbejdeComponent } from './ol-side-samarbejde/ol-side-samarbejde.component';
import { OlSideComponent } from './ol-side/ol-side.component';
import { OlSogningComponent } from './ol-sogning/ol-sogning.component';

const routes: Routes = [
  {path:'ol-lager', component:OlLagerComponent},
  {path:'ol-lommeregner', component:OlLommeregnerComponent},
  {path:'ol-opskrift', component:OlOpskriftComponent},
  {path:'ol-samarbejde', component:OlSideSamarbejdeComponent},
  {path:'', component:OlSideComponent},
  {path:'ol-sogning', component:OlSogningComponent},];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OlRoutingModule { }
