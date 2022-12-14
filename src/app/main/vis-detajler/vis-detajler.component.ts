import { Component, OnInit } from '@angular/core';
// import { timeStamp } from 'console';
// import { browser } from 'protractor';
import { Bryggeri } from 'src/app/Models/Bryggeri';
import { RestApiService } from 'src/app/shared/rest-api.service';

@Component({
  selector: 'app-vis-detajler',
  templateUrl: './vis-detajler.component.html',
  styleUrls: ['./vis-detajler.component.css']
})
export class VisDetajlerComponent implements OnInit {
  bryggeriId: number;
  endpointB='/Bryggeris';
  bryggeri: Bryggeri;

  constructor(public restApi: RestApiService) { }

  ngOnInit(): void {
    this.bryggeriId= JSON.parse(localStorage.getItem('forsideBryggeriId') || '{}');
    this.onHentBryggeri();
  }

  onHentBryggeri(){
    this.restApi.getData(this.bryggeriId , this.endpointB).subscribe(data => {
      this.bryggeri = data;
    })
  }
}
