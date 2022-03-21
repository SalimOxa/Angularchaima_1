import { Component, OnInit } from '@angular/core';
import {MenuItem, MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {UserStoreService} from '../../../authentication/stores/user-store/user-store.service';
import {NewBackOfficeService} from '../../service/new-back-office.service';
import {UserDto} from '../../../common/user-dto';
import {Role_dto} from '../../../common/role_dto';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent implements OnInit {
  form = new FormGroup({
    username: new FormControl('', Validators.required),
    firstname: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    birthday: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    role: new FormControl('', Validators.required),
  });
  items: MenuItem[]=[];
  home: any;
  errorMessages = '';
  userDto: UserDto = {};
  displayBasic = false;
  prefixNumber='';
  telephoneNumber='';
  roleDto: Role_dto={}
 user: any;
  constructor(private newBackOfficesService: NewBackOfficeService,
              private router: Router,private userStoreService: UserStoreService,private messageService: MessageService) { }

  ngOnInit(): void {
    this.items = [
      {label: 'Users Management'},
      {label: 'New User'},

    ];
    this.user = this.userStoreService.parseJWT();
    this.home = {icon: 'pi pi-home', routerLink: '/'};

  }

  get f() {
    return this.form.controls;
  }

  register() {

    this.userDto.phoneNumber='+'+this.prefixNumber+ this.telephoneNumber;
    this.userDto.roles = [this.roleDto]

    this.newBackOfficesService.createCustomerByAdmin(this.userDto,this.user.sub).subscribe(
      (res) => {
        console.log(res)
        this.displayBasic = false;
        this.showToast('success', 'Good Job', 'User Added');
        this.router.navigate(['new-back-office/dashboard/new-project']);
      }
    );
  }
  showDialog() {
    this.displayBasic = true;
    if(this.user.roles[0]==='ADMIN'){
      this.roleDto.roleName='CUSTOMER'

    }else if(this.user.roles[0]==='MASTER') {
    this.errorMessages = '';
    if (this.form.invalid) {
      this.errorMessages = 'Please check all the inputs';
      setTimeout(() => {
        this.errorMessages = '';
      }, 5000);
    }
      return;

    }

  }
  private showToast(severity: string, summary: string, detail: string) {
    this.messageService.add({
      key: 'toast',
      severity,
      summary,
      detail,
    });
  }


  hasError($event: boolean) {

  }

  getNumber($event: any) {

  }

  telInputObject($event: any) {
  }

  onCountryChange($event: any) {
    this.prefixNumber=$event.dialCode;
  }

}
