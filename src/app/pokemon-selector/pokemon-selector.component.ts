import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'pokemon-selector',
  templateUrl: './pokemon-selector.component.html',
  styleUrls: ['./pokemon-selector.component.css']
})
export class PokemonSelectorComponent implements OnInit {

  tipos:any[] = [
    {
      nome: 'Grama'
    },
    {
      nome: 'Fogo'
    }
  ];

  pokemons:any[] = [
    {
      nome: 'Clefairy'
    },
    {
      nome: 'Bulbassauro'
    }
  ];

  tipoSelecionado:any = undefined;
  pokemonSelecionado:any = undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
