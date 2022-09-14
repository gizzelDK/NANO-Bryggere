import { SamarbejdeAnmodning } from './SamarbejdeAnmodning';
import { Bryggeri } from "./Bryggeri";
import { Øl } from "./Øl";

export class Samarbejde{
  public id: number;
  public bryggeriId1: number
  public bryggeriId2: number;
  public bryggerier: Bryggeri;
  public titel:string;
}
