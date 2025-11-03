import React, { useEffect, useState } from "react";
import "./BattleEffect.css";

export default function BattleEffect({ effect }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (effect) {
      setVisible(true);

      // Remove o efeito após 1 segundo
      const timer = setTimeout(() => {
        setVisible(false);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [effect]);

  if (!effect || !visible) return null;

  return (
    <div className={`attack-effect ${effect.type} ${effect.target}`} />
  );
}
