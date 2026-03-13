import type {Evolutions} from "./Evolutions";

export type Archetype = "balanced" | "striker" | "speed" | "tank" | "defender"
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
    evolutions?: Evolutions[],
    archetype: Archetype
}


