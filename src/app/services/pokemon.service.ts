import { Injectable } from '@angular/core';
import { ApiServiceService } from './api-service.service';
import { CacheService } from './cache.service';
import { ItemDeLista, InfoDeTipo, ImagemPokemon } from 'src/app/definicoes/list-type';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  public imagemObservable:Subject<ImagemPokemon>;

  constructor(private apiService: ApiServiceService, private cacheService: CacheService) {
    this.imagemObservable = new Subject();
  }

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
