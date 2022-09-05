export enum RolleNavn{
    AnonymBruger = 0,
    Bruger  = 10,
    Administrator = 20
  }

  export class Rolle{
    public id : number;
    public level:number;
    public rolleNavn : RolleNavn;
  }
