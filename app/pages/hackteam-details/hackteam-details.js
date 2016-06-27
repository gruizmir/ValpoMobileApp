import {IonicApp, Page, NavController, NavParams} from 'ionic-angular';
import {SERVER_URL} from '../services/config';

@Page({
  templateUrl: 'build/pages/hackteam-details/hackteam-details.html'
})

export class HackteamDetailsPage {
  static get parameters(){
  	return [[IonicApp], [NavController], [NavParams]];
  }

  constructor(app, nav, navParams) {
  	this.nav = nav;
  	this.team = navParams.get('team');
  	console.log(this.speaker);
  }

  formatURL(url){
    if (url == null || !url){
      return '';
    }
    else if (!url.startsWith('http://') && !url.startsWith('https://') ){
      return SERVER_URL + url;
    }
    else {
      return url;
    }
  }
}
