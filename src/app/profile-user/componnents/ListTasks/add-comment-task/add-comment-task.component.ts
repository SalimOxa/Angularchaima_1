import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TaskDto} from '../../../../common/Task';
import {ProfileUserService} from '../../../service/profile-user.service';
import {CommentDto} from '../../../../common/comment-dto';
import {UserStoreService} from "../../../../authentication/stores/user-store/user-store.service";
import {ActivatedRoute, Router} from '@angular/router';
import {Calendar} from "primeng/calendar";


@Component({
  selector: 'app-add-comment-task',
  templateUrl: './add-comment-task.component.html',
  styleUrls: ['./add-comment-task.component.css']
})
export class AddCommentTaskComponent implements OnInit {
  @Input() task: TaskDto | undefined;
  @Output() refrechListTask: EventEmitter<any> = new EventEmitter();
 comment:CommentDto={}
  param= '';
  idProject: number = 0
  constructor( private profileUserService: ProfileUserService, private route: ActivatedRoute) { }

  ngOnInit(): void {

    // @ts-ignore
    this.param = this.route.snapshot.paramMap.get('id');
    this.idProject = +this.param
    console.log("this.notification")
    console.log(this.idProject)
  }


  addCommentToTask(){

   this.comment.question=this.task?.description;

    this.profileUserService.addCommentToTask(this.task?.id,this.comment,this.idProject).subscribe((response) => {
      this.task = response;
      this.refrechListTask.emit(null);



    });

  }



}
