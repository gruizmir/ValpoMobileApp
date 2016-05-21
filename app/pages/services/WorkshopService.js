import {Http} from '@angular/http';
import {API_URL} from './config';
import 'rxjs/add/operator/map';


// TODO: Búsqueda de datos de DataStorage

export class WorkshopService {

	static get parameters(){
		return [[Http]];
	}

	constructor(http){
		this.http = http;
	}

	list(year){
		// TODO: Buscar forma de dejar url de api como valor de proyecto
		var url = API_URL + 'workshops/?year=' + year;
		var response = this.http.get(url);
		console.log(response);
		this.response = response.map(res => res.json());
		return this.response;
	}
}
