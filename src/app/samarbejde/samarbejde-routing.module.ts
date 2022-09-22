import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OlLagerComponent } from '../ol/ol-lager/ol-lager.component';
import { OpdaterSamarbejdeDialogBoxComponent } from './opdater-samarbejde-dialog-box/opdater-samarbejde-dialog-box.component';
import { OpretSamarbejdeDialogBoxComponent } from './opret-samarbejde-dialog-box/opret-samarbejde-dialog-box.component';
import { SamarbejdeAnsogningsSideComponent } from './samarbejde-ansognings-side/samarbejde-ansognings-side.component';
import { SamarbejdeKatalogComponent } from './samarbejde-katalog/samarbejde-katalog.component';
import { SamarbejdeOlLagerComponent } from './samarbejde-ol-lager/samarbejde-ol-lager.component';
import { SamarbejdeSideComponent } from './samarbejde-side/samarbejde-side.component';
import { SamarbejdeVisningComponent } from './samarbejde-visning/samarbejde-visning.component';

const routes: Routes = [
  {path:'opdater-samarbejde', component:OpdaterSamarbejdeDialogBoxComponent},
  {path:'opret-samarbejde', component:OpretSamarbejdeDialogBoxComponent},
  {path:'samarbejde-ansogning', component:SamarbejdeAnsogningsSideComponent},
  {path:'samarbejde-katalog', component:SamarbejdeKatalogComponent},
  {path:'samarbejde-ol-lager/:id', component:SamarbejdeOlLagerComponent},
  {path:'samarbejde-side', component:SamarbejdeSideComponent},
  {path:'samarbejde-visning', component:SamarbejdeVisningComponent},
  {path:'', component: SamarbejdeSideComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SamarbejdeRoutingModule { }
