import {Component, ComponentRef, ElementRef, OnInit, ViewChild} from '@angular/core';
import {IPayPalConfig, ICreateOrderRequest} from 'ngx-paypal';
import {ProfileUserService} from '../../service/profile-user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {TranchePayment} from '../../../shared-module/model/tranchePayment';
import {jsPDF} from 'jspdf';
import {Project} from '../../../shared-module/model/project';
import {UserStoreService} from '../../../authentication/stores/user-store/user-store.service';

@Component({
  selector: 'app-payment-pay-pal',
  templateUrl: './payment-pay-pal.component.html',
  styleUrls: ['./payment-pay-pal.component.scss']
})
export class PaymentPayPalComponent implements OnInit {
  @ViewChild('content', {static: false}) el!: ElementRef;


  // @ts-ignore
  public payPalConfig: IPayPalConfig = {};
  price: string = '';
  idTranche: any;
  idTask: any;
  tranche: TranchePayment = {}
  project: Project = {}
  invoicePdf: any;
  priceEUR = '';
  priceUSD = '0';
  successPayment = false;
  showSuccess: boolean = false;
  Tabcurrency: string[] = [];
  payment_way: any;
  payement_date: any;
  email = ''
  codeInvoice: any;
  user: any;
  chargementPaypal = false;
  modePyment: string[] = []

  selectedMode: string = 'PayPal/CarteBancaire';
  onlinePayment = true;
  paymentByCheck = false
  paymentByBankTransfer = false;


  constructor(private route: ActivatedRoute,
              private router: Router,
              private profileUserService: ProfileUserService,
              private userStoreService: UserStoreService,
  ) {
    this.chargementPaypal = true;
    this.modePyment = ['PayPal/Credit Card', 'Check/Cash', 'Bank Transfer'];
  }

  ngOnInit() {
    this.idTranche = this.route.snapshot.paramMap.get('idTranche');
    this.idTask = this.route.snapshot.paramMap.get('idTask');
    this.gteTrancheById();
    this.user = this.userStoreService.parseJWT();
    this.email = this.user.email;


  }


  private initConfig(): void {

    this.payPalConfig = {
      currency: this.tranche.currencyCode,
      clientId: 'AZE3n8N8W0zZqLOcWl-ij98AIDN0AJjz7sQ6PP2mMr9_KhMrbuKUxE4fXUXTU5m6GHr8llT8JUOD8ZgK',
      createOrderOnClient: (data) => <ICreateOrderRequest>{
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: this.tranche.currencyCode,
              value: this.price,
              breakdown: {
                item_total: {
                  currency_code: this.tranche.currencyCode,
                  value: this.price
                }
              }
            },
            items: [
              {
                name: 'Enterprise Subscription',
                quantity: '1',
                category: 'DIGITAL_GOODS',
                unit_amount: {
                  currency_code: this.tranche.currencyCode,
                  value: this.price,
                },
              }
            ]
          }
        ]
      },
      advanced: {
        commit: 'true'
      },
      style: {
        label: 'paypal',
        layout: 'vertical'
      },

      onApprove: (data, actions) => {
        //  console.log('onApprove - transaction was approved, but not authorized', data, actions);
        this.create();
        actions.order.get().then((details: any) => {
          console.log('onApprove - you can get full order details inside onApprove: ', details);
          this.email = details.payer.email_address;
          console.log('email', details.create_time);
          console.log('email', details.id);
          console.log('email', details.payer.name.given_name);
          console.log('email', details.name.surname);
          console.log('email', details.purchase_units[0].shipping.address);
          console.log('email', details.purchase_units[0].shipping.name);
          console.log('email', details.payer.email_address);
          console.log('email', details.shipping.address.address_line_1);
        });
      },
      onClientAuthorization: (data) => {
        console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
        this.showSuccess = true;
      },
      onCancel: (data, actions) => {
        // @ts-ignore
        //  document.getElementById('content').style.display = 'none';
      },

      onClick: (data, actions) => {
        console.log('maniere payement', data, actions);
        // @ts-ignore
        document.getElementById('content').style.display = 'block';
        this.payment_way = data.fundingSource;
        this.payement_date = new Date()
        this.codeInvoice = this.generateRandomCode();
        // @ts-ignore
        //  this.project.restPayment = this.project.totalPayment - this.tranche.price;
        return actions.reject();
      },
    }
    this.chargementPaypal = false;
  }


  gteTrancheById() {
    this.profileUserService.getTrancheById(this.idTranche).subscribe((response) => {
      this.tranche = response;
      console.log(this.tranche)
      this.price = '' + this.tranche.price;
      this.profileUserService.getProjectById(this.tranche.idProject).subscribe((response) => {
        this.project = response;
        console.log(this.project.restPayment)
        this.initConfig();


      })

    })
  }

  create() {
    let pdf = new jsPDF('p', 'px', 'a4');
    pdf.html(this.el.nativeElement, {
      html2canvas: {
        scale: 0.52, scrollY: 0

      },
      x: 0,
      y: 0,
      callback: (pdf) => {
        const blobPdf = new Blob([pdf.output('blob')], {type: 'application/pdf'});
        const filename = this.tranche.numTranche + '° invoice ' + this.project.name + '.pdf';
        saveAs(blobPdf, filename);
        this.invoicePdf = blobPdf;
        this.payTranche();
      }
    });

  }

  payTranche() {
    this.profileUserService.payTrancheProject(this.idTranche, this.idTask, this.user.sub).subscribe((response) => {
      this.tranche = response;
      const formData = new FormData();
      formData.append('file', this.invoicePdf)
      console.log(formData.get('file'))
      this.profileUserService.addStatementOfWorkToTranchefromData(formData, this.idTranche).subscribe(
        response => {
          this.successPayment = true;
          // @ts-ignore
          document.getElementById('content').style.display = 'none';


        }
      )
    })
  }


  generateRandomString() {
    var length = 5;
    var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var result = '';
    for (var i = 0; i < length; i++) {
      result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }
    return result;
  }

  generateRandomCode() {
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
    var code1 = this.generateRandomString();
    var code2 = this.generateRandomString();
    var code3 = this.generateRandomString();
    var codeInvoice = today.getHours() + code1 + today.getMinutes() + code2 + today.getSeconds() + code3;
    return codeInvoice;

  }

  showListPayment() {
    this.router.navigate(['/profile/listTranchesPayement', this.tranche.idProject]);
  }

  changeModePayement() {
    console.log(this.selectedMode)
    switch (this.selectedMode) {
      case 'PayPal/Credit Card': {
        this.onlinePayment = true;
        this.paymentByCheck = false;
        this.paymentByBankTransfer = false;

        break;
      }
      case 'Check/Cash': {
        this.paymentByCheck = true;
        this.paymentByBankTransfer = false;
        this.onlinePayment = false;


        break;
      }
      case 'Bank Transfer': {
        this.paymentByBankTransfer = true;
        this.paymentByCheck = false;
        this.onlinePayment = false;

        break;
      }
      default: {
        this.onlinePayment = true;
        this.paymentByBankTransfer = false;
        this.paymentByCheck = false;
        break;
      }
    }
  }
}
