import { useRouteError, Link } from "react-router-dom";
import BorderGlow from "../components/BorderGlow";
import Footer from "../fragments/Footer";

export default function ErrorPage() {
  const error = useRouteError();

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen px-6 font-body dark:bg-zinc-800">
        {/* HUB UTAMA: Tata letak Grid/Flex 2 Kolom yang super bersih */}
        <div className="flex flex-col items-center max-w-2xl gap-6 md:flex-row md:gap-12">
          {/* KOLOM KIRI: Fokus Utama Indikator Angka Error */}
          <div className="flex flex-col justify-center text-center md:text-right md:border-r md:border-zinc-200 md:dark:border-zinc-700/60 md:pr-10 shrink-0">
            <h1 className="font-black tracking-tighter text-8xl md:text-9xl dark:text-zinc-100">
              {error?.status || "404"}
            </h1>

            {/* Teks Alasan / Reason yang sekarang tampil sangat jelas tepat di bawah angka */}
            {(error?.statusText || error?.message) && (
              <p className="mt-1 font-mono text-xs tracking-widest uppercase text-zinc-400 dark:text-zinc-500">
                {error.statusText || error.message}
              </p>
            )}
          </div>

          {/* KOLOM KANAN: Deskripsi Informasi & Tombol Navigasi */}
          <div className="flex flex-col items-center max-w-sm text-center md:items-start md:text-left">
            <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
              The page you are looking for was not found. It might have been
              removed, had its name changed, or is temporarily unavailable.
            </p>

            {/* Tombol Aksi Balik ke Home */}
            <div className="mt-8">
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
                  to="/"
                  className="inline-block px-6 py-3 text-sm font-medium text-white transition rounded-full hover:opacity-80"
                >
                  Back to Home
                </Link>
              </BorderGlow>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
