import { useReducer } from "react";
import useBattleSound from "@hooks/useBattleSound";
import useSuccessSound from "@hooks/useSuccessSound";
import pokemonArray from "@components/pokemon";

export default function useGameReducer() {
  let initialState = {
    gameState: "NOT_STARTED",
    // not started, in progress, finished
    score: 0,
    currentPokemon: "",
    mostRecentlySubmitted: "",
    guessedPokemon: [],
    soundOn: true,
  };

  let [battleSound, stopBattleSound] = useBattleSound();
  let [successSound, stopSuccessSound] = useSuccessSound();

  let [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case "START_GAME": {
        stopSuccessSound();
        battleSound({ forceSoundEnabled: state.soundOn });
        return { ...state, gameState: "STARTED", score: 0 };
      }
      case "END_GAME": {
        stopBattleSound();
        successSound({ forceSoundEnabled: state.soundOn });
        return {
          ...state,
          gameState: "FINISHED",
          currentPokemon: "",
          guessedPokemon: [],
        };
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
      case "MUTE": {
        return { ...state, soundOn: false };
      }
      case "UNMUTE": {
        return { ...state, soundOn: true };
      }
      default: {
        throw new Error("Unrecognized state");
      }
    }
  }, initialState);

  return [state, dispatch];
}
