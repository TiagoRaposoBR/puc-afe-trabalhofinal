import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { ListaDeTipos, ItemDeLista, InfoDeTipo, InfoDePokemon } from 'src/app/definicoes/list-type';


@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  constructor(private httpClient: HttpClient) { }

  public getListaTipos(): Promise<ItemDeLista[]> {
    return new Promise<ItemDeLista[]>((resolve, reject) => {
      this.httpClient.get<ListaDeTipos>('https://pokeapi.co/api/v2/type').subscribe((list: ListaDeTipos) => {
        resolve(list.results);
      }, (error: any) => {
        console.log('Erro ao pegar tipos', error);
        reject(error);
      });
    });
  }

  public getInfoTipo(tipoUrl:string): Promise<InfoDeTipo> {
    return this.httpClient.get<InfoDeTipo>(tipoUrl).toPromise();
  }

  public getPokemonTipo(tipoUrl:string): Promise<InfoDePokemon> {
    return this.httpClient.get<InfoDePokemon>(tipoUrl).toPromise();
  }
}
