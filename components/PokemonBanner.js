import { useState, useEffect } from "react";

export default function PokemonBanner({ pokeArr }) {
  return (
    <div className="sprite-container">
      {pokeArr.map((id) => {
        return <PokemonSprite pokeNum={id} />;
      })}
      <style jsx>{`
        .sprite-container {
          max-width: 400px;
        }
      `}</style>
    </div>
  );
}

function PokemonSprite({ pokeNum }) {
  let row = Math.floor(pokeNum / 16) * 64;
  let col = ((pokeNum % 16) - 1) * 64;

  return (
    <>
      <div className="sprite"></div>
      <style jsx>{`
        .sprite {
          display: inline-block;
          width: 64px;
          height: 64px;
          background: url("/sprites.png") no-repeat -${col}px -${row}px;
        }
      `}</style>
    </>
  );
}
