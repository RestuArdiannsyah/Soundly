import { Link } from "react-router-dom";
import { MoveRight } from "lucide-react";
import spotifylogo from "../../assets/spotify.jpg";
import spotifylogowhite from "../../assets/logospotifywhite.png";
import BorderGlow from "../../components/BorderGlow";

const RightSection = () => {
  return (
    <div className="max-w-xl space-y-6">
      <h1 className="text-5xl font-bold leading-tight lg:text-6xl font-reenie dark:text-zinc-100">
        A collection of countless moments, sent through song
      </h1>

      <p className="mb-3 text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
        Let the music convey your messages.
      </p>

      <BorderGlow
        edgeSensitivity={30}
        glowColor="var(--glow-color)"
        backgroundColor="var(--glow-bg)"
        borderRadius={28}
        glowRadius={60}
        glowIntensity={1}
        coneSpread={25}
        animated
        colors={["var(--glow-line)", "#f472b6", "#38bdf8"]}
        className="w-max"
      >
        <Link
          to="/send"
          className="flex items-center gap-2 px-6 py-3 font-medium text-white transition rounded-full group w-max"
        >
          Tell your story{" "}
          <MoveRight className="transition-all duration-300 group-hover:ml-4 group-hover:animate-pulse" />
        </Link>
      </BorderGlow>
      <p className="flex items-center gap-2 font-semibold text-zinc-800 dark:text-zinc-200">
        Songs by{" "}
        <img src={spotifylogo} alt="Spotify" className="w-20 dark:hidden" />
        <img
          src={spotifylogowhite}
          alt="Spotify"
          className="hidden w-20 dark:block"
        />
      </p>
    </div>
  );
};

export default RightSection;
