import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { appConfig } from "../shared.module";


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

// /\s\[.*\]\s/ - regular expression for it


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

export abstract class AbstractAppService {
  abstract getProjects(): Observable<SanityModel<ProjectModel>>
  abstract getExperience(): Observable<SanityModel<ExperiencesModel>>
  abstract getIntroduction(): Observable<SanityModel<IntroductionModel>>
}

// services
@Injectable(/*{
    providedIn: 'root'
}*/)
export class AppService implements AbstractAppService {
    public url: string = appConfig.remoteUrl;
    public constructor(private http: HttpClient) {
    }

    // other project related object is returned.
    public getProjects(): Observable<SanityModel<ProjectModel>> {
        return this.http.get(`${this.url}/v2021-10-21/data/query/production?query=*%5B_type%20%3D%3D%20'project'%20%26%26%20!(_id%20in%20path(%22drafts.**%22))%20%26%26%20display%20!%3D%20false%5D%0A%7B%0A%20%20_id%2C%0A%20%20_updatedAt%2C%0A%20%20created%2C%0A%20%20description%2C%0A%20%20featured%2C%0A%20%20githuburl%2C%0A%20%20liveurl%2C%0A%20%20techstack%2C%0A%20%20title%2C%0A%20%20%22image%22%3A%20image.asset-%3Eurl%2C%0A%20%20display%0A%7D%20%7C%20order(featured%20desc)`) as Observable<SanityModel<ProjectModel>>;
    }

    public getExperience(): Observable<SanityModel<ExperiencesModel>> {
        return this.http.get(`${this.url}/v2021-10-21/data/query/production?query=*%5B_type%20%3D%3D%20'experiences'%20%26%26%20!(_id%20in%20path(%22drafts.**%22))%5D%0A%7C%20order(_createdAt)`) as Observable<SanityModel<ExperiencesModel>>;
    }

    public getIntroduction(): Observable<SanityModel<IntroductionModel>> {
        return this.http.get(`${this.url}/v2021-10-21/data/query/production?query=*%5B_type%20%3D%3D%20'introduction'%20%26%26%20!(_id%20in%20path(%22drafts.**%22))%5D`) as Observable<SanityModel<IntroductionModel>>;
    }
}
