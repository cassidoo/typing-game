import useSound from "use-sound";

export default function useSuccessSound() {
  const sound = `https://res.cloudinary.com/jlengstorf/video/upload/v1596143088/cassidoo/trainer-defeated-mp3.mp3`;

  const [play, { stop }] = useSound(sound);

  return [play, stop];
}
