import {Page, NavController} from 'ionic-angular';
import {WorkshopService} from '../services/WorkshopService';
import {WorkshopDetailsPage} from '../workshop-details/workshop-details';


@Page({
  templateUrl: 'build/pages/workshops/workshops.html',
  providers: [WorkshopService]
})

export class WorkshopsPage {
  static get parameters() {
    return [[NavController], [WorkshopService]];
  }

  constructor(nav, workshopService) {
    this.nav = nav;
    this.year = 2016;  // TODO: Buscar como cambiar el año
    this.workshopService = workshopService;
  }

  ngOnInit(){
    this.workshopService.list(this.year).subscribe(
      data => {this.workshops = data; console.log(this.workshops);},
      err => {console.log(err)},
      () => console.log('Carga completada')
    );
  }

  itemTapped(event, workshop) {
    this.nav.push(WorkshopDetailsPage, {workshop: workshop});
  }
}
