import { useState } from "react";

import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";

// Whenever we are using or reusing a component, React will basically create a new isolated instance.
// So even though both these players here use the same player component, they work totally isolated from each other.
// If the state in this first player component instance here changes,
// the second player component instance does not care about that at all.

const App = () => {
  const [gameTurns, setGameTurns] = useState([]);
  const [activePlayer, setActivePlayer] = useState("X");

// Step 1 - We create updatedTurns (immutable way), as an array of objects,
// where we copy existing turns and add new ones at the beginning.
// Step 2 - We create currentPlayer and set it to "X" initially, then we use IF statement to check the simbol and change it based on
// the previous one. We then pass currentPlayer as player value in updatedTurns array.
// Step 3 - We return updatedTurns as new value of setGameTurns.

  const handleSelectSquare = (rowIndex, colIndex) => {
    setActivePlayer((curActivePlayer) => (curActivePlayer === "X" ? "O" : "X"));
    setGameTurns((prevTurns) => {
      let currentPlayer = "X";

      if (prevTurns.length > 0 && prevTurns[0].player === "X") {
        currentPlayer = "O";
      }

      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];
      return updatedTurns;
    });
  };

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName="Player 1"
            symbol="X"
            isActive={activePlayer === "X"}
          />
          <Player
            initialName="Player 2"
            symbol="O"
            isActive={activePlayer === "O"}
          />
        </ol>
        <GameBoard
          onSelectSquare={handleSelectSquare}
          activePlayerSymbol={activePlayer}
        />
      </div>
      <Log />
    </main>
  );
};

export default App;
