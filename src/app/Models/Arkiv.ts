import { Bruger } from "./Bruger";
import { Kontaktoplysninger } from "./Kontaktoplysninger";

export class Arkiv{
  public id: number;
  public brugerId:number;
  public bruger:Bruger;
  public kontaktoplysningerId: number;
  public kontaktoplysninger:Kontaktoplysninger;
  public OpretDato :Date;
}
