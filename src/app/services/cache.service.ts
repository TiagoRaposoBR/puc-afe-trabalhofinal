import { Injectable } from '@angular/core';
import { ItemDeLista, InfoDeTipo, InfoDePokemon } from '../interfaces/list-type';

@Injectable({
  providedIn: 'root'
})
export class CacheService {

  private chaveCacheTipos: string = "PokemonBattleTipos";
  private chaveCachePokemon: string = "PokemonBattlePokemon";
  private tipos: any;
  private pokemon: any;

  constructor() {
    this.tipos = {};
    this.pokemon = {};

    let tiposCache:string = localStorage.getItem(this.chaveCacheTipos);
    if (tiposCache != null) {
      console.log('Tamanho do cache de tipos: ' + tiposCache.length.toLocaleString() + ' bytes');
      this.tipos = JSON.parse(tiposCache);
    }

    let pokemonCache:string = localStorage.getItem(this.chaveCachePokemon);
    if (pokemonCache != null) {
      console.log('Tamanho do cache de pokemon: ' + tiposCache.length.toLocaleString() + ' bytes');
      this.pokemon = JSON.parse(pokemonCache);
    }
  }

  public getInfoTipo(item: ItemDeLista): InfoDeTipo {
    if (this.tipos[item.name] != undefined) {
      return this.tipos[item.name];
    } else {
      return undefined;
    }
  }

  public setInfoTipo(item: InfoDeTipo): void {
    if (this.tipos[item.name] == undefined) {
      this.tipos[item.name] = item;
      let parsed = JSON.stringify(this.tipos);
      localStorage.setItem(this.chaveCacheTipos, parsed);
      console.log('Tamanho do cache de tipos: ' + localStorage.getItem(this.chaveCacheTipos).length.toLocaleString() + ' bytes');
    }
  }

  public getInfoPokemon(item: ItemDeLista): InfoDeTipo {
    if (this.pokemon[item.name] != undefined) {
      return this.pokemon[item.name];
    } else {
      return undefined;
    }
  }

  public setInfoPokemon(item: InfoDePokemon): void {
    if (this.pokemon[item.name] == undefined) {
      this.pokemon[item.name] = item;
      localStorage.setItem(this.chaveCachePokemon, JSON.stringify(this.pokemon));
      console.log('Tamanho do cache de pokemon: ' + localStorage.getItem(this.chaveCachePokemon).length.toLocaleString() + ' bytes');
    }
  }
}
