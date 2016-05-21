import {Page, NavController} from 'ionic-angular';
import {UpdateService} from '../services/UpdateService';


@Page({
  templateUrl: 'build/pages/updates/updates.html',
  providers: [UpdateService]
})

export class UpdatesPage {
  constructor() {

  }
}
