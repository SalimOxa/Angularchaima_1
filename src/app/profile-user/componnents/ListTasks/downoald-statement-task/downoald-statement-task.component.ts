import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TaskDto} from '../../../../common/Task';

@Component({
  selector: 'app-downoald-statement-task',
  templateUrl: './downoald-statement-task.component.html',
  styleUrls: ['./downoald-statement-task.component.css']
})
export class DownoaldStatementTaskComponent implements OnInit {
  @Input() task: TaskDto | undefined;
  @Output() refrechListTask: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

}
