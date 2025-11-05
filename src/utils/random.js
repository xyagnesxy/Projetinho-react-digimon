//import digimons from '../data/digimons.json' with{type: 'json'}
//import ataques from '../data/attacks.json' with{type: 'json'}
//import novosAtaques from '../data/novosAtaques.json' with{type: 'json'}
import {useGame} from '../context/GameContext'

//cria uma cópia embaralhada do array(digimons.json) e retorna os count primeiros itens dela
export function getRandomSubset(array, count, level) {

  const levelInimigos = ()=>{
    if (level<=2){
      return 1
    }
    else if(level<=4){
      return 2 
    }
    else{
      return 3//boss
    }
  }
  
  if (!Array.isArray(array)) return [];
  
  const cloned =array.filter(digimon=>digimon.level==levelInimigos());
  
  for (let i = cloned.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cloned[i], cloned[j]] = [cloned[j], cloned[i]];
  }
  return cloned.slice(0, Math.min(count, cloned.length));
}

function digimonsAtaques(){
  const novaLista=[]
  const lista = digimons
  lista.map((digimon)=>{
    novaLista.push({
      name: digimon.name,
      attacks: digimon.attacks
    })
  })
  return novaLista
}
function mostrarAtaques(){
  const novaLista=[]
  const lista = ataques
  lista.map((ataque)=>{
    novaLista.push({
      name: ataque.name,
      power: ataque.power,
      type: ataque.type,
      range: ataque.range,
      effect: ataque.effect
    })
  })
  return novaLista
}

function acrescentarAtaques(){
  const novaLista=[]
  const lista = novosAtaques
  const listaAntiga = digimons

  listaAntiga.map((digimon)=>{
    if(!digimon.attacks){
      lista.map((ataque)=>{
        if(ataque.name===digimon.name){
          novaLista.push({
            ...digimon,
            attacks: [...ataque.attacks]
          })
        }
      })
    }
    else{
      novaLista.push(digimon)
    }
  })
  return novaLista

}

