import { Component, OnInit } from '@angular/core';
import {Service} from "../../../dashboard/model/service";
import {MenuItem} from 'primeng/api';
import {Project} from '../../../shared-module/model/project';
import {UserStoreService} from '../../../authentication/stores/user-store/user-store.service';
import {ProfileUserService} from '../../service/profile-user.service';
import {saveAs} from "file-saver";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {NewBackOfficeService} from "../../../new-back-office/service/new-back-office.service";
import {NgxSpinnerService} from 'ngx-spinner';

import {Countries} from '../../../shared-module/model/countries';
import {CurrencyConstants} from '../../../common/constant/CurrencyConstants';

interface Country {
  name: string,
  code: string
}

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.scss']
})

export class NewProjectComponent implements OnInit {
  services: Service[] = [];
  items: MenuItem[] = [];
  project: Project = {}
  countries:any='';
  home: any;
  user: any;
  serviceList: Service = {}
  isDisabledStartProject=false;
  isDownload=false;
listCountires: Countries[]=[];
  formNewProject= new FormGroup({
    projectname: new FormControl('', Validators.required),
    calendar: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    service: new FormControl('', Validators.required),
    currency: new FormControl('', Validators.required),

  });
  private errorMessages: string='';
  display: boolean=false;
  constructor(private newBackOfficeService:NewBackOfficeService,
              private userStoreService: UserStoreService,
              private profileUserService: ProfileUserService,
              private router:Router,
              private spinner: NgxSpinnerService,
            ) {
  }

  ngOnInit(): void {

    this.user = this.userStoreService.parseJWT();
    this.items = [
      {label: 'My Project '},
      {label: 'New Project'},

    ];

    this.home = {icon: 'pi pi-home', routerLink: '/'};
    this.getAllServices();
    this.listCountires=CurrencyConstants.countries;



  }


  getAllServices() {
    this.newBackOfficeService.getAllServices().subscribe(
      response => {
        this.services = response;
        // this.namesServices=this.list-services.
      }, error => {
      }
    )
  }
  get f() {

    if(!this.formNewProject.invalid &&this.isDownload){
      this.isDisabledStartProject=true;
    }else{
      this.isDisabledStartProject=false;
    }
      return this.formNewProject.controls

  }

  startProject() {
    this.spinner.show();
    if (this.serviceList.name) {
      // @ts-ignore
      this.project.nameService = this.serviceList.name;
      this.project.company=this.user.company;

      // @ts-ignore
      this.profileUserService.createNewProject(this.user.sub,this.project).subscribe(
        response => {

          setTimeout(()=>{
            this.spinner.hide();
            this.router.navigate(['/profile/list-project']);

          }, 1000);


        }, error => {
          this.spinner.hide();


        }
      )



    }
  }


  download(id: any, fileName: any) {
   this.isDownload=true;
    this.display=false;

    this.newBackOfficeService.downloadFolder(id).subscribe(
      response => {

        const file = new Blob([response], {type: 'application/octet-stream'});
        saveAs(file, fileName);

      })

  }
  cancel(){
    this.router.navigateByUrl('/profile/list-project', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/profile/new-project']);
    });
  }

  displayPoupup() {
this.display=true;
  }
  addCurrency(){
    console.log(this.countries.currencyCode)
    this.project.currencyCode=this.countries.currencyCode;

  }
}
