import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatExpansionModule} from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import { ForumRoutingModule } from './forum-routing.module';
import { ForsideComponent } from './forside/forside.component';
import { OpdaterForumDialogBoxComponent } from './opdater-forum-dialog-box/opdater-forum-dialog-box.component';
import { OpdaterPostDialogBoxComponent } from './opdater-post-dialog-box/opdater-post-dialog-box.component';
import { OpretForumDialogBoxComponent } from './opret-forum-dialog-box/opret-forum-dialog-box.component';


@NgModule({
  declarations: [
    ForsideComponent,
    OpdaterForumDialogBoxComponent,
    OpdaterPostDialogBoxComponent,
    OpretForumDialogBoxComponent
  ],
  imports: [
    CommonModule,
    ForumRoutingModule,
    MatToolbarModule,
    MatExpansionModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule
  ]
})
export class ForumModule { }
