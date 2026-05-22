import { Info } from "lucide-react";

const InfoPage = ({ title, description }) => {
  return (
    <div className="p-5 border bg-zinc-100/80 border-zinc-200/80 rounded-xl text-zinc-900 dark:bg-zinc-900/50 dark:border-zinc-800 dark:text-zinc-100 backdrop-blur-sm">
      <div className="flex items-center gap-3 mb-2">
        {/* Ikon diberi sentuhan warna aksen (misal indigo atau sky biru modern) agar estetik */}
        <Info className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />

        <h1 className="font-semibold text-zinc-900 dark:text-zinc-50 text-[15px]">
          {title}
        </h1>
      </div>

      {/* Teks deskripsi dibuat sedikit lebih redup (zinc-600 / zinc-400) agar ada hierarki visual yang jelas */}
      <p className="ml-8 text-sm font-normal leading-relaxed text-zinc-600 dark:text-zinc-400">
        {description}
      </p>
    </div>
  );
};

export default InfoPage;
