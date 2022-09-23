import { Bryggeri } from "./Bryggeri";
import { Øl } from "./Øl";

export class Opskrift{
  public id: number;
  public olId: number;
  public bryggeriId: number;
  public ol: Øl;
  public bryggeri: Bryggeri;
  public stepOne: string;
  public stepTwo: string;
  public stepThree: string;
  public stepFour: string;
  public stepFive: string;
  public offentliggjort: boolean;
  //public loginTime: string;
}
