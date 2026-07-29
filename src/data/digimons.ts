import type {Digimon} from "../types/Digimon";
import listaJson from "./digimons.json"

const digimons: Digimon[] = structuredClone(listaJson) as Digimon[]


export default digimons
export function getDigimonById(id: number): Digimon{
    return digimons.find(digimon => digimon.id === id) as Digimon

}