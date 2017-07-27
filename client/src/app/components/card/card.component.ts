import { Component, OnInit } from '@angular/core';
import { MdCardModule, MdButtonModule } from '@angular/material';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CardService } from '../../services/card.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

	cards;
	form: FormGroup;
	formSearch: FormGroup;
	processing = false;
	option = 1;
	idCard;
	constructor(private cardService: CardService, private formBuilder: FormBuilder) {
		this.createNewBlogForm();
	}

	ngOnInit() {
		this.cardService.getAll().subscribe(cards =>{
			this.cards = cards.data;
		});
	}



	createNewBlogForm(){
		this.form = this.formBuilder.group({
			titulo: ['', Validators.compose(
				[Validators.required, Validators.maxLength(30), Validators.minLength(5)]
			)],
			contenido: ['', Validators.compose(
				[Validators.required, Validators.maxLength(255), Validators.minLength(5)]
			)]
		});
		this.formSearch = this.formBuilder.group({
			buscar: ['', Validators.compose(
				[Validators.required, Validators.maxLength(30), Validators.minLength(5)]
			)]
		});
	}

	onSubmit(){
		const card = {
			titulo: this.form.get('titulo').value,
			contenido: this.form.get('contenido').value,
		}
		if (this.option == 1) {
			this.cardService.createCard(card).subscribe(card => {
				this.form.reset();
				this.cardService.getAll().subscribe(cards => {
					this.cards = [];
					this.cards = cards.data;
				});
			});
		} else if(this.option == 2){
			this.cardService.updateCard(this.idCard, card).subscribe(card => {
				this.form.reset();
				this.cardService.getAll().subscribe(cards => {
					this.cards = [];
					this.cards = cards.data;
					this.option = 1;
				})
			})
		}
	}

	edit(idCard){
		this.idCard = idCard;
		this.option = 2;
		this.form.reset();
		this.cardService.getOne(idCard).subscribe(card => {
			this.form.setValue({
				titulo: card.data.titulo,
				contenido: card.data.contenido
			});
		});
	}

	delete(idCard){
		this.cardService.deleteCard(idCard).subscribe(card => {
			this.cardService.getAll().subscribe(cards => {
				this.cards = [];
				this.cards = cards.data;
			});
		});
	}

	cancel(){
		this.option = 1;
		this.formSearch.reset();
		this.form.reset();
		this.cardService.getAll().subscribe(cards =>{
			this.cards = [];
			this.cards = cards.data;
		});
	}

	showFormSearch(){
		this.option = 4;
	}

	buscar(){
		var titulo = this.formSearch.get('buscar').value;
		this.cardService.getOneLike(titulo).subscribe(cards => {
			this.cards = [];
			this.cards = cards.data;
		})
	}
}
