import { useState } from "react";

import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import GameOver from "./components/GameOver";
import { WINNING_COMBINATIONS } from "./winning-combinations";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

// Whenever we are using or reusing a component, React will basically create a new isolated instance.
// So even though both these players here use the same player component, they work totally isolated from each other.
// If the state in this first player component instance here changes,
// the second player component instance does not care about that at all.

const deriveActivePlayer = (gameTurns) => {
  let currentPlayer = "X";

  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }

  return currentPlayer;
};

const App = () => {
  const [gameTurns, setGameTurns] = useState([]);
  // const [hasWinner, setHasWinner] = useState(false);
  // const [activePlayer, setActivePlayer] = useState("X"); we don't need it anymore, we just use an helper function outside App

  const activePlayer = deriveActivePlayer(gameTurns);

  console.log(WINNING_COMBINATIONS);

  // The below code was moved up from the gameBoard component. Comments refer to before when it was still there
  // Step 1 - We pass the gameTurns as turns prop here.
  // Step 2 - We create a gameBoard variable with initialGameBoard values to begin.
  // Step 3 - We do a FOR loop through the array (turns) and we destructure turn in square, player. Then we destructure square,
  // into row, col. Lastly, we update the gameBoard[row][col] with player info.
  // Step 4 - We update the onClick function onSelectSquare(rowIndex, colIndex) by passing row and col paramenters, which will be then used
  // inside the handleSelectSquare function in App.jsx.
  let gameBoard = initialGameBoard;

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }

  // Now that we moved the above code here from the gameBoard component, we can extract the info we need to check
  // the winning combination whenever the App.jsx execute again.

  let winner;

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol =
      gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol =
      gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol =
      gameBoard[combination[2].row][combination[2].column];

    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = firstSquareSymbol;
    }
  }

  // Use FOR OF or forEach above, FOR IN doesn't work because it gives back the index and not the object.

  const hasDraw = gameTurns.length === 9 && !winner;

  // Step 1 - We create updatedTurns (immutable way), as an array of objects,
  // where we copy existing turns and add new ones at the beginning.
  // Step 2 - We create currentPlayer and set it to "X" initially (check derivedActivePlayer above, outside App.jsx),
  // then we use IF statement to check the simbol and change it based on the previous one.
  // We then pass currentPlayer as player value in updatedTurns array.
  // Step 3 - We return updatedTurns as new value of setGameTurns.

  const handleSelectSquare = (rowIndex, colIndex) => {
    // setActivePlayer((curActivePlayer) => (curActivePlayer === "X" ? "O" : "X"));
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
        {/* 
        Below, if we have a winner or if hasDraw is true, the GameOver component is displayed.
        */}
        {(winner || hasDraw) && <GameOver winner={winner} />}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
};

export default App;
