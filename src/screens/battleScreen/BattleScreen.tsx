import {useReducer} from "react";
//import { useDigimon } from "../../context/DigimonContext";
//import { useGame } from "../../context/GameContext";
//import digimonData from "../../data/digimons.json";
//import attackData from "../../data/attacks.json";
import styles from "./BattleScreen.module.css"
//import BattleEffect from "../../components/BattleEffect.module.css"
//import type {Digimon} from "../../types/Digimon";
import { usePlayer } from "../../context/PlayerContext";
import {createInitialBattleState, battleReducer} from "./BattleReducer"
import digimons from "../../data/digimons";
import ataques from "../../data/attacks";




export const BattleScreen = () => {

  const {playerState} = usePlayer()
  const [battleState, battleDispatch] = useReducer(battleReducer, createInitialBattleState(playerState.player.digimonId, 2))


  
  /*
  
  const[hoveredAttack, setHoveredAtk] = useState(null);
  const[currentEffect, setCurrentEffect] = useState(null);

  // Monta o digimon do jogador e do inimigo
  const playerDigimon = digimonData.find(d => d.name === digimon1.name);
  const enemyDigimon = digimonData[1];//por enquanto fixo

  // Puxa os ataques completos de cada um
  const getAttacks = (digimon) => {
    return digimon.attacks.map(id => attackData.find(a => a.id === id));
  };

  const playerAttacks = getAttacks(playerDigimon);
  const enemyAttacks = getAttacks(enemyDigimon);

  // Estados da batalha
  const [playerHP, setPlayerHP] = useState(playerDigimon.hp);
  const [enemyHP, setEnemyHP] = useState(enemyDigimon.hp);
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [menuOpen, setMenuOpen] = useState(true);
  const [attackMenuOpen, setAttackMenuOpen] = useState(false);

  // Função para calcular dano
  const calculateDamage = (attacker, defender, attack) => {
    const baseDamage = (attacker.atk * attack.power) / 10 - defender.def / 2;
    return Math.max(Math.round(baseDamage), 0);
  };

  // Função de ataque do jogador
  const handlePlayerAttack = (attack, target) => {
    const damage = calculateDamage(playerDigimon, enemyDigimon, attack);
    setEnemyHP(prev => Math.max(prev - damage, 0));
    console.log(`${playerDigimon.name} usou ${attack.name} e causou ${damage} de dano!`);
    setMenuOpen(false);
    setAttackMenuOpen(false);
    setIsPlayerTurn(false);
    setCurrentEffect({
      type: attack.effect,
      target: target
    })
    setTimeout(() => {
      setCurrentEffect(null);
    }, 1000);
  };

  // Turno do inimigo (automático)
  useEffect(() => {
    if (!isPlayerTurn && enemyHP > 0 && playerHP > 0) {
      setTimeout(() => {
        const enemyAttack = enemyAttacks[0];
        const damage = calculateDamage(enemyDigimon, playerDigimon, enemyAttack);
        setPlayerHP(prev => Math.max(prev - damage, 0));
        console.log(`${enemyDigimon.name} usou ${enemyAttack.name} e causou ${damage} de dano!`);
        setIsPlayerTurn(true);
        setMenuOpen(true);
        setCurrentEffect({
          type: enemyAttack.effect,
          target: "player"
        })
        setTimeout(() => {
          setCurrentEffect(null);
        }, 1000);
      }, 1500);
    }
  }, [isPlayerTurn]);

  // Verifica fim da batalha
  useEffect(() => {
    if (playerHP <= 0) {
      console.log("Você perdeu!");
      setTimeout(()=>{alert("Você perdeu!")
        removeDigimon();
        goToMenuScreen();
      }, 1000)
    } else if (enemyHP <= 0) {

      console.log("Você venceu!");
      setTimeout(()=>{alert("Você venceu!")
        removeDigimon();
        goToMenuScreen();
      }, 1000)
    }
  }, [playerHP, enemyHP]);

  
  */
  const getHPColor = (current: number, max: number) => {
   const percent = (current / max) * 100;
   if (percent > 60) return "#4CAF50"; // verde
   if (percent > 30) return "#FFC107"; // amarelo
   return "#F44336"; // vermelho
  };
  

  return (
    
    <div className={styles["battle-screen"]}>
      <div className={styles["enemy-side"]}>
        <img src={digimons[battleState.enemyDigimon.id].image} alt={digimons[battleState.enemyDigimon.id].name} className={styles["enemy-img"]} />
        <div className={styles["hp-bar"]}>
           <div className={styles["hp-bar-fill"]} style={{ width: `${(battleState.enemyDigimon.currentHp / battleState.enemyDigimon.hp) * 100}%`, backgroundColor: getHPColor(battleState.enemyDigimon.currentHp, battleState.enemyDigimon.hp) }}></div>
           <span className={styles["hp-text"]}>HP: {battleState.enemyDigimon.currentHp}/{battleState.enemyDigimon.hp} </span>
        </div>
      </div>
      
        
      
      <div className={styles["player-side"]}>
        <img src={digimons[battleState.playerDigimon.id].image} alt={digimons[battleState.playerDigimon.id].name} className={styles["player-img"]} />
        <div className={styles["hp-bar"]}>
           <div className={styles["hp-bar-fill"]} style={{ width: `${(battleState.playerDigimon.currentHp / battleState.playerDigimon.hp) * 100}%`, backgroundColor: getHPColor(battleState.playerDigimon.currentHp, battleState.playerDigimon.hp) }}></div>
           <span className={styles["hp-text"]}>HP: {battleState.playerDigimon.currentHp}/{battleState.playerDigimon.hp} </span>
        </div>

      </div>
        {battleState.isMenuOpen && battleState.isPlayerTurn && (
          
          <div className={styles["battle-menu"]}>
            {!battleState.isAttackMenuOpen ? (
              <div className={styles["battle-menu-actions"]}>
                <button onClick={() => battleDispatch({type: "OPEN_ATTACK_MENU", payload: true})}>Atacar</button>
                <button disabled>Itens</button>
                <button disabled>Mover</button>
              </div>
            ) : (
              <div className={styles["battle-menu-attacks"]}>
                {battleState.playerDigimon.attacks.map((atk: number, index: number) => (
                  <button className={styles[ataques[atk].type]} key={index} onClick={() => battleDispatch({type: "ATTACK", payload: digimons[battleState.playerDigimon.id].atk})} onMouseEnter={()=>console.log("implementar onmouseEnter")} onMouseLeave={()=>console.log("implementar onmouseLeave")}>
                    {ataques[atk].name}
                  </button>
                ))}
                <button onClick={() => {battleDispatch({type: "OPEN_ATTACK_MENU", payload: false})}}>Voltar</button>
              </div>
            )}
          </div> 
          )}
          
          {/*
            hoveredAttack && (
            <div className={`attack-description ${hoveredAttack.type}`}>
              <p><strong>{hoveredAttack.name}</strong></p>
              <p>Power: {hoveredAttack.power}</p>
              <p className={hoveredAttack.type}>Type: {hoveredAttack.type}</p>
              <p>Range: {hoveredAttack.range}</p>
              
             </div>  
            )
          */}
          {/*<BattleEffect effect={currentEffect} */}
    </div>
    
  );
};
