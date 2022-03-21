import { Component, OnInit } from '@angular/core';
import {Subscription} from 'rxjs';
import {DhashboardService} from '../../service/dhashboard.service';
import {Contact} from '../../model/contact';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-contact-racine',
  templateUrl: './contact-racine.component.html',
  styleUrls: ['./contact-racine.component.scss']
})
export class ContactRacineComponent implements OnInit {
  subscription?: Subscription ;

  selectLang:any ="EN";
  contactForm: Contact = new Contact;

  constructor(private dashboardService:DhashboardService,private messageService: MessageService) {
    this.selectLang=localStorage.getItem('lang');
  }

  ngOnInit(): void {

    this.subscription = this.dashboardService.getLanguage().subscribe(res => {
      this.selectLang =res;


  })

}

  sendmail(){

    this.dashboardService.SendUserMail(this.contactForm).subscribe(
      (resp) => {
        console.log('reponse mail' + resp);
        this.showToast('success', 'Good Job', 'Your email was sended Successfully');
        this.clearForm();
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
  clearForm(){
    // for enumerable and non-enumerable of an object with proto chain
    var props = Object.getOwnPropertyNames(this.contactForm);
    for (var i = 0; i < props.length; i++) {
      // @ts-ignore
      delete this.contactForm[props[i]];
    }

// for enumerable properties of shallow/plain object
    for (var key in this.contactForm) {
      // this check can be safely omitted in modern JS engines
      // if (obj.hasOwnProperty(key))
      // @ts-ignore
      delete this.contactForm[key];
    }
  }
}
