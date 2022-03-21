import {STATE} from './enum/stateTask';
import {TaskFile} from '../shared-module/model/TaskFile';
import {CommentDto} from "./comment-dto";
import {MailContentTask} from "./mailContentTask-dto";
import {TranchePayment} from '../shared-module/model/tranchePayment';

export interface TaskDto {
  id?: number;
  name?: string;
  description?: string;
  creationDate?:Date;
  closeDate?:Date;
  type?: string;
  state?:STATE;
  enableAccount?:boolean
  file?:TaskFile;
  comments?:CommentDto[];
  mail?: MailContentTask;
  tranchePayment?:TranchePayment;


}
