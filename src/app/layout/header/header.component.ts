import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestApiService } from 'src/app/shared/rest-api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  showFiller = false;
  erAdmin: boolean;
  erBrygger: boolean;
  rolleId: number;
  level: number;
  bryggeriId: number;
  // brugerId: number;
  endpointR = '/Rolles';
  endpointB = '/Bryggeris';
  constructor(
    public restApi: RestApiService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.onHentRolle();
    this.onHentBryggeri();
  }
  onHentBryggeri(){
    // this.brugerId = JSON.parse(localStorage.getItem('brugerId') || '{}');
    // this.restApi.getDatas(this.endpointB).subscribe((data) =>{
    //   console.log(this.brugerId);
    //   if(this.brugerId ==data.brugerId){
    //     this.erBrygger = true;
    //     console.log("J");
    //   }
    //   console.log("N");
    // })
    // if(JSON.parse(localStorage.getItem('bryggeriId') || '{}' != '')
    console.log(localStorage.getItem('bryggeriId'))
    if(this.bryggeriId = JSON.parse(localStorage.getItem('bryggeriId') || 'null')){
      this.restApi.getData(this.bryggeriId, this.endpointB).subscribe((data) =>{
        if(data.id = this.bryggeriId){
          console.log("bryggeriId", this.bryggeriId);
          this.erBrygger = true;
          console.log(this.erBrygger);
        }
      })
    }
    else{
      console.log("Ingen Bryggeri id");
      this.erBrygger = false;
    }
  }
//admin rettigheder
  onHentRolle(){

    // if(this.rolleId = JSON.parse(localStorage.getItem('rolleId') || 'null')){
      // this.restApi.getData(this.rolleId, this.endpointR).subscribe((data) =>{
        // if(data.level == 20){
          if(this.level = JSON.parse(localStorage.getItem('level') || 'null')){
            if(this.level == 20)
            {
              this.erAdmin = true;
              console.log("Administrator");
            }

        }
        else{
          this.erAdmin = false;
          //login
          console.log("Administrator rettigheder mangler");
        }
      // });
    // }
  }

  onClickMenu(){
    return this.router.navigate(['../main/main']);
  }
}
