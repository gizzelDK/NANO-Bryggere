import { Component, OnInit ,Input} from '@angular/core';
import { FormControl, FormGroup, Validators ,FormBuilder} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RestApiService } from 'src/app/shared/rest-api.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-opret-event-dialog-box',
  templateUrl: './opret-event-dialog-box.component.html',
  styleUrls: ['./opret-event-dialog-box.component.css']
})
export class OpretEventDialogBoxComponent implements OnInit {
  @Input() eventOprettelse = {eventBilled:'', titel: '', beskrivelse: '',  lokation: '' ,startDato:'',slutDato:'' };

  CreateForm: any = new FormGroup({});
  endpointE = '/Events';
  eventsList:any;
  eventBilled:any;

  constructor(
    public dialogRefOpretteEvents : MatDialogRef<OpretEventDialogBoxComponent>,
    public restApi: RestApiService,
    public actRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.CreateForm = new FormGroup({
      eventBilled: new FormControl(''),
      titel: new FormControl('', Validators.required),
      beskrivelse: new FormControl('', Validators.required),
      startDato: new FormControl('', Validators.required),
      slutDato: new FormControl('', Validators.required),
      lokation: new FormControl('', Validators.required)
    });
  }

onSubmitCertificate(event: any) {
    if (event.target.files) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (e: any) => {
        this.eventBilled = e.target.result;
        localStorage.setItem('eventBilled', JSON.stringify(this.eventBilled));
      }
    }
  };

  onSubmitEvent() {
    this.eventOprettelse.eventBilled=JSON.parse(localStorage.getItem('eventBilled')|| '{}');
    this.restApi.createData(this.eventOprettelse, this.endpointE).subscribe((data) => {
      this.dialogRefOpretteEvents.close();
      // this.router.navigate(['../events/events'])
    })
  }
}
