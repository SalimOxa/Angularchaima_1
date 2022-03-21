import {Component, OnInit} from '@angular/core';
import {Project} from '../../../shared-module/model/project';
import {MenuItem} from 'primeng/api';
import {UserStoreService} from '../../../authentication/stores/user-store/user-store.service';
import {ActivatedRoute, Router} from '@angular/router';
import {TaskDto} from '../../../common/Task';
import {STATE} from '../../../common/enum/stateTask';
import {CommentDto} from '../../../common/comment-dto';
import {MailContentTask} from '../../../common/mailContentTask-dto';
import {saveAs} from 'file-saver';
import {NewBackOfficeService} from '../../service/new-back-office.service';
import {Subscription} from 'rxjs';
import {ProfileUserService} from '../../../profile-user/service/profile-user.service';
import {StompService} from '../../../shared-module/services/stomp.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-update-project-admin',
  templateUrl: './update-project-admin.component.html',
  styleUrls: ['./update-project-admin.component.scss']
})
export class UpdateProjectAdminComponent implements OnInit {
  accountId: string = '';
  display: boolean = false;
  displayEnable: boolean = false;
  isDownload: boolean = false;
  listTasks: TaskDto[] = [];
  mailContent: MailContentTask = {}
  listCommentTask: CommentDto[] = [];
  currentTask: TaskDto = {}

  task: TaskDto = {};
  project: Project = {}
  listTypeTasks: any[] = [
    {type: 'Upload'},
    {type: 'Add Comment'},
    {type: 'Send Mail'},
    {type: 'payTanche'},
    {type: 'downloadStatement'}

  ]
  first = 0;
  rows = 5;
  items: MenuItem[] = [];
  currentUser: any = {}
  currentIdTask: string = '';
  isDisabledAddTask = false;
  home: any;
  displayNewTaskPoupup: boolean = false;
  param: string = '';
  idProject: number = 0
  displayTaskEnable: boolean = false;
  displayTaskDelete: boolean = false;
  displayListComments: boolean = false;
  displayContentMail: boolean = false;
  displayUploadFile: boolean = false;
  displayDownoaldFacture: boolean = false;
  subscription?: Subscription;
  subscriptionIdProjectNotfication?: Subscription;
  user: any;
  currentProject: Project = {}
  form = new FormGroup({
    taskName: new FormControl('', Validators.required),
    calendar: new FormControl('', Validators.required),
    taskType: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required)
  });

  constructor(private servicesBackOfficesService: NewBackOfficeService,
              private userStoreService: UserStoreService,
              private router: Router,
              private route: ActivatedRoute,
              private spinner: NgxSpinnerService,
              private profileUserService: ProfileUserService, private stompService: StompService) {

  }

  ngOnInit(): void {
    this.user = this.userStoreService.parseJWT()

    // @ts-ignore
    this.param = this.route.snapshot.paramMap.get('id');
    this.idProject = +this.param
    this.getProject()
    this.getAllTasks();
    this.subscription = this.stompService.getName().subscribe(res => {
        setTimeout(() => {
          if (res === 'project_type') {
            this.getAllTasks();
          } else if (res === 'payment_type') {

            this.getAllTasks();
          }
        }, 1000);

      }
    )


    this.items = [
      {label: 'Task Management'},
      {label: 'List Tasks'},

    ];

    this.home = {icon: 'pi pi-home', routerLink: '/'};
    this.subscriptionIdProjectNotfication = this.profileUserService.getIdProjectForNotification().subscribe(res => {

      this.idProject = res;
      this.getAllTasks();


    })
  }

  get f() {
    if (!this.form.invalid) {
      this.isDisabledAddTask = true;
    } else {
      this.isDisabledAddTask = false;
    }
    return this.form.controls
  }

  getAllTasks() {
    this.servicesBackOfficesService.getAllTasksByProject(this.idProject).subscribe((response) => {


      this.listTasks = response
      console.log(this.listTasks)
    });
    this.display = false;

  }


  goDeatail() {
    this.router.navigate(['/profile/etat-project']);
  }

  newTask() {
    this.displayNewTaskPoupup = true;
    this.task = {}
    return this.form.reset()
  }

  createTask() {

    this.spinner.show();

    this.displayNewTaskPoupup = false;
    this.task.state = STATE.BLOCKED;
    this.task.enableAccount = false;
    this.servicesBackOfficesService.addTaskToProject(this.task, this.idProject, this.user.sub).subscribe((response) => {
      this.project = response;
      this.getAllTasks();
      this.spinner.hide();
    }, error => {
      this.getAllTasks();
      this.spinner.hide();

    });


  }

  closeCreateTask() {


    this.task = {}

  }

  getProject() {

    this.servicesBackOfficesService.getProjectById(this.idProject).subscribe(res => {
      this.currentProject = res;
    })
  }


  enableTaskForUser() {
    this.spinner.show();

    this.servicesBackOfficesService.enableTaskForUser(this.currentIdTask, this.user.sub, this.idProject).subscribe((response) => {
      this.task = response;
      this.getAllTasks();
      this.spinner.hide();


    });
    this.displayTaskEnable = false;

  }

  acceptDeleteTask() {
    this.servicesBackOfficesService.deleteTask(this.currentIdTask, this.idProject, this.user.sub).subscribe((response) => {
      this.getAllTasks();
      this.displayTaskEnable = false;


    }, error => {
      this.getAllTasks();
      this.displayTaskDelete = false;

    });

  }

  showPoupupEnableTask(id: string) {
    this.displayTaskEnable = true;
    this.currentIdTask = id;


  }

  showPoupupDeleteTask(id: string) {
    this.displayTaskDelete = true;
    this.currentIdTask = id;
  }

  showPoupupListCommentTask(id: string) {
    this.displayListComments = true;
    this.currentIdTask = id;
    this.getAllTaskComment();
  }

  showPoupupMailContent(id: string) {
    this.currentIdTask = id;
    this.getAllMailContent();
    this.displayContentMail = true;


  }

  showPoupupDownoaldFile(task: TaskDto) {
    this.currentTask = task;
    this.displayUploadFile = true;


  }

  showPoupupFacture(task: TaskDto) {
    this.currentTask = task;
    this.displayDownoaldFacture = true;
  }

  getAllTaskComment() {
    this.displayListComments = true
    this.servicesBackOfficesService.getAllCommentsByTasks(this.currentIdTask).subscribe((response) => {
      this.listCommentTask = response;


    });
    this.display = false;

  }

  getAllMailContent() {
    this.displayContentMail = true
    this.servicesBackOfficesService.getMailContentBytask(this.currentIdTask).subscribe((response) => {
      this.mailContent = response;


    });
    this.displayContentMail = false;

  }


  downloadFile() {
    // @ts-ignore
    const file = new Blob([this.currentTask.file.data], {type: 'application/octet-stream'});
    // @ts-ignore
    saveAs(file, this.currentTask.file?.fileName);


  }

  download() {
    this.isDownload = true;
    this.displayUploadFile = false;

    // @ts-ignore
    this.servicesBackOfficesService.downloadFile(this.currentTask.file.id).subscribe(
      response => {

        const file = new Blob([response], {type: 'application/octet-stream'});
        // @ts-ignore
        saveAs(file, this.currentTask.file?.fileName);

      })
  }

  DownaldFacturePayment() {
    console.log('fileName')
    // @ts-ignore
    this.profileUserService.downloadFileOfPayment(this.currentTask.tranchePayment.id).subscribe(
      response => {
        console.log(response)
        const file = new Blob([response], {type: 'application/octet-stream'});
        saveAs(file, 'STATEMENT.pdf');


      })


  }


  next() {
    this.first = this.first + this.rows;
  }

  prev() {
    this.first = this.first - this.rows;
  }

  reset() {
    this.first = 0;
  }

  isLastPage(): boolean {
    return this.listTasks
      ? this.first === this.listTasks.length - this.rows
      : true;
  }

  isFirstPage(): boolean {
    return this.listTasks ? this.first === 0 : true;
  }


}

