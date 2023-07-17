import { APP_INITIALIZER, Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SplashScreenComponent } from './splash-screen/splash-screen.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './layout/header/header.component';
import { appConfig, SharedModule } from '../shared/shared.module';
import { PlatformLocation } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {AbstractAppService, AppService} from "../shared/service/app.service";

function appInitializerFactory(injector: Injector) {
  return () => {
    return new Promise<boolean>((res, rej) => {
      injector.get(HttpClient).get('./assets/appconfig.json').toPromise().then((result) => {
        //@ts-ignore
        const { email, number, remoteUrl, appUrl } = result;
        appConfig.email = email;
        appConfig.number = number;
        appConfig.remoteUrl = remoteUrl;
        appConfig.appUrl = appUrl;
        res(true);
      }).catch((err) => {
        rej(false);
      });
    });
  }
}


@NgModule({
  declarations: [
    AppComponent,
    SplashScreenComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserAnimationsModule,
    SharedModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializerFactory,
      deps: [Injector, PlatformLocation],
      multi: true
    },
    {
      provide: AbstractAppService,
      // class implementing the interface.
      // upon using different class, the useClass key should have relevant reference to function.
      useClass: AppService
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
