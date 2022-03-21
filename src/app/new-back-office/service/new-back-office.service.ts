import {Injectable} from '@angular/core';
import {UserDto} from '../../common/user-dto';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpEvent, HttpHeaders, HttpParams, HttpRequest} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {Service} from '../../shared-module/model/service';
import {Project} from '../../shared-module/model/project';
import {StatmentOfWork} from '../../shared-module/model/statmentOfWork';
import {CommentDto} from '../../common/comment-dto';
import {TaskDto} from '../../common/Task';
import {MailContentTask} from '../../common/mailContentTask-dto';
import {UserStoreService} from '../../authentication/stores/user-store/user-store.service';
import {NotficationUser} from '../../common/notficationUser';
import {TranchePayment} from '../../shared-module/model/tranchePayment';
import {Partner} from '../../shared-module/model/partner';
import {Model} from '../../shared-module/model/model';


@Injectable({
  providedIn: 'root'
})
export class NewBackOfficeService {

  private subject = new Subject<boolean>();

  constructor(private http: HttpClient, private userStoreService: UserStoreService) {
  }

  sendPayment(payment: boolean) {
    this.subject.next(payment);
  }

  getPayment(): Observable<boolean> {
    return this.subject.asObservable();
  }


  /************************gestion users***********************/

  register(user: UserDto) {
    return this.http.post(environment.apiBaseUrl + `/register`, user, {
      observe: 'response',
    });
  }

  getHeadres() {
    return new HttpHeaders({authorization: 'Bearer ' + this.userStoreService.getToken()});
  }

  createCustomerByAdmin(user: UserDto, idUser?: string) {
    if (this.userStoreService.getToken() === null) {
      return this.http.post(environment.apiBaseUrl + `/api/v1/new-user/${idUser}`, user)
    } else {
      return this.http.post(environment.apiBaseUrl + `/api/v1/new-user/${idUser}`, user, {headers: this.getHeadres()}
      );
    }
  }

  getAllUsers(idUser?: string) {
    if (this.userStoreService.getToken() === null) {
      return this.http.get<UserDto[]>(environment.apiBaseUrl + `/api/v1/all-users/${idUser}`);
    } else {
      return this.http.get<UserDto[]>(environment.apiBaseUrl + `/api/v1/all-users/${idUser}`, {headers: this.getHeadres()});
    }
  }


  getAdminsWithoutMaster() {
    if (this.userStoreService.getToken() === null) {
      return this.http.get<UserDto[]>(environment.apiBaseUrl + `/api/v1/admins-without-master`)
    } else {
      return this.http.get<UserDto[]>(environment.apiBaseUrl + `/api/v1/admins-without-master`, {headers: this.getHeadres()});
    }
  }

  enableAccountUser(id: string): Observable<any> {
    if (this.userStoreService.getToken() === null) {
      return this.http.put(environment.apiBaseUrl + `/api/v1/approve-account-user`, id);
    } else {
      return this.http.put(environment.apiBaseUrl + `/api/v1/approve-account-user`, id, {headers: this.getHeadres()});

    }
  }


  getUser(idUser?: string) {
    if (this.userStoreService.getToken() !== null) {
      return this.http.get<UserDto>(environment.apiBaseUrl + `/api/v1/user/${idUser}`, {headers: this.getHeadres()});
    } else {
      return this.http.get<UserDto>(environment.apiBaseUrl + `/api/v1/user/${idUser}`);

    }
  }

  getAllCustomers() {
    if (this.userStoreService.getToken() === null) {
      return this.http.get<UserDto[]>(environment.apiBaseUrl + `/api/v1/all-customers`);
    } else {
      return this.http.get<UserDto[]>(environment.apiBaseUrl + `/api/v1/all-customers`, {headers: this.getHeadres()});

    }
  }

  getAllMaster() {
    if (this.userStoreService.getToken() !== null) {
      return this.http.get<UserDto[]>(environment.apiBaseUrl + `/api/v1/all-master`, {headers: this.getHeadres()});
    } else {
      return this.http.get<UserDto[]>(environment.apiBaseUrl + `/api/v1/all-master`);
    }
  }


  deleteUser(idUser: string) {

    if (this.userStoreService.getToken() !== null) {
      return this.http.delete<string>(environment.apiBaseUrl + `/api/v1/deleteAccountUser/${idUser}`, {headers: this.getHeadres()})
    } else {
      return this.http.delete<string>(environment.apiBaseUrl + `/api/v1/deleteAccountUser/${idUser}`)

    }
  }

  deleteUserByAdmin(idUser?: string, idAdmin?: string) {
    if (this.userStoreService.getToken() !== null) {
      return this.http.delete<string>(environment.apiBaseUrl + `/api/v1/delete-user-by-admin/${idUser}/${idAdmin}`, {headers: this.getHeadres()})
    } else {
      return this.http.delete<string>(environment.apiBaseUrl + `/api/v1/delete-user-by-admin/${idUser}/${idAdmin}`)

    }
  }


  addAdminToMaster(idAdmin?: string, idMaster?: string) {
    if (this.userStoreService.getToken() !== null) {
      return this.http.put(environment.apiBaseUrl + `/api/v1/add-admin-to-master/${idAdmin}/${idMaster}`, {
        observe: 'response',
      }, {headers: this.getHeadres()})
    } else {
      return this.http.put(environment.apiBaseUrl + `/api/v1/add-admin-to-master/${idAdmin}/${idMaster}`, {
        observe: 'response',
      })
    }

  }


  /************************Files ***********************/

  SaveFolder(fromData: FormData) {
    return this.http.post(`/api/v1/uploadFiles`, fromData, {headers: this.getHeadres()})
  }

  listFiles(): Observable<StatmentOfWork[]> {
    return this.http.get<StatmentOfWork[]>(`/files`
    );
  }

  downloadFolder(id: number): Observable<Blob> {
    // @ts-ignore
    return this.http.get(environment.apiBaseUrl + `/api/v1/downloadFile/${id}`, {responseType: 'blob'});
  }

  downloadFile(id: number): Observable<Blob> {

    return this.http.get(environment.apiBaseUrl + `/api/v1/downloadFileTask/${id}`, {responseType: 'blob'});
  }

  /************************Notfication***********************/

  sendNotfication(idUser1: string | undefined, idUser2: string | undefined, notification: NotficationUser) {
    return this.http.post(environment.apiBaseUrl + `/api/v1/send-notfications-users/${idUser1}/${idUser2}`, notification)
  }


  sendNotficationForApproved(notification: NotficationUser, idUser: string) {
    return this.http.post(environment.apiBaseUrl + `/api/v1/approve-update-profile-customer/${idUser}`, notification)
  }


  /************************Tasks***********************/



  getAllTasksByProject(id: number) {
    if (this.userStoreService.getToken() !== null) {
      return this.http.get<TaskDto[]>(environment.apiBaseUrl + `/api/v1/getAllTaskProject/${id}`, {headers: this.getHeadres()});
    } else {
      return this.http.get<TaskDto[]>(environment.apiBaseUrl + `/api/v1/getAllTaskProject/${id}`);
    }
  }

  addTaskToProject(task: TaskDto, idProject: number, idEmmitor: string) {
    if (this.userStoreService.getToken() !== null) {
      return this.http.post(`/api/v1/addTaskToProject/${idProject}/${idEmmitor}`, task, {headers: this.getHeadres()})
    } else {
      // @ts-ignore
      return this.http.post(`/api/v1/addTaskToProject/${idProject}/${idEmmitor}`)

    }
  }

  enableTaskForUser(id: String, idEmmitor: string, idProject: number) {
    if (this.userStoreService.getToken() !== null) {
      return this.http.put(`/api/v1/enableTaskForUser/${idEmmitor}/${idProject}`, id, {headers: this.getHeadres()})
    } else {
      // @ts-ignore
      return this.http.put(`/api/v1/enableTaskForUser/${idEmmitor}`, id)
    }
  }

  deleteTask(idTask: string, idProduct: number, idUser: string) {
    if (this.userStoreService.getToken() !== null) {
      return this.http.delete<string>(`/api/v1/deleteTask/${idTask}/${idProduct}/${idUser}`, {headers: this.getHeadres()})
    } else {
      return this.http.delete<string>(`/api/v1/deleteTask/${idTask}/${idProduct}`)

    }
  }

  getAllCommentsByTasks(id: string) {
    if (this.userStoreService.getToken() !== null) {
      return this.http.get<CommentDto[]>(environment.apiBaseUrl + `/api/v1/getAllCommentByTaskProject/${id}`, {headers: this.getHeadres()});
    } else {
      return this.http.get<CommentDto[]>(environment.apiBaseUrl + `/api/v1/getAllCommentByTaskProject/${id}`);

    }
  }

  getMailContentBytask(idTask: string) {
    if (this.userStoreService.getToken() !== null) {
      return this.http.get<MailContentTask>(
        environment.apiBaseUrl + `/api/v1/getMailContentBytask/${idTask}`, {headers: this.getHeadres()});
    } else {
      return this.http.get<MailContentTask>(
        environment.apiBaseUrl + `/api/v1/getMailContentBytask/${idTask}`);
    }
  }

  /************************service***********************/

  uploadPhotoServices(service: Service): Observable<HttpEvent<{}>> {
    // @ts-ignore
    const req = new HttpRequest('POST', environment.apiBaseUrl + '/uploadPhoto', service, {
      reportProgress: true,
      responseType: 'text',
    });

    return this.http.request(req)
  }


  SaveService(fromData: FormData): Observable<any> {
    return this.http.post(environment.apiBaseUrl + `/api/v1/SaveService`, fromData, {headers: this.getHeadres()})
  }

  getAllServices() {
    return this.http.get<Service[]>(environment.apiBaseUrl + `/api/v1/services/all`);

  }

  getService(id: number) {
    return this.http.get<Service>(environment.apiBaseUrl + `/api/v1/getService/${id}`);

  }

  getFile(id: number) {
    return this.http.get(environment.apiBaseUrl + `/api/v1/statementOfWorkService/${id}`, {headers: this.getHeadres()}
    );
  }

  deleteService(id: number) {
    return this.http.delete<string>(environment.apiBaseUrl + `/api/v1/delete-service/${id}`, {headers: this.getHeadres()})
  }

  /************************Partenaire***********************/




  SavePartner(formData: FormData): Observable<any> {
    return this.http.post(environment.apiBaseUrl + `/api/v1/savePartner`, formData, {headers: this.getHeadres()})
  }

  getAllPartners() {
    return this.http.get<Partner[]>(environment.apiBaseUrl + `/api/v1/getAllPartners`, {headers: this.getHeadres()});
  }

  deletePartner(currentPartner: number) {
    return this.http.delete(environment.apiBaseUrl + `/api/v1/deletePartner/${currentPartner}`, {headers: this.getHeadres()});
  }

  getDashAllPartners() {
    return this.http.get<Partner[]>(environment.apiBaseUrl + `/api/v1/getAllPartners`);
  }


  /************************Project***********************/
  getAllProjectByMasterByPage({
                                idMaster,
                                numberPage,
                                sizePage,
                                nameProject,
                                nameCustomer,
                                nameAdmin
                              }: { idMaster?: string, numberPage?: number, sizePage?: number, nameProject: string, nameCustomer: string, nameAdmin: string }) {
    let params = new HttpParams()
      .set('numberPage', '' + numberPage)
      .set('sizePage', '' + sizePage)
      .set('nameProject', nameProject)
      .set('nameCustomer', nameCustomer)
      .set('nameAdmin', nameAdmin)

    if (this.userStoreService.getToken() === null) {
      return this.http.get<Model>(environment.apiBaseUrl + `/api/v1/all-projects-master-by-page/${idMaster}`, {params: params});
    } else {
      return this.http.get<Model>(environment.apiBaseUrl + `/api/v1/all-projects-master-by-page/${idMaster}`, {
        headers: this.getHeadres(),
        params: params
      });
    }
  }


  getAllProjectByAdminByPage({
                               idAdmin,
                               numberPage,
                               sizePage,
                               nameProject,
                               nameCustomer
                             }: { idAdmin?: string, numberPage?: number, sizePage?: number, nameProject: string, nameCustomer: string }) {
    let params = new HttpParams()
      .set('numberPage', '' + numberPage)
      .set('sizePage', '' + sizePage)
      .set('nameProject', nameProject)
      .set('nameCustomer', nameCustomer)

    if (this.userStoreService.getToken() === null) {
      return this.http.get<Model>(environment.apiBaseUrl + `/api/v1/all-projects-admin-by-page/${idAdmin}`, {params: params});
    } else {
      return this.http.get<Model>(environment.apiBaseUrl + `/api/v1/all-projects-admin-by-page/${idAdmin}`, {
        headers: this.getHeadres(),
        params: params
      });
    }
  }

  getAllProjectByMaster(idMaster: string) {
    if (this.userStoreService.getToken() !== null) {
      return this.http.get<Project[]>(environment.apiBaseUrl + `/api/v1/all-projects-by-master/${idMaster}`, {headers: this.getHeadres()});
    } else {
      return this.http.get<Project[]>(environment.apiBaseUrl + `/api/v1/all-projects-by-master/${idMaster}`);

    }
  }

  getAllProjectsWithoutAdmin() {
    return this.http.get<Project[]>(environment.apiBaseUrl + `/api/v1/projects-Without-admin`, {headers: this.getHeadres()});

  }


  deleteProjectFomList(idProject: number, idUser: string) {
    if (this.userStoreService.getToken() !== null) {
      return this.http.delete<string>(environment.apiBaseUrl + `/api/v1/delete-project-from-liste/${idProject}/${idUser}`, {headers: this.getHeadres()})
    } else {
      return this.http.delete<string>(environment.apiBaseUrl + `/api/v1/delete-project-from-liste/${idProject}/${idUser}`)

    }
  }

  createNewProjectByAdmin(idAdmin: string | undefined, idCustomer: string | undefined, project: Project) {

    return this.http.post(environment.apiBaseUrl + `/api/v1/new-project-admin/${idAdmin}/${idCustomer}`, project, {headers: this.getHeadres()})
  }

  createNewProjectByMaster(idMaster: string, idAdmin: string | undefined, idCustomer: string | undefined, project: Project) {

    return this.http.post(environment.apiBaseUrl + `/api/v1/new-project-master/${idMaster}/${idAdmin}/${idCustomer}`, project, {headers: this.getHeadres()})
  }

  addProjecToAdmin(idAdmin?: string, idProject?: number) {
    return this.http.put(environment.apiBaseUrl + `/api/v1/add-project/${idAdmin}/${idProject}`, {
      observe: 'response',
    }, {headers: this.getHeadres()})
  }


  deleteProject(idProject: any, idUser?: string) {
    if (this.userStoreService.getToken() !== null) {
      return this.http.delete(`/api/v1/delete-project/${idProject}/${idUser}`,
        {headers: this.getHeadres()})
    } else {
      return this.http.delete(`/api/v1/delete-project/${idProject}/${null}`
      )
    }
  }

  getProjectById(idProject?: number) {
    return this.http.get(
      environment.apiBaseUrl + `/api/v1/project/${idProject}`, {headers: this.getHeadres()}
    );
  }


  /************************Payment***********************/


  addStatementOfWorkToTranchefromData(fromData: FormData, idTranche: number) {
    return this.http.post(environment.apiBaseUrl + `/api/v1/addStatementOfWorkToTranche/${idTranche}`, fromData, {headers: this.getHeadres()})
  }

  addTrancheToPayForProject(tranche: TranchePayment, idProject: number, idUser: string) {
    return this.http.post(environment.apiBaseUrl + `/api/v1/addTrancheToPayForProject/${idProject}/${idUser}`, tranche)
  }

  addPriceToProject(idProject: number, price: number, idUser: string) {
    return this.http.put(environment.apiBaseUrl + `/api/v1/addPriceProject/${idProject}/${price}/${idUser}`, {headers: this.getHeadres()})
  }


  getTrancheById(idTranche?: number) {
    return this.http.get(
      environment.apiBaseUrl + `/api/v1/tranche/${idTranche}`, {headers: this.getHeadres()}
    );
  }

  payTrancheProject(idTranche: any, Idtask: any, idUser: string) {

    return this.http.post(environment.apiBaseUrl + `/api/v1/payTrancheProjectProject/${idTranche}/${Idtask}/${idUser}`, {headers: this.getHeadres()})
  }


  getNotficationsByUser(idUser: string) {
    return this.http.get<NotficationUser[]>(environment.apiBaseUrl + `/api/v1/notifications-by-user/${idUser}?page=0&size=10`);

  }

  getUnreadNotifactionsByUser(idUser?: string) {
    return this.http.get<NotficationUser[]>(
      environment.apiBaseUrl + `/api/v1/notifications-unread-by-user/${idUser}`, {headers: this.getHeadres()}
    );
  }

  showAllUnreadNotfication(idUser: string) {
    return this.http.put(environment.apiBaseUrl + `/api/v1/show-all-notfication-user/${idUser}`, {headers: this.getHeadres()})
  }

}

