import {Injectable} from '@angular/core';

import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
import {Observable, Subject} from 'rxjs';
import {TaskDto} from '../../common/Task';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {UserStoreService} from '../../authentication/stores/user-store/user-store.service';
import {MessageChat} from '../model/messageChat';
import {ModelMessage} from '../model/modelMessage';


@Injectable({
  providedIn: 'root',
})
export class StompService {
  constructor(private http: HttpClient, private userStoreService: UserStoreService) {

  }


  private subjectRefrechPage = new Subject<string>();
  payload: string = ''

  sendName(name: string | undefined) {
    this.subjectRefrechPage.next(name);
  }

  getName(): Observable<string> {
    return this.subjectRefrechPage.asObservable();
  }

  getHeadres() {
    return new HttpHeaders({authorization: 'Bearer ' + this.userStoreService.getToken()});
  }

  socket = new SockJS('/sba-websocket');
  stompClient = Stomp.over(this.socket);

  subscribe(topic: string, callback: any): void {


    const connected: boolean = this.stompClient.connected;

    if (connected) {
      this.subscribeToTopic(topic, callback);

      return;
    }


    // If stomp client is not connected connect and subscribe to topic

    this.stompClient.connect({}, (): any => {
      this.subscribeToTopic(topic, callback);

    });
  }

  private subscribeToTopic(topic: string, callback: any): void {

    // @ts-ignore
    this.stompClient.subscribe(topic, (response): any => {

      callback(response);

      this.payload = response.body
      this.sendName(this.payload)
    });


  }


  getAllMessagesOfProject(idProject?: number, numberMessage?: number, idSender?: string) {
    return this.http.get<ModelMessage>(
      environment.apiBaseUrl + `/api/v1/all-message/${idProject}/${numberMessage}/${idSender}`, {headers: this.getHeadres()}
    );
  }

  putMessagesIsShowed(idProject: number, idUser: string) {
    return this.http.put(environment.apiBaseUrl + `/api/v1/all-message-is-showed/${idProject}/${idUser}`, {headers: this.getHeadres()})
  }

}
