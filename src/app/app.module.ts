import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpModule } from '@angular/http';
import { NativeStorage } from '@ionic-native/native-storage';


import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { DoacaoEdit } from '../pages/doacao/edit/edit';
import { DoacaoCreate } from '../pages/doacao/create/create';
import { LoginPage } from '../pages/login/login';
import { EventoPage } from '../pages/evento/evento';
import { DetailsPage } from '../pages/evento/details/details';
import { TabsPageOng } from '../pages/tabs-page-ong/tabs-page-ong';
import { HomePageOng } from '../pages/ong/home'

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { DoacaoProvider } from '../providers/doacao.provider';
import { UsuarioProvider } from '../providers/usuario.provider';
import { EventoProvider } from '../providers/evento.provider';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    DoacaoEdit,
    DoacaoCreate,
    LoginPage,
    EventoPage,
    DetailsPage,
    TabsPageOng,
    HomePageOng
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    DoacaoEdit,
    DoacaoCreate,
    LoginPage,
    EventoPage,
    DetailsPage,
    TabsPageOng,
    HomePageOng
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {
      provide: ErrorHandler, 
      useClass: IonicErrorHandler
    },
    NativeStorage,
    DoacaoProvider,
    UsuarioProvider,
    EventoProvider
  ]
})
export class AppModule {}
