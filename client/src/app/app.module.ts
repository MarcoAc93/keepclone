import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MdCardModule, MdMenuModule, MdToolbarModule, MdIconModule, MdInputModule, MdButtonModule } from '@angular/material';

import { AppComponent } from './app.component';
import { CardComponent } from './components/card/card.component';

import { CardService } from './services/card.service';

@NgModule({
	declarations: [
		AppComponent,
		CardComponent
	],
	imports: [
		BrowserModule,
		MdCardModule,
		MdMenuModule,
		MdToolbarModule,
		MdIconModule,
		MdInputModule,
		MdButtonModule,
		HttpModule,
		FormsModule,
		ReactiveFormsModule
	],
	providers: [CardService],
	bootstrap: [AppComponent]
})
export class AppModule { }
