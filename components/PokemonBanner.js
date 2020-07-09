export default function PokemonBanner({ pokeArr }) {
  return (
    <div>
      <PokemonSprite pokeNum={5} />
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
          width: 64px;
          height: 64px;
          background: url("/sprites.png") no-repeat -${col}px -${row}px;
        }
      `}</style>
    </>
  );
}
