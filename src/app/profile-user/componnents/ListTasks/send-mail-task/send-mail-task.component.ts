import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TaskDto} from '../../../../common/Task';
import {DhashboardService} from '../../../../dashboard/service/dhashboard.service';
import {Contact} from '../../../../dashboard/model/contact';
import {ProfileUserService} from '../../../service/profile-user.service';
import {UserStoreService} from "../../../../authentication/stores/user-store/user-store.service";
import {ActivatedRoute} from '@angular/router';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-send-mail-task',
  templateUrl: './send-mail-task.component.html',
  styleUrls: ['./send-mail-task.component.css']
})
export class SendMailTaskComponent implements OnInit {
  @Input() task: TaskDto | undefined;
  contactForm: Contact = new Contact;
  @Output() refrechListTask: EventEmitter<any> = new EventEmitter();
  param= '';
  idProject: number = 0


  constructor(  private dhashboardService: DhashboardService,
                private profileUserService: ProfileUserService,
                private route: ActivatedRoute,
                private messageService: MessageService
  ) { }

  ngOnInit(): void {

    // @ts-ignore
    this.param = this.route.snapshot.paramMap.get('id');
    this.idProject = +this.param
    console.log(this.idProject)

    // @ts-ignore
    console.log(this.task.id)
  }


  sendmail(){

    // @ts-ignore
    this.profileUserService.sendMailToAdminTAsk(this.task.id,this.contactForm,this.idProject).subscribe(
      (resp) => {
        console.log('validate mail' + resp);
        this.refrechListTask.emit(null);

      },
      (err) => {
        console.log(err);

      });
    this.dhashboardService.SendUserMail(this.contactForm).subscribe(
      (resp) => {
        console.log('reponse mail' + resp);
      },
      (err) => {
        console.log(err);

      }
    );

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
