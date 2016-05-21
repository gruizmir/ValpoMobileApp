import {Page, NavController, NavParams} from 'ionic-angular';


@Page({
  templateUrl: 'build/pages/workshops/workshops.html'
})
export class WorkshopsPage {
  static get parameters() {
    return [[NavController], [NavParams]];
  }

  constructor(nav, navParams) {
    this.nav = nav;

    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('workshop');

    this.workshops = [];
    for(let i = 1; i < 5; i++) {
      this.workshops.push({
        title: 'Item ' + i,
        note: 'This is item #' + i,        
      });
    }
  }

  itemTapped(event, workshop) {
    this.nav.push(WorkshopsPage, {
      workshop: workshop
    })
  }
}
