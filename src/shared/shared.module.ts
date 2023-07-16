import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabComponent, TablistComponent } from './tablist/tablist.component';
import {ShowOnScrollDirective, ScrollAppearanceDirective} from './directive/show-on-scroll.directive';

export const appConfig = {
  email: '',
  number: '',
  remoteUrl: '',
  appUrl: ''
};


@NgModule({
  declarations: [
    TablistComponent,
    TabComponent,
    ShowOnScrollDirective,
    ScrollAppearanceDirective,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    TablistComponent,
    TabComponent,
    ShowOnScrollDirective,
    ScrollAppearanceDirective,
  ]
})
export class SharedModule { }
