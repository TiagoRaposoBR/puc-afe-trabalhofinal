# PucAfeTrabalhofinal

Trabalho final da disciplina Arquitetura de Front End, do curso de Arquitetura de Sistemas Distribuídos da PUC Minas.

## Como rodar

1. Rode `npm install` na raiz do projeto.

2. Rode `ng serve` para rodar o projeto em `http://localhost:4200/`.

## Observações

Em alguns casos, o cache pode se corromper, e a seleção de um tipo não traz a lista dos pokemon.
O problema pode ser visto ao selecionar um tipo, e a lista de pokemon ficar vazia, ou aparecer um erro no console.

Caso aconteça, siga os passos abaixo:

1. Abra o console de desenvolvimento do browser;

2. Abra a aba Application;

3. Selecione Storage -> Local Storage -> http://localhost:4200;

4. Apague as chaves PokemonBattlePokemon e PokemonBattleTipos;

5. Atualize a página.
