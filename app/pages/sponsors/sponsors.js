import {Page, NavController} from 'ionic-angular';
import {SponsorService} from '../services/SponsorService';
import {SERVER_URL, DEFAULT_YEAR} from '../services/config';

@Page({
  templateUrl: 'build/pages/sponsors/sponsors.html',
  providers: [SponsorService]
})

export class SponsorsPage {

  static get parameters(){
  	return [[NavController], [SponsorService]];
  }

  constructor(nav, sponsorService) {
  	this.year = DEFAULT_YEAR;  // Buscar como cambiar el año
  	this.nav = nav;
  	this.sponsorService = sponsorService;
  }

  ngOnInit(){
  	this.sponsorService.list(this.year).subscribe(
      data => {this.sponsors = data;},
  	  err => {console.log(err)},
  	  () => console.log('Carga completada')
	);
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
