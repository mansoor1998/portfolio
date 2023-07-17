import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { appConfig } from "../shared.module";
import { map } from "rxjs/operators";


export class SanityModel<T> {
    public ms: number = 0;
    public query: string = '';
    public result: T[] = [];
}

// models
export class ProjectModel {
    title: string = '';
    description: string | string[] = '';
    image: string = '';
    created: string = '';
    techstack: string[] = [];
    githuburl: string = '';
    liveurl: string = '';
    featured: boolean = false;
}


export class ExperiencesModel {
    type: string = '';
    list: ExperienceModel[] = [];
}

export class ExperienceModel {
    public type: string = '';
    public profession: string = '';
    public company: string = '';
    public companyUrl: string = '';
    public intro: string | string[] = ''; // if a string is wrapped between [] (sq brackets), it would be considered as a link
    public from: string = '';
    public to: string = '';
    public responsibilites: string[] | string[][] = [];
}

export class IntroductionModel {
    public about: string[] | string[][] = [];
    public tech: string[] = [];
}

/**
 * The abstract class can be implemented with a child class to define the following functions
 */
export abstract class AbstractAppService {
  abstract getProjects(): Observable<SanityModel<ProjectModel>>
  abstract getExperience(): Observable<SanityModel<ExperiencesModel>>
  abstract getIntroduction(): Observable<SanityModel<IntroductionModel>>
}

/**
 * This class is used with Angular DI to get an instance of this service.
 * you can create another service with the following requirements
 *  - AbstractAppService is inherited/implemented
 *  - class is decorated with @Injectable decorator.
 *  - add the new class to the providers w.r.t AbstractAppService (an interface or abstract class)
 */
@Injectable()
export class AppService implements AbstractAppService {
    public url: string = appConfig.remoteUrl;
    public constructor(private http: HttpClient) {
    }

    // other project related object is returned.
    public getProjects(): Observable<SanityModel<ProjectModel>> {
        return this.http.get('assets/user/data.json').pipe(map(x => (x as any).projects)) as Observable<SanityModel<ProjectModel>>;
    }

    public getExperience(): Observable<SanityModel<ExperiencesModel>> {
        return this.http.get('assets/user/data.json').pipe(map(x => (x as any).experiences)) as Observable<SanityModel<ExperiencesModel>>;
    }

    public getIntroduction(): Observable<SanityModel<IntroductionModel>> {
        return this.http.get('assets/user/data.json').pipe(map(x => (x as any).introduction)) as Observable<SanityModel<IntroductionModel>>;
    }
}
