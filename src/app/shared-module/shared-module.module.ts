import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoaderComponent} from './components/loader/loader.component';
import {MessageChatComponent} from './components/message-chat/message-chat.component';
import {FormsModule} from '@angular/forms';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {BadgeModule} from 'primeng/badge';


@NgModule({
  declarations: [
    LoaderComponent,
    MessageChatComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    InfiniteScrollModule,
    ProgressSpinnerModule,
    BadgeModule
  ],
  exports: [
    LoaderComponent,
    MessageChatComponent

  ],
})
export class SharedModuleModule {
}
