import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../services/pokemon.service';
import { InfoDePokemon, ItemDeLista, InfoDeTipo, InfoDeDano } from '../definicoes/list-type';
import { Lado } from '../definicoes/enums';

@Component({
  selector: 'pokemon-result',
  templateUrl: './pokemon-result.component.html',
  styleUrls: ['./pokemon-result.component.css']
})
export class PokemonResultComponent implements OnInit {

  efetivo:number = 0;
  pokemonEsquerdo:InfoDePokemon;
  pokemonDireito:InfoDePokemon;
  pokemonEsquerdoDamages:InfoDeDano[];
  pokemonDireitoDamages:InfoDeDano[];

  constructor(private pokemonService:PokemonService) { }

  ngOnInit(): void {
    this.pokemonEsquerdoDamages = [];
    this.pokemonDireitoDamages = [];
    let that = this;

    this.pokemonService.pokemonObservable[Lado.Direito].subscribe((novoPokemon) => {
      this.atualizarPokemon(novoPokemon, this.pokemonDireito, this.pokemonDireitoDamages).then(() => {
        this.batalhaPokemon();
      });
    });

    this.pokemonService.pokemonObservable[Lado.Esquerdo].subscribe((novoPokemon) => {
      this.atualizarPokemon(novoPokemon, this.pokemonEsquerdo, this.pokemonEsquerdoDamages).then(() => {
        this.batalhaPokemon();
      });
    });
  }

  batalhaPokemon() {
    if (this.pokemonEsquerdo != undefined && this.pokemonDireito != undefined) {
      this.pokemonEsquerdoDamages.forEach((damage:InfoDeDano) => {
        this.compararDano(damage.double_damage_from, this.pokemonDireito, 2);
        this.compararDano(damage.double_damage_to, this.pokemonDireito, -2);
        this.compararDano(damage.half_damage_from, this.pokemonDireito, -1);
        this.compararDano(damage.half_damage_to, this.pokemonDireito, 1);
        this.compararDano(damage.no_damage_from, this.pokemonDireito, -4);
        this.compararDano(damage.no_damage_to, this.pokemonDireito, 4);
      });
      this.pokemonDireitoDamages.forEach((damage:InfoDeDano) => {
        this.compararDano(damage.double_damage_from, this.pokemonEsquerdo, -2);
        this.compararDano(damage.double_damage_to, this.pokemonEsquerdo, 2);
        this.compararDano(damage.half_damage_from, this.pokemonEsquerdo, 1);
        this.compararDano(damage.half_damage_to, this.pokemonEsquerdo, -1);
        this.compararDano(damage.no_damage_from, this.pokemonEsquerdo, 4);
        this.compararDano(damage.no_damage_to, this.pokemonEsquerdo, -4);
      });
    }
  }

  private atualizarPokemon(novoPokemon:InfoDePokemon, pokemonRefLocal:InfoDePokemon, pokemonDamageRefLocal:InfoDeDano[]):Promise<void> {
    return new Promise((resolve) => {
      if (novoPokemon == undefined) {
        resolve();
        return;
      }
      pokemonRefLocal = novoPokemon;
      let typeCount = pokemonRefLocal.types.length;
      pokemonRefLocal.types.forEach((tipo:any) => {
        let tipoItem:ItemDeLista = tipo.type;
        this.pokemonService.getInfoTipo(tipoItem).then((tipoInfo:InfoDeTipo) => {
          pokemonDamageRefLocal.push(tipoInfo.damage_relations);
          typeCount--;
          if (typeCount == 0) {
            resolve();
          }
        });
      });
    });
  }

  private compararDano(damage:ItemDeLista[], outroPokemon:InfoDePokemon, valorDano:number) {
    damage.forEach((tipo:ItemDeLista) => {
      outroPokemon.types.forEach((tipoOponente:ItemDeLista) => {
        if (tipo == tipoOponente) {
          this.efetivo += valorDano;
        }
      });
    });
  }
}
