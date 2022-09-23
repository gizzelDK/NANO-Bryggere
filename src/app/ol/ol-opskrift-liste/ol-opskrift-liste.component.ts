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
  opskrifter: Opskrift;
  brugerId: number;
  olId: number;
  clickButton:boolean=true;
  constructor(private restApi: RestApiService) { }

  ngOnInit(): void {
    this.bryggeriId = JSON.parse(localStorage.getItem('bryggeriId') || '{}');
    this.olId = JSON.parse(localStorage.getItem('olId') || '{}');
    this.onHentOpskriftListe();
  }
  onHentOpskriftListe(){
    this.restApi.getData(this.bryggeriId, this.endpointO + '/Bryggeri').subscribe((data) =>{
      this.opskriftliste = data;
      console.log(this.opskriftliste);
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
    this.clickButton=false;
    this.restApi.getData(id, this.endpointO).subscribe((data) =>{
      this.opskrifter = data;
      this.onOpskriftType(this.opskrifter.offentliggjort);
    })
  }

  onOpskriftType(type: any) {
    console.log("start",type);
    switch (type) {
      case false:
        type = "Privat";
        this.opskrifter.offentliggjort = type;
        console.log(type);
        break;

      case true:
        type = "offentlig";
        this.opskrifter.offentliggjort = type;
        console.log(type);
        break;
      default:
        break;
    }
  }
}
