import { Bruger } from "./Bruger";
import { Event } from "./Event";

export class Deltager{
  public id: number;
  public brugerId: number;
  public eventId: number;
  public bruger : Bruger;
  public events: Event;
  public erDeltagene : boolean;
}
