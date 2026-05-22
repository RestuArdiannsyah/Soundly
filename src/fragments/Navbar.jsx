import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom"; // KUNCI 1: Import NavLink dari react-router-dom
import { Sun, Moon, X } from "lucide-react";

const Navbar = () => {
  const [theme, setTheme] = useState(() => {
    const saved =
      typeof window !== "undefined" ? localStorage.getItem("theme") : null;
    return saved ? saved : "light";
  });

  const [showBanner, setShowBanner] = useState(() => {
    const isDismissed =
      typeof window !== "undefined"
        ? localStorage.getItem("notification_migration")
        : null;
    return isDismissed === "true" ? false : true;
  });

  useEffect(() => {
    const root = document.documentElement;

    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const handleCloseBanner = () => {
    setShowBanner(false);
    localStorage.setItem("notification_migration", "true");
  };

  // KUNCI 2: Fungsi pembantu untuk menentukan class warna teks secara dinamis
  const getNavLinkClass = ({ isActive }) => {
    return isActive
      ? "text-zinc-900 dark:text-zinc-100 font-medium transition-colors duration-300" // Warna Terang Aktif
      : "text-zinc-400 dark:text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors duration-200"; // Warna Redup Tidak Aktif
  };

  return (
    <div className="fixed top-0 left-0 z-50 flex flex-col w-full shadow-sm">
      {/* 1. KONTEN UTAMA NAVBAR */}
      <div className="flex items-center justify-between w-full p-4 bg-white border-b border-zinc-200 lg:px-36 dark:bg-zinc-800 dark:border-zinc-700">
        <div>
          <Link
            to="/"
            className="text-3xl font-medium font-reenie text-zinc-900 dark:text-zinc-100"
          >
            <span className="hidden lg:block">Soundly</span>
            <span className="block lg:hidden">sly</span>
          </Link>
        </div>

        {/* KUNCI 3: Mengganti kontainer teks global zinc-800 dan menerapkan fungsi kelas ke NavLink */}
        <div className="flex items-center gap-6 text-sm font-body">
          <NavLink to="/send" className={getNavLinkClass}>
            Send
          </NavLink>
          <NavLink to="/browse" className={getNavLinkClass}>
            Browse
          </NavLink>
          <NavLink to="/history" className={getNavLinkClass}>
            History
          </NavLink>

          <button
            onClick={toggleTheme}
            className="cursor-pointer text-zinc-500 dark:text-zinc-400"
          >
            {theme === "light" ? (
              <Moon className="w-5 h-5 transition-all duration-300 hover:rotate-45" />
            ) : (
              <Sun className="w-5 h-5 transition-all duration-300 hover:rotate-45" />
            )}
          </button>
        </div>
      </div>

      {/* 2. BARIS BANNER PEMBERITAHUAN MIGRASI (BIRU) */}
      {showBanner && (
        <div className="flex items-center justify-between w-full px-3 py-1 text-xs tracking-wide text-white bg-blue-600 sm:text-sm animate-slideDown lg:px-36 dark:bg-blue-700">
          <div className="flex-1 text-xs text-center lg:text-sm">
            🎉 Soundly is here! We’ve officially moved from{" "}
            <span className="font-medium underline decoration-indigo-200">
              <Link
                to="https://speakithup.web.app"
                target="_blank"
                rel="noopener noreferrer"
              >
                speakithup.web.app
              </Link>
            </span>
            . A new place to share moments through music.
          </div>

          <button
            onClick={handleCloseBanner}
            className="p-1 ml-2 transition rounded-full cursor-pointer hover:bg-blue-500/50 text-white/90 hover:text-white"
            aria-label="Close notification"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
