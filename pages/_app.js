import "nes.css/css/nes.min.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <style jsx global>
        {`
          @import "./node_modules/nes.css/css/nes.css";
          @import url("https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap");

          html,
          body {
            padding: 0;
            margin: 0;
            font-family: "Press Start 2P", cursive;
          }

          * {
            box-sizing: border-box;
          }
        `}
      </style>
    </>
  );
}

export default MyApp;
