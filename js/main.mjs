import { Character } from "./character.js";
import { Game } from "./game.js";

const game = new Game('app');
const character = new Character();
game.add(character);

game.start();