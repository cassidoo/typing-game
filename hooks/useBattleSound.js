import useSound from "use-sound";

export default function useBattleSound() {
  const sound = `https://res.cloudinary.com/jlengstorf/video/upload/v1596143031/cassidoo/trainer-battle-mp3.mp3`;

  const [play, { stop }] = useSound(sound);

  return [play, stop];
}
