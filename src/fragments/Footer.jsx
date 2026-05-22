import { Link } from "react-router-dom";
import spotifylogo from "../assets/spotify.jpg";
import spotifylogowhite from "../assets/logospotifywhite.png";

const Footer = (props) => {
  const { className } = props;
  return (
    <footer
      className={`grid gap-6 px-4 py-6 border-t border-zinc-200 lg:grid-cols-4 lg:px-36 lg:py-10 dark:border-zinc-600 dark:bg-zinc-800 ${className}`}
    >
      <div>
        <h1 className="text-3xl font-reenie dark:text-zinc-100">Soundly</h1>
      </div>

      <div>
        <h1 className="mb-2 font-medium uppercase dark:text-zinc-100">Pages</h1>
        <ul>
          <li className="mb-2 text-zinc-600">
            <Link to="/" className="dark:text-zinc-400">
              Home
            </Link>
          </li>
          <li className="mb-2 text-zinc-600">
            <Link to="/send" className="dark:text-zinc-400">
              Send
            </Link>
          </li>
          <li className="mb-2 text-zinc-600">
            <Link to="/browse" className="dark:text-zinc-400">
              Browse
            </Link>
          </li>
          <li className="mb-2 text-zinc-600">
            <Link to="/history" className="dark:text-zinc-400">
              History
            </Link>
          </li>
        </ul>
      </div>

      <div>
        <h1 className="mb-2 font-medium uppercase dark:text-zinc-100">
          Guidelines
        </h1>
        <ul>
          <li className="mb-2 text-zinc-600">
            <p className="dark:text-zinc-400">Terms of Service</p>
          </li>
          <li className="mb-2 text-zinc-600">
            <p className="dark:text-zinc-400">Privacy Policy</p>
          </li>
          <li className="mb-2 text-zinc-600">
            <p className="dark:text-zinc-400">Message Rules</p>
          </li>
          <li className="mb-2 text-zinc-600">
            <p className="dark:text-zinc-400">Copyright Policy</p>
          </li>
          <li className="mb-2 text-zinc-600">
            <p className="dark:text-zinc-400">Community Guidelines</p>
          </li>
        </ul>
      </div>

      <div className="flex flex-col justify-end font-medium text-zinc-800 dark:text-zinc-200">
        <p>© 2026 Soundly. All rights reserved.</p>
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
    </footer>
  );
};

export default Footer;
