import { useEffect } from "react";

export default function usePokeApi(mostRecentlySubmitted, dispatch) {
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
