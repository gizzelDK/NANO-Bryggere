import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginSideComponent } from './login-side/login-side.component';
import { RegistrerComponent } from './registrer/registrer.component';

const routes: Routes = [
  {path:'login',component: LoginSideComponent},
  {path:'registration',component:RegistrerComponent},
  {path:'',component:LoginSideComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
