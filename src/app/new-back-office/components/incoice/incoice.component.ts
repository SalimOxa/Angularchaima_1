import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NewBackOfficeService} from '../../service/new-back-office.service';
import {TranchePayment} from '../../../shared-module/model/tranchePayment';
import {Project} from '../../../shared-module/model/project';
import {jsPDF} from 'jspdf';
import {UserStoreService} from '../../../authentication/stores/user-store/user-store.service';

@Component({
  selector: 'app-incoice',
  templateUrl: './incoice.component.html',
  styleUrls: ['./incoice.component.css']
})
export class IncoiceComponent implements OnInit {
  @ViewChild('content', {static: false}) el!: ElementRef;
  idTranche = 0;
  tranche: TranchePayment = {}
  project: Project = {}
  invoicePdf: any;
  codeInvoice: any;
  payement_date: any;
  user: any;

  constructor(private route: ActivatedRoute, private newBackOfficeService: NewBackOfficeService, private router: Router, private userStoreService: UserStoreService,) {
  }

  ngOnInit(): void {
    this.user = this.userStoreService.parseJWT();
    const idTranche = this.route.snapshot.paramMap.get('id');
    this.idTranche = Number(idTranche);
    this.getTrancheById();
  }

  getTrancheById() {
    this.newBackOfficeService.getTrancheById(this.idTranche).subscribe((response) => {
      this.tranche = response;
      this.newBackOfficeService.getProjectById(this.tranche.idProject).subscribe(res => {
        this.project = res;
      })
    })
  }

  create() {
    const pdf = new jsPDF('p', 'px', 'a4');
    // @ts-ignore
    // @ts-ignore
    pdf.html(this.el.nativeElement, {
      html2canvas: {
        scale: 0.54, scrollY: 0

      },
      x: 5,
      y: 5,
      callback: (pdf) => {
        const blobPdf = new Blob([pdf.output('blob')], {type: 'application/pdf'});
        const filename = this.tranche.numTranche + '° invoice ' + this.project.name + '.pdf';
        saveAs(blobPdf, filename);
        this.invoicePdf = blobPdf;
        this.downlaod();
      }

    });

  }

  downlaod() {

    const formData = new FormData();
    formData.append('file', this.invoicePdf)

    this.newBackOfficeService.addStatementOfWorkToTranchefromData(formData, this.idTranche).subscribe(
      response => {


      }
    )
  }

  checkoutTranche() {
    console.log(this.user.sub)
    this.newBackOfficeService.payTrancheProject(this.tranche.id, this.tranche.idtask, this.user.sub).subscribe((response) => {

      this.create();


    })

    this.router.navigate(['new-back-office/dashboard/detail-payment-project/', this.tranche.idProject]);

  }


  generateRandomString() {
    const length = 5;
    const randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }
    return result;
  }

  generateRandomCode() {
    const today = new Date();
    const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    const time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
    const code1 = this.generateRandomString();
    const code2 = this.generateRandomString();
    const code3 = this.generateRandomString();
    const codeInvoice = today.getHours() + code1 + today.getMinutes() + code2 + today.getSeconds() + code3;
    return codeInvoice;

  }
}
