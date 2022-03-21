import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { splashAnimation, splashAnimationDelay } from 'src/shared/animation-time';


@Component({
  selector: 'app-splash-screen',
  templateUrl: './splash-screen.component.html',
  styleUrls: ['./splash-screen.component.css'],
  animations: [
    trigger('fade', [
      state('void', style({ opacity: '1' })),
      state('*', style({ opacity: '0' })),
      transition(':enter', [
        animate(`${splashAnimation}ms ${splashAnimationDelay}ms ease-out`, style({ opacity: '0' }))
      ])
    ])
  ]
})
export class SplashScreenComponent implements OnInit {

  @Output()
  public close: EventEmitter<void> = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

}
