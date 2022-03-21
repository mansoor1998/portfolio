import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabComponent, TablistComponent } from './tablist/tablist.component';
import { ShowOnScrollDirective, ScrollAppearenceDirective } from './directive/show-on-scroll.directive';
import { ParaComponent } from './components/para/para.component';

export const appConfig = {
  email: '',
  number: '',
  remoteUrl: ''
};


@NgModule({
  declarations: [
    TablistComponent,
    TabComponent,
    ShowOnScrollDirective,
    ScrollAppearenceDirective,
    ParaComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    TablistComponent,
    TabComponent,
    ShowOnScrollDirective,
    ScrollAppearenceDirective
  ]
})
export class SharedModule { }
