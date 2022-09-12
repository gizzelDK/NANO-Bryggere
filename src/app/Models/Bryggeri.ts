import { Bruger } from "./Bruger";
import { Kontaktoplysninger } from "./KontaktOplysninger";
import { Samarbejde } from "./Samarbejde";
import { Tag } from "./Tag";

export class Bryggeri{
  public id: number;
  public navn: string;
  public kontaktoplysningerId: number;
  public kontaktoplysninger: Kontaktoplysninger;
  public beskrivelse: string;
  public bryggeriLogo: string;
  //public samarbejdeId: number;
  public samarbejde: Samarbejde;
  public tags:Tag;
  public followers : Bruger;
}
