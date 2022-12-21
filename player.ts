import { Game, Combination } from "./game"

export class Player {
    game: Game;

    constructor() {
        this.game = new Game();
    }

    move = (): boolean => {
        console.log(`
        starting move:
         - points: ${this.game.points}
         - visible cards: \n${this.game.visibles.map(c => `\n${c.index} : ${c.num} : ${c.color}`)}`)

        const visibles = this.game.visibles;
        
        if(visibles.length < 3) {
            console.log("finished game with points: ", this.game.points)
            return true;
        }

        const availableIndices = visibles.map((c, i) => i)

        const possibleCombinations = availableIndices.flatMap((x, i) =>
            availableIndices.slice(i + 1).flatMap((y, j) =>
                availableIndices.slice(i + j + 2).map(z => [x, y, z] as Combination)
            )
        );

        for (const combination of possibleCombinations) {
            const points = this.game.getPointsForCombination(combination); 
            if(points) {
                this.game.combine(combination);
                return false;
            }
        }

        this.game.trash(0)

        return false;
    }
}
