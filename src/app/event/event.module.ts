import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventRoutingModule } from './event-routing.module';
import { EventkalenderSideComponent } from './eventkalender-side/eventkalender-side.component';
import { MineEventsComponent } from './mine-events/mine-events.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatExpansionModule} from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
// import { MessageDialogBoxComponent } from './message-dialog-box/message-dialog-box.component';

@NgModule({
  declarations: [
    EventkalenderSideComponent,
    MineEventsComponent,
    // MessageDialogBoxComponent
  ],
  imports: [
    CommonModule,
    EventRoutingModule,
    MatToolbarModule,
    MatExpansionModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    EventkalenderSideComponent
  ],
  providers:[EventkalenderSideComponent]
})
export class EventModule { }
