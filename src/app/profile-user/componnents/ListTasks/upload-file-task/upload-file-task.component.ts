import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TaskDto} from '../../../../common/Task';
import {StatmentOfWork} from '../../../../shared-module/model/statmentOfWork';
import {TaskFile} from '../../../../shared-module/model/TaskFile';
import {ProfileUserService} from '../../../service/profile-user.service';
import {UserStoreService} from "../../../../authentication/stores/user-store/user-store.service";
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-upload-file-task',
  templateUrl: './upload-file-task.component.html',
  styleUrls: ['./upload-file-task.component.css']
})
export class UploadFileTaskComponent implements OnInit {
  @Input() task: TaskDto | undefined;
  @Output() refrechListTask: EventEmitter<any> = new EventEmitter();

  editPieceAttached=false;
  selectedFiles: any;
  taskFile: TaskFile = {}
  param= '';
  idProject: number = 0

  constructor(private profileUserService: ProfileUserService,private route: ActivatedRoute) { }

  ngOnInit(): void {
    // @ts-ignore
    this.param = this.route.snapshot.paramMap.get('id');
    this.idProject = +this.param
    console.log("this.notification")
    console.log(this.idProject)

  }

  onSelectedPiece(event: any) {

    this.selectedFiles = event.target.files
    console.log(this.selectedFiles)
    this.taskFile.fileName = this.selectedFiles.item(0).name;
    this.editPieceAttached=true;

  }


  uploadFile(){
const formData = new FormData();
    formData.append('file', this.selectedFiles.item(0))

    // @ts-ignore
    this.profileUserService.uploadFileTask(formData,this.task.id,this.idProject).subscribe(
      response => {
        console.log(response);
        this.refrechListTask.emit(null);



      }
    )

  }
}
