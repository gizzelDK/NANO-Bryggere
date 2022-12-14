import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RestApiService } from 'src/app/shared/rest-api.service';

@Component({
  selector: 'app-samarbejde-ol-lager',
  templateUrl: './samarbejde-ol-lager.component.html',
  styleUrls: ['./samarbejde-ol-lager.component.css']
})
export class SamarbejdeOlLagerComponent implements OnInit {
  LagerForm: FormGroup;
  endpointO = '/Øl';
  selected = '';
  ol: any;
  olId = this.actRoute.snapshot.params['id'];
  olListe: any;

  constructor(
    public restApi: RestApiService,
    private router: Router,
    public actRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.LagerForm = new FormGroup({
      antal: new FormControl('', Validators.required),
      flaskeAntal: new FormControl('', Validators.required),
      tondeAntal: new FormControl('', Validators.required),
      flaskeResAntal: new FormControl('', Validators.required)
    });
    this.onHentOl();
  }

  onHentOl(){
    return this.restApi.getData(this.olId, this.endpointO).subscribe((data) => {
      this.olListe = data;
    });
  }
  onAnuller() {
    return this.router.navigate(['./samarbejde/samarbejde-side']);
  };

  onSubmitOl() {
    this.restApi.updateData(this.olId, this.endpointO, this.olListe).subscribe((data) => {
      this.router.navigate(['./samarbejde/samarbejde-side']);
    });
  }
}
