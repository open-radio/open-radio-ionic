import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { SequencerPage } from '../pages/sequencer/sequencer';
import { LoopPage } from '../pages/loop/loop';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import {Plugins} from '../services/plugins.service';

import {
  CognitoUtil,
  UserLoginService,
  UserParametersService,
  UserRegistrationService
} from "../providers/cognito.service";
import {AwsUtil} from "../providers/aws.service";
import {
  LoginComponent,
  LogoutComponent,
  RegisterComponent,
  ConfirmRegistrationComponent,
  ResendCodeComponent,
  ForgotPasswordStep1Component,
  ForgotPasswordStep2Component
} from "../pages/auth/auth";
import {Storage} from "@ionic/storage";
import {EventsService} from "../providers/events.service";


@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    SequencerPage,
    LoopPage,
    ContactPage,
    HomePage,
    TabsPage,

    LoginComponent,
    LogoutComponent,
    RegisterComponent,
    ConfirmRegistrationComponent,
    ResendCodeComponent,
    ForgotPasswordStep1Component,
    ForgotPasswordStep2Component,
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    SequencerPage,
    LoopPage,
    ContactPage,
    HomePage,
    TabsPage,

    LoginComponent,
    LogoutComponent,
    RegisterComponent,
    ConfirmRegistrationComponent,
    ResendCodeComponent,
    ForgotPasswordStep1Component,
    ForgotPasswordStep2Component,
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler},
    Plugins,
    CognitoUtil,
    AwsUtil,
    UserLoginService,
    UserParametersService,
    UserRegistrationService,
    Storage,
    EventsService
    ]
})
export class AppModule {}
