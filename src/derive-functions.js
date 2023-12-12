import { WINNING_COMBINATIONS } from "./winning-combinations";
export const PLAYERS = {
    X: "Player 1",
    O: "Player 2",
  };
  
export const INITIAL_GAME_BOARD = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ];
  
  // Whenever we are using or reusing a component, React will basically create a new isolated instance.
  // So even though both these players here use the same player component, they work totally isolated from each other.
  // If the state in this first player component instance here changes,
  // the second player component instance does not care about that at all.
  
  export const deriveActivePlayer = (gameTurns) => {
    let currentPlayer = "X";
  
    if (gameTurns.length > 0 && gameTurns[0].player === "X") {
      currentPlayer = "O";
    }
  
    return currentPlayer;
  };
  
  export const deriveGameBoard = (gameTurns) => {
    // The below code was moved up from the gameBoard component. Comments refer to before when it was still there
    // Step 1 - We pass the gameTurns as turns prop here.
    // Step 2 - We create a gameBoard variable with initialGameBoard values to begin.
    // Step 3 - We do a FOR loop through the array (turns) and we destructure turn in square, player. Then we destructure square,
    // into row, col. Lastly, we update the gameBoard[row][col] with player info.
    // Step 4 - We update the onClick function onSelectSquare(rowIndex, colIndex) by passing row and col paramenters, which will be then used
    // inside the handleSelectSquare function in App.jsx.
    let gameBoard = [...INITIAL_GAME_BOARD.map((array) => [...array])];
  
    // We use the above method so we create a copy of the initialGameBoard array.
    // With this, we make sure that we added a brand new array when we derive the gameBoard
    // and not that original initial array in memory. Now the rematch button will work and will clear the array.
  
    for (const turn of gameTurns) {
      const { square, player } = turn;
      const { row, col } = square;
  
      gameBoard[row][col] = player;
    }
  
    // Now that we moved the above code here from the gameBoard component, we can extract the info we need to check
    // the winning combination whenever the App.jsx execute again.
  
    return gameBoard;
  };
  
  export const deriveWinner = (gameBoard, players) => {
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
        winner = players[firstSquareSymbol];
      }
    }
    // Use FOR OF or forEach above, FOR IN doesn't work because it gives back the index and not the object.
  
    return winner; // We have to return the winner variable since this is an helper function
  };