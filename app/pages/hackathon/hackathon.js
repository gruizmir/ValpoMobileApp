import {Page, NavController} from 'ionic-angular';
import {HackathonService} from '../services/HackathonService';
import {HackteamDetailsPage} from '../hackteam-details/hackteam-details';

@Page({
  templateUrl: 'build/pages/hackathon/hackathon.html',
  providers: [HackathonService]
})

export class HackathonPage {
  static get parameters(){
  	return [[NavController], [HackathonService]];
  }

  constructor(nav, hackathonService) {
  	this.year = 2016;  // Buscar como cambiar el año
  	this.nav = nav;
  	this.hackathonService = hackathonService;
  }

  ngOnInit(){
  	this.hackathonService.list(this.year).subscribe(
  		data => {this.sponsors = data; console.log(this.sponsors);},
  		err => {console.log(err)},
  		() => console.log('Carga completada')
	);
  }

  itemTapped(event, sponsor){
	this.nav.push(HackteamDetailsPage, {sponsor: sponsor});
  }
}
