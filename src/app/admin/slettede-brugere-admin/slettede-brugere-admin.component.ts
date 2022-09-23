import { Component, OnInit } from '@angular/core';
import { RestApiService } from 'src/app/shared/rest-api.service';

@Component({
  selector: 'app-slettede-brugere-admin',
  templateUrl: './slettede-brugere-admin.component.html',
  styleUrls: ['./slettede-brugere-admin.component.css']
})
export class SlettedeBrugereAdminComponent implements OnInit {

  endpointA: string = '/Admin/Oprydning/Brugere';
  slettedeBrugere: string ='';
  constructor(private restApi: RestApiService) { }

  ngOnInit(): void {

    this.loadBrugereTilOprydning();

  }
  onRydBrugereOp(){
    this.restApi.deleteData(0, this.endpointA).subscribe(()=>{

    })
  }
  loadBrugereTilOprydning(){
    this.restApi.getDatas( this.endpointA).subscribe((data)=>{
      this.slettedeBrugere = 'Brugere at slette: '+ JSON.stringify(data);
    })
  }

}
