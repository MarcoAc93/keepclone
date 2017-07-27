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

	getOne(idCard){
		this.createHeaders();
		return this.http.get(this.domain+'/getOne/'+idCard, this.options).map(res => res.json());
	}

	getOneLike(titulo){
		this.createHeaders();
		return this.http.get(this.domain+'/getOneLike/'+titulo, this.options).map(res => res.json());
	}

	getAll(){
		this.createHeaders();
		return this.http.get(this.domain+'/getAll', this.options).map(res => res.json());
	}

	createCard(card){
		this.createHeaders();
		return this.http.post(this.domain+'/createCard', card, this.options).map(res => res.json());
	}

	updateCard(idCard, card){
		this.createHeaders();
		return this.http.put(this.domain+'/updateCard/'+idCard, card, this.options).map(res => res.json());
	}

	deleteCard(idCard){
		this.createHeaders();
		return this.http.delete(this.domain+'/deleteCard/'+idCard, this.options).map(res => res.json());
	}

}
