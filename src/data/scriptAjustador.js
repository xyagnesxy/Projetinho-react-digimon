
import fs from "fs"


//const attacksJson = JSON.parse(fs.readFileSync("./attacks.json", "utf-8"))


const digimonsJson = JSON.parse(fs.readFileSync("./digimons.json", "utf-8"))

const novosDigimons = digimonsJson.map((digimon, index)=>{
    return{
        ...digimon,
        id: index
    }
})






fs.writeFileSync("./digimonsAtaquesNumerados.json", JSON.stringify(novosDigimons, null, 2))