import { LoginSideComponent } from './login/login-side/login-side.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IsAuthenticatedGuard } from './shared/is-authenticated.guard';
import { HasRoleGuard } from './shared/has-role.guard';
import { NotFoundComponent } from './main/not-found/not-found.component';

const routes: Routes = [
  {path:'' , component: LoginSideComponent},
  {path:'login' , loadChildren:() => import('./login/login.module').then(mod => mod.LoginModule)},
  {path:'main' , loadChildren :() => import('./main/main.module').then(mod => mod.MainModule)},
  {path:'ol' , loadChildren :() => import('./ol/ol.module').then(mod => mod.OlModule)},
  {path:'forum' , loadChildren :() => import('./forum/forum.module').then(mod => mod.ForumModule)},
  {path:'samarbejde' , loadChildren :() => import('./samarbejde/samarbejde.module').then(mod => mod.SamarbejdeModule)},
  {path:'admin' , loadChildren :() => import('./admin/admin.module').then(mod => mod.AdminModule),
  canActivate: [IsAuthenticatedGuard, HasRoleGuard],
  data:{
    //min level access
    // clearance: 'Bruger Administrator',
    clearance: 20,
  }},
  
  {path:'event' , loadChildren :() => import('./event/event.module').then(mod => mod.EventModule),
  canActivate: [IsAuthenticatedGuard, HasRoleGuard],
  data:{
    //min level access
    // clearance: 'Bruger Administrator',
    clearance: 10,
  }},
  
  {path:'**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
