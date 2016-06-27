import {ViewChild} from '@angular/core';
import {App, Platform} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {WorkshopsPage} from './pages/workshops/workshops';
import {SpeakersPage} from './pages/speakers/speakers';
import {SponsorsPage} from './pages/sponsors/sponsors';
import {HackathonPage} from './pages/hackathon/hackathon';
import {UpdatesPage} from './pages/updates/updates';
import {WorkshopDetailsPage} from './pages/workshop-details/workshop-details';
import {SpeakerDetailsPage} from './pages/speaker-details/speaker-details';
import {HackteamDetailsPage} from './pages/hackteam-details/hackteam-details';


@App({
  templateUrl: 'build/app.html',
  config: {}, // http://ionicframework.com/docs/v2/api/config/Config/
  queries: {
    nav: new ViewChild('content')
  }
})
class MyApp {
  static get parameters() {
    return [[Platform]];
  }

  constructor(platform) {
    this.platform = platform;

    this.initializeApp();

    this.pages = [
      { title: 'VMC al día', component: UpdatesPage },
      { title: 'Expositores', component: SpeakersPage },
      { title: 'Talleres', component: WorkshopsPage },
      { title: 'Hackathon', component: HackathonPage },
      { title: 'Patrocinadores', component: SponsorsPage }
    ];

    this.rootPage = SpeakersPage;
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
