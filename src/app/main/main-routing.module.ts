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
import { SkiftpasswordComponent } from './skiftpassword/skiftpassword.component';
import { FindBryggerComponent } from './find-brygger/find-brygger.component';
import { FolgBryggerComponent } from './folg-brygger/folg-brygger.component';
import { BryggerKatalogComponent } from './brygger-katalog/brygger-katalog.component';

const routes: Routes = [
{path:'', component:ForsideComponent},
{path:'main', component:ForsideComponent},
// {path:'event', component:EventSideComponent},
{path:'certifikat', component:CertifikatComponent},
{path:'profil', component:ProfilComponent},
{path:'skiftpassword', component:SkiftpasswordComponent},
// {path:'slet-profil', component:SletProfilComponent},
{path:'opdater-øl/:id', component:RedigerOlComponent},
{path:'opret-øl', component:OpretOlComponent},
{path:'katalog', component:KatalogComponent},
{path:'find-brygger', component:FindBryggerComponent},
{path:'fulgte-brygger-side', component:FolgBryggerComponent},
{path:'bryggers-katalog', component:BryggerKatalogComponent},
// {path:'samarbejds-opretning', component:SamarbejdeOprettelseComponent},
// {path:'samarbejde-øl-lager/:id', component:SamarbejdeOlLagerComponent},
{path:'rapporter', component:RapportSideComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
