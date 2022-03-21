import {Component, OnInit} from '@angular/core';
import * as AOS from 'aos';
import {ViewEncapsulation} from '@angular/core';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None

})
export class AppComponent implements  OnInit {
  title = 'racine-jcc';

  constructor() {

  }

  ngOnInit(): void {
 //   AOS.init();


AOS.init({
easing: 'ease-in-sine',
delay: 100,
// @ts-ignore
once : 'true',
})



}

}
