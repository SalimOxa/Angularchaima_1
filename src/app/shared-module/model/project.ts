import {StatmentOfWork} from "./statmentOfWork";
import {TaskDto} from "../../common/Task";
import {TranchePayment} from './tranchePayment';
import {MessageChat} from './messageChat';

export interface Project {
  id?: number;
  name?: string;
  description?: string;
  createdDate?:Date;
  totalPayment?:number;
  restPayment?:number;
  currencyCode?:string;
  nameService?: string;
  appStatementOfWork?:StatmentOfWork;
  nameAdmin?: string;
  nameCustomer?:string;
  idCustomer?:string
  idAdmin?:string;
  idMaster?:string;
  company?:string;
  tasks?:TaskDto[];
  tranchePayment?:TranchePayment[];
  message?:MessageChat[];
}

