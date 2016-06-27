import {IonicApp, Page, NavController, NavParams} from 'ionic-angular';
import {SERVER_URL} from '../services/config';


@Page({
  templateUrl: 'build/pages/workshop-details/workshop-details.html'
})
export class WorkshopDetailsPage {
  static get parameters(){
  	return [[IonicApp], [NavController], [NavParams]];
  }

  constructor(app, nav, navParams) {
  	this.nav = nav;
  	this.workshop = navParams.get('workshop');
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
