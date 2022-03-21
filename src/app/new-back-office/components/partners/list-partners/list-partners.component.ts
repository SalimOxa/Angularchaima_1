import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';
import {Partner} from '../../../../shared-module/model/partner';
import {NewBackOfficeService} from '../../../service/new-back-office.service';

@Component({
  selector: 'app-list-partners',
  templateUrl: './list-partners.component.html',
  styleUrls: ['./list-partners.component.scss']
})
export class ListPartnersComponent implements OnInit {
  partnersList: Partner[] = [];
  first = 0;
  rows = 5;
  items: MenuItem[]=[];
  home: any;
  currentPartner:number=0;
  displayDeletePartner= false;
  constructor(private newBackOfficesService: NewBackOfficeService) { }

  ngOnInit(): void {
    this.items = [
      {label: 'Partners Management'},
      {label: ' Partners List'},

    ];

    this.home = {icon: 'pi pi-home', routerLink: '/'};
    this.getAllPartners();
  }

  getAllPartners() {
    this.newBackOfficesService.getAllPartners().subscribe((response) => {
      this.partnersList = response;
      console.log(this.partnersList)

    })
  }

  popupDeletePartner(idPartner:number) {
    this.displayDeletePartner= true;
    this.currentPartner=idPartner;

  }


  DeletePartner() {
    this.newBackOfficesService.deletePartner(this.currentPartner).subscribe((response)=> {
    },error => {
      this.getAllPartners();
    })
    this.displayDeletePartner=false;
  }
}
