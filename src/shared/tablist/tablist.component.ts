import { trigger, state, style, transition, animate } from '@angular/animations';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChildren, ElementRef, HostListener, Input, NgModule, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';

let uniqueId = 0;

let animationTime = 300

@Component({
  selector: 'app-tab',
  template: `
    <div [@fade] class="tab p-2" *ngIf="show" style="color: var(--font-color)">
      <ng-content></ng-content>
    </div>
  `,
  styleUrls: ['./tablist.component.css'],
  animations: [
    trigger('fade', [
      state('void', style({ opacity: '0' })),
      state('*', style({ opacity: '1' })),
      transition(':enter', [
        animate(`${animationTime}ms ease-out`, style({ opacity: '1' }))
      ]),
    ])
  ]
})
export class TabComponent {
  @Input()
  public name: string | undefined;
  public show: boolean = false;
  public id: number = ++uniqueId;
}

@Component({
  selector: 'app-tablist',
  template: `
    <div class="parent">
      <div class="tab-list">
        <div [ngStyle]="{ top: top + 'px', left: left + 'px', bottom: 0, 
                          height: lineHeight + 'px', width: lineWidth + 'px'  }" class="line"></div>
        <ul>
          <li #list *ngFor="let b of buttons" [ngClass]="{ 'selected':  (b.show) }" (click)="onClick(b.id)">
            {{b.name}}      
          </li>
        </ul>
      </div>
      <div class="flex-grow-1">
        <ng-content select="app-tab"></ng-content>
      </div>
    </div>
  `,
  styleUrls: ['./tablist.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TablistComponent implements OnInit {

  // properties of a line.
  public top: number | undefined = 0;
  public left: number | undefined = 0;
  // public bottom: number | undefined = undefined;

  public lineHeight: number | undefined = 40; // default height of the line.
  public lineWidth: number | undefined = 1;// default width of the line.

  public largeSize = true; // by default we would consider the size of the screen to be large.

  @ContentChildren(TabComponent)
  _headers: QueryList<TabComponent> | undefined;

  @ViewChildren('list') list: QueryList<ElementRef<HTMLElement>> | undefined;

  public lineHeigt: number = 0;
  public buttons: TabComponent[] = [];

  constructor(private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
  }

  @HostListener('window:resize', ['$event'])
  onResize(event?: any) {
    if (event?.target?.innerWidth <= 600 || window.innerWidth <= 600) {
      if (!this.largeSize) return;
      this.setlinePos('Mobile');
      return;
    }
    if (this.largeSize) return;
    this.setlinePos('Desktop');
  }

  ngAfterContentInit() {
    this.buttons = this._headers?.map(item => item) as TabComponent[];
    this._headers!.first.show = true;
  }


  onClick(id: number) {
    this._headers?.forEach((item, i) => {
      let doShow = item.id === id;
      item.show = doShow;
      if (this.largeSize)
        this.top = (doShow) ? i * this.lineHeight! : this.top
      else {
        this.lineWidth = (doShow) ? this.list!.get(i)!.nativeElement.scrollWidth! : this.lineWidth;
        const [pos] = this.getListPos();
        this.left = (doShow) ? pos : this.left;
      }
    })
  }

  setlinePos(view: 'Mobile' | 'Desktop') {
    const [sum, index] = this.getListPos()

    switch (view) {
      case 'Mobile':
        setTimeout(() => {
          this.top = 0;
          this.left = 0;

          this.lineHeight = 1;

          this.left = sum;
          this.lineWidth = this.list!.get(index!)!.nativeElement.scrollWidth!;

          this.largeSize = false;

          this.cd.markForCheck();
        }, 100);
        break;
      case 'Desktop':
        // const [pos] = this.getListPos(view);
        this.top = 40 * index!;
        this.left = 0;

        this.lineHeight = 40;
        this.lineWidth = 1;

        this.largeSize = true;
        break;
      default:
        return;
    }
  }


  getListPos(view?: 'Mobile' | 'Desktop') {
    let index = this._headers?.toArray().findIndex(item => item.show); //((item) => item.show);
    let count = this._headers?.toArray().filter((e, i) => i < index!).length! - 1;
    let sum = 0;
    for (let i = 0; i <= count; i++) {
      // switch (view) {
      //   case 'Desktop':
      //     sum += this.list?.get(i)?.nativeElement.scrollHeight!;
      //     break;
      //   case 'Mobile':
      //   default:
      //     sum += this.list?.get(i)?.nativeElement.scrollWidth!;
      // }

      sum += this.list?.get(i)?.nativeElement.scrollWidth!;
    }
    return [sum, index];
  }
}


// @NgModule({
//   declarations: [
//     TablistComponent,
//     TabComponent
//   ]
// })
// export class TablistModule { }