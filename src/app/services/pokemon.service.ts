import { Injectable } from '@angular/core';
import { ApiServiceService } from './api-service.service';
import { CacheService } from './cache.service';
import { ItemDeLista, InfoDeTipo } from 'src/app/interfaces/list-type';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(private apiService: ApiServiceService, private cacheService: CacheService) { }

  public getListaTipos() {
    return new Promise((resolve) => {

      this.apiService.getListaTipos().then((typeList: ItemDeLista[]) => {
        typeList.sort((a: ItemDeLista, b: ItemDeLista) => {
          return a.name.localeCompare(b.name);
        });

        resolve(typeList);
      });

    })
  }

  public getListaPokemon(tipoItem: ItemDeLista): Promise<ItemDeLista[]> {
    return new Promise((resolve) => {

      let tipoInfoCache: InfoDeTipo = this.cacheService.getInfoTipo(tipoItem);
      if (tipoInfoCache != undefined) {
        resolve(tipoInfoCache.pokemon);

      } else {
        this.apiService.getInfoTipo(tipoItem.url).then((tipoInfoNovo: InfoDeTipo) => {
          tipoInfoNovo.pokemon = tipoInfoNovo.pokemon.map<ItemDeLista>((pokemon:ItemDeLista):ItemDeLista => {
            return pokemon['pokemon'];
          });
          this.cacheService.setInfoTipo(tipoInfoNovo);
          resolve(tipoInfoNovo.pokemon);
        });
      }
    });
  }
}
