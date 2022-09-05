 export enum CertifikatStatus{
    IkkeSendt = 1,
    VentTilGodkendt = 2,
    Godkendt = 3
 }

export class Certifikat{
  public id : number;
  public certifikatBilled:string;
  public cStatus:CertifikatStatus=CertifikatStatus.IkkeSendt;
}




