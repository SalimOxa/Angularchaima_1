import {Component, OnInit} from '@angular/core';
import {MenuItem} from 'primeng/api';
import {Service} from '../../../../dashboard/model/service';
import {environment} from '../../../../../environments/environment';
import {DomSanitizer} from '@angular/platform-browser';
import {saveAs} from 'file-saver';
import {NewBackOfficeService} from '../../../service/new-back-office.service';

@Component({
  selector: 'app-liste-service',
  templateUrl: './liste-service.component.html',
  styleUrls: ['./liste-service.component.scss']
})
export class ListeServiceComponent implements OnInit {
  items: MenuItem[] = [];
  home: any;
  services: Service[] = [];
  host = environment.apiBaseUrl + '/api/v1';
  displayBasic: boolean = false;
  fileContent: any;
  blob?: Blob;
  fileName = '';
  id?: number;
  display: boolean = false;
  serviceId: number = 1;
  nameService: string = ''

  constructor(private servicesBackOfficesService: NewBackOfficeService, private sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
    this.items = [
      {label: 'Services Management'},
      {label: 'List Services'},

    ];

    this.home = {icon: 'pi pi-home', routerLink: '/'};
    this.getAllServices()

  }

  getAllServices() {
    this.servicesBackOfficesService.getAllServices().subscribe(
      response => {
        this.services = response;


      }, error => {

      }
    )


  }

  showBasicDialog(id: number, nameService: string) {
    this.serviceId = id
    this.nameService = nameService;
    this.displayBasic = true;
    let fileReader = new FileReader();
    this.servicesBackOfficesService.downloadFolder(id).subscribe(
      response => {

      })

  }


  showDialoguedeleteService(id: number) {
    this.display = true;
    this.serviceId = id;
    console.log(this.serviceId);

  }

  acceptDeleteService() {
    this.servicesBackOfficesService.deleteService(this.serviceId).subscribe(
      (response) => {
        this.getAllServices();
        console.log(response);
        this.display = false;
      },
      (error) => {
        this.getAllServices();
        console.log(error);
        this.display = false;

      }
    );
  }
}
