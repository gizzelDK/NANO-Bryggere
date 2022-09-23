import { Component, OnInit } from '@angular/core';
import { Opskrift } from 'src/app/Models/Opskrift';
import { RestApiService } from 'src/app/shared/rest-api.service';

@Component({
  selector: 'app-ol-opskrift-liste',
  templateUrl: './ol-opskrift-liste.component.html',
  styleUrls: ['./ol-opskrift-liste.component.css']
})
export class OlOpskriftListeComponent implements OnInit {
  endpointO = '/Opskrifts';
  bryggeriId: number;
  opskriftliste: Opskrift[];
  brugerId: number;
  olId: number;
  constructor(private restApi: RestApiService) { }

  ngOnInit(): void {
    this.bryggeriId = JSON.parse(localStorage.getItem('bryggeriId') || '{}');
    this.olId = JSON.parse(localStorage.getItem('olId') || '{}');
  }
  onHentOpskriftListe(){
    this.restApi.getData(this.bryggeriId, this.endpointO + '/Bryggeri').subscribe((data) =>{
      this.opskriftliste = data;
    });
  }
  onOpdaterOpskrift(id:any)
  {
  //  this.restApi.updateData(id, this.endpointO, this.opskrift).subscribe();
  }
  onSletOpskrifter(id:any)
  {
   this.restApi.deleteData(id, this.endpointO);
  }
  onHentOpskrift()
  {
    this.restApi.getDatas(this.endpointO).subscribe((data)=> {
      this.opskriftliste = data.filter((res: any) => {
        //filtere
        return res.bryggeriId === this.bryggeriId;
      })
    });
  }
  onVisDetajler(id: any){

  }
}
