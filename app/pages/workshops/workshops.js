import {Page, NavController} from 'ionic-angular';
import {WorkshopService} from '../services/WorkshopService';
import {WorkshopDetailsPage} from '../workshop-details/workshop-details';
import {SERVER_URL, DEFAULT_YEAR} from '../services/config';


@Page({
  templateUrl: 'build/pages/workshops/workshops-cards.html',
  providers: [WorkshopService]
})

export class WorkshopsPage {
  static get parameters() {
    return [[NavController], [WorkshopService]];
  }

  constructor(nav, workshopService) {
    this.nav = nav;
    this.year = DEFAULT_YEAR;  // TODO: Buscar como cambiar el año
    this.workshopService = workshopService;
  }

  ngOnInit(){
    this.workshopService.list(this.year).subscribe(
      data => {this.workshops = data; console.log(this.workshops);},
      err => {console.log(err)},
      () => console.log('Carga completada')
    );
  }

  itemTapped(workshop) {
    this.nav.push(WorkshopDetailsPage, {workshop: workshop});
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
