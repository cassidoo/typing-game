import { useReducer, useEffect } from "react";
import Header from "@components/Header";
import pokemon from "@components/pokemon";

export default function Game() {
  let initialState = {
    gameState: "NOT_STARTED",
    // not started, in progress, finished
    score: 0,
    currentPokemon: "",
  };

  let [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case "START_GAME": {
        return { ...state, gameState: "STARTED" };
      }
      case "END_GAME": {
        return { ...state, gameState: "FINISHED", currentPokemon: "" };
      }
      case "RESTART_GAME": {
        return { ...state, gameState: "STARTED", score: 0 };
      }
      case "SET_POKEMON": {
        return { ...state, currentPokemon: action.pokemon };
      }
      default: {
        throw new Error("Unrecognized state");
      }
    }
  }, initialState);

  let { gameState, score, currentPokemon } = state;

  return (
    <>
      <Header text="get typin loser" />
      {gameState === "NOT_STARTED" && (
        <button
          onClick={() => {
            dispatch({ type: "START_GAME" });
          }}
        >
          Start Game
        </button>
      )}
      {gameState === "STARTED" && (
        <>
          <input
            type="text"
            placeholder="Name Pokemon"
            value={currentPokemon}
            onChange={(e) => {
              if (event.key === " ") {
                dispatch({
                  type: "SET_POKEMON",
                  pokemon: e.target.value.trim(),
                });
              }
            }}
          />
          <button
            onClick={() => {
              dispatch({ type: "END_GAME" });
            }}
          >
            Give up
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
          >
            Try again
          </button>
        </>
      )}
    </>
  );
}
