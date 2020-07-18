import { Component, OnInit } from '@angular/core';
import { ItemDeLista } from 'src/app/interfaces/list-type';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'pokemon-selector',
  templateUrl: './pokemon-selector.component.html',
  styleUrls: ['./pokemon-selector.component.css']
})
export class PokemonSelectorComponent implements OnInit {

  carregandoTipo:boolean = false;
  carregandoPokemon:boolean = false;

  tipos:ItemDeLista[];
  pokemons:ItemDeLista[];

  tipoSelecionado:ItemDeLista = undefined;
  pokemonSelecionado:ItemDeLista = undefined;

  constructor(private pokemonService: PokemonService) { }

  ngOnInit(): void {
    this.carregandoTipo = true;
    this.pokemonService.getListaTipos().then((typeList: ItemDeLista[]) => {
      this.tipos = typeList;
      this.carregandoTipo = false;
    });
  }

  selecionarTipo(tipo:ItemDeLista) {
    console.log('selecionou tipo: ' + tipo.name);
    this.carregandoPokemon = true;
    this.pokemonService.getListaPokemon(tipo).then((listaPokemon: ItemDeLista[]) => {
      this.pokemons = listaPokemon;
      this.carregandoPokemon = false;
    });
  }

  selecionarPokemon(pokemon:ItemDeLista) {
    console.log('selecionou pokemon: ' + pokemon.name);
  }
}
