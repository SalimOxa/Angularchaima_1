import { Component, OnInit } from '@angular/core';
import {UserDto} from "../../../../common/user-dto";
import {MenuItem} from "primeng/api";
import {Router} from "@angular/router";
import {Table} from "primeng/table";
import {UserStoreService} from "../../../../authentication/stores/user-store/user-store.service";
import {NewBackOfficeService} from "../../../service/new-back-office.service";

@Component({
  selector: 'app-list-user-super-master',
  templateUrl: './list-user-super-master.component.html',
  styleUrls: ['./list-user-super-master.component.css']
})
export class ListUserSuperMasterComponent implements OnInit {
  accountId: string = '';
  display: boolean = false;
  displayEnable: boolean = false;

  listUsers: UserDto[] = [];
  first = 0;

  rows = 5;
  items: MenuItem[]=[];

  home:any;

  constructor(private newBackOfficesService: NewBackOfficeService, private userStoreService: UserStoreService,
              private router : Router) {}

  ngOnInit(): void {
    this.getAllUser();
    this.items = [
      {label: 'Users Management'},
      {label: 'List Customers'},

    ];

    this.home = {icon: 'pi pi-home', routerLink: '/'};
  }

  getAllUser() {
    this.newBackOfficesService.getAllCustomers().subscribe((response) => {
      this.listUsers = response;

    });
    this.display=false;

  }
  acceptDelete() {
    this.newBackOfficesService.deleteUser(this.accountId).subscribe(
      (response) => {
        this.getAllUser();
     },
      (error) => {
        this.getAllUser();
      }
    );
    this.display=false;
  }

  enabledUser() {
    this.newBackOfficesService.enableAccountUser(this.accountId).subscribe(
      (response) => {
      },
      (error) => {
        this.getAllUser();
        this.displayEnable = false;
      }
    );
  }


  showDialog(id:string) {
    this.display = true;
    this.accountId = id;

  }
  showDialogEnableAccount(id: string) {
    this.displayEnable = true;
    this.accountId = id;
    console.log(this.accountId);
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
}
