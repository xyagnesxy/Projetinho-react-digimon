import React from "react";
import "./GameLayout.css";

export default function GameLayout({ children, className="" }) {
  return (
    <div className={`game-layout ${className}`} >
      {children}
    </div>
  );
}
