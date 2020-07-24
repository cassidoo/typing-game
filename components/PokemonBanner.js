export default function PokemonBanner({ pokeArr }) {
  return (
    <div className="sprite-container">
      {pokeArr.map((id) => {
        return <PokemonSprite pokeNum={id} key={id} />;
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
  const columns = 16;
  const cellWidth = 64;
  let row = Math.floor((pokeNum - 1) / columns) * cellWidth;
  let col = ((pokeNum - 1) % columns) * cellWidth;

  return (
    <>
      <div className="sprite"></div>
      <style jsx>{`
        .sprite {
          display: inline-block;
          width: ${cellWidth}px;
          height: ${cellWidth}px;
          background: url("/sprites.png") no-repeat -${col}px -${row}px;
        }
      `}</style>
    </>
  );
}
