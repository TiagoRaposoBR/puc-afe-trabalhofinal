import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonResultComponent } from './pokemon-result.component';

describe('PokemonResultComponent', () => {
  let component: PokemonResultComponent;
  let fixture: ComponentFixture<PokemonResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PokemonResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
