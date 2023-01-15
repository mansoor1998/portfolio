import { animate, AnimationBuilder, AnimationPlayer, query, stagger, state, style, transition, trigger } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, HostListener, ViewChild, ViewEncapsulation } from '@angular/core';
import { Observable, of } from 'rxjs';
import { fadeTrigger, listTrigger, listTriggerQuery } from 'src/shared/animation';
import { navlistAnimation, totalSplashAnimationDelay } from 'src/shared/animation-time';

import { map, filter, tap, delay } from 'rxjs/operators'
import { ProjectModel, AppService, IntroductionModel, SanityModel, ExperienceModel, ExperiencesModel } from 'src/shared/service/app.service';
import { appConfig } from 'src/shared/shared.module';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  animations: [
    // trigger('fade', [
    //   state('void', style({ 'margin-top': '10px', opacity: '0' })),
    //   state('*', style({ 'margin-top': '0px', opacity: '1' })),
    //   transition(':enter', [
    //     animate('0.3s ease-out', style({ opacity: '1', 'margin-top': '0px' }))
    //   ])
    // ]),
    fadeTrigger('fade'),
    fadeTrigger('content', totalSplashAnimationDelay + navlistAnimation * 3 + 400),
    listTrigger('30px', totalSplashAnimationDelay + navlistAnimation * 3),
    trigger('listAnimation', [
      transition('* => *', [ // each time the binding value changes
        query(':enter', [
          style({ opacity: 0, transform: `translateY(${'30px'})` }),
          stagger(100, [
            animate(`${300}ms ${0}ms cubic-bezier(0.35, 0, 0.25, 1)`,
              style({ opacity: 1, transform: 'none' }))
          ])
        ], { optional: true })
      ])
    ])
  ]
})
export class AppComponent {
  public appUrl: string = appConfig.appUrl;

  public initP = 6;
  public p = this.initP;

  public random: boolean = false;
  //@ts-ignore
  // public data: { description: string, title: string }[] = [];
  public projects: Observable<ProjectModel[]> | undefined;
  public introduction: Observable<IntroductionModel> | undefined;
  public experiences: Observable<ExperiencesModel[]> | undefined;

  public strArr: string[] = [];

  public splashVisible = true;
  public player: AnimationPlayer | undefined;
  public animationDone = false;

  public show = false;
  @ViewChild('otherProjects') otherproject: ElementRef<HTMLElement> | undefined;
  constructor(private builder: AnimationBuilder, private http: HttpClient, private ref: ChangeDetectorRef, private appService: AppService) { }
  ngOnInit() {
    document.body.style.overflowY = 'hidden';
    setTimeout(() => { document.body.style.overflowY = 'scroll' }, totalSplashAnimationDelay);

    this.projects = this.appService.getProjects()
      .pipe(map(x => {
        let a = x.result.map(item => {
          item.description = this.splitLinks(item.description as string);
          return item;
        });
        console.log(a);
        return a;
      }));

    this.introduction = this.appService.getIntroduction()
      .pipe(map(x => {
        let r = x.result.length > 0 ? x.result[0] : {} as IntroductionModel;
        r.about = r.about.map(item => this.splitLinks(item as string));
        return r;
      }));

    this.experiences = this.appService.getExperience()
      .pipe(map(x => {
        let result = x.result;
        result = result.map(ex => {
          ex.list! = ex.list.map(item => {
            item.responsibilites = item.responsibilites.map(x => {
              return this.splitLinks(x as string)
            });
            return item;
          });
          return ex;
        });
        return result;
      }));

  }
  ngAfterViewInit() {
    this.player?.onDone(() => { this.player?.destroy() })
  }

  // seperate hyperlinks from paragraph and form an array. included patterns [text:hyperlink]
  public splitLinks(text: string) {
    let matches = text.match(/\[[\d\w;:\/\.-\s]*\]/g);
    let splits = text.split(/\[[\d\w;:\/\.-\s]*\]/);
    if (!matches) return [text];
    for (let i = 0; i < splits.length; i += 2) {
      splits.splice(i + 1, 0, (matches && matches[i / 2]) ? matches[i / 2] : '')
    }

    return splits;

    // while ((match = split[text.].match(/\[.*\]/)?.find(x => true, match))) {
    //   split = text.split(/\[.*\]/);
    //   split.splice(split?.length - 1, 0, match);
    // }

    // return split;

    // const result = [''];
    // for (let word of split) {
    //   if (this.isHyperLink(word)) {
    //     result.push(word);
    //     result.push(' ');
    //     continue;
    //   }
    //   let text: string = word + ' ';
    //   result[result.length == 0 ? 0 : result.length - 1] += text;
    // }
    // return result;
  }

  public isHyperLink(text: string) {
    return /\[[\d\w;:\/\.-\s]*\]/.test(text);
  }

  toArr(param: any) { return param as [] }

  // split sq-brackets([]) from text-hyperlink
  split(a: string): string[] {
    return a.split(/[\[\]]/)[1].split(';');
  }

  public findIndex(list: [] | any, key: string) {
    return (list as []).findIndex(x => !x[key]);
  }

  openInNewTab(url: string) {
    window.open(url, '_blank')?.focus();
  }

  onScroll(element: HTMLElement) {
    const componentPosition = element.offsetTop;
    const scrollPosition = window.pageYOffset + window.innerHeight;
    return scrollPosition >= componentPosition + 150
  }

  filterUnfeaturedItems(list: ProjectModel[]) {
    return list.filter(x => !x.featured);
  }


  // @HostListener('window:scroll', ['$event'])
  // onScroll() {
  //   if (this.animationDone) return;
  //   const componentPosition = this.otherproject?.nativeElement.offsetTop;
  //   const scrollPosition = window.pageYOffset + window.innerHeight;
  //   if (scrollPosition >= componentPosition! + 150) {
  //     this.show = true;
  //     // try {
  //     //   this.player?.play();
  //     //   this.animationDone = true;
  //     // } catch (e) { }
  //     // console.log('whos');
  //   }
  // }
}
