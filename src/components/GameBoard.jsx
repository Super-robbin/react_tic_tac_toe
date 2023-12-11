// To create the GRID we use a nested order list.

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

// Now we need to know about the currently active player in both this Player component
// and in the GameBoard component because here we need the symbol of the active player.

// In App.jsx, we create a const [activePlayer, setActivePlayer] = useState("X");
// const handleSelectSquare = () => {
//   setActivePlayer((curActivePlayer) => (curActivePlayer === "X" ? "O" : "X"));
// };
// We then pass it down as a prop because squares get selected here, in the GameBoard component.

const GameBoard = ({ onSelectSquare, turns }) => {
  let gameBoard = initialGameBoard;

  for (const turn of turns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }

  // const [gameBoard, setGameBoard] = useState(initialGameBoard);

  // const handleSelectSquare = (rowIndex, colIndex) => {
  //   setGameBoard((prevGameBoard) => {
  //     const updatedBoard = [
  //       ...prevGameBoard.map((innerArray) => [...innerArray]),
  //     ];
  //     updatedBoard[rowIndex][colIndex] = activePlayerSymbol;
  //     return updatedBoard;
  //   });

  //   onSelectSquare();
  // };

  // We replace/delete the game board state above, since it is missing information about the order
  // in which these buttons are clicked. We instead use the game turns state in the App.jsx

  return (
    <ol id="game-board">
      {gameBoard.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, colIndex) => (
              <li key={colIndex}>
                <button onClick={() => onSelectSquare(rowIndex, colIndex)}>{playerSymbol}</button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
};

export default GameBoard;
