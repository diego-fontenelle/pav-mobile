import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePageOng } from '../ong/home';
import { EventoPage } from '../evento/evento';

@Component({
  templateUrl: 'tabs-page-ong.html'
})
export class TabsPageOng {

  tab1Root = HomePageOng;
  tab2Root = EventoPage;
  tab3Root = ContactPage;

  constructor() {

  }
}
