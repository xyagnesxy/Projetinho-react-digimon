import attacks from "../src/data/attacks";
import fs from "fs"


type  Tier = "weak" | "medium" | "strong"


const tierBase = {
    weak: [10, 20],
    medium: [20,30],
    strong: [30,45]
}
function getTier(power: number): Tier {
    if(power <= tierBase.weak[1]){
        return "weak"
    }else if(power <= tierBase.medium[1]){
        return "medium"
    }else{
        return "strong"
    }
}



const novaLista = attacks.map(a=>{
    
    return{
        ...a,
        tier: getTier(a.power)
    }
})



console.log(novaLista)
fs.writeFileSync("./src/data/attacks.json", JSON.stringify(novaLista, null, 2))
