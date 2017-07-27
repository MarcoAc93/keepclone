import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MdCardModule, MdMenuModule, MdToolbarModule, MdIconModule, MdInputModule } from '@angular/material';

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
		HttpModule
	],
	providers: [CardService],
	bootstrap: [AppComponent]
})
export class AppModule { }
