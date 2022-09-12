import { Bryggeri } from "./Bryggeri";
import { Kommentar } from "./Kommentar";
import { Opskrift } from "./Opskrift";
import { Samarbejde } from "./Samarbejde";
import { Tag } from "./Tag";

export class Øl {
    public id: number;
    public navn: string;
    public type: string;
    public land: string;
    public procent: number;
    public smag: string;
    public beskrivelse: string;
    public olBillede: string;
    public bryggeriId: number;
    public bryggeri: Bryggeri;
    public bryggeProcess: Opskrift;
    public aargang: Date;
    public antal: number;
    public flaskeAntal: number;
    public tondeAntal: number;
    public flaskeResAntal: number;
    //public samarbejdeId: number;
    public samarbejder: Samarbejde;
    public kommentarer:Kommentar;
    public tags: Tag;
}
