import {Page, NavController} from 'ionic-angular';
import {SpeakerService} from '../services/SpeakerService';
import {SpeakerDetailPage} from '../speaker-details/speaker-details';


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
  	this.year = 2016;  // TODO: Buscar como cambiar el año
  	this.speakerService = speakerService;
  }

  ngOnInit(){
  	this.speakerService.list(this.year).subscribe(
      data => {this.speakers = data;},
  	  err => {console.log(err)},
  	  () => console.log('Carga completada')
	);
  }

  itemTapped(event, speaker){
	this.nav.push(SpeakerDetailPage, {speaker: speaker});
  }
}
