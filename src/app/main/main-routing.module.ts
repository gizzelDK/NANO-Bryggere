import { OpretOlComponent } from './opret-ol/opret-ol.component';
import { RedigerOlComponent } from './rediger-ol/rediger-ol.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CertifikatComponent } from './certifikat/certifikat.component';
import { ForsideComponent } from './forside/forside.component';
import { KatalogComponent } from './katalog/katalog.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ProfilComponent } from './profil/profil.component';
import { RapportSideComponent } from './rapport-side/rapport-side.component';

const routes: Routes = [
{path:'', component:ForsideComponent},
{path:'main', component:ForsideComponent},
// {path:'event', component:EventSideComponent},
{path:'certifikat', component:CertifikatComponent},
{path:'profil', component:ProfilComponent},
// {path:'slet-profil', component:SletProfilComponent},
{path:'opdater-øl/:id', component:RedigerOlComponent},
{path:'opret-øl', component:OpretOlComponent},
{path:'katalog', component:KatalogComponent},
//{path:'samarbejds-side', component:SamarbejdeSideComponent},
// {path:'samarbejd-opdater/:id', component:SamarbejdeRedigerComponent},
// {path:'samarbejds-opretning', component:SamarbejdeOprettelseComponent},
// {path:'samarbejde-øl-lager/:id', component:SamarbejdeOlLagerComponent},
{path:'rapporter', component:RapportSideComponent},
{path:'**', component: NotFoundComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
