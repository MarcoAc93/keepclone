import { Component, OnInit } from '@angular/core';
import { MdCardModule, MdInputModule } from '@angular/material';
import { CardService } from '../../services/card.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

	cards;
	constructor(private cardService: CardService) { }

	ngOnInit() {
		this.cardService.getAll().subscribe(cards =>{
			this.cards = cards.data;
		});
	}
}
