import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RestApiService } from 'src/app/shared/rest-api.service';


@Component({
  selector: 'app-opret-ol',
  templateUrl: './opret-ol.component.html',
  styleUrls: ['./opret-ol.component.css']
})
export class OpretOlComponent implements OnInit {
  @Input() olOprettelse = { navn: '', type: '', smag: '', procent: null, land: '', bryggeriId: null, olBillede: '', beskrivelse:'',  aargang: '' };
  // @Input() olOprettelse = { navn: '', type: '', smag: '', procent: null, land: '', bryggeriId: null, argang: 0, etiket: '', beskrivelse:'', antal: '' };
  opretForm : FormGroup;
  endpointO = '/Øl';
  selected = '';

  constructor(
    public restApi: RestApiService,
    private router: Router,
    public actRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.opretForm = new FormGroup({
      navn: new FormControl('', Validators.required),
      type: new FormControl('', Validators.required),
      smag: new FormControl('', Validators.required),
      procent: new FormControl('', Validators.required),
      bryggeriId: new FormControl('', Validators.required),
      aargang: new FormControl('', Validators.required),
      land: new FormControl('', Validators.required),
      process: new FormControl('', Validators.required),
      olBillede: new FormControl('', Validators.required),
      beskrivelse: new FormControl('', Validators.required)
     // antal: new FormControl('', Validators.required)
    });
  }

  onAnuller() {
    return this.router.navigate(['../main/katalog']);
};
onSubmitOlBilled(event: any) {
if (event.target.files && event.target.files[0]) {
  const reader = new FileReader();
  reader.onload = (e:any) => this.olOprettelse.olBillede = e.target.result;
  reader.readAsDataURL(event.target.files[0])
  // var reader = new FileReader();
  // reader.readAsDataURL(event.target.files[0]);
  // reader.onload = (e: any) => {
  //   this.olOprettelse.etiket = e.target.result;
  //   localStorage.setItem('logo', JSON.stringify(this.olOprettelse.etiket));
  // }
}
else{
  this.olOprettelse.olBillede = '';
}
};
onSubmitOl() {
this.olOprettelse.bryggeriId = JSON.parse(localStorage.getItem('bryggeriId') || '{}');
console.log('ol.', this.olOprettelse);
this.restApi.createData(this.olOprettelse, this.endpointO).subscribe((data) => {
  localStorage.setItem('olId', JSON.stringify(data.id));
  this.router.navigate(['../main/katalog']);
});
}
}
