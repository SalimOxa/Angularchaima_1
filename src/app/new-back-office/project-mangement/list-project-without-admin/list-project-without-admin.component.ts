import { Component, OnInit } from '@angular/core';
import {Project} from "../../../shared-module/model/project";
import {MenuItem} from "primeng/api";
import {UserDto} from "../../../common/user-dto";
import {NewBackOfficeService} from "../../service/new-back-office.service";
import {UserStoreService} from "../../../authentication/stores/user-store/user-store.service";
import {Router} from "@angular/router";
import {Table} from "primeng/table";
import {StompService} from '../../../shared-module/services/stomp.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-list-project-without-admin',
  templateUrl: './list-project-without-admin.component.html',
  styleUrls: ['./list-project-without-admin.component.scss']
})
export class ListProjectWithoutAdminComponent implements OnInit {
  accountId: string = '';
  display: boolean = false;


  listProject: Project[] = [];

  currentProject: number = 0;
  listProjectWithoutAdmin: Project[] = [];
  first = 0;

  rows = 5;
  items: MenuItem[] = [];
  subscription?: Subscription ;
  home: any;
  displayAdminPoupup: boolean = false;
  user: any;

  users:UserDto[]=[];
  displayDeleteProject=false;
  constructor( private newBackOfficesService: NewBackOfficeService, private userStoreService: UserStoreService,private stompService: StompService,
               private router: Router) {
    this.user = this.userStoreService.parseJWT()
    this.getAllAdmin();
    this.getAllProjectWiyhoutAdmin();


  }

  ngOnInit(): void {

    this.items = [
      {label: 'Project Management'},
      {label: ' List Projects Without Admin'},

    ];

    this.home = {icon: 'pi pi-home', routerLink: '/'};

    this.subscription=this.stompService.getName().subscribe(res=>{
      if(res==='project_type'){
        setTimeout( ()=> {
         this. getAllProjectWiyhoutAdmin();
        }, 1000);}
      }
    )

  }
  getAllAdmin() {

      this.newBackOfficesService.getAllUsers(this.user.sub).subscribe((response) => {
        this.users=response;
      })}
  getAllProjectWiyhoutAdmin() {
    this.newBackOfficesService.getAllProjectsWithoutAdmin().subscribe((resp) => {
      this.listProjectWithoutAdmin = resp;

    })
  }
  popupAddAdminToProject(idProject: number) {
    this.displayAdminPoupup = true;
    this.currentProject = idProject;

  }
  addProject(idAdmin:string){
    this.newBackOfficesService.addProjecToAdmin(idAdmin,this.currentProject).subscribe(
      (response) => {
        this.displayAdminPoupup=false;

        this.getAllProjectWiyhoutAdmin()
      },
      (error) => {
      }
    );
    this.displayAdminPoupup = false;
  }

  next() {
    this.first = this.first + this.rows;
  }

  prev() {
    this.first = this.first - this.rows;
  }

  reset() {
    this.first = 0;
  }

  isLastPage(): boolean {
    return this.listProject
      ? this.first === this.listProject.length - this.rows
      : true;
  }

  isFirstPage(): boolean {
    return this.listProject ? this.first === 0 : true;
  }







  clear(table: Table) {
    table.clear();
  }

  goDetail() {
    this.router.navigate(['/profile/etat-project']);

  }
  popupDeleteProject(idProject: number) {
    this.displayDeleteProject = true;
    this.currentProject = idProject;

  }
  deleteProject(){

    this.newBackOfficesService.deleteProject(this.currentProject,this.user.sub).subscribe(resp=>{

      },error => {
        this.getAllProjectWiyhoutAdmin()
      }
    )
    this.displayDeleteProject=false;

  }
}
