import { useReducer } from "react";

import usePokeCry from "@hooks/usePokeCry";
import useBattleSound from "@hooks/useBattleSound";
import useSuccessSound from "@hooks/useSuccessSound";

import pokemonArray from "@components/pokemon";

import { loadState, saveState } from "@utils/localStorage";

export default function useGameReducer() {
  let localState = loadState();

  let initialState = {
    gameState: "NOT_STARTED",
    // not started, in progress, finished
    score: 0,
    currentPokemon: "",
    mostRecentlySubmitted: "",
    guessedPokemon: [],
    soundOn: localState ? localState.soundOn : true,
    scores: localState?.scores || [],
  };

  let [battleSound, stopBattleSound] = useBattleSound();
  let [successSound, stopSuccessSound] = useSuccessSound();

  let [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case "START_GAME": {
        stopSuccessSound();
        if (state.soundOn) battleSound();
        return { ...state, gameState: "STARTED", score: 0 };
      }
      case "END_GAME": {
        stopBattleSound();
        if (state.soundOn) successSound();

        let newScores = state.scores.concat({
          score: state.score,
          date: new Date().toLocaleDateString(),
        });

        saveState({
          ...localState,
          scores: newScores,
        });
        return {
          ...state,
          gameState: "FINISHED",
          currentPokemon: "",
          guessedPokemon: [],
          scores: newScores,
        };
      }
      case "VIEW_HS_TABLE": {
        stopSuccessSound();
        return { ...state, gameState: "NOT_STARTED" };
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
        stopBattleSound();
        stopSuccessSound();
        saveState({ ...localState, soundOn: false });
        return { ...state, soundOn: false };
      }
      case "UNMUTE": {
        if (state.gameState === `STARTED`) battleSound();
        if (state.gameState === `FINISHED`) successSound();
        saveState({ ...localState, soundOn: true });
        return { ...state, soundOn: true };
      }
      default: {
        throw new Error("Unrecognized state");
      }
    }
  }, initialState);

  return [state, dispatch];
}
