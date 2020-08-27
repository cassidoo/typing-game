export default function MuteButton({ soundOn, dispatch }) {
  let toggleSound = () => {
    if (soundOn) {
      dispatch({ type: "MUTE" });
    } else {
      dispatch({ type: "UNMUTE" });
    }
  };

  return (
    <>
      <button className={`nes-btn`} onClick={toggleSound}>
        {soundOn ? "Sound!" : "Silence!"}
      </button>
      <style jsx>{`
        button {
          position: absolute;
          top: 20px;
          right: 20px;
        }
      `}</style>
    </>
  );
}
