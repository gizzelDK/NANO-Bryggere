import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { SletDialogBoxComponent } from 'src/app/main/slet-dialog-box/slet-dialog-box.component';
import { Forum } from 'src/app/Models/Forum';
import { Rolle } from 'src/app/Models/Rolle';
import { RestApiService } from 'src/app/shared/rest-api.service';
import { OpdaterForumDialogBoxComponent } from '../opdater-forum-dialog-box/opdater-forum-dialog-box.component';
import { OpdaterPostDialogBoxComponent } from '../opdater-post-dialog-box/opdater-post-dialog-box.component';
import { OpretForumDialogBoxComponent } from '../opret-forum-dialog-box/opret-forum-dialog-box.component';

@Component({
  selector: 'app-forside',
  templateUrl: './forside.component.html',
  styleUrls: ['./forside.component.css']
})
export class ForsideComponent implements OnInit {
  @Input() postOprettelse = { titel: '', indhold: '', brugerId: 0, forumId: 0 }; //post oprettelse fra html, put noget i html og sende videre til metoderne
  //, oprettet: ''
  @Input() postSvar = { titel: '', indhold: '', brugerId: 0, forumId: 0, postId: 0 };
  dialogRefOpretForum: MatDialogRef<OpretForumDialogBoxComponent>;
  dialogRefOpdaterForum: MatDialogRef<OpdaterForumDialogBoxComponent>;
  dialogRefOpdaterPost: MatDialogRef<OpdaterPostDialogBoxComponent>;
  opretForm: any = new FormGroup({}); //ngonignite
  svarForm: any = new FormGroup({});
  forums: any;
  forum: Forum[];
  posts: any;
  postsId: any;
  brugerListe: any;
  postListe: any
  endpointF = '/Fora'; //passer med api 
  endpointP = '/Posts';
  endpointB = '/Brugers';
  endpointR = '/Rolles';
  searchkey: string;
  showForum = false;
  brugerId: number;
  postInfo: any;
  opdaterPost: any;
  opdaterForum: any;
  id = this.actRoute.snapshot.params['id']; // tager id med videre hvor den er givet og sætte ud for den
  clickButton: boolean = true;
  clickBtnSvar = false;
  egenBrugerId: boolean;
  egenPostId: boolean;
  egenForumId: boolean;
  rolleListe: Rolle[];
  rolle: any;

  constructor(
    public dialog: MatDialog,
    public restApi: RestApiService,
    public router: Router,
    public actRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.brugerId = JSON.parse(localStorage.getItem('brugerId') || '{}');
    this.opretForm = new FormGroup({
      titel: new FormControl('', Validators.required),
      indhold: new FormControl('', Validators.required),
      brugerId: new FormControl('', Validators.required),
      forumId: new FormControl('', Validators.required),
    });
    this.svarForm = new FormGroup({
      titel: new FormControl('', Validators.required),
      indhold: new FormControl('', Validators.required),
      brugerId: new FormControl('', Validators.required),
      forumId: new FormControl('', Validators.required),
      postId: new FormControl('', Validators.required),
     // oprettet: new FormControl('')
    });
    this.onHentForum();
    this.onHentPost();
    this.onHentRolle();
  }
  onHentForum() {
    return this.restApi.getDatas(this.endpointF).subscribe((dataF) => { 
      //henter data fra vores endpoint - liste med objekter retunres
      this.forums = dataF; //data til this. forum til vores html i ngfor og printer ud
      // this.restApi.getDatas(this.endpointTØ).subscribe((data) => {
      //   // this.mineTagsList = data;
      //   // .filter((res:any) => {
      //   //   return res.ølId = this.olListe[res].id;
      //   // });
      //   console.log("olListe",this.olListe);
      //   for (let t = 0; t < data.length; t++) {
      //     const listeTest = {tagId: data[t].tagId, ølId: data[t].ølId} 
      //     console.log("listeTest",listeTest);
      //     if(this.olListe[t].id = listeTest.ølId)
      //     {
      //       this.mineTagsList[t].tagId = listeTest.tagId;
      //       console.log("mineTagListe", this.mineTagsList);
      //       this.mineTagsList[t].ølId = listeTest.ølId;
      //     }
      //   }
      //   // this.restApi.getDatas(this.endpointT).subscribe((dataT) => {

      //   // })
      //   // console.log(this.tagsList);
      //   // .filter((res: any) => {
      //   //   return res.bryggeriId === this.bryggeriId;
      //   // });
      // })
    })
  }

  onHentPost() {
    return this.restApi.getDatas(this.endpointP).subscribe((dataP) => {
      this.postListe = dataP;
      // this.postListe = this.postListe.filter((res: any) => res.forumId = this.forums.id);
    })
  }

   onHentRolle(){
    this.restApi.getDatas(this.endpointR).subscribe(dataR =>{
      this.rolleListe = dataR
      this.rolle = this.rolleListe.find((a:any) => a.level === 20) //finder alle der er lig med 20(kUN)
    })
  }

  onGodkendPost(id: any) { //svar besked 
 
    this.postOprettelse.forumId = id; //giver id til objeckt og ngfor kører obejkt igennem og viser
    this.postOprettelse.brugerId = this.brugerId; //giver brugerid så vi ved hvem der har oprettet det
     console.log(this.postOprettelse.brugerId);
     console.log('postInfo...', this.postOprettelse);
    this.restApi.createData(this.postOprettelse, this.endpointP).subscribe((dataP) => {
      console.log('postInfo...',dataP);
      this.postOprettelse.indhold = ''; //gør tom igen /refresh side.... 
      this.postOprettelse.titel = '';
      this.ngOnInit();
    });
  }
//bliver ikek brugt!!!!!!!
  onSvarToggle() {
    this.clickBtnSvar = !this.clickBtnSvar; 
  }

  onSvarPost(forumId: any, postId: any) {
    this.postSvar.forumId = forumId;
    this.postSvar.brugerId = this.brugerId;
    this.postSvar.postId = postId; //hvilkn post man svarer til med ids
    this.restApi.createData(this.postSvar, this.endpointP).subscribe((dataP) => {
      this.postSvar.indhold = '';
      this.postSvar.titel = ''; 
      this.ngOnInit();
    });
  }

  onVisPost(id: any) {
    this.clickButton = false; 
    // this.brugerId2=JSON.parse(localStorage.getItem('brugerId2') || '{}');
    // this.listPosts= this.posts.filter((res:any) => res.forumId === id && (res.brugerId2 === this.brugerId2 || res.brugerId1 === this.brugerId1))
    this.posts = this.postListe.filter((res: any) => res.forumId === id);
    //vis posts. tjekker efter id om de passer
  }

  onSletForum(id: any) {
    this.restApi.getData(id, this.endpointF).subscribe(dataF => {
      if (this.brugerId === dataF.brugerId  || this.rolle ===20) {
        let dialogRef = this.dialog.open(SletDialogBoxComponent);
        dialogRef.afterClosed().subscribe(result => {
          if (result == true) {
            this.restApi.deleteData(id, this.endpointF).subscribe(dataF => {
              this.ngOnInit();
            })
          }
        });
      }
      else {
        alert('Du kan ikke slette denne besked, det er fordi det ikke din!')
      }
    })
  }

  onFindForum() {
    if (this.searchkey == "") {
      this.ngOnInit();
    }
    else {
      this.forums = this.forums.filter((res: any) => {
        //tjekker vores obj om det passer så den laver ikke et api kald hver gang - tjekker gamle lister
        return res.titel.toLowerCase().match(this.searchkey.toLowerCase());
      })
    }
  }

  onOpdaterPost(id: any) {
    this.restApi.getData(id, this.endpointP).subscribe(dataP => {
      if (this.brugerId === dataP.brugerId || this.rolle ===20) {
        localStorage.setItem('postId', JSON.stringify(id)); //JSON = nummer og strings , gør til json object og smides ud igen som før
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.width = "40%";
        dialogConfig.height = 'auto';
        this.dialogRefOpdaterPost = this.dialog.open(OpdaterPostDialogBoxComponent, dialogConfig);
        this.dialogRefOpdaterPost.afterClosed().subscribe(result => {
          if (result) {
            this.opdaterPost = result;
            this.restApi.updateData(id, this.endpointP, this.opdaterPost).subscribe((dataP) => {
              this.ngOnInit();
            })
          }
        })
      }
      else {
        alert('Du kan ikke update denne besked, det er fordi det ikke din!')
      }
    })
  }

  onOpdaterForum(id: any) {
    this.restApi.getData(id, this.endpointF).subscribe(dataF => {
      if (this.brugerId === dataF.brugerId || this.rolle ===20) {
        localStorage.setItem('forumId', JSON.stringify(id));
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.width = "40%";
        dialogConfig.height = 'auto';
        this.dialogRefOpdaterForum = this.dialog.open(OpdaterForumDialogBoxComponent, dialogConfig);
        this.dialogRefOpdaterForum.afterClosed().subscribe(result => {
          if (result) {
            this.opdaterForum = result;
            this.restApi.updateData(id, this.endpointF, this.opdaterForum).subscribe((dataF) => {
              this.ngOnInit();
            })
          }
        })
      }
      else {
        alert('Du kan ikke update denne besked, det er fordi det ikke din!')
      }
    })
  }

  onOpretForum() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "40%";
    dialogConfig.height = "70%";
    this.dialogRefOpretForum = this.dialog.open(OpretForumDialogBoxComponent, dialogConfig);
    this.dialogRefOpretForum.afterClosed().subscribe(result => {
      this.ngOnInit();
    })
  };

  onSletPost(id: any) {
    this.restApi.getData(id, this.endpointP).subscribe(dataP => {
      if (this.brugerId === dataP.brugerId  || this.rolle ===20) {
        let dialogRef = this.dialog.open(SletDialogBoxComponent);
        dialogRef.afterClosed().subscribe(result => {
          if (result == true) {
            this.restApi.deleteData(id, this.endpointP).subscribe(dataP => {
              this.ngOnInit();
            })
          }
        });
      }
      else {
        alert('Du kan ikke slette denne besked, det er fordi det ikke din!')
      }
    })
  }
}
