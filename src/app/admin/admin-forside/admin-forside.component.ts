import { Component, OnInit } from '@angular/core';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { RestApiService } from 'src/app/shared/rest-api.service';

interface Search {
  name: string;
  children?: Search[];
}

const TREE_DATA: Search[] = [
  {
    name: 'Søge',
    children: [{ name: 'Bruger', children: [{ name: 'Med BrugerEfternavn' }, { name: 'Med Brugernavn' }, { name: 'Med Email' }] },
    { name: 'Rolle', children: [{ name: 'Med Rollenavn' }] },
    { name: 'Bryggeri', children: [ { name: 'Med Bryggerinavn' }] },
    { name: 'Øl', children: [ { name: 'Med Ølnavn' }] },
    { name: 'Events', children: [{ name: 'Med Eventstitel' }] },
    { name: 'Deltager', children: [{ name: 'Med EventTitel' }] },
    { name: 'Forum', children: [{ name: 'Med ForumTitel' }] },
    { name: 'Tags', children: [{ name: 'Med Tag' }] },
    { name: 'Samarbejde', children: [{ name: 'Med Samarbejde navn' }] },
    { name: 'Certifikat' },
    { name: 'Bruger Logins' },
    { name: 'Rapporteringer'},
    { name: 'OprydningKnap'},
    { name: 'Log ud'}]
  }
];

@Component({
  selector: 'app-admin-forside',
  templateUrl: './admin-forside.component.html',
  styleUrls: ['./admin-forside.component.css']
})
export class AdminForsideComponent implements OnInit {
  treeControl = new NestedTreeControl<Search>(node => node.children);
  dataSource = new MatTreeNestedDataSource<Search>();
  visUserIdComponent: boolean = false;
  visCertifikatComponent: boolean = false;
  visOlComponent: boolean = false;
  visEventsComponent: boolean = false;
  visAdminTagsComponent: boolean = false;
  visAdminOpdaterTagsComponent: boolean = false;
  visAdminOpretTagsComponent: boolean = false;
  visBryggeriComponent: boolean = false;
  visRollerComponent: boolean = false;
  visForumComponent: boolean = false;
  visBrugernavnComponent: boolean = false;
  visBrugerEmailComponent: boolean = false;
  visDeltageneComponent: boolean = false;
  visLoginComponent: boolean = false;
  visSamarbejdeComponent: boolean = false;
  visRapportComponent: boolean = false;
  visOprydningKnap: boolean = false;
  endpointA: string = '/Admin/Oprydning/Brugere';
  slettedeBrugere: string ='Ryd Slettede Brugere op';

  constructor(
    public dialog: MatDialog,
    public restApi: RestApiService,
    public router: Router,
    public actRoute: ActivatedRoute
  ) {this.dataSource.data = TREE_DATA;}
   hasChild = (_: number, node: Search) => !!node.children && node.children.length > 0;

  ngOnInit(): void {

  }

  onVisComponent(nodeName: string) {
    // console.log(nodeName);
    switch (nodeName) {
      case 'Med Brugernavn': {
        this.visBrugernavnComponent = !this.visBrugernavnComponent;
        break;
      }
      case 'Med BrugerEfternavn': {
        this.visBrugernavnComponent = !this.visBrugernavnComponent;
        break;
      }
      case 'Med Email': {
        this.visBrugernavnComponent = !this.visBrugernavnComponent;
        break;
      }
      case 'Med events Titel': {
        this.visBrugernavnComponent = !this.visBrugernavnComponent;
        break;
      }
      case 'Med Ølnavn': {
        this.visOlComponent = !this.visOlComponent;
        break;
      }
      case 'Med Eventstitel': {
        this.visEventsComponent = !this.visEventsComponent;
        break;
      }
      case 'Med Deltagelser': {
        this.visEventsComponent = !this.visEventsComponent;
        break;
      }
      case 'Med EventTitel': {
        this.visDeltageneComponent = !this.visDeltageneComponent;
        break;
      }
      case 'Med Tag': {
        this.visAdminTagsComponent = !this.visAdminTagsComponent;
        break;
      }
      case 'admin-opret-tag': {
        this.visAdminOpretTagsComponent = !this.visAdminOpretTagsComponent;
        break;
      }
      case 'admin-rediger-tag': {
        this.visAdminOpdaterTagsComponent = !this.visAdminOpdaterTagsComponent;
        break;
      }
      case 'Certifikat': {
        this.visCertifikatComponent = !this.visCertifikatComponent;
        break;
      }
      case 'Med Bryggerinavn': {
        this.visBryggeriComponent = !this.visBryggeriComponent;
        break;
      }
      case 'Med BryggeriSamarbejde': {
        this.visBryggeriComponent = !this.visBryggeriComponent;
        break;
      }
      case 'Med ForumTitel': {
        this.visForumComponent = !this.visForumComponent;
        break;
      }
      case 'Med Rollenavn': {
        this.visRollerComponent = !this.visRollerComponent;
        break;
      }
      case 'Rolle Med Brugernavn': {
        this.visRollerComponent = !this.visRollerComponent;
        break;
      }
      case 'Login': {
        this.visLoginComponent = !this.visLoginComponent;
        break;
      }
      case 'Med Samarbejde navn': {
        this.visSamarbejdeComponent = !this.visSamarbejdeComponent;
        break;
      }
      case 'Med Øl navn': {
        this.visSamarbejdeComponent = !this.visSamarbejdeComponent;
        break;
      }
      case 'Rapporteringer': {
        this.visRapportComponent = !this.visRapportComponent;
        break;
      }
      case 'OprydningKnap': {
        this.visOprydningKnap = !this.visOprydningKnap;
        break;
      }
      case 'Log ud':{
        localStorage.clear();
        this.router.navigate(['/login/']);
      }
    }
  }
  onRydBrugereOp(){
    this.restApi.deleteData(0, this.endpointA).subscribe((data)=>{
      this.slettedeBrugere = 'Slettede brugere: ' + JSON.stringify(data);
    })
  }

}
