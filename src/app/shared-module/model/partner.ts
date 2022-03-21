import {Byte} from '@angular/compiler/src/util';

export interface Partner {
  id?: number;
  englishName?: string;
  englishDescription?: string;
  frenchName?: string;
  frenchDescription?: string;
  arabicName?: string;
  arabicDescription?: string;
  partnershipDate?:Date;
  photoName?:string;
  data?: Byte[];
}
