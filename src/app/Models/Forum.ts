import { Bruger } from "./Bruger";
import { Post } from "./Post";
import { Tag } from "./Tag";

export class Forum{
  public id:number;
  public titel:string;
  public beskrivelse:string;
  public oprettet: Date;
  public tags: Tag;
  public posts:Post;
  public brugerid: number;
  public bruger: Bruger;
  public forumBillede:string;
}
