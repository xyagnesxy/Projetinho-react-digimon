import React, { useEffect, useState } from "react";
import { useDigimon } from "../context/DigimonContext";
import { useGame } from "../context/GameContext";
import digimonData from "../data/digimons.json";
import attackData from "../data/attacks.json";
import "./BattleScreen.css";
import GameLayout from "../components/GameLayout";
import BattleEffect from "../components/BattleEffect";


export const BattleScreen = () => {
  const { digimon1, removeDigimon } = useDigimon();
  const { goToMenu } = useGame();
  const[hoveredAttack, setHoveredAtk] = useState(null);
  const[currentEffect, setCurrentEffect] = useState(null);
  


  // Se nenhum digimon foi selecionado, volta ao menu
  if (!digimon1) {
    goToMenu();
    return null;
  }

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
        goToMenu();
      }, 1000)
    } else if (enemyHP <= 0) {
      console.log("Você venceu!");
      setTimeout(()=>{alert("Você venceu!")
        removeDigimon();
        goToMenu();
      }, 1000)
    }
  }, [playerHP, enemyHP]);

  const getHPColor = (current, max) => {
    const percent = (current / max) * 100;
    if (percent > 60) return "#4CAF50"; // verde
    if (percent > 30) return "#FFC107"; // amarelo
    return "#F44336"; // vermelho
};


  return (
    <GameLayout className="battle">
    <div className="battle-screen">
      <div className="enemy-side">
        <img src={enemyDigimon.image} alt={enemyDigimon.name} className="enemy-img" />
        <div className="hp-bar">
           <div className="hp-bar-fill" style={{ width: `${(enemyHP / enemyDigimon.hp) * 100}%`, backgroundColor: getHPColor(enemyHP, enemyDigimon.hp) }}></div>
           <span className="hp-text">HP: {enemyHP}/{enemyDigimon.hp} </span>
        </div>
      </div>

      <div className="player-side">
        <img src={playerDigimon.image} alt={playerDigimon.name} className="player-img" />
        <div className="hp-bar">
           <div className="hp-bar-fill" style={{ width: `${(playerHP / playerDigimon.hp) * 100}%`, backgroundColor: getHPColor(playerHP, playerDigimon.hp) }}></div>
           <span className="hp-text">HP: {playerHP}/{playerDigimon.hp} </span>
        </div>

      </div>
        {menuOpen && isPlayerTurn && (
          
          <div className="battle-menu">
            {!attackMenuOpen ? (
              <div className="battle-menu-actions">
                <button onClick={() => setAttackMenuOpen(true)}>Atacar</button>
                <button disabled>Itens</button>
                <button disabled>Mover</button>
              </div>
            ) : (
              <div className="battle-menu-attacks">
                {playerAttacks.map((atk, index) => (
                  <button className={atk.type} key={index} onClick={() => handlePlayerAttack(atk, "enemy")} onMouseEnter={()=>setHoveredAtk(atk)} onMouseLeave={()=>setHoveredAtk(null)}>
                    {atk.name}
                  </button>
                ))}
                <button onClick={() => setAttackMenuOpen(false)}>Voltar</button>
              </div>
            )}
          </div> 
          )}

          {
            hoveredAttack && (
            <div className={`attack-description ${hoveredAttack.type}`}>
              <p><strong>{hoveredAttack.name}</strong></p>
              <p>Power: {hoveredAttack.power}</p>
              <p className={hoveredAttack.type}>Type: {hoveredAttack.type}</p>
              <p>Range: {hoveredAttack.range}</p>
              
             </div>  
            )
          }
          <BattleEffect effect={currentEffect} />
    </div>
    </GameLayout>
  );
};
