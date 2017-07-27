import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class CardService {

	options;
	domain = 'http://localhost:8000/api';
	constructor(private http: Http) { }

	createHeaders(){
		const headers = new Headers();
		headers.append('Content-Type', 'application/json');
		this.options = new RequestOptions({headers: headers});
	}

	getAll(){
		this.createHeaders();
		return this.http.get(this.domain+'/getAll', this.options).map(res => res.json());
	}

}
