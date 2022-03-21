import {Component, OnInit} from '@angular/core';
import {UserDto} from '../../../../common/user-dto';
import {MenuItem} from 'primeng/api';
import {NewBackOfficeService} from '../../../service/new-back-office.service';
import {UserStoreService} from '../../../../authentication/stores/user-store/user-store.service';
import {Router} from '@angular/router';
import {Table} from 'primeng/table';

@Component({
  selector: 'app-admins-without-master',
  templateUrl: './admins-without-master.component.html',
  styleUrls: ['./admins-without-master.component.css']
})
export class AdminsWithoutMasterComponent implements OnInit {
  accountId: string = '';
  display: boolean = false;

  displayMaster = false;
  listUsers: UserDto[] = [];
  listAdmins: UserDto[] = [];
  listMasters: UserDto[] = [];
  first = 0;
  displayEnable: boolean = false;
  displayPopup: boolean = false;
  user: any;
  rows = 5;
  items: MenuItem[] = [];

  home: any;


  constructor(private newBackOfficesService: NewBackOfficeService, private userStoreService: UserStoreService,
              private router: Router) {
  }

  ngOnInit(): void {

    this.getAdminsWithoutMaster();
    this.items = [
      {label: 'Users Management'},
      {label: 'List Admin'},

    ];

    this.home = {icon: 'pi pi-home', routerLink: '/'};
  }


  getAdminsWithoutMaster() {
    this.newBackOfficesService.getAdminsWithoutMaster().subscribe((response) => {
      this.listAdmins = response

    });
    this.display = false;

  }

  acceptDelete() {
    this.newBackOfficesService.deleteUser(this.accountId).subscribe(
      (response) => {
        this.getAdminsWithoutMaster();
      },
      (error) => {
        this.getAdminsWithoutMaster();
      }
    );
    this.display = false;
  }

  enabledUser() {
    this.newBackOfficesService.enableAccountUser(this.accountId).subscribe(
      (response) => {
      },
      (error) => {
        this.getAdminsWithoutMaster();
        this.displayEnable = false;
      }
    );
  }


  showDialog(id: string) {
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

  addAdminToMaster(idMaster: string) {
    this.newBackOfficesService.addAdminToMaster(this.accountId, idMaster).subscribe(res => {
      this.getAdminsWithoutMaster();
    })
    this.displayMaster = false;
  }

  showDialogAddAdminToMaster(idAdmin: string) {
    this.listMasters = []
    this.listUsers.forEach(master => {

      if (!(master.roles) || master.roles[0].roleName === 'MASTER') {
        this.listMasters.push(master);
      }
      this.getAdminsWithoutMaster();
    })

    this.displayMaster = true
    this.accountId = idAdmin
  }

  showCustomers(admin: UserDto) {
    this.displayPopup = true;
    this.user = admin;
  }
}
