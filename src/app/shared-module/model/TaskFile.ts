import {Byte} from '@angular/compiler/src/util';

export interface TaskFile {
  id?: number;
  fileName?: String;
  data?: Byte[];
  createdDate?: Date;

}
