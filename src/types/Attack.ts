import type { ElementType } from "./ElementType"

export type Attack = {
    id: number,
    name: string,
    power: number,
    type: ElementType,
    range: number,
    effect: string,
    tier: string
}

