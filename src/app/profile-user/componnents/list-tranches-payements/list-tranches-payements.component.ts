import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';
import {Project} from '../../../shared-module/model/project';
import {environment} from '../../../../environments/environment';
import {ActivatedRoute, Router} from '@angular/router';
import {UserStoreService} from '../../../authentication/stores/user-store/user-store.service';
import {ProfileUserService} from '../../service/profile-user.service';
import {TranchePayment} from '../../../shared-module/model/tranchePayment';
import {saveAs} from 'file-saver';
import {NgxSpinnerService} from 'ngx-spinner';
import {Subscription} from 'rxjs';
import {StompService} from '../../../shared-module/services/stomp.service';

@Component({
  selector: 'app-list-tranches-payements',
  templateUrl: './list-tranches-payements.component.html',
  styleUrls: ['./list-tranches-payements.component.scss']
})
export class ListTranchesPayementsComponent implements OnInit {
  items: MenuItem[] = [];
  home: any;
  user: any;
  idProject:any;
  displayBasic: boolean = false;
  project: Project={}
  listTranches:TranchePayment[] | undefined=[];
  cols: any[]=[] ;
  host = environment.apiBaseUrl + '/api/v1';
  currentId:any;
  currentName='';
  nbrInvoices: number | undefined =0;
  totalPayment=0;
  subscription?: Subscription ;
  constructor(private userStoreService: UserStoreService,
              private profileUserService: ProfileUserService,
              private route: ActivatedRoute,
              private spinner: NgxSpinnerService,private stompService: StompService
  ) {
  }

  ngOnInit(): void {
    this.idProject = this.route.snapshot.paramMap.get('idProject');
    this.getProject();
    this.subscription=this.stompService.getName().subscribe(res=>{
        if(res==='payment_type'){
          setTimeout( ()=> {
            this.getProject();
          }, 1000);}
      }
    )
    this.items = [
      {label: 'Payment '},
      {label: 'List Tranches For Payment '},
    ];
    this.home = {icon: 'pi pi-home', routerLink: '/'};
    this.user = this.userStoreService.parseJWT();

    this.cols = [
      { field: 'NAME', header: 'NAME' },
      { field: 'DESCRIPTION', header: 'DESCRIPTION' },
      { field: 'deadline', header: 'deadline' },
      { field: 'ADMIN', header: 'ADMIN' },
      { field: 'STATMENT', header: 'STATMENT' },
      { field: 'DELETE', header: 'DELETE' },
      { field: 'DETAIL', header: 'DETAIL' }
    ];


  }

  getProject() {
    this.spinner.show();
    this.profileUserService.getProjectById(this.idProject).subscribe((response) => {
      this.project = response

      this.listTranches=this.project.tranchePayment;
      // @ts-ignore
      this.totalPayment=(((this.project.totalPayment-this.project.restPayment)/this.project.totalPayment)*100).toFixed(2)

    })
    this.profileUserService.getAllTrancheByProject(this.idProject).subscribe((response) => {
      this.listTranches = response
// resevrve and sort backend
      // @ts-ignore
      this.listTranches?.sort((tranch1,tranch2) => tranch1.id - tranch2.id);
    this.nbrInvoices=this.listTranches?.length
      this.spinner.hide();
    })

  }
  showBasicDialog(id: number , name:string) {
this.currentId=id;
this.currentName=name;
this.displayBasic=true;

  }

  downloadFacture(id: number, fileName: any) {

    this.profileUserService.downloadFileOfPayment(id).subscribe(
      response => {
        console.log(response)
        const file = new Blob([response], {type: 'application/octet-stream'});
        saveAs(file, this.currentName+".pdf");



      })



  }



}

