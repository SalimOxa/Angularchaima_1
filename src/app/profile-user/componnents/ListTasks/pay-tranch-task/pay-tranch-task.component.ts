import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TaskDto} from '../../../../common/Task';
import {Router} from '@angular/router';

@Component({
  selector: 'app-pay-tranch-task',
  templateUrl: './pay-tranch-task.component.html',
  styleUrls: ['./pay-tranch-task.component.css']
})
export class PayTranchTaskComponent implements OnInit {
  @Input() task: TaskDto | undefined;
  @Output() refrechListTask: EventEmitter<any> = new EventEmitter();
nameTask: string | undefined =''
  description: string | undefined =''
  idTranche: string | undefined ='';
  constructor(private router: Router) { }

  ngOnInit(): void {
console.log(this.task?.tranchePayment?.deadline)
 this.nameTask=this.task?.name
this.description=this.task?.description;


  }
  payTranche(){

    // @ts-ignore
    this.router.navigate(['/profile/paymentTask/',this.task?.tranchePayment.id,this.task.id]);
  }
}
