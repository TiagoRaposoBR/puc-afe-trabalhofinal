export interface ItemDeLista {
    name: string,
    url: string
}

export interface ListaDeTipos {
    count: number,
    next: string,
    previous: string,
    results: ItemDeLista[]
}

export interface InfoDeTipo {
    name: string,
    damage_relations: InfoDeDano;
    pokemon: ItemDeLista[]
}

export interface InfoDeDano {
    double_damage_from: ItemDeLista[],
    double_damage_to: ItemDeLista[],
    half_damage_from: ItemDeLista[],
    half_damage_to: ItemDeLista[],
    no_damage_from: ItemDeLista[],
    no_damage_to: ItemDeLista[]
}

export interface InfoDePokemon {
    id: number,
    name: string,
    order: number,
    types: ItemDeLista[],
    sprites: InfoDeSprites
}

export interface InfoDeSprites {
    back_default: string,
    back_female: string,
    back_shiny: string,
    back_shiny_female: string,
    front_default: string,
    front_female: string,
    front_shiny: string,
    front_shiny_female: string
}