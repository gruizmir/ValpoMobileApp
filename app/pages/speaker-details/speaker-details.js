import {IonicApp, Page, NavController, NavParams} from 'ionic-angular';


@Page({
  templateUrl: 'build/pages/speaker-details/speaker-details.html'
})

export class SpeakerDetailsPage {
  static get parameters(){
  	return [[IonicApp], [NavController], [NavParams]];
  }

  constructor(app, nav, navParams) {
  	this.nav = nav;
  	this.speaker = navParams.get('speaker');
  	console.log(this.speaker);
  }
}
