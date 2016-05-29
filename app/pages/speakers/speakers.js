import {Page, NavController} from 'ionic-angular';
import {SpeakerService} from '../services/SpeakerService';
import {SpeakerDetailsPage} from '../speaker-details/speaker-details';
import {SERVER_URL, DEFAULT_YEAR} from '../services/config';


@Page({
  templateUrl: 'build/pages/speakers/speakers.html',
  providers: [SpeakerService]
})

export class SpeakersPage {
  static get parameters(){
  	return [[NavController], [SpeakerService]];
  }

  constructor(nav, speakerService) {
  	this.nav = nav;
  	this.year = DEFAULT_YEAR;  // TODO: Buscar como cambiar el año
  	this.speakerService = speakerService;
  }

  ngOnInit(){
  	this.speakerService.list(this.year).subscribe(
      data => {this.speakers = data;},
  	  err => {console.log(err)},
  	  () => console.log('Carga completada')
	);
  }

  itemSelected(speaker){
    this.nav.push(SpeakerDetailsPage, {speaker: speaker});
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
