// It simply outputs an ordered list with an ID of log for styling reasons
// where we output information about the different turns we had in our game,
// so that we can simply see which turns were taken by the different players
// whilst playing that game.

// We need to manage some dynamic array of turns that grows with every button click.
// However, we can't really manage that state here because that information,
// which button was clicked is generated in the game board component.

// So we again, need to lift state up to the app component because that's the component that has access
// to both the game board and the log component which I wanna use here.

const Log = () => {


    return (
        <ol id="log">

        </ol>
    )
}

export default Log;