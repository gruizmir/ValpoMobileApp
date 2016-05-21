import {Page, NavController} from 'ionic-angular';
import {SponsorService} from '../services/SponsorService';


@Page({
  templateUrl: 'build/pages/sponsors/sponsors.html',
  providers: [SponsorService]
})

export class SponsorsPage {
  static get parameters(){
  	return [[NavController], [SponsorService]];
  }

  constructor(nav, sponsorService) {
  	this.year = 2016;  // Buscar como cambiar el año
  	this.nav = nav;
  	this.sponsorService = sponsorService;
  }

  ngOnInit(){
  	this.sponsorService.list(this.year).subscribe(
  		data => {this.sponsors = data; console.log(this.sponsors);},
  		err => {console.log(err)},
  		() => console.log('Carga completada')
	);
  }
}
