import listaDigimons from "../../data/digimons.json";
import type {Digimon} from "../../types/Digimon";



export function getRamdomDigimon(n: number, level: number = 1): Digimon[]{
    const copia = structuredClone(listaDigimons.filter(d=>{
        return d.level==level
    }))
    
    
    for (let i = copia.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copia[i], copia[j]] = [copia[j], copia[i]];
    }
    return copia.slice(0, n) as Digimon[]


}
