import { Component, OnInit, Input } from '@angular/core';
import { ItemDeLista, InfoDePokemon } from 'src/app/definicoes/list-type';
import { PokemonService } from 'src/app/services/pokemon.service';
import { Lado } from '../definicoes/enums';

@Component({
  selector: 'pokemon-selector',
  templateUrl: './pokemon-selector.component.html',
  styleUrls: ['./pokemon-selector.component.css']
})
export class PokemonSelectorComponent implements OnInit {

  @Input('lado')
  lado:Lado;

  carregandoTipo:boolean = false;
  carregandoPokemon:boolean = false;

  tipos:ItemDeLista[];
  pokemons:ItemDeLista[];

  tipoSelecionado:ItemDeLista = undefined;
  pokemonSelecionado:ItemDeLista = undefined;

  constructor(private pokemonService: PokemonService) { }

  ngOnInit(): void {
    if (this.lado == undefined || (this.lado != Lado.Direito && this.lado != Lado.Esquerdo)) {
      console.error('Lado invalido no elemento pokemon-selector');
    }
    
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
    this.pokemonService.getPokemon(pokemon).then((pokemonInfo: InfoDePokemon) => {
      this.pokemonService.pokemonObservable[this.lado].next(pokemonInfo);
    });
  }
}
