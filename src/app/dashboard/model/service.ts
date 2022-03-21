import {StatmentOfWork} from "../../shared-module/model/statmentOfWork";

export class Service {
  public id?:string;
    public name?:String;
  nameFrensh?:String;
  nameArabic?:String;
    public image?: String;
    public description?: String;
  descriptionFrensh?: String;
  descriptionArabic?: String;
  videoURL?:String;
  keyWords?:String;
  public appDefaultStatementOfWork?:StatmentOfWork;
}
