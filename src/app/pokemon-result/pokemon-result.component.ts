import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'pokemon-result',
  templateUrl: './pokemon-result.component.html',
  styleUrls: ['./pokemon-result.component.css']
})
export class PokemonResultComponent implements OnInit {

  efetivo:number = 0;

  constructor() { }

  ngOnInit(): void {
  }

}
