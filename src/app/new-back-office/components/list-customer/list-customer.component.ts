import { Component, OnInit } from '@angular/core';
import {UserDto} from "../../../common/user-dto";
import {Project} from "../../../shared-module/model/project";
import {MenuItem, MessageService} from "primeng/api";
import {NewBackOfficeService} from "../../service/new-back-office.service";
import {Router} from "@angular/router";
import {UserStoreService} from "../../../authentication/stores/user-store/user-store.service";
import {Table} from "primeng/table";
import {Subscription} from 'rxjs';
import {StompService} from '../../../shared-module/services/stomp.service';

@Component({
  selector: 'app-list-customer',
  templateUrl: './list-customer.component.html',
  styleUrls: ['./list-customer.component.scss']
})
export class ListCustomerComponent implements OnInit {
  accountId = '';
  currentUser: UserDto={};
  display = false;
  displayEnable = false;
  listProject: Project[]=[];
  first = 0;
  rows = 2;
  user: any;
  home: any;
  listUsers: UserDto[] = [];
  listAdmins: UserDto[] = [];
  items: MenuItem[]=[];
  displayUsers= false;
  displayProjects=false;
  loading=false;
  subscription?: Subscription;

  constructor(private newBackOfficesService: NewBackOfficeService,
              private router: Router,private userStoreService: UserStoreService, private stompService: StompService) {  this.getAllUser(); }


  ngOnInit(): void {
    this.user=this.userStoreService.parseJWT()
    this.items = [
      {label: 'Users Management'},
      {label: 'My List Customer'},

    ];

    this.home = {icon: 'pi pi-home', routerLink: '/'};



    this.subscription = this.stompService.getName().subscribe(res => {
        setTimeout(() => {
          if (res === 'user_type') {
            this.getAllUser();
          }
        }, 1000);

      }
    )

  }

  getAllUser(){
    this.loading = true;
    this.newBackOfficesService.getAllCustomers().subscribe(response=>{
      this.listUsers=response
      console.log(this.listUsers)
      this.loading = false;
    })
  }
// loding spinner
  enabledUser() {
    this.newBackOfficesService.enableAccountUser(this.accountId).subscribe(
      (response) => {
        this.getAllUser();
        this.displayEnable = false;

      },
      (error) => {

        this.getAllUser();
        this.displayEnable = false;

      }
    );
  }

  showDialogEnableAccount(id: string) {
    this.displayEnable = true;
    this.accountId = id;

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
    return this.listUsers
      ? this.first === this.listUsers.length - this.rows
      : true;
  }

  isFirstPage(): boolean {
    return this.listUsers ? this.first === 0 : true;
  }

  clear(table: Table) {
    table.clear();
  }





  showDialog(id: string) {
    this.display = true;
    this.accountId = id;

  }
  deleteUser(){
    this.newBackOfficesService.deleteUser(this.accountId).subscribe(resp=>{
      this.getAllUser()
    },error => {
      this.getAllUser()

    })
    this.display = false;
    this.getAllUser()
  }


}
