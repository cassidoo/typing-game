import Head from "next/head";

import Game from "@components/Game";
import MuteButton from "@components/MuteButton";
import Footer from "@components/Footer";

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Pokémon Naming Game</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* <MuteButton /> */}
      <main>
        <Game />
      </main>

      <Footer />

      <style jsx>{`
        .container {
          height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
      `}</style>
    </div>
  );
}
