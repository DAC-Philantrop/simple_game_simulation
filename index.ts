import { FoolishPlayer } from "./player";

const p = new FoolishPlayer();

let movenumber = 0;
let finished = false;

while(!finished) {
    console.log({movenumber})
    movenumber++
    finished = p.move()
}