import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Service} from '../../shared-module/model/service';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {Project} from '../../shared-module/model/project';
import {UserDto} from '../../common/user-dto';
import {CommentDto} from '../../common/comment-dto';
import {Contact} from '../../dashboard/model/contact';
import {UserStoreService} from '../../authentication/stores/user-store/user-store.service';
import {NotficationUser} from '../../common/notficationUser';
import {TaskDto} from '../../common/Task';
import {DocumentUser} from '../../shared-module/model/documentUser';
import {TranchePayment} from '../../shared-module/model/tranchePayment';
import {ModelNotification} from '../../shared-module/model/modelNotification';


@Injectable({
  providedIn: 'root'
})
// test
export class ProfileUserService {
  private userName = new BehaviorSubject('aaa');
  currentuserName = this.userName.asObservable();
  private subject = new Subject<string>();
  private subjectIdProject = new Subject<number>();
  private subscriptionSuccessPayment = new Subject<string>();

  constructor(private http: HttpClient, private userStoreService: UserStoreService) {

  }

  getHeadres() {
    return new HttpHeaders({authorization: 'Bearer ' + this.userStoreService.getToken()});
  }

  sendName(name: string | undefined) {
    this.subject.next(name);
  }

  clearName() {
    this.subject.next();
  }

  getName(): Observable<string> {
    return this.subject.asObservable();
  }

  sendResultPayement(name: string | undefined) {
    this.subscriptionSuccessPayment.next(name);
  }

  getResultPayement(): Observable<string> {
    return this.subscriptionSuccessPayment.asObservable();
  }

// event emmitter for sending id project from header to etat-project
  sendIdProjectForNotification(idProject: number | undefined) {
    this.subjectIdProject.next(idProject);
  }

  getIdProjectForNotification(): Observable<number> {
    return this.subjectIdProject.asObservable();
  }


  getUser(email: string) {


    return this.http.get(environment.apiBaseUrl + `/api/v1/one/${email}`, {headers: this.getHeadres()});
  }

  saveChanges(data: UserDto) {
    return this.http.put(environment.apiBaseUrl + `/api/v1/update-customer`, data, {headers: this.getHeadres()});

  }

  updateProfile(data: UserDto) {
    return this.http.put(environment.apiBaseUrl + `/api/v1/update-customer-notfication`, data, {headers: this.getHeadres()});

  }

  getPasswordExist(text: any, id: string) {
    return this.http.get(
      environment.apiBaseUrl + `/api/v1/exist/${text}/${id}`, {headers: this.getHeadres()});
  }


  createNewProject(idCustomer: string | undefined, project: Project) {

    return this.http.post(environment.apiBaseUrl + `/api/v1/new-project-customer/${idCustomer}`, project, {headers: this.getHeadres()})
  }

  deleteProject(idProject: any, idUser: String | undefined) {
    return this.http.delete(`/api/v1/delete-project/${idProject}/${idUser}`,
      {headers: this.getHeadres()})
  }

  addStatementOfWorkToProject(fromData: FormData, idProject: number) {
    return this.http.post(environment.apiBaseUrl + `/api/v1/addStatementOfWork/${idProject}`, fromData, {headers: this.getHeadres()})
  }


  downloadFileOfProject(id: number): Observable<Blob> {

    // @ts-ignore
    return this.http.get(environment.apiBaseUrl + `/api/v1/downloadFileOfProject/${id}`, {responseType: 'blob'});
  }

  readfile(id: number): Observable<String> {
    // @ts-ignore
    return this.http.get(environment.apiBaseUrl + `/api/v1/fileOfStatemant/${id}`, {headers: this.getHeadres()})
  }

  getProjectById(idProject?: number) {
    return this.http.get<Project>(
      environment.apiBaseUrl + `/api/v1/project/${idProject}`, {headers: this.getHeadres()}
    );
  }

  getAllTasksIsNotBlockedByProject(idProject?: number, numberTask?: number) {
    return this.http.get<TaskDto[]>(
      environment.apiBaseUrl + `/api/v1/getAllTasksIsNotBlockedByProject/${idProject}/${numberTask}`, {headers: this.getHeadres()}
    );
  }

  validateTaskByUser(id: String | undefined) {
    return this.http.put(`/api/v1/validateTaskByUser`, id, {headers: this.getHeadres()})
  }

  addCommentToTask(idTask: any, comment: CommentDto, idProject: number) {

    return this.http.post(environment.apiBaseUrl + `/api/v1/addCommentToTask/${idTask}/${idProject}`, comment, {headers: this.getHeadres()})
  }


  sendMailToAdminTAsk(idTask: String | undefined, form: Contact, idProject: number) {
    return this.http.put(`/api/v1/sendMailToAdminTAsk/${idTask}/${idProject}`, form, {headers: this.getHeadres()})
  }


  uploadFileTask(fromData: FormData, idTask: string | undefined, idProject: number): Observable<any> {
    return this.http.post(environment.apiBaseUrl + `/api/v1/addFileUploadTask/${idTask}/${idProject}`, fromData)
  }


  getNotficationsByUserPage(idUser: string, numberNotfiction: number) {
    return this.http.get<ModelNotification>(environment.apiBaseUrl + `/api/v1/notifications-by-user-page/${idUser}/${numberNotfiction}`);

  }


  updateEtatNotificationToShowed(idNotification: String | undefined) {
    return this.http.put(`/api/v1/update-etat-notfication/${idNotification}`, {headers: this.getHeadres()})
  }


  createDocument(idCustomer: string, fromData: FormData) {


    return this.http.post(environment.apiBaseUrl + `/api/v1/add-document-to-customer/${idCustomer}`, fromData)
  }


  downloadFileOfDocument(id: number): Observable<Blob> {

    // @ts-ignore
    return this.http.get(environment.apiBaseUrl + `/api/v1/getFilDocument/${id}`, {responseType: 'blob'});
  }

  deleteDocument(idDoc: number) {
    return this.http.delete(`/api/v1/delete-document/${idDoc}`,
      {headers: this.getHeadres()})
  }

  sendNotficationForUpdatingProfile(customer: UserDto, nameFeild: string, updatedFeild: any, previousValue: any) {
    return this.http.post(environment.apiBaseUrl + `/api/v1/send-updated-feild-to-reciver/${nameFeild}/${updatedFeild}/${previousValue}`, customer)
  }


  getTrancheById(idTranche?: number) {
    return this.http.get(
      environment.apiBaseUrl + `/api/v1/tranche/${idTranche}`, {headers: this.getHeadres()}
    );
  }

  payTrancheProject(idTranche: any, idTask: any, idUser: any) {
    return this.http.post(environment.apiBaseUrl + `/api/v1/payTrancheProjectProject/${idTranche}/${idTask}/${idUser}`, {headers: this.getHeadres()})
  }

  addStatementOfWorkToTranchefromData(fromData: FormData, idTranche: number) {
    return this.http.post(environment.apiBaseUrl + `/api/v1/addStatementOfWorkToTranche/${idTranche}`, fromData, {headers: this.getHeadres()})
  }

  getFactureOfPaymentTranche(id: number): Observable<Blob> {
    // @ts-ignore
    return this.http.get(environment.apiBaseUrl + `/api/v1/downloadFileOfTranchePayment/${id}`, {responseType: 'blob'});
  }


  downloadFileOfPayment(id: number): Observable<Blob> {

    // @ts-ignore
    return this.http.get(environment.apiBaseUrl + `/api/v1/downloadFileOfTranchePayment/${id}`, {responseType: 'blob'});
  }


  getDocumentsByUser(idUser: string) {
    return this.http.get<DocumentUser[]>(environment.apiBaseUrl + `/api/v1/list-document-by-custommer/${idUser}`);

  }


  getAllProjectByCustomer(idCustomer?: string) {

    if (this.userStoreService.getToken() === null) {
      return this.http.get<Project[]>(environment.apiBaseUrl + `/api/v1/all-projects-by-customer/${idCustomer}`);
    } else {
      return this.http.get<Project[]>(environment.apiBaseUrl + `/api/v1/all-projects-by-customer/${idCustomer}`, {headers: this.getHeadres()});
    }
  }


  getAllTrancheByProject(idProject?: string) {

    if (this.userStoreService.getToken() === null) {
      return this.http.get<TranchePayment[]>(environment.apiBaseUrl + `/api/v1/all-tranche-by-project/${idProject}`);
    } else {
      return this.http.get<TranchePayment[]>(environment.apiBaseUrl + `/api/v1/all-tranche-by-project/${idProject}`, {headers: this.getHeadres()});
    }
  }


}
