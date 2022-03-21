import {StatmentOfWork} from './statmentOfWork';

export interface TranchePayment {
  id?: number;
  name?: string;
  description?: string;
  deadline?:Date;
  paymentDate?:Date;
  price?:number;
  currencyCode?:string;
  numTranche?:number;
  etatPayement?:Boolean;
  isLastPayement?: Boolean;
  idProject?:number;
  idtask?:number;
  appStatementOfWork?:StatmentOfWork;
  //facture
}

