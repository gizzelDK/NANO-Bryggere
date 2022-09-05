import { Event} from "./Event";
import { Forum } from "./Forum";
import { Øl } from "./Øl";

export class Tag{
  public id: number;
  public navn: string;
  public events: Event;
  public forum: Forum;
  public ol: Øl;
}
