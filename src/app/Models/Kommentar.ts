import { Øl } from 'src/app/Models/Øl';
import { Bruger } from './Bruger';


export class Kommentar{
  public id:number;
  public tekst:string;
  public ol: Øl;
  public olId:number;
  public rating: number;
  public forfatterId:number;
  public forfatter:Bruger;

}
