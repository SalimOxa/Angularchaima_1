import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserDto} from "../../../../common/user-dto";
import {MenuItem, MessageService} from "primeng/api";

import {Router} from "@angular/router";
import {UserStoreService} from "../../../../authentication/stores/user-store/user-store.service";
import {AuthenticationService} from "../../../../authentication/service/authentication.service";
import {Role_dto} from "../../../../common/role_dto";
import {NewBackOfficeService} from "../../../service/new-back-office.service";

@Component({
  selector: 'app-new-user-super-master',
  templateUrl: './new-user-super-master.component.html',
  styleUrls: ['./new-user-super-master.component.css']
})
export class NewUserSuperMasterComponent implements OnInit {
  form = new FormGroup({
    username: new FormControl('', Validators.required),
    firstname: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    birthday: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
   role: new FormControl('', Validators.required),
  });
  errorMessages = '';
  userDto: UserDto = {};
  displayBasic: boolean = false;
  items: MenuItem[]=[];

  home:any;
  role: string='CUSTOMER';
  private master: UserDto={ };
   roleDto:Role_dto={}

  constructor(private newBackOfficeService: NewBackOfficeService,
              private router: Router,private userStoreService: UserStoreService,
              private messageService: MessageService,





  ) {
  }

  ngOnInit(): void {
    this.items = [
      {label: 'Users Management'},
      {label: 'New User'},

    ];

    this.home = {icon: 'pi pi-home', routerLink: '/'};


  }

  get f() {
    return  this.form.controls
  }

  register() {
    this.userDto.roles = [this.roleDto]

   this.newBackOfficeService.register(this.userDto).subscribe(
      (res) => {
        this.displayBasic = false;

      }
    );
    setTimeout(() => {
      this.showToast('success', 'Good Job', 'User Added');
    }, 500);

    setTimeout(() => {


    this.displayBasic = false;
    // @ts-ignore
      if(this.userDto.roles[0].roleName==="MASTER"){
      this.router.navigate(['/new-back-office/dashboard-super-master/list-master'])
    }else { // @ts-ignore
        if(this.userDto.roles[0].roleName==="ADMIN"){
              this.router.navigate(['/new-back-office/dashboard-super-master/list-admins'])
            }else{
              this.router.navigate(['/new-back-office/dashboard-super-master/list-users'])
            }
      }
    }, 800);

  }

  showDialog() {

    this.errorMessages = '';
    if (this.form.invalid) {
      this.errorMessages = 'Please check all the inputs';
      setTimeout(() => {
        this.errorMessages = '';
      }, 5000);

      return;
    }

    this.displayBasic = true;
  }


  // TODO Move it to Global ToastService
  private showToast(severity: string, summary: string, detail: string) {
    this.messageService.add({
      key: 'toast',
      severity,
      summary,
      detail,
    });
  }

}
