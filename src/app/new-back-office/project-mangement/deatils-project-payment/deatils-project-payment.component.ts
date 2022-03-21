import {Component, OnInit} from '@angular/core';
import {MenuItem, MessageService} from 'primeng/api';
import {Project} from '../../../shared-module/model/project';
import {environment} from '../../../../environments/environment';
import {ActivatedRoute, Router} from '@angular/router';
import {UserStoreService} from '../../../authentication/stores/user-store/user-store.service';
import {ProfileUserService} from '../../../profile-user/service/profile-user.service';
import {TranchePayment} from '../../../shared-module/model/tranchePayment';
import {NewBackOfficeService} from '../../service/new-back-office.service';
import {TaskDto} from '../../../common/Task';
import {Subscription} from 'rxjs';
import {NgxSpinnerService} from 'ngx-spinner';
import {StompService} from '../../../shared-module/services/stomp.service';


@Component({
  selector: 'app-deatils-project-payment',
  templateUrl: './deatils-project-payment.component.html',
  styleUrls: ['./deatils-project-payment.component.scss']
})
export class DeatilsProjectPaymentComponent implements OnInit {
  items: MenuItem[] = [];
  home: any;
  user: any;
  idProject: any;
  project: Project = {}
  tranche: TranchePayment = {}
  listTranches: TranchePayment[] | undefined = [];
  updatePrice: number | undefined = 0;
  projects: Project[] = [];
  cols: any[] = [];
  lastInstallment = 0;
  jwt = '';
  displayNewTranchePoupup = false;
  currentId: any;
  currentName = '';
  nbrInvoices = 0;
  price = 0;
  displayBasic = false;
  totalPayment = 0;
  host = environment.apiBaseUrl + '/api/v1';
  displayPoupupUpdatePrice = false;
  task: TaskDto = {};
  showPayInstallment = false
  subscription?: Subscription;

  constructor(private userStoreService: UserStoreService,
              private profileUserService: ProfileUserService,
              private newBackOfficeService: NewBackOfficeService,
              private route: ActivatedRoute, private messageService: MessageService,
              private router: Router,
              private spinner: NgxSpinnerService, private stompService: StompService
  ) {
  }

  ngOnInit(): void {
    this.idProject = this.route.snapshot.paramMap.get('idProject');


    // @ts-ignore
    this.jwt = this.userStoreService.getToken();
    this.items = [
      {label: 'List Tranches For Payment '},
    ];
    this.home = {icon: 'pi pi-home', routerLink: '/'};
    this.user = this.userStoreService.parseJWT();
    this.getProject();
    this.subscription = this.stompService.getName().subscribe(res => {
        if (res === 'payment_type') {
          setTimeout(() => {
            this.getProject();
          }, 1000);
        }
      }
    )
    this.cols = [
      {field: 'NAME', header: 'NAME'},
      {field: 'DESCRIPTION', header: 'DESCRIPTION'},
      {field: 'deadline', header: 'deadline'},
      {field: 'ADMIN', header: 'ADMIN'},
      {field: 'STATMENT', header: 'STATMENT'},
      {field: 'DELETE', header: 'DELETE'},
      {field: 'DETAIL', header: 'DETAIL'}
    ];


  }

  getProject() {
    this.spinner.show();
    this.profileUserService.getProjectById(this.idProject).subscribe((response) => {
      this.project = response
      // @ts-ignore
      this.totalPayment = (((this.project.totalPayment - this.project.restPayment) / this.project.totalPayment) * 100).toFixed(2)

    })
    this.profileUserService.getAllTrancheByProject(this.idProject).subscribe((response) => {
      this.listTranches = response
// resevrve and sort backend
      // @ts-ignore
      this.listTranches?.sort((tranch1, tranch2) => tranch1.id - tranch2.id);
      this.nbrInvoices = this.listTranches?.length
      this.spinner.hide();
    })

  }

  setPriceProject() {
    if (this.price !== 0) {
      this.showSuccess()
      setTimeout(() => {
        // @ts-ignore
        this.newBackOfficeService.addPriceToProject(this.project.id, this.price, this.user.sub).subscribe((response) => {
          this.getProject();

        })


      }, 3000);


    }

  }

  UpdatePriceProject() {

    if (this.project.id != null) {
      console.log(this.project)
      // @ts-ignore
      if (this.project.totalPayment >= this.updatePrice && this.project.tranchePayment?.length !== 0) {

        this.messageService.add({severity: 'warn', summary: 'Warning', detail: 'you can\'t update this price'},);

      } else {
        this.showSuccess();
        // @ts-ignore
        this.newBackOfficeService.addPriceToProject(this.project.id, this.updatePrice, this.user.sub).subscribe((response) => {
          this.getProject();

        })
      }
      this.displayPoupupUpdatePrice = false;
    }


  }

  showSuccess() {

    this.messageService.add({severity: 'success', summary: 'Success', detail: 'Add Price Of Project'});

  }

  showPoupuNewTranche() {
    this.displayNewTranchePoupup = true;
  }

  showPoupuUpdatePrice() {
    this.displayPoupupUpdatePrice = true;
    this.updatePrice = this.project.totalPayment;
  }

  addNewTranche() {
    this.tranche.currencyCode = this.project.currencyCode;
    this.newBackOfficeService.addTrancheToPayForProject(this.tranche, this.idProject, this.user.sub).subscribe((response) => {
      this.project = response
      this.displayNewTranchePoupup = false;
      this.getProject();

    })

  }

  showFacturePayment(id: number, name: string) {

    this.currentId = id;
    this.currentName = name;
    this.displayBasic = true;


  }


  payInstallment(tranche: TranchePayment) {
    this.showPayInstallment = true;
    this.updatePrice = 0;
    this.updatePrice = tranche.price;
    this.tranche = tranche;
  }

  checkoutTranche() {

    //window.open('new-back-office/invoice/'+this.tranche.id)
    this.showPayInstallment = false;
    this.router.navigate(['new-back-office/invoice/', this.tranche.id]);
  }


}
