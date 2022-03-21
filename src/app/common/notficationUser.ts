import {Project} from '../shared-module/model/project';
// test
export interface NotficationUser {
  id?: String;
  name?: string;
  message?: string;
  createdDate?:Date;
  typeNotification?: string;
  isShowed?:boolean;
  idProject?:number;
  //updated value
   nameField?:string;
   previousValue?:string;
   updatedValue?:string;
  approved?:boolean;
  idCustommer?:string;
}
