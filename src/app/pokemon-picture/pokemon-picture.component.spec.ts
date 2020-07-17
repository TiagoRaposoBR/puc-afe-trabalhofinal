import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonPictureComponent } from './pokemon-picture.component';

describe('PokemonPictureComponent', () => {
  let component: PokemonPictureComponent;
  let fixture: ComponentFixture<PokemonPictureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PokemonPictureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonPictureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
