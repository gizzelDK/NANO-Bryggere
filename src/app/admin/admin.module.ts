import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminForsideComponent } from './admin-forside/admin-forside.component';
import { BrugerAdminSideComponent } from './bruger-admin-side/bruger-admin-side.component';


@NgModule({
  declarations: [
    AdminForsideComponent,
    BrugerAdminSideComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
