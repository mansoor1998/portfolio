import { trigger, transition, query, style, stagger, animate } from '@angular/animations';
// import { ThrowStmt } from '@angular/compiler';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, HostListener, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
import { listTrigger } from 'src/shared/animation';
import { totalSplashAnimationDelay } from 'src/shared/animation-time';
import { appConfig } from 'src/shared/shared.module';


// const animationDelay = `${3200 + 400}ms`;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    listTrigger('-30px', totalSplashAnimationDelay)
  ]
})
export class HeaderComponent implements OnInit {
  public appUrl: string = appConfig.appUrl;

  private navbarHeight: number = 0;
  private prevScrollpos = window.pageYOffset;
  private header: HTMLElement | undefined;
  public show = false;

  public toggleState: boolean = false;

  public menuItems: { name: string, number: string, link: string }[] = [
    {
      name: 'About',
      number: '01',
      link: '#about'
    },
    {
      name: 'Experience',
      number: '02',
      link: '#experience'
    },
    {
      name: 'Work',
      number: '03',
      link: '#work'
    },
    {
      name: 'Contact',
      number: '04',
      link: '#contact'
    }
  ]

  constructor(private element: ElementRef<HTMLElement>, private ref: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.header = this.element.nativeElement.children[0] as HTMLElement;
    this.navbarHeight = this.header.offsetHeight;

    // here prevscroll position is current scroll postion.
    this.show = (this.prevScrollpos > this.navbarHeight) ? true : false;
  }

  @HostListener('window:scroll', ['$event'])
  public onScroll(event: Event) {
    let currentScrollPos = window.pageYOffset;
    if (currentScrollPos > this.navbarHeight) {
      if (this.prevScrollpos > currentScrollPos) {
        this.header!.style.top = "0";
      } else {
        this.header!.style.top = `-${this.navbarHeight}px`;
      }
    }


    // scroll bar is on top
    // console.log(currentScrollPos, this.navbarHeight)
    this.show = (currentScrollPos > this.navbarHeight) ? true : false

    this.prevScrollpos = currentScrollPos;
  }

  closeNavbar() {
    setTimeout(() => { this.toggleState = false; this.ref.markForCheck() });
  }

}
