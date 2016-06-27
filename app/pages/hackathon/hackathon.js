import {Page, NavController} from 'ionic-angular';
import {HackathonService} from '../services/HackathonService';
import {HackteamDetailsPage} from '../hackteam-details/hackteam-details';
import {SERVER_URL, DEFAULT_YEAR} from '../services/config';

@Page({
  templateUrl: 'build/pages/hackathon/hackathon-cards.html',
  providers: [HackathonService]
})

export class HackathonPage {
  static get parameters(){
  	return [[NavController], [HackathonService]];
  }

  constructor(nav, hackathonService) {
  	this.year = DEFAULT_YEAR;  // Buscar como cambiar el año
  	this.nav = nav;
  	this.hackathonService = hackathonService;
  }

  ngOnInit(){
  	this.hackathonService.list(this.year).subscribe(
  		data => {this.hackteams = data;},
  		err => {console.log(err)},
  		() => console.log('Carga completada')
	  );
  }

  itemTapped(team){
    console.log(team.name);
	  this.nav.push(HackteamDetailsPage, {team: team});
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
