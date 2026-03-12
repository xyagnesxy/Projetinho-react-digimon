import listaJson from "./attacks.json";

const attacks : {
    id: number,
    name: string,
    power: number,
    type: string,
    range: number,
    effect: string
}[] = listaJson

export default attacks;