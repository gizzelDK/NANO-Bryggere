import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { RestApiService } from 'src/app/shared/rest-api.service';

@Component({
  selector: 'app-opret-forum-dialog-box',
  templateUrl: './opret-forum-dialog-box.component.html',
  styleUrls: ['./opret-forum-dialog-box.component.css']
})
export class OpretForumDialogBoxComponent implements OnInit {
  @Input() forumOprettelse = { titel: '', beskrivelse: '', oprettet: '', brugerId: 0 };
  opretForm: any = new FormGroup({});
  endpointF = '/Fora';
  brugerId: number;
  oprettet: Date;
  constructor(public dialogRefOpretForum : MatDialogRef<OpretForumDialogBoxComponent>,
    private formBuilder: FormBuilder,
    public restApi: RestApiService,
    public actRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.opretForm = new FormGroup({
      titel: new FormControl('', Validators.required),
      beskrivelse: new FormControl('', Validators.required),
      oprettet: new FormControl('', Validators.required)
    });
    // this.forumId=JSON.parse(localStorage.getItem('forumId') || '{}');
    // this.restApi.getData(this.forumId , this.endpointF)
    // .toPromise()
    // .then(data => {
    //   this.opretForm= data ;
    //   this.opretForm = this.formBuilder.group({
    //     titel : new FormControl(this.opretForm.titel),
    //     beskrivelse : new FormControl(this.opretForm.beskrivelse)
    //   })
    // })
    // this.opretForm = new FormGroup({
    //   titel: new FormControl('', Validators.required),
    //   beskrivelse: new FormControl('', Validators.required),
    //   oprettet: new FormControl('', Validators.required)
    // });
    this.brugerId = JSON.parse(localStorage.getItem('brugerId') || '{}');
  }
  onAnuller() {
    this.opretForm.reset();
    this.dialogRefOpretForum.close();
    // return this.router.navigate(['../forum/forside'])
  };

  onSubmitForum() {
    // this.nySamarbejde.bryggeriId1 = JSON.parse(localStorage.getItem('bryggeriId') || '{}');
    // this.nySamarbejde.brygger1Svar = true;
    // console.log(this.nySamarbejde);
    // this.restApi.createData(this.nySamarbejde, this.endpointSA).subscribe((data) => {
    //   this.dialogRefOpretSamarbejde.close();
    // })
    this.forumOprettelse.brugerId = this.brugerId;
    // this.forumOprettelse.oprettet = this.oprettet.getDate.toString();
    this.restApi.createData(this.forumOprettelse, this.endpointF).subscribe((data) => {
      // localStorage.setItem('forumId', JSON.stringify(data.id));
      this.dialogRefOpretForum.close();
    })
  }
}
