import { Injectable } from '@angular/core';
import { ItemDeLista, InfoDeTipo, InfoDePokemon } from '../definicoes/list-type';

@Injectable({
  providedIn: 'root'
})
export class CacheService {

  private chaveCacheTipos: string = "PokemonBattleTipos";
  private chaveCachePokemon: string = "PokemonBattlePokemon";
  private chaveCacheImagens: string = "PokemonBattleImagens";
  private tipos: any;
  private pokemon: any;
  private imagens: any;

  constructor() {
    this.tipos = {};
    this.pokemon = {};

    this.tipos = this.carregarCache(this.chaveCacheTipos);
    this.pokemon = this.carregarCache(this.chaveCachePokemon);
    this.imagens = this.carregarCache(this.chaveCacheImagens);
  }

  public getInfoTipo(item: ItemDeLista): InfoDeTipo {
    return this.getInfo<InfoDeTipo>(item.name, this.tipos);
  }

  public getInfoPokemon(item: ItemDeLista): InfoDePokemon {
    return this.getInfo<InfoDePokemon>(item.name, this.pokemon);
  }

  public setInfoTipo(item: InfoDeTipo): void {
    this.setInfo(item, this.chaveCacheTipos, this.tipos);
  }

  public setInfoPokemon(item: InfoDePokemon): void {
    this.setInfo(item, this.chaveCachePokemon, this.pokemon);
  }

  //===================== Privados =======================
  
  private carregarCache(chave:string):any {
    let tiposCache:string = localStorage.getItem(chave);
    if (tiposCache != null) {
      console.log('Tamanho do cache '+chave+': ' + tiposCache.length.toLocaleString() + ' bytes');
      return JSON.parse(tiposCache);
    }
  }

  private getInfo<T>(name:string, cache:any):T {
    if (cache[name] != undefined) {
      return cache[name];
    } else {
      return undefined;
    }
  }

  public setInfo(item:any, chave:string, cache:any): void {
    if (cache[item.name] == undefined) {
      cache[item.name] = item;
      let parsed = JSON.stringify(cache);
      localStorage.setItem(chave, parsed);
      console.log('Tamanho do cache de tipos: ' + localStorage.getItem(chave).length.toLocaleString() + ' bytes');
    }
  }
}
