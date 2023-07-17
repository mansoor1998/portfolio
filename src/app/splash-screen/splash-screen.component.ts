import {
  animate,
  AnimationBuilder,
  AnimationPlayer,
  keyframes,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';
import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {
  dashAnimationTime,
  fadeTextAnimationTime, scaleOutAnimationTime,
  splashAnimation,
  totalSplashAnimationDelay
} from 'src/shared/animation-time';


@Component({
  selector: 'app-splash-screen',
  templateUrl: './splash-screen.component.html',
  styleUrls: ['./splash-screen.component.css'],
  animations: [
    trigger('fade', [
      state('void', style({ opacity: '1' })),
      state('*', style({ opacity: '0' })),
      transition(':enter', [
        animate(`${splashAnimation}ms ${totalSplashAnimationDelay}ms ease-out`, style({ opacity: '0' }))
      ])
    ])
  ]
})
export class SplashScreenComponent implements OnInit {

  @ViewChild('svgElem', { static: true }) public svgElement!: ElementRef;
  @ViewChild('svgText', { static: true }) public svgText!: ElementRef;
  @ViewChild('svgPath', { static: true }) public svgPath!: ElementRef;

  @Output()
  public close: EventEmitter<void> = new EventEmitter<void>();

  constructor(private animationBuilder: AnimationBuilder, private elementRef: ElementRef) { }

  ngOnInit(): void {

    const dashAnimation = this.animationBuilder.build([
      animate(`${dashAnimationTime}ms ease-in-out`, keyframes([
        style({ 'fill-opacity': '0', 'stroke-dashoffset': '300', offset: 0 }),
        style({ 'fill-opacity': '1', 'stroke-dashoffset': '0', offset: 1 })
      ]))
    ]);

    const fadeTextAnimation =  this.animationBuilder.build([
      animate(`${fadeTextAnimationTime}ms ease-in-out`, keyframes([
        style({ 'opacity': '0', 'z-index': '999999999' }),
        style({ 'opacity': '1', 'z-index': '999999999' }),
      ]))
    ]);


    const scaleOutAnimation = this.animationBuilder.build([
        // animation delay, to keep the logo on screen
        animate(`${scaleOutAnimationTime}ms 200ms ease-in-out`, keyframes([
          style({ 'transform': 'translateX(-50%) translateY(-50%) scale(1)', offset: 0 }),
          style({ 'transform': 'translateX(-50%) translateY(-50%) scale(1.2)', offset: 0.25 }),
          style({ 'transform': 'translateX(-50%) translateY(-50%) scale(0)', offset: 1 })
        ]))
    ]);

    // animations played one after the other
    (async () => {
      await this.makeAnimation(dashAnimation.create(this.svgPath.nativeElement))
      await this.makeAnimation(fadeTextAnimation.create(this.svgText.nativeElement))
      await this.makeAnimation(scaleOutAnimation.create(this.svgElement.nativeElement))
    })()
  }

  async makeAnimation(player: AnimationPlayer): Promise<void> {
    return new Promise((res, rej) => {
      try{
        player.play()
        player.onDone(() => {
          res()
        })
      }catch(err){
        rej();
      }
    })
  }

}
