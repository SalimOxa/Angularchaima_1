import {Project} from "../shared-module/model/project";
import {Role_dto} from "./role_dto";
import {DocumentUser} from '../shared-module/model/documentUser';

export interface UserDto {
  id?: string;
  firstName?: string;
  lastName?: string;
  birthday?: string;
  username?: string;
  email?: string;
  company?:string;
  isActivated?: boolean;
  isEnabledAccount?: boolean;
  password?: string;
  nameMaster?:string
  phoneNumber?: string;
  projects?: Project[];
  roles?: Role_dto[];
  documents?: DocumentUser[];
}


