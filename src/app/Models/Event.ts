import { Bruger } from "./Bruger";
import { Tag } from "./Tag";

export class Event{
  public id : number;
  public titel: string;
  public beskrivelse:string;
  public startDato: Date;
  public slutDato: Date;
  public lokation:string;
  public eventBilled:string;
  public tags:Tag;
  public deltagere: Bruger;

}
