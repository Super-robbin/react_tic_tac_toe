// To create the GRID we use a nested order list.

// Now we need to know about the currently active player in both this Player component
// and in the GameBoard component because here we need the symbol of the active player.

const GameBoard = ({ onSelectSquare, board }) => {
  // const [gameBoard, setGameBoard] = useState(initialGameBoard);
  // We replace/delete the game board state above, since it is missing information about the order
  // in which these buttons are clicked. We instead use the game turns state in the App.jsx

  return (
    <ol id="game-board">
      {board.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, colIndex) => (
              <li key={colIndex}>
                <button
                  onClick={() => onSelectSquare(rowIndex, colIndex)}
                  disabled={playerSymbol !== null}
                >
                  {playerSymbol}
                </button>
                {/* 
                We use the disabled prop to make sure that if the button has already been selected by a player,
                it will set it to disabled=true.
                */}
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
};

export default GameBoard;