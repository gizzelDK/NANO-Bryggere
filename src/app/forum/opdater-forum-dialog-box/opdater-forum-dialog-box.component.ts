import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { RestApiService } from 'src/app/shared/rest-api.service';

@Component({
  selector: 'app-opdater-forum-dialog-box',
  templateUrl: './opdater-forum-dialog-box.component.html',
  styleUrls: ['./opdater-forum-dialog-box.component.css']
})
export class OpdaterForumDialogBoxComponent implements OnInit {
  redigerForm: FormGroup = new FormGroup({});
  redigerForum:any;
  endpointF = '/Fora';
  forumId:number;

  constructor(
    public dialogRefRedigeForum : MatDialogRef<OpdaterForumDialogBoxComponent>,
    private formBuilder: FormBuilder,
    public restApi: RestApiService,
    public actRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.forumId=JSON.parse(localStorage.getItem('forumId') || '{}');
    this.restApi.getData(this.forumId , this.endpointF)
    .toPromise()
    .then(data => {
      this.redigerForum= data ;
      this.redigerForm = this.formBuilder.group({
        titel : new FormControl(this.redigerForum.titel),
        beskrivelse : new FormControl(this.redigerForum.beskrivelse)
      })
    })
  }
}
