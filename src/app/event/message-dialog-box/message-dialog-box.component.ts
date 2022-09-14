import { Component, OnInit } from '@angular/core';
import { EventkalenderSideComponent } from '../eventkalender-side/eventkalender-side.component';

@Component({
  selector: 'app-message-dialog-box',
  templateUrl: './message-dialog-box.component.html',
  styleUrls: ['./message-dialog-box.component.css']
})
export class MessageDialogBoxComponent implements OnInit {

  constructor(public eventKalenderComponent : EventkalenderSideComponent) { }

  ngOnInit(): void {
  }

}
