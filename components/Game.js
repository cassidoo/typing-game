import { useReducer, useEffect } from "react";
import Header from "@components/Header";
import PokemonBanner from "@components/PokemonBanner";
import pokemonArray from "@components/pokemon";

function usePokeApi(mostRecentlySubmitted, dispatch) {
  useEffect(() => {
    let current = true;
    fetch(`https://pokeapi.co/api/v2/pokemon/${mostRecentlySubmitted}/`)
      .then((res) => res.json())
      .then((res) => {
        if (current) {
          dispatch({ type: "OBTAINED_ID", id: res.id });
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
    return () => {
      current = false;
    };
  }, [mostRecentlySubmitted]);
}

function useGameReducer() {
  let initialState = {
    gameState: "NOT_STARTED",
    // not started, in progress, finished
    score: 0,
    currentPokemon: "",
    mostRecentlySubmitted: "",
    guessedPokemon: [],
  };

  let [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case "START_GAME": {
        return { ...state, gameState: "STARTED" };
      }
      case "END_GAME": {
        return {
          ...state,
          gameState: "FINISHED",
          currentPokemon: "",
          guessedPokemon: [],
        };
      }
      case "RESTART_GAME": {
        return { ...state, gameState: "STARTED", score: 0 };
      }
      case "TYPE_POKEMON": {
        return { ...state, currentPokemon: action.pokemon };
      }
      case "SUBMIT_POKEMON": {
        let newScore = state.score;
        if (pokemonArray.includes(action.pokemon)) {
          newScore += 1;

          return {
            ...state,
            currentPokemon: "",
            mostRecentlySubmitted: action.pokemon,
            score: newScore,
          };
        } else {
          newScore -= 1;
          return {
            ...state,
            currentPokemon: "",
            mostRecentlySubmitted: null,
            score: newScore,
          };
        }
      }
      case "OBTAINED_ID": {
        return {
          ...state,
          guessedPokemon: state.guessedPokemon.concat(action.id),
        };
      }
      default: {
        throw new Error("Unrecognized state");
      }
    }
  }, initialState);

  return [state, dispatch];
}

export default function Game() {
  let [state, dispatch] = useGameReducer();
  let {
    gameState,
    score,
    currentPokemon,
    mostRecentlySubmitted,
    guessedPokemon,
  } = state;

  usePokeApi(mostRecentlySubmitted, dispatch);

  return (
    <>
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
              dispatch({ type: "RESTART_GAME" });
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
      `}</style>
    </>
  );
}
