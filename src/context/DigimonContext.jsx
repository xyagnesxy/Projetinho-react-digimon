import React, { createContext, useContext, useState } from "react";

const DigimonContext = createContext();

export const DigimonProvider = ({ children }) => {
  const [digimon1, setDigimon1] = useState(null); // primeiro Digimon escolhido
  const [digimon2, setDigimon2] = useState(null); // segundo Digimon

  const selectDigimon = (digimon) => {
    if(!digimon1){
      setDigimon1(digimon)
    }
    else{
      setDigimon2(digimon)
    }
  };



  return (
    <DigimonContext.Provider
      value={{
        digimon1,
        digimon2,
        selectDigimon
      }}
    >
      {children}
    </DigimonContext.Provider>
  );
};

export const useDigimon = () => useContext(DigimonContext);
