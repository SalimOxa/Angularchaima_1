import {Component, OnInit} from '@angular/core';
import {MenuItem} from 'primeng/api';
import {TaskDto} from '../../../common/Task';
import {ActivatedRoute, Router} from '@angular/router';
import {UserStoreService} from '../../../authentication/stores/user-store/user-store.service';
import {ProfileUserService} from '../../service/profile-user.service';
import {Project} from '../../../shared-module/model/project';
import {Subscription} from 'rxjs';
import {MailContentTask} from '../../../common/mailContentTask-dto';
import {CommentDto} from '../../../common/comment-dto';
import {environment} from '../../../../environments/environment';
import {saveAs} from 'file-saver';
import {NewBackOfficeService} from '../../../new-back-office/service/new-back-office.service';
import {StompService} from '../../../shared-module/services/stomp.service';


@Component({
  selector: 'app-dashboard-etata-project',
  templateUrl: './dashboard-etata-project.component.html',
  styleUrls: ['./dashboard-etata-project.component.scss']
})
export class DashboardEtataProjectComponent implements OnInit {
  events1: any[] = [];
  items: MenuItem[] = [];
  home: any;
  events2: any[] = [];

  tasks: any[] | undefined = [];
  display: boolean = false;
  displayLevel: boolean = false;
  param: string = ''
  currentProject: Project = {}
  currentTasks: TaskDto[] = [];
  task: TaskDto = {};
  passedTask: TaskDto = {}
  subscriptionIdProjectNotfication?: Subscription;
  displayJob: boolean = false;
  mailContent: MailContentTask | undefined = {}
  listCommentTask: CommentDto[] = [];
  host = environment.apiBaseUrl + '/api/v1';
  displayFile: boolean = false;
  idTranche: any;
  paymentDate: any;
  showSpinner = false;
  numberTask = 5;
  busyGettingData = false;
  lastlengthListTask = 0;
  idProject: number

  subscription?: Subscription;

  constructor(private route: ActivatedRoute,
              private userStoreService: UserStoreService,
              private profileUserService: ProfileUserService, private servicesBackOfficesService: NewBackOfficeService, private stompService: StompService) {

    // @ts-ignore
    this.param = this.route.snapshot.paramMap.get('id');
    this.idProject = +this.param
    this.getTasks()
  }

  ngOnInit() {



    this.subscription = this.stompService.getName().subscribe(res => {

        setTimeout(() => {
          if (res === 'project_type') {
            this.getTasks();
          } else if (res === 'payment_type') {

            this.getTasks();
          }
        }, 1000);

      }
    )
    this.items = [
      {label: 'My Project '},
      {label: 'List  Project '},
      {label: 'Project '},
      {label: 'List  Tasks '},


    ];
    this.home = {icon: 'pi pi-home', routerLink: '/'};

    this.subscriptionIdProjectNotfication = this.profileUserService.getIdProjectForNotification().subscribe(res => {
      this.idProject = res;
      this.getProject();


    })
    this.getProject()

  }

  doJob(task: TaskDto) {
    this.passedTask = task;
    console.log(task);
    this.display = true
  }

  showLevel() {
    this.displayLevel = true;
  }


  getProject() {
    this.profileUserService.getProjectById(this.idProject).subscribe(
      (resp) => {
        this.currentProject = resp;

      })
  }

  getTasks() {
    this.profileUserService.getAllTasksIsNotBlockedByProject(this.idProject, this.numberTask).subscribe(
      (resp) => {
        this.currentTasks = resp;

        this.tasks = this.currentTasks
        console.log('************************')
        console.log(this.currentTasks)
        this.busyGettingData = false;

      }
    )

  }

  refrechListTask(event: any) {
    this.getTasks();
    this.display = false;
  }


  showJob(task: TaskDto) {
    this.displayJob = true
    this.task = task;
    // @ts-ignore
    this.listCommentTask = this.task.comments
    this.mailContent = this.task.mail

    // @ts-ignore
    this.idTranche = this.task.tranchePayment.id;
    this.paymentDate = this.task.tranchePayment?.paymentDate;


  }

  closeDialog() {
    this.displayJob = false;
    this.task = {}
  }

  redFile() {
    this.displayFile = true;
    // @ts-ignore
    this.servicesBackOfficesService.downloadFile(this.task.file.id).subscribe(
      response => {

        const file = new Blob([response], {type: 'application/octet-stream'});
        // @ts-ignore
        saveAs(file, this.task.file?.fileName);

      })

  }


  DownaldFacturePayment() {
    console.log('fileName')
    this.profileUserService.downloadFileOfPayment(this.idTranche).subscribe(
      response => {
        console.log(response)
        const file = new Blob([response], {type: 'application/octet-stream'});
        saveAs(file, 'STATEMENT.pdf');


      })


  }


//fix last scrol mais a tester

  onScrollDown(ev: any) {
    if (this.currentTasks.length === this.lastlengthListTask) {
      console.log('return')
      return;
    }
    if (this.busyGettingData) {
      return
    }
    this.busyGettingData = true
    console.log('scrolled!!');
    this.showSpinner = true;
    this.lastlengthListTask = this.currentTasks.length;
    console.log(this.lastlengthListTask)
    this.numberTask = this.numberTask + 3;
    console.log(this.numberTask)
    setTimeout(() => {
      this.showSpinner = false;
      this.getTasks();
      console.log(this.busyGettingData)
    }, 1500);
  }

  onScrollUp(ev: any) {
    console.log('scrolled up!', ev);

  }

}
