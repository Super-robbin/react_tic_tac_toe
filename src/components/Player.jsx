import { useState } from "react";

const Player = ({ initialName, symbol }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [playerName, setPlayerName] = useState(initialName);

  // When updating your state based on the PREVIOUS VALUE of that state,
  // you should pass a function to that state updating function.
  // This is a strong recommendation by the React team.
  // It's a best practice in the React world and it is simply something you should memorise.

  //  setIsEditing(!isEditing); // => schedules a state update to true (not immediately)
  //  setIsEditing(!isEditing); // => false (since the above hasn't update yet, this will schedule to true too)
  //  the above way is not correct because React is scheduling the state update, although it's really fast, it may not work.

  const handleEditClick = () => {
    setIsEditing((editing) => !editing); // right way to do it, you simply have a guarantee by React that you'll always be working
    // with the latest available state value.
  };

  const handleChange = (e) => {
    setPlayerName(e.target.value); // We target the value property in the <input>
  };

  return (
    <li>
      <span className="player">
        {!isEditing ? (
          <span className="player-name">{playerName}</span>
        ) : (
          <input
            type="text"
            required
            value={playerName}
            onChange={handleChange}
            // The above is called TWO-WAY-BINDING because we get a value out from the input and we feed a value back into the input.
          ></input>
        )}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEditClick}>{!isEditing ? "Edit" : "Save"}</button>
    </li>
  );
};

export default Player;