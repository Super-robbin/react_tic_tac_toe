import Player from "./components/Player";

// Whenever we are using or reusing a component, React will basically create a new isolated instance.
// So even though both these players here use the same player component, they work totally isolated from each other.
// If the state in this first player component instance here changes, 
// the second player component instance does not care about that at all.

const App = () => {
  return (
    <main>
      <div id="game-container">
        <ol id="players">
          <Player initialName="Player 1" symbol="X" />
          <Player initialName="Player 2" symbol="O" />
        </ol>
        GAME BOARD
      </div>
      LOG
    </main>
  );
};

export default App;