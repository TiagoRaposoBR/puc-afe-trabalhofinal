import { Injectable } from '@angular/core';
import { ApiServiceService } from './api-service.service';
import { CacheService } from './cache.service';
import { Subject, BehaviorSubject } from 'rxjs';
import { InfoDePokemon, InfoDeTipo, ItemDeLista } from '../definicoes/list-type';
import { Lado } from '../definicoes/enums';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  public pokemonObservable:[];

  constructor(private apiService: ApiServiceService, private cacheService: CacheService) {
    this.pokemonObservable = [];
    this.pokemonObservable[Lado.Direito] = new BehaviorSubject<InfoDePokemon>(undefined);
    this.pokemonObservable[Lado.Esquerdo] = new BehaviorSubject<InfoDePokemon>(undefined);
  }
 
  public getListaTipos(): Promise<ItemDeLista[]> {
    return new Promise((resolve) => {

      this.apiService.getListaTipos().then((typeList: ItemDeLista[]) => {
        typeList.sort((a: ItemDeLista, b: ItemDeLista) => {
          return a.name.localeCompare(b.name);
        });

        resolve(typeList);
      });

    })
  }

  public getInfoTipo(tipoItem: ItemDeLista): Promise<InfoDeTipo> {
    return new Promise((resolve) => {

      let tipoInfoCache: InfoDeTipo = this.cacheService.getInfoTipo(tipoItem);
      if (tipoInfoCache != undefined) {
        resolve(tipoInfoCache);

      } else {
        this.apiService.getInfoTipo(tipoItem.url).then((tipoInfoNovo: InfoDeTipo) => {
          this.cacheService.setInfoTipo(tipoInfoNovo);
          resolve(tipoInfoNovo);
        });
      }
    });
  }

  public getListaPokemon(tipoItem: ItemDeLista): Promise<ItemDeLista[]> {
    return new Promise((resolve) => {

      this.getInfoTipo(tipoItem).then((tipoInfo: InfoDeTipo) => {
        tipoInfo.pokemon = tipoInfo.pokemon.map<ItemDeLista>((pokemon:ItemDeLista):ItemDeLista => {
          return pokemon['pokemon'];
        });
        resolve(tipoInfo.pokemon);
      });
    });
  }

  public getPokemon(tipoPokemon: ItemDeLista): Promise<InfoDePokemon> {
    return new Promise((resolve) => {

      let tipoPokemonCache: InfoDePokemon = this.cacheService.getInfoPokemon(tipoPokemon);
      if (tipoPokemonCache != undefined) {
        resolve(tipoPokemonCache);

      } else {
        this.apiService.getPokemonTipo(tipoPokemon.url).then((tipoPokemonNovo: InfoDePokemon) => {
          this.cacheService.setInfoPokemon(tipoPokemonNovo);
          resolve(tipoPokemonNovo);
        });
      }
    });
  }
}
