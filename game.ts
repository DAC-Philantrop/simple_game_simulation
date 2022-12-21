export type Color = "yellow" | "red" | "blue"
export type Card = { index?: number, num: number, color: Color }
export type Combination = [number, number, number]

function shuffleArray(array: Card[]) {
    let curId = array.length;
    while (0 !== curId) {
      const randId = Math.floor(Math.random() * curId);
      curId--;
      [array[randId], array[curId]] = [array[curId], array[randId]] 
    }
    return array;
}

export class Game {
    deck: Card[];
    points = 0;

    constructor() {
        this.deck = shuffleArray(
            [1,2,3,4,5,6,7,8].flatMap(num => {
                return [{num, color: "yellow"},{num, color: "red"},{num, color: "blue"}] 
            })
        );
    }

    static isIndexVisible = (index: number | number[]): boolean => { 
        return typeof index === 'number' 
            ? index < 5 
            : index.every(i => i < 5)
    }

    isCardInDeck = (card: Card): boolean => {
        return this.deck.some(c => c.color === card.color && c.num === card.num)
    };

    getPointsForCombination = (combination: Combination): number | undefined => {
        const cardValues = combination
            .map(i => { return {...this.deck[i]}})
            .sort((c1,c2) => c1.num - c2.num);

        if(cardValues.every(card => card.num === cardValues[0].num))
            return cardValues.every(card => card.color === cardValues[0].color)
                ? 100
                : 1;
        if(cardValues[0].num + 1 === cardValues[1].num && cardValues[0].num + 2 === cardValues[2].num)
            return cardValues.every(card => card.color === cardValues[0].color)
                ? 100
                : 1;
    };
    
    trash = (i: number): Card | undefined => {
        if(!Game.isIndexVisible(i)) throw ("Card not visible");

        this.deck[i] = this.deck[0];

        return this.deck.shift();
    };

    combine = (indices: Combination) => {
        if(!Game.isIndexVisible(indices)) throw ("Card not visible");
        
        const points = this.getPointsForCombination(indices);

        if(!points) throw("invalid combination");
        
        /// swap cards that will be used to beginning of deck
        for(const [index, i] of indices.entries()) { 
            [this.deck[index], this.deck[i]] = [this.deck[i], this.deck[index]];
        }
        /// remove cards from deck
        for(const [index, i] of indices.entries()) { 
            this.deck.shift()
        }

        this.points += points;
    };

    get visibles() {
        const ret: Card[] = [];

        for (let index = 0; index < Math.min(5, this.deck.length); index++) {
            ret.push({ index, ...this.deck[index] })
        }

        return ret;
    }
}