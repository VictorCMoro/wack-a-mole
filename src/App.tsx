import { useEffect, useState } from "react";

import hole from "./assets/hole.png";
import mole from "./assets/mole.png";

export default function App() {
  const [moles, setMoles] = useState<boolean[]>(new Array(9).fill(false));
  const [counter, setCounter] = useState<number>(0);

  function popMole(index:number){
    
    setMoles((curMoles) => {
   const newMoles = [...curMoles];
   newMoles[index] = true;
   return newMoles
    });
   
  }

  function hideMole(index: number) {
    
  
    setMoles((curMoles) => {
      const newMoles = [...curMoles];
      newMoles[index] = false;
      return newMoles
    });
  }

  function wackMole(index: number) {
    if(!moles[index]) return
    hideMole(index)
    setCounter((counter) => counter + 1);
  }



  useEffect(() => {
    const interval = setInterval(() => {
      const randomElement = Math.floor(Math.random() * moles.length);
      popMole(randomElement);
      setTimeout(() => {
        hideMole(randomElement)
      }, 500)
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [moles]);



  return (
    <>
      <h1 className="score">Score: {counter}</h1>
      <div className="app">
        {moles.map((isMole, idx) => {
          return (
            <img
            key={idx}
              src={isMole ? mole : hole}
              alt=""
              onClick={() => {
                wackMole(idx);
              }} //Toda vez que o usuario clicar em uma topeira, ele vai chamar a função wackMole e setar como false para a imagem voltar para hole
            />
          );
        })}
      </div>
    </>
  );
}
