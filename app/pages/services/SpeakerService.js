import {Http} from '@angular/http';
import {API_URL} from './config';
import 'rxjs/add/operator/map';
import {Storage, SqlStorage} from 'ionic-angular';


// TODO: Búsqueda de datos de DataStorage
export class SpeakerService {
	static get parameters(){
		return [[Http]];
	}

	constructor(http){
		this.http = http;
		this.storage = new Storage(SqlStorage);
		this.initialize();
	}

	initialize() {
		// Crea la tabla en la base de datos si no existe.
		var query = `
			CREATE TABLE IF NOT EXISTS speakers (
				id INTEGER PRIMARY KEY AUTOINCREMENT, 
				name TEXT, 
				lastname TEXT,
				occupation TEXT,
				profile_picture TEXT,
				twitter TEXT,
				linkedin TEXT,
				title TEXT,
				description TEXT,
				updated TEXT
			)
		`;
        this.storage.query(query).then((data) => {
            console.log("TABLE CREATED -> " + JSON.stringify(data.res));
        }, (error) => {
            console.log("ERROR -> " + JSON.stringify(error.err));
        });
	}

	list(year){
		// Primero revisa si los datos del storage están actualizados.
		// V1: Si el usuario tiene conexión a internet, se descargan los datos.
		// Si no, se usa el SqlStorage

		if (this.connection_enabled()){
			var url = API_URL + 'speakers/?year=' + year;
			this.data = this.http.get(url).map(res => res.json());
			//this.save_to_db(this.data);
		}
		else {
			this.data = this.get_from_db();
		}
		return this.data;	
	}

	connection_enabled(){
		return true;
	}

	save_to_db(data){
		data = JSON.stringify(data);
		var query = `
			INSERT INTO speakers 
			(name, lastname, occupation, profile_picture, twitter, linkedin, title, description, updated) 
			VALUES 		
		`;
		var values = "('" + data.name + "', '" +
					 "'" + data.lastname + "', '" +
					 "'" + data.occupation + "', '" +
					 "'" + data.profile_picture + "', '" +
					 "'" + data.twitter + "', '" +
					 "'" + data.linkedin + "', '" +
					 "'" + data.title + "', '" +
					 "'" + data.description + "', '" +
					 "'" + data.updated + "')";
		console.log(values);
		query = query + values;
		console.log(query);
		this.storage.query(query)
			.then((result) => {
                console.log(JSON.stringify(result.res));
            }, (error) => {
                console.log("ERROR -> " + JSON.stringify(error.err));
            });
	}

	get_from_db() {
		this.storage.query("SELECT * FROM speakers")
			.then((data) =>	{
				this.data = [];
                if(data.res.rows.length > 0) {
                    for(var i = 0; i < data.res.rows.length; i++) {
                    	var temporal = {
                    		name: data.res.rows.item(i).name, 
                    		lastname: data.res.rows.item(i).lastname,
                    		occupation: data.res.rows.item(i).occupation,
                    		profile_picture: data.res.rows.item(i).profile_picture,
                    		twitter: data.res.rows.item(i).twitter,
                    		linkedin: data.res.rows.item(i).linkedin,
                    		title: data.res.rows.item(i).title,
                    		description: data.res.rows.item(i).description,
                    		updated: data.res.rows.item(i).updated
                		}
                        this.speakers.push(temporal);
                    }
                }
			}, (error) => {
                console.log("ERROR -> " + JSON.stringify(error.err));
            });
	}
}
