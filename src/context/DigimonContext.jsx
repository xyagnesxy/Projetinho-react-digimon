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
  const removeDigimon= () =>{  
    setDigimon1(null)
    setDigimon2(null)
    
  }


  return (
    <DigimonContext.Provider
      value={{
        digimon1,
        digimon2,
        selectDigimon,
        removeDigimon
      }}
    >
      {children}
    </DigimonContext.Provider>
  );
};

export const useDigimon = () => useContext(DigimonContext);
