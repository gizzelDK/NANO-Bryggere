import { Rapport } from './Rapport';
import { Bryggeri } from 'src/app/Models/Bryggeri';

import { Rolle } from "./Rolle";
import { Deltager } from './Deltager';
import { Event } from "./Event";

import { Certifikat } from './Certifikat';
import { Kontaktoplysninger } from './Kontaktoplysninger';


// export enum CertifikatStatus{
//   IkkeSendt = 1,
//   VentTilGodkendt = 2,
//   Godkendt = 3
// }

export class Bruger {
  public id: number;
  public brugernavn: string;
  public pw : string;
  public rolleId:number;
  public rolle: Rolle;
  public kontaktoplysningerId: number;
  public kontaktoplysninger: Kontaktoplysninger;
  public events: Event;
  public certifikatId:number;
  public certifikat:Certifikat;
  public follows: Bryggeri;
  public rapporter : Rapport;
  public acceptedPolicy : boolean;
  public deleted :boolean;
  //public deltager: Deltager;
  //public certifikatStatus: CertifikatStatus;
  //public certifikatBilled: string;
}
