import { Component, OnInit } from '@angular/core';
import {MenuItem, MessageService} from 'primeng/api';
import {Partner} from '../../../../shared-module/model/partner';
import {NewBackOfficeService} from '../../../service/new-back-office.service';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-new-partner',
  templateUrl: './new-partner.component.html',
  styleUrls: ['./new-partner.component.scss']
})

export class NewPartnerComponent implements OnInit {
  items: MenuItem[] = [];
  home: any;
  partner: Partner = {};
  // @ts-ignore
  selectedPhoto: any;
  isDisabledSavePartner=false;

  formNewPartner= new FormGroup({
     englishPartnerName: new FormControl('',Validators.required),
     frenchPartnerName: new FormControl('',Validators.required),
     arabicPartnerName: new FormControl('',Validators.required),
     englishDescription: new FormControl('',Validators.required),
     frenchDescription: new FormControl('',Validators.required),
     arabicDescription: new FormControl('',Validators.required),
     logo: new FormControl('',Validators.required),
     calendar: new FormControl('',Validators.required),
   });

  constructor(private newBackOfficesService: NewBackOfficeService,
              private router: Router,
              private messageService: MessageService) {
  }

  ngOnInit(): void {
    this.items = [
      {label: 'Partners Management'},
      {label: 'New Partner'},

    ];

    this.home = {icon: 'pi pi-home', routerLink: '/'};

  }

  savePartner() {
    const formData = new FormData();
    formData.append('partner', JSON.stringify(this.partner))
    formData.append('file', this.selectedPhoto.item(0))

    this.newBackOfficesService.SavePartner(formData).subscribe(
      response => {
        // tslint:disable-next-line:no-console
        console.log(response);
        console.log(this.partner)
        this.router.navigate(['new-back-office/dashboard/list-partners']);
        this.showToast('success', 'Good Job', 'Partner Added');
      },error => {
        console.log("test unique")
      }
    )

  }

  onSelectedPhoto(event: any) {
    this.selectedPhoto = event.target.files;
    this.partner.photoName = this.selectedPhoto.item(0).name;
  }

  get f(){
  if (!this.formNewPartner.invalid) {
  this.isDisabledSavePartner = true;
  }else{
    this.isDisabledSavePartner = false;
  }
    return this.formNewPartner.controls
  }
  private showToast(severity: string, summary: string, detail: string) {
    this.messageService.add({
      key: 'toast',
      severity,
      summary,
      detail,
    });
  }
}


