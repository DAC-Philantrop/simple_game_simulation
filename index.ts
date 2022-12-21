import { Player } from "./player";

const p = new Player();

let movenumber = 0;
let finished = false;

while(!finished) {
    console.log({movenumber})
    movenumber++
    finished = p.move()
}