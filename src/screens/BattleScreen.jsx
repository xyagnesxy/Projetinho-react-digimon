import React, { useEffect, useState } from "react";
import { useDigimon } from "../context/DigimonContext";
import { useGame } from "../context/GameContext";
import digimonData from "../data/digimons.json";
import attackData from "../data/attacks.json";
import "./BattleScreen.css";
import GameLayout from "../components/GameLayout";

export const BattleScreen = () => {
  const { digimon1 } = useDigimon();
  const { goToMenu } = useGame();

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
  const handlePlayerAttack = (attack) => {
    const damage = calculateDamage(playerDigimon, enemyDigimon, attack);
    setEnemyHP(prev => Math.max(prev - damage, 0));
    console.log(`${playerDigimon.name} usou ${attack.name} e causou ${damage} de dano!`);
    setMenuOpen(false);
    setAttackMenuOpen(false);
    setIsPlayerTurn(false);
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
      }, 1500);
    }
  }, [isPlayerTurn]);

  // Verifica fim da batalha
  useEffect(() => {
    if (playerHP <= 0) {
      console.log("Você perdeu!");
      alert("Você perdeu!");
      goToMenu();
    } else if (enemyHP <= 0) {
      console.log("Você venceu!");
      alert("Você venceu!");
      goToMenu();
    }
  }, [playerHP, enemyHP]);

  return (
    <GameLayout className="battle">
    <div className="battle-screen">
      <div className="enemy-side">
        <img src={enemyDigimon.image} alt={enemyDigimon.name} className="enemy-img" />
        <div className="hp-bar">HP: {enemyHP}/{enemyDigimon.hp}</div>
      </div>

      <div className="player-side">
        <img src={playerDigimon.image} alt={playerDigimon.name} className="player-img" />
        <div className="hp-bar">HP: {playerHP}/{playerDigimon.hp}</div>

        {menuOpen && isPlayerTurn && (
          <div className="battle-menu">
            {!attackMenuOpen ? (
              <>
                <button onClick={() => setAttackMenuOpen(true)}>Atacar</button>
                <button disabled>Itens</button>
                <button disabled>Mover</button>
              </>
            ) : (
              <>
                {playerAttacks.map((atk, index) => (
                  <button key={index} onClick={() => handlePlayerAttack(atk)}>
                    {atk.name}
                  </button>
                ))}
                <button onClick={() => setAttackMenuOpen(false)}>Voltar</button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
    </GameLayout>
  );
};
