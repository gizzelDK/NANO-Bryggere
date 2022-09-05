import { Bruger } from "./Bruger";

export enum RapportType{
  Andet = 0,
  Fejl = 1,
  Anmeld = 2,
  Spørgsmål = 3
}

export class Rapport{
  public id : number;
  public brugerId: number
  public anklagetBrugerId: Number
  public bruger: Bruger
  public titel: string;
  public besked: string;
  public rType: RapportType;
  public godtaget: boolean;
}
