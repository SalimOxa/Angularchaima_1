import { Component, OnInit } from '@angular/core';

import {MenuItem} from 'primeng/api';

import {UserStoreService} from '../../../authentication/stores/user-store/user-store.service';
import {ProfileUserService} from '../../service/profile-user.service';

import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {NewBackOfficeService} from "../../../new-back-office/service/new-back-office.service";
import {DocumentUser} from '../../../shared-module/model/documentUser';


@Component({
  selector: 'app-new-document',
  templateUrl: './new-document.component.html',
  styleUrls: ['./new-document.component.scss']
})
export class NewDocumentComponent implements OnInit {
  items: MenuItem[] = [];

  listDocuments: any[] = [];
  documentUser: DocumentUser = {}
  home: any;
  user: any;
  selectedFiles: any;
  isDisabledCreateDoc = false;

  formNewDocument = new FormGroup({
    projectname: new FormControl('', Validators.required),
    calendar: new FormControl('', Validators.required),

    service: new FormControl('', Validators.required),

  });

  display: boolean = false;
  selectedFile: boolean = false;
  constructor(private newBackOfficeService: NewBackOfficeService,
              private userStoreService: UserStoreService,
              private profileUserService: ProfileUserService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.user = this.userStoreService.parseJWT();

    this.items = [
      {label: 'My Documents '},
      {label: 'New Document'},
    ];


    this.home = {icon: 'pi pi-home', routerLink: '/'};

    this.listDocuments = [
      {name: 'Commercial Record'},
      {name: 'Business license'},
      {name: 'Tax Card'},
      {name: 'Being Established'},
    ];


  }


  get f() {

    if (!this. formNewDocument.invalid && this.selectedFile) {
      this.isDisabledCreateDoc = true;
    } else {
      this.isDisabledCreateDoc = false;
    }
    return this. formNewDocument.controls

  }


  cancel() {
    this.router.navigateByUrl('/profile/list-documents', {skipLocationChange: true}).then(() => {
      this.router.navigate(['/profile/new-document']);
    });
  }


  createDocument() {
    const formData = new FormData()
    // @ts-ignore
    this.documentUser.documentType = this.documentUser.documentType.name;
    this.documentUser.id_customer= this.user.sub
    formData.append('file', this.selectedFiles.item(0))
    formData.append('customer', JSON.stringify(this.documentUser))


    this.profileUserService.createDocument(this.user.sub, formData).subscribe(
      response => {


        setTimeout(() => {
          this.router.navigate(['/profile/list-documents']);
        }, 1000);
      }
    )


  }


  onSelectedfile(event: any) {


    this.selectedFiles = event.target.files;

    this.selectedFile=true;


  }

  onTouched() {

    this.selectedFile=false


  }
}
