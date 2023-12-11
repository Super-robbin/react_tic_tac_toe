// It simply outputs an ordered list with an ID of log for styling reasons
// where we output information about the different turns we had in our game,
// so that we can simply see which turns were taken by the different players
// whilst playing that game.

// We need to manage some dynamic array of turns that grows with every button click.
// However, we can't really manage that state here because that information,
// which button was clicked is generated in the game board component.

// So we again, need to lift state up to the app component because that's the component that has access
// to both the game board and the log component which I wanna use here.

const Log = ({ turns }) => {

    // Step 1 - We pass the gameTurns as turns prop here.
    // Step 2 - We map through turns and create <li> extracting player and square info.
    // Step 3 - We use the row and col info as KEY for each individual <li>
  return (
    <ol id="log">
      {turns.map((turn) => (
        <li key={`${turn.square.row}${turn.square.col}`}>
          {turn.player} selected {turn.square.row}, {turn.square.col}
        </li>
      ))}
    </ol>
  );
};

export default Log;
