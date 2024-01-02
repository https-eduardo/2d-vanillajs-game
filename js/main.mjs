import { Character } from "./character.js";
import { Game } from "./game.js";
import { Ground } from './graphics/ground.js';

const game = new Game('app');
const character = new Character();
const ground = new Ground('../assets/ambient/ground.png');
game.add(character);
game.add(ground);

game.start();