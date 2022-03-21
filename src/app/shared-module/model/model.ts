import {Project} from './project';

export interface Model {
  id?: number;
  project?:Project[];
  totalPage?:number;
}

