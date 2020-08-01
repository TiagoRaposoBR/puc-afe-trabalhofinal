import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../services/pokemon.service';
import { InfoDePokemon, ItemDeLista, InfoDeTipo, InfoDeDano } from '../definicoes/list-type';
import { Lado } from '../definicoes/enums';
import { Observable } from 'rxjs';

@Component({
  selector: 'pokemon-result',
  templateUrl: './pokemon-result.component.html',
  styleUrls: ['./pokemon-result.component.css']
})
export class PokemonResultComponent implements OnInit {

  public efetivo:number = 0;
  public pokemonEsquerdo:InfoDePokemon;
  public pokemonDireito:InfoDePokemon;
  public pokemonEsquerdoDamages:InfoDeDano[];
  public pokemonDireitoDamages:InfoDeDano[];

  constructor(private pokemonService:PokemonService) { }

  ngOnInit(): void {
    this.pokemonEsquerdoDamages = [];
    this.pokemonDireitoDamages = [];
    let that = this;

    this.pokemonService.pokemonObservable[Lado.Direito].subscribe(novoPokemon => {
      if (novoPokemon == undefined) {
        return;
      }
      this.efetivo = 0;
      this.pokemonDireito = novoPokemon;
      let typeCount = this.pokemonDireito.types.length;
      this.pokemonDireito.types.forEach((tipo:any) => {
        let tipoItem:ItemDeLista = tipo.type;
        this.pokemonService.getInfoTipo(tipoItem).then((tipoInfo:InfoDeTipo) => {
          this.pokemonDireitoDamages.push(tipoInfo.damage_relations);
          typeCount--;
          if (typeCount == 0) {
            this.batalhaPokemon();
          }
        });
      });
    });

    this.pokemonService.pokemonObservable[Lado.Esquerdo].subscribe(novoPokemon => {
      /* this.atualizarPokemon(novoPokemon, this.pokemonEsquerdo, this.pokemonEsquerdoDamages).then(() => {
        this.batalhaPokemon();
      }); */
      if (novoPokemon == undefined) {
        return;
      }
      this.efetivo = 0;
      this.pokemonEsquerdo = novoPokemon;
      let typeCount = this.pokemonEsquerdo.types.length;
      this.pokemonEsquerdo.types.forEach((tipo:any) => {
        let tipoItem:ItemDeLista = tipo.type;
        this.pokemonService.getInfoTipo(tipoItem).then((tipoInfo:InfoDeTipo) => {
          this.pokemonEsquerdoDamages.push(tipoInfo.damage_relations);
          typeCount--;
          if (typeCount == 0) {
            this.batalhaPokemon();
          }
        });
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
      outroPokemon.types.forEach((tipoOponente:any) => {
        if (tipo.name == tipoOponente.type.name) {
          this.efetivo += valorDano;
        }
      });
    });
  }
}
