import { Deltager } from "./Deltager";
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
  public deltagelse: Deltager;

}
