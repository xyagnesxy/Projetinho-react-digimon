import type {Evolutions} from "./Evolutions";
export type Digimon = {
    id: number,
    name: string,
    image: string,
    level: number,
    type: string,
    hp: number,
    atk: number;
    def: number;
    speed: number;
    attacks: number[];
    evolutions?: Evolutions[]
}

