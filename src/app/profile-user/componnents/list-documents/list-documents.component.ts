
import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UserStoreService} from '../../../authentication/stores/user-store/user-store.service';
import {ProfileUserService} from '../../service/profile-user.service';
import {MenuItem, MessageService} from 'primeng/api';
import {UserDto} from '../../../common/user-dto';
import {Project} from "../../../shared-module/model/project";
import {StatmentOfWork} from "../../../shared-module/model/statmentOfWork";

import {environment} from "../../../../environments/environment";
import {DocumentUser} from '../../../shared-module/model/documentUser';

@Component({
  selector: 'app-list-documents',
  templateUrl: './list-documents.component.html',
  styleUrls: ['./list-documents.component.scss']
})
export class ListDocumentsComponent implements OnInit {
  items: MenuItem[] = [];
  home: any;
  user: any;
  userDto: UserDto = {};
  first = 0;
  rows = 5;
  statementOfWork: StatmentOfWork = {};
  password: string = '';
  newPassword: string = '';
  retypePassword: string = ''
  displayPasswordPoupup: boolean = false;
  displayDeletPoupup: boolean = false;
  documents: DocumentUser[] | undefined = [];
currentDocument = 1
  selectedFiles: any;
  currentId: number = 1;
  displayBasic: boolean = false;
  fileContent: any;
  // @ts-ignore
  cols: any[] ;
  host = environment.apiBaseUrl + '/api/v1';
  doc: any;
  @Input() isDashboard: boolean | undefined=false;
  jwt:String='';

  constructor(private route: Router,
              private userStoreService: UserStoreService,
              private profileUserService: ProfileUserService,
              private messageService: MessageService) {
  }

  ngOnInit(): void {
    this.items = [
      {label: 'My Documents '},
      {label: 'New Document'},
    ];


    this.home = {icon: 'pi pi-home', routerLink: '/'};

    this.jwt=this.userStoreService.getToken();

    this.user = this.userStoreService.parseJWT();
    this.getDocumentsByUser();
    this.cols = [
      { field: 'NUMERO', header: 'NUMERO' },
      { field: 'DATE EXPIRATION', header: 'DATE' },
      { field: 'TYPE', header: 'TYPE' },
      { field: 'STATMENT', header: 'STATMENT' },
      { field: 'DELETE', header: 'DELETE' },
    ];


  }

  getDocumentsByUser() {
    this.profileUserService.getDocumentsByUser(this.user.sub).subscribe((response) => {
      this.documents = response;
      console.log(this.documents)
      console.log(this.documents)

    })

  }




deleteDocument(idDoc: number) {
    this.displayDeletPoupup = true;
    this.currentDocument = idDoc;



  }

  acceptDelete() {

    this.profileUserService.deleteDocument(this.currentDocument).subscribe(
      response => {

        console.log(response)
        this.displayDeletPoupup = false;
        this.getDocumentsByUser();

      }, error => {

        this.displayDeletPoupup = false;
        this.getDocumentsByUser();


      }
    )
  }

  detailProject(id:number) {
    this.route.navigate(['/profile/etat-project',id]);

  }


  onSelectedfile(event: any) {
    this.selectedFiles = event.target.files;
    console.log(this.selectedFiles.item(0))
    this.statementOfWork.fileName = this.selectedFiles.item(0).name
    const formData = new FormData();
    formData.append('file', this.selectedFiles.item(0))
    this.profileUserService.addStatementOfWorkToProject(formData, this.currentId).subscribe(
      response => {
        this.getDocumentsByUser();

      }
    )
  }

  test(id: number) {
    this.currentId = id;

  }

  showBasicDialog(id: number) {
    this.currentId = id;

    this.displayBasic = true;

    this.profileUserService.downloadFileOfDocument(id).subscribe(
      response => {

        console.log(response)

      })

  }


}

