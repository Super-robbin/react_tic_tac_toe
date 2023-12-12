import { useState } from "react";

import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import GameOver from "./components/GameOver";
import {
  PLAYERS,
  deriveActivePlayer,
  deriveGameBoard,
  deriveWinner,
} from "./derive-functions";

const App = () => {
  const [players, setPlayers] = useState(PLAYERS);
  const [gameTurns, setGameTurns] = useState([]);
  const activePlayer = deriveActivePlayer(gameTurns);
  const gameBoard = deriveGameBoard(gameTurns);
  const winner = deriveWinner(gameBoard, players);
  const hasDraw = gameTurns.length === 9 && !winner;

  // Step 1 - We create updatedTurns (immutable way), as an array of objects,
  // where we copy existing turns and add new ones at the beginning.
  // Step 2 - We create currentPlayer and set it to "X" initially (check derivedActivePlayer above, outside App.jsx),
  // then we use IF statement to check the simbol and change it based on the previous one.
  // We then pass currentPlayer as player value in updatedTurns array.
  // Step 3 - We return updatedTurns as new value of setGameTurns.

  const handleSelectSquare = (rowIndex, colIndex) => {
    setGameTurns((prevTurns) => {
      // let currentPlayer = "X";

      // if (prevTurns.length > 0 && prevTurns[0].player === "X") {
      //   currentPlayer = "O";
      // }

      // We can now replace the above code, with the deriveActivePlayer function so we can avoid managing state when unnecessary.

      const currentPlayer = deriveActivePlayer(prevTurns);
      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];
      return updatedTurns;
    });
  };

  const handleRematch = () => {
    setGameTurns([]);
  };

  // Step 1 - We create a players state at the top of App.jsx as an object, so that we have the key X
  // and the value for that key is Player One and the key O for the second player and that's Player Two.
  // Step 2 - We create handlePlayerNameChange and we pass symbol and newName as parameters.
  // Step 3 - We use the callback function to return and object with the ...prevPlayers (old) objects
  // and then we replace the symbol with the newName.
  // We use this approach to ensure that I keep the name and symbol of the player who is not changing,
  // I'm then just overriding the name for the symbol of the player that was changed.

  const handlePlayerNameChange = (symbol, newName) => {
    setPlayers((prevPlayers) => {
      return {
        ...prevPlayers,
        [symbol]: newName,
      };
    });
  };

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName={PLAYERS.X}
            symbol="X"
            isActive={activePlayer === "X"}
            onChangeName={handlePlayerNameChange}
          />
          <Player
            initialName={PLAYERS.O}
            symbol="O"
            isActive={activePlayer === "O"}
            onChangeName={handlePlayerNameChange}
          />
        </ol>
        {/* 
        Below, if we have a winner or if hasDraw is true, the GameOver component is displayed.
        */}
        {(winner || hasDraw) && (
          <GameOver winner={winner} onRematch={handleRematch} />
        )}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
      </div>
      <Log turns={gameTurns} winner={winner} />
    </main>
  );
};

export default App;
