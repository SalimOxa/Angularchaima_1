import {Component, OnInit, Input, ViewChild, ElementRef, AfterContentChecked, AfterViewChecked} from '@angular/core';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import {MessageChat} from '../../model/messageChat';
import {UserStoreService} from '../../../authentication/stores/user-store/user-store.service';
import {ProfileUserService} from '../../../profile-user/service/profile-user.service';
import {UserDto} from '../../../common/user-dto';
import {StompService} from '../../services/stomp.service';
import {NewBackOfficeService} from '../../../new-back-office/service/new-back-office.service';
import {ModelMessage} from '../../model/modelMessage';

@Component({
  selector: 'app-message-chat',
  templateUrl: './message-chat.component.html',
  styleUrls: ['./message-chat.component.scss']
})
export class MessageChatComponent implements OnInit, AfterViewChecked {
  // @ts-ignore
  @Input() idProjectFromParent: string;
  greetings: MessageChat[] = [];
  disabled = true;
  user: any;
  newmessage: string = '';
  messageChat: MessageChat = {}
  senderMessage: UserDto = {}
  socket = new SockJS('/websocket');
  stompClient = Stomp.over(this.socket);
  nameReceiver: string | undefined = ''
  showSpinner = false;
  numberMessageOnlist = 6;
  busyGettingData = false;
  lastlengthListMessage = 0;
  fisrtTest = false;
  numberIsNotSowed = 0;
  idReceiver: string | undefined = ''

  idProject = 0;
  @ViewChild('scrollMe') private myScrollContainer: ElementRef | undefined;

  constructor(private userStoreService: UserStoreService,
              private profileUserService: ProfileUserService, private stompService: StompService, private newBackOfficesService: NewBackOfficeService,) {
  }

  ngAfterViewChecked(): void {
    // this.scrollToBottom();
  }


  ngOnInit(): void {
    this.user = this.userStoreService.parseJWT();
    this.idProject = +this.idProjectFromParent;
    this.getMessages();
    this.getUser();
    this.connect();
    //  this.getProject()
    // this.scrollToBottom();


  }

  setConnected(connected: boolean) {
    this.disabled = !connected;

    if (connected) {
      this.greetings = [];
    }
  }

  getUser() {
    this.newBackOfficesService.getUser(this.user.sub).subscribe(res => {
      this.senderMessage = res;
      this.getProject();

    })
  }

  connect() {
    const _this = this;
    // @ts-ignore
    this.stompClient.connect({}, function (frame) {
      // @ts-ignore
      _this.stompClient.subscribe(`/topic/initial`, (message: MessageChat) => {
        // @ts-ignore
        _this.getMessages();
        // @ts-ignore
        _this.myScrollContainer.nativeElement.scrollTop = _this.myScrollContainer.nativeElement.scrollHeight;


      });
    });
  }

  getMessages() {
    const id = +this.idProjectFromParent
    this.stompService.getAllMessagesOfProject(id, this.numberMessageOnlist, this.user.sub).subscribe(res => {

      this.greetings = res.messages;
      this.numberIsNotSowed = res.totalMessageIsNotShowed
      console.log(this.greetings)
      this.busyGettingData = false;


    })
  }

  sendMessage() {
// @ts-ignore

    this.stompClient.send(
      `/app/resume/${this.idProjectFromParent}`,
      {},

      JSON.stringify({
        senderName: this.senderMessage.firstName,
        idReceiver: this.idReceiver,
        message: this.newmessage,
        date: new Date(),
        isShowed: false
      })
    );

    this.newmessage = '';

    // @ts-ignore
    this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;

  }


  displayChat() {
    this.numberIsNotSowed = 0;
    // @ts-ignore
    document.getElementsByClassName('chat-box')[0].style.display = 'block';
    this.stompService.putMessagesIsShowed(this.idProject, this.user.sub).subscribe(res => {
      this.getMessages();
    })
    this.scrollToBottom();
  }

  closeChat() {
    this.numberMessageOnlist = 6;
     this.numberIsNotSowed=0;
    // @ts-ignore
    document.getElementsByClassName('chat-box')[0].style.display = 'none';
    this.stompService.putMessagesIsShowed(this.idProject, this.user.sub).subscribe(res => {

    })

    this.scrollToBottom();

  }


  getProject() {
    this.profileUserService.getProjectById(+this.idProjectFromParent).subscribe(
      (resp) => {

        if (resp.idAdmin === this.senderMessage.id) {

          this.idReceiver = resp.idCustomer;
          this.nameReceiver = resp.nameCustomer
        } else {
          this.nameReceiver = resp.nameAdmin

          this.idReceiver = resp.idAdmin;
        }

      })
  }

  onScrollDown(ev: any) {

  }

  onScrollUp(ev: any) {

    if (this.busyGettingData) {
      return
    }
    this.busyGettingData = true
    console.log('scrolled up!', ev);
    this.showSpinner = true;
    this.lastlengthListMessage = this.greetings.length;
    this.numberMessageOnlist = this.numberMessageOnlist + 6;
    setTimeout(() => {
      this.showSpinner = false;
      this.getMessages();


    }, 2000);
  }


  scrollToBottom(): void {
    if (!this.fisrtTest) {
      console.log('hiii view !!!')
      try {
        // @ts-ignore
        this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
        this.fisrtTest = true;
      } catch (err) {
      }

    }

  }
}
