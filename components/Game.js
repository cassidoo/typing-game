import Header from "@components/Header";
import PokemonBanner from "@components/PokemonBanner";

import usePokeApi from "@hooks/usePokeApi";
import useGameReducer from "@hooks/useGameReducer";

export default function Game() {
  let [state, dispatch] = useGameReducer();
  let {
    gameState,
    score,
    currentPokemon,
    mostRecentlySubmitted,
    guessedPokemon,
    soundOn
  } = state;

  let toggleSound = () => {
    if (soundOn) {
      dispatch({ type: "MUTE" });
    } else {
      dispatch({ type: "UNMUTE" });
    }
  };

  usePokeApi(mostRecentlySubmitted, dispatch);

  return (
    <>
      <button className={`nes-btn button-mute`} onClick={toggleSound}>
        {soundOn ? "Sound!" : "Silence!"}
      </button>
      <Header text={`Pokémon Naming Game`} />
      {gameState === "NOT_STARTED" && (
        <button
          type="button"
          className="nes-btn is-warning"
          onClick={() => {
            dispatch({ type: "START_GAME" });
          }}
        >
          Start Game
        </button>
      )}
      {gameState === "STARTED" && (
        <>
          <PokemonBanner pokeArr={guessedPokemon} />
          <input
            type="text"
            placeholder="Name Pokemon"
            className="nes-input"
            value={currentPokemon}
            onChange={(e) => {
              dispatch({ type: "TYPE_POKEMON", pokemon: e.target.value });
            }}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                dispatch({
                  type: "SUBMIT_POKEMON",
                  pokemon: e.target.value.trim(),
                });
              }
            }}
          />
          <button
            onClick={() => {
              dispatch({ type: "END_GAME" });
            }}
            type="button"
            className="nes-btn is-error"
          >
            I'm done
          </button>
        </>
      )}
      {gameState === "FINISHED" && (
        <>
          <div>Score: {score}</div>
          <button
            onClick={() => {
              dispatch({ type: "START_GAME" });
            }}
            type="button"
            className="nes-btn is-success"
          >
            Try again
          </button>
        </>
      )}
      <style jsx>{`
        input {
          margin: 20px 0;
        }
        .button-mute {
          position: absolute;
          top: 20px;
          right: 20px;
        }
      `}</style>
    </>
  );
}
