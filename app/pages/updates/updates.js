import {Page, NavController} from 'ionic-angular';
import {UpdateService} from '../services/UpdateService';
import {SERVER_URL, DEFAULT_YEAR} from '../services/config';


@Page({
  templateUrl: 'build/pages/updates/updates.html',
  providers: [UpdateService]
})

export class UpdatesPage {
  static get parameters(){
    return [[NavController], [UpdateService]]
  }

  constructor(nav, updateService) {
    this.year = DEFAULT_YEAR;
    this.nav = nav;
    this.updateService = updateService;
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
