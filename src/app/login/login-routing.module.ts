import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginSideComponent } from './login-side/login-side.component';
import { RegistrerComponent } from './registrer/registrer.component';

const routes: Routes = [
{path:'',component:LoginSideComponent},
{path:'login',component: LoginSideComponent},
{path:'registration',component:RegistrerComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
