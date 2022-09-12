import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventkalenderSideComponent } from './eventkalender-side/eventkalender-side.component';
import { MineEventsComponent } from './mine-events/mine-events.component';

const routes: Routes = [
  {path:'events', component:EventkalenderSideComponent},
  {path:'mine-events', component:MineEventsComponent},
  {path:'', component: EventkalenderSideComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventRoutingModule { }
