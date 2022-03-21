import {Component, Input, OnInit} from '@angular/core';
import {UserDto} from '../../../common/user-dto';
import {NewBackOfficeService} from '../../service/new-back-office.service';
import {Router} from '@angular/router';
import {UserStoreService} from '../../../authentication/stores/user-store/user-store.service';
import {MenuItem, MessageService} from 'primeng/api';
import {Table} from 'primeng/table';
import {Project} from '../../../shared-module/model/project';
import {DocumentUser} from '../../../shared-module/model/documentUser';
import {ProfileUserService} from '../../../profile-user/service/profile-user.service';
import {environment} from '../../../../environments/environment';


// test
@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {
  accountId = '';
  currentUser: UserDto = {};
  display = false;
  displayEnable = false;
  listProject: Project[] = [];

  first = 0;
  rows = 5;
  user: any;
  home: any;
  @Input() userCameOutSuperMaster: any;
  listUsers: UserDto[] = [];
  listAdmins: UserDto[] = [];
  items: MenuItem[] = [];
  displayUsers = false;
  displayProjects = false;
  popupdeleteUser = false;
  displayDocuments = false;
  currentId: number = 1;
  displayBasic: boolean = false;
  listDocuments: DocumentUser[] = [];
  listProjectByCustomer: Project[] = [];
  // @ts-ignore
  cols: any[];

  host = environment.apiBaseUrl + '/api/v1';
  doc: any;
  loading = false;

  constructor(private newBackOfficesService: NewBackOfficeService, private profileUserService: ProfileUserService,
              private router: Router, private userStoreService: UserStoreService, private messageService: MessageService) {
  }


  ngOnInit(): void {
    this.user = this.userStoreService.parseJWT()

    if (this.user === undefined) {
      console.log('this.userCameOutSuperMaster')
      console.log(this.userCameOutSuperMaster)
      this.listProject = this.userCameOutSuperMaster.projects
      this.user = this.userCameOutSuperMaster
      this.user.sub = this.userCameOutSuperMaster.id
      this.user.roles[0] = this.userCameOutSuperMaster.roles[0].roleName
    }
    if (this.user.roles[0] === 'MASTER') {
      this.items = [
        {label: 'Users Management'},
        {label: 'My List  Admin'},

      ];
    } else {
      this.items = [
        {label: 'Users Management'},
        {label: 'My List  Customer'},
      ]
    }
    this.home = {icon: 'pi pi-home', routerLink: '/'};
    this.getAllUser();
  }

  getAllUser() {
    this.loading = true;

    this.newBackOfficesService.getAllUsers(this.user.sub).subscribe(response => {
      this.listUsers = response
      this.loading = false;


    })
  }

  enabledUser() {
    this.newBackOfficesService.enableAccountUser(this.accountId).subscribe(
      (response) => {
        this.getAllUser();
        this.displayEnable = false;
        this.router.navigate(['new-back-office/dashboard-super-master/list-users'])
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

  showDialogUsers(admin: UserDto) {
    this.loading = true;
    this.currentUser = admin;
    this.newBackOfficesService.getAllUsers(admin.id).subscribe(response => {
      this.listAdmins = response
      this.loading = false;
    })
    this.displayUsers = true;
  }


  showProjects(customer: UserDto) {
    this.loading = true;
    this.listProject = [];
    this.displayProjects = true;
    this.profileUserService.getAllProjectByCustomer(customer.id).subscribe(res => {
      this.listProject = res;
      console.log(this.listProject)
    })
    this.loading = false;
  }

  deleteProject(idProject: number) {

    this.newBackOfficesService.deleteProjectFomList(idProject, this.user.sub).subscribe(resp => {
    })
    this.getAllUser()
    this.displayProjects = false;
    this.display = false;
    this.displayUsers = false;


  }

  showDialog(id: string) {
    this.display = true;
    this.accountId = id;

  }

  showDialogDeleteUserByAdmin(id: string) {
    this.popupdeleteUser = true;
    this.accountId = id;

  }

  deleteUser() {


    this.newBackOfficesService.deleteUser(this.accountId).subscribe(resp => {

      }, error => {
        this.displayUsers = false
        this.display = false;
        this.getAllUser()

      }
    )
  }

  deleteUserByAdmin() {
    if (this.user.roles[0] === 'MASTER') {
      this.user.sub = this.currentUser.id

    }
    this.newBackOfficesService.deleteUserByAdmin(this.accountId, this.user.sub).subscribe(res => {
    }, error => {
      this.displayUsers = false
      this.popupdeleteUser = false;
      this.getAllUser()
    })
  }

  goDetail(id: number) {
    this.router.navigate(['/new-back-office/dashboard/update-project/', id]);

  }

  showDocuments(customer: UserDto) {
    this.displayDocuments = true;
    this.getDocumentsByUser(customer.id);
  }

  showBasicDialog(id: number) {
    this.currentId = id;
    this.displayBasic = true;

    this.profileUserService.downloadFileOfDocument(id).subscribe(
      response => {

        console.log(response)

      })

  }

  getDocumentsByUser(idCustomer: any) {
    this.profileUserService.getDocumentsByUser(idCustomer).subscribe((response) => {
      this.listDocuments = response;

    })

  }
}
