import { animate, AnimationBuilder, AnimationFactory, AnimationPlayer, query, stagger, state, style, transition, trigger } from '@angular/animations';
import { Directive, ElementRef, EventEmitter, HostListener, Injectable, Input, OnInit, Output, TemplateRef, ViewContainerRef } from '@angular/core';
import { listTrigger, listTriggerQuery } from '../animation';


function onScroll(element: HTMLElement) {
  const componentPosition = element.offsetTop;
  const scrollPosition = window.pageYOffset + window.innerHeight;
  return scrollPosition >= componentPosition + 150
}



@Directive({
  selector: '[scrollAnimation]'
})
export class ShowOnScrollDirective implements OnInit {

  // @Input('scrollAnimation') public name: string | undefined;
  public player: AnimationPlayer | undefined;
  @Input() public delay: number = 0;
  @Input() public scrollDisable: boolean = false;
  constructor(private builder: AnimationBuilder, private element: ElementRef<HTMLElement>) {
  }

  ngOnInit(): void {
    this.player = this.builder.build([
      state('void', style({ opacity: 0 })),
      style({ opacity: 0, transform: 'translateY(30px)' }),
      animate(`400ms ${this.delay}ms cubic-bezier(0.35, 0, 0.25, 1)`, style({ opacity: 1, transform: 'translateX(0)' }))
    ]).create(this.element.nativeElement);
    this.player.init();

    this.onScroll();

    this.player.onDone(() => {
      this.player?.destroy();
    });
  }

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    if (this.scrollDisable || onScroll(this.element.nativeElement)) {
      try {
        this.player?.play();
      } catch (e) { }
    }
  }

}






/**
 * Content is going to be loaded only when it is appeared in a window screen.
 */
@Directive({ selector: '[appearOnScroll]' })
export class ScrollAppearenceDirective {
  private hasView = false;

  public element: HTMLElement | undefined;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef) { }

  @Input() set appearOnScroll(condition: HTMLElement) {
    if (condition) {
      this.viewContainer.clear();
      this.hasView = false;
    }
    this.element = condition;
  }

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    if (this.hasView) return;
    if (onScroll(this.element!)) {
      try {
        // this.onAppearence.emit();
        this.viewContainer.createEmbeddedView(this.templateRef);
        this.hasView = true;
      } catch (e) { }
    }
  }
}