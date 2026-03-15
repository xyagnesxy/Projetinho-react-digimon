import digimons from "./digimons.json" with { type: "json" };

import fs from "fs"

function getId(nome){
    return digimons?.find(d=>{
        return d.name==nome
    })?.id || -1
}


const novaLista = structuredClone(digimons.map(d=>{

    return{
        ...d,
        evolutions: structuredClone(d.evolutions?.map(e=>{
            const novaE = getId(e.to)
            return{
                ...e,
                to: novaE
            }
        }))
    }
}))
    


fs.writeFileSync("novodigimons.json", JSON.stringify(novaLista, null, 2))