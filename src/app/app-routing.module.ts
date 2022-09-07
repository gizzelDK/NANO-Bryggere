import { LoginSideComponent } from './login/login-side/login-side.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IsAuthenticatedGuard } from './shared/is-authenticated.guard';
import { HasRoleGuard } from './shared/has-role.guard';

const routes: Routes = [
  {path:'' , component: LoginSideComponent},
  {path:'login' , loadChildren:() => import('./login/login.module').then(mod => mod.LoginModule)},
  {path:'main' , loadChildren :() => import('./main/main.module').then(mod => mod.MainModule),
    canActivate: [IsAuthenticatedGuard, HasRoleGuard],
    data:{
      // clearance: 'Bruger Administrator',
      clearance: 10,
  }}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
