import { Component, OnInit, Input } from '@angular/core';
import { PokemonService } from '../services/pokemon.service';
import { ImagemPokemon } from '../definicoes/list-type';
import { Lado } from '../definicoes/enums';

@Component({
  selector: 'pokemon-picture',
  templateUrl: './pokemon-picture.component.html',
  styleUrls: ['./pokemon-picture.component.css']
})
export class PokemonPictureComponent implements OnInit {

  @Input('lado')
  ladoInput:string;

  lado:Lado;
  imagem:string = 'assets/temp_ditto.png';
  
  constructor(private pokemonService:PokemonService) { }

  ngOnInit(): void {
    if (this.ladoInput == undefined || (this.ladoInput != Lado.Direito && this.ladoInput != Lado.Esquerdo)) {
      console.error('Lado invalido no elemento pokemon-picture');
    }

    this.pokemonService.imagemObservable.subscribe(this.mudarImagem);
  }

  mudarImagem(novaImagem:ImagemPokemon):void {
    
  }
}
