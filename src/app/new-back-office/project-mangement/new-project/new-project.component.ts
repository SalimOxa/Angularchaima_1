import {Component, OnInit} from '@angular/core';
import {Service} from '../../../dashboard/model/service';
import {UserDto} from '../../../common/user-dto';
import {MenuItem, MessageService, PrimeNGConfig} from 'primeng/api';
import {Project} from '../../../shared-module/model/project';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserStoreService} from '../../../authentication/stores/user-store/user-store.service';
import {ProfileUserService} from '../../../profile-user/service/profile-user.service';
import {Router} from '@angular/router';
import {saveAs} from 'file-saver';
import {NewBackOfficeService} from '../../service/new-back-office.service';
import {NotficationUser} from '../../../common/notficationUser';
import {MessageConstants} from '../../../common/constant/message';
import {Countries} from '../../../shared-module/model/countries';
import {CurrencyConstants} from '../../../common/constant/CurrencyConstants';
import {NgxSpinnerService} from 'ngx-spinner';

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
  home: any;
  user: any;
  isDisabledStartProject = false;
  isDownload = false;
  display = false;
  displayBasic: boolean = false;
  currencyCode: any = '';
  serviceList: Service = {}
  customer: UserDto = {}
  admin: UserDto = {}
  listCurency: Countries[] = [];
  notfication: NotficationUser = {};
  services: Service[] = [];
  users: UserDto[] = []
  listAdmin: UserDto[] = []
  items: MenuItem[] = [];
  project: Project = {}
  isSelectedAdmin = false;
  isSelectedCustomer = false;

  formNewProject = new FormGroup({
    projectname: new FormControl('', Validators.required),
    calendar: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    service: new FormControl('', Validators.required),
    customer: new FormControl('', Validators.required),
    admin: new FormControl('', Validators.required),
    projectPrice: new FormControl('', Validators.required),
    currency: new FormControl('', Validators.required),

  });

  constructor(private newBackOfficesService: NewBackOfficeService,
              private userStoreService: UserStoreService,
              private profileUserService: ProfileUserService,
              private primengConfig: PrimeNGConfig,
              private router: Router,
              private messageService: MessageService,
              private spinner: NgxSpinnerService,) {
  }

  ngOnInit(): void {
    this.user = this.userStoreService.parseJWT();
    this.items = [
      {label: 'My Project '},
      {label: 'New Project'},
    ];
    this.home = {icon: 'pi pi-home', routerLink: '/'};
    this.getAllServices();
    this.getAllCustomers();
    this.getAllAdmin();

    this.listCurency = CurrencyConstants.countries;
  }

  getAllServices() {
    this.newBackOfficesService.getAllServices().subscribe(
      response => {
        this.services = response;
      }, error => {

      }
    )


  }

  get f() {
    if (this.user.roles[0] === 'MASTER') {
      if (!this.formNewProject.invalid && this.isDownload && this.isSelectedAdmin && this.isSelectedCustomer) {
        this.isDisabledStartProject = true;
      } else {
        this.isDisabledStartProject = false;
      }
      return this.formNewProject.controls
    } else {

      this.formNewProject.removeControl('admin')

      if (!this.formNewProject.invalid && this.isDownload && this.isSelectedCustomer) {
        this.isDisabledStartProject = true;
      } else {
        this.isDisabledStartProject = false;
      }
      return this.formNewProject.controls
    }
  }

  getAllCustomers() {
    this.newBackOfficesService.getAllCustomers().subscribe(
      response => {
        this.users = response;

      }, error => {

      }
    )


  }

  getAllAdmin() {
    this.newBackOfficesService.getAllUsers(this.user.sub).subscribe((response) => {
      this.listAdmin = response;
      console.log(this.listAdmin)
    });
    this.display = false;

  }

  startProject() {


    if (this.serviceList.name) {
      // @ts-ignore
      this.project.nameService = this.serviceList.name;
      this.project.restPayment = this.project.totalPayment;
      this.project.company = this.customer.company;
      this.isDownload = true;
      if (this.user.roles[0] === 'ADMIN') {
        this.createNewProjectByAdmin();
      } else if (this.user.roles[0] === 'MASTER') {

        this.createNewProjectByMaster();
      }

    }
    this.displayBasic = true;
  }


  createNewProjectByAdmin() {
    this.spinner.show();

    this.newBackOfficesService.createNewProjectByAdmin(this.user.sub, this.customer.id, this.project).subscribe(
      response => {
        setTimeout(() => {
          this.router.navigate(['/new-back-office/dashboard/list-project']);
          this.spinner.hide();
          this.showSuccess();

        }, 1500);

      }, error => {

        console.log(error)
      }
    )
  }

  createNewProjectByMaster() {
    this.spinner.show();
    this.newBackOfficesService.createNewProjectByMaster(this.user.sub, this.admin.id, this.customer.id, this.project).subscribe(
      response => {
        console.log(response)

        this.showSuccess()
        this.spinner.hide();

        setTimeout(() => {
          this.router.navigate(['/new-back-office/dashboard/list-project']);
        }, 1500);


      }, error => {
        console.log(error)
      }
    )
  }

  download(id: any, fileName: any) {
    this.isDownload = true;
    this.display = false;

    this.newBackOfficesService.downloadFolder(id).subscribe(
      response => {

        const file = new Blob([response], {type: 'application/octet-stream'});
        saveAs(file, fileName);

      })

  }

  cancel() {
    this.router.navigateByUrl('/new-back-office/dashboard/list-project', {skipLocationChange: true}).then(() => {
      this.router.navigate(['/new-back-office/dashboard/new-project']);
    });
  }


  displayPoupup() {
    this.display = true;
  }


  showSuccess() {
    this.messageService.add({severity: 'success', summary: 'Success', detail: 'good job'});
  }

  sendNotficationToUsers(name: string | undefined) {
    this.notfication.message = MessageConstants.MESSAGE1;
    this.notfication.isShowed = true;
    this.notfication.name = name;
    this.notfication.createdDate = new Date();
    this.newBackOfficesService.sendNotfication(this.admin.id, this.customer.id, this.notfication).subscribe((response) => {
      console.log(response)
    });
    this.display = false;


  }

  addCurrency() {
    this.project.currencyCode = this.currencyCode.code;

  }

  selectAdmin() {
    this.isSelectedAdmin = true;
  }

  selectCustomer() {
    this.isSelectedCustomer = true;
  }
}
