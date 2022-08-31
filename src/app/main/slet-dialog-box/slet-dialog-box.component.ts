import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-slet-dialog-box',
  templateUrl: './slet-dialog-box.component.html',
  styleUrls: ['./slet-dialog-box.component.css']
})
export class SletDialogBoxComponent implements OnInit {

  constructor(public dialogRefSlet : MatDialogRef<SletDialogBoxComponent>) { }

  ngOnInit(): void {
  }

}
