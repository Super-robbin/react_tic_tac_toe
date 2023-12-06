import { useState } from "react";

import Player from "./components/Player";
import GameBoard from "./components/GameBoard";

// Whenever we are using or reusing a component, React will basically create a new isolated instance.
// So even though both these players here use the same player component, they work totally isolated from each other.
// If the state in this first player component instance here changes,
// the second player component instance does not care about that at all.

const App = () => {
  const [activePlayer, setActivePlayer] = useState("X");

  const handleSelectSquare = () => {
    setActivePlayer((curActivePlayer) => (curActivePlayer === "X" ? "O" : "X"));
  };

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player initialName="Player 1" symbol="X" isActive={activePlayer === 'X'}/>
          <Player initialName="Player 2" symbol="O" isActive={activePlayer === 'O'}/>
        </ol>
        <GameBoard onSelectSquare={handleSelectSquare} activePlayerSymbol={activePlayer}/>
      </div>
      LOG
    </main>
  );
};

export default App;
