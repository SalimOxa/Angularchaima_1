import {Byte} from '@angular/compiler/src/util';

export interface DocumentUser {
  id?: number;
  numero?: String;
  expirationDate?: Date;
  documentType?:string;
  id_customer?:string;
  data?: Byte[];

}
