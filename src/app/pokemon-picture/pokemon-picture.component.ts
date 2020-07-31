import { Component, OnInit, Input } from '@angular/core';
import { PokemonService } from '../services/pokemon.service';
import { Lado } from '../definicoes/enums';
import { InfoDePokemon } from '../definicoes/list-type';

@Component({
  selector: 'pokemon-picture',
  templateUrl: './pokemon-picture.component.html',
  styleUrls: ['./pokemon-picture.component.css']
})
export class PokemonPictureComponent implements OnInit {

  @Input('lado')
  lado:Lado;

  imagem:string = 'assets/vazio.png';
  
  constructor(private pokemonService:PokemonService) { }

  ngOnInit(): void {
    if (this.lado == undefined || (this.lado != Lado.Direito && this.lado != Lado.Esquerdo)) {
      console.error('Lado invalido no elemento pokemon-picture');
    }

    this.pokemonService.pokemonObservable[this.lado].subscribe((novoPokemon) => this.mudarImagem(novoPokemon));
  }

  mudarImagem(infoPokemon:InfoDePokemon):void {
    if (infoPokemon != undefined){
      this.imagem = infoPokemon.sprites.front_default;
    }
  }
}
