import { ApplicationRef, APP_INITIALIZER, Inject, Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SplashScreenComponent } from './splash-screen/splash-screen.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './layout/header/header.component';
import { appConfig, SharedModule } from '../shared/shared.module';
import { ShowOnScrollDirective } from '../shared/directive/show-on-scroll.directive';
import { CommonModule, PlatformLocation } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
// import { AppRoutingModule } from './app-routing.module';

function appInitializerFactory(injector: Injector, platformLocation: PlatformLocation) {
  return () => {
    return new Promise<boolean>((res, rej) => {
      injector.get(HttpClient).get('./assets/appconfig.json').toPromise().then((result) => {
        //@ts-ignore
        const { email, number, remoteUrl } = result;
        appConfig.email = email;
        appConfig.number = number;
        appConfig.remoteUrl = remoteUrl;
        res(true);
      }).catch(err => {
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
    // TablistComponent,
    // TabComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserAnimationsModule,
    SharedModule,
    HttpClientModule,
    // AppRoutingModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializerFactory,
      deps: [Injector, PlatformLocation],
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  // constructor(/*applicationRef: ApplicationRef*/) {
  //   // const originalTick = applicationRef.tick;

  //   // applicationRef.tick = function () {
  //   //   const windowPerformance = window.performance;
  //   //   const before = windowPerformance.now();
  //   //   const retValue = originalTick.call(this);
  //   //   const after = windowPerformance.now();
  //   //   const runTime = after - before
  //   //   console.log('Change detection run time : ', runTime);
  //   //   return retValue;
  //   // }
  // }
}
