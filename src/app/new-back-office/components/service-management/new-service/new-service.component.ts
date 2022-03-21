import { Component, OnInit } from '@angular/core';
import {MenuItem, MessageService} from "primeng/api";
import {Service} from "../../../../shared-module/model/service";
import {StatmentOfWork} from "../../../../shared-module/model/statmentOfWork";
import {Router} from "@angular/router";
import {NewBackOfficeService} from "../../../service/new-back-office.service";

@Component({
  selector: 'app-new-service',
  templateUrl: './new-service.component.html',
  styleUrls: ['./new-service.component.scss']
})
export class NewServiceComponent implements OnInit {
  editPhoto=false;
  editPieceAttached=false;
  selectedFiles: any;
  selectedPhoto: any;
  items: MenuItem[]=[];
  home:any;

  service: Service = {};
  uploadedFiles: StatmentOfWork[] = [];
  statementOfWork: StatmentOfWork = {}

  constructor(private newBackOfficesService: NewBackOfficeService,
              private router:Router,
              private messageService: MessageService

  ) { }

  ngOnInit(): void {
    this.items = [
      {label: 'Services Management'},
      {label: 'New Service'},

    ];

    this.home = {icon: 'pi pi-home', routerLink: '/'};
  }





  saveService(){
    // this.onUpload();
    const service = this.service
    const formData = new FormData();
    formData.append('service', JSON.stringify(service))
    formData.append('file', this.selectedPhoto.item(0))
    formData.append('fileSOW', this.selectedFiles.item(0))

    this.newBackOfficesService.SaveService(formData).subscribe(
      response => {
        console.log(response);
        setTimeout(()=>{
          this.router.navigate(['/new-back-office/dashboard/list-service']);

        }, 1000);

      }
    )

  }

  onEditPhoto() {
    this.editPhoto=true;
  }

  onSelectedPhoto(event:any) {
    this.selectedPhoto=event.target.files;
    this.service.photoName=this.selectedPhoto.item(0).name;
    this.editPhoto=true;

  }

  onSelectedPiece(event: any) {
    this.selectedFiles = event.target.files
    console.log(this.selectedFiles)
    this.statementOfWork.fileName = this.selectedFiles.item(0).name;
    this.uploadedFiles.push(this.statementOfWork);
    this.editPieceAttached=true;

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


  clearURL(){
    this.service.videoURL='';
  }
}

