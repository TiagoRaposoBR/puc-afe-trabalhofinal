import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { PokemonSelectorComponent } from './pokemon-selector/pokemon-selector.component';
import { PokemonPictureComponent } from './pokemon-picture/pokemon-picture.component';
import { PokemonResultComponent } from './pokemon-result/pokemon-result.component';

@NgModule({
  declarations: [
    AppComponent,
    PokemonSelectorComponent,
    PokemonPictureComponent,
    PokemonResultComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
