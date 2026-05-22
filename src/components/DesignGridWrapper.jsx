const DesignGridWrapper = ({ children }) => {
  return (
    /* Container utama tetap diberi ruang (p-12) agar garis-garis tagar memanjang keluar */
    <div className="relative flex items-center justify-center text-center select-none p-14">
      {/* ================= GARIS HORIZONTAL (GARIS ATAS & BAWAH) ================= */}
      <div className="absolute left-0 right-0 h-px top-12 bg-zinc-200/80 dark:bg-zinc-700/40" />
      <div className="absolute left-0 right-0 h-px bottom-12 bg-zinc-200/80 dark:bg-zinc-700/40" />

      {/* ================= GARIS VERTIKAL (GARIS KIRI & KANAN) ================= */}
      <div className="absolute top-0 bottom-0 w-px left-12 bg-zinc-200/80 dark:bg-zinc-700/40" />
      <div className="absolute top-0 bottom-0 w-px right-12 bg-zinc-200/80 dark:bg-zinc-700/40" />

      {/* ================= INDIKATOR LINGKARAN DI TENGAH-TENGAH GARIS ================= */}
      {/* 1. Tengah Atas */}
      {/* <div className="absolute w-3 h-3 -translate-x-1/2 -translate-y-1/2 bg-white border rounded-full top-12 left-1/2 border-zinc-200/80 dark:border-zinc-800 dark:bg-zinc-950" /> */}

      {/* 2. Tengah Bawah */}
      {/* <div className="absolute w-3 h-3 -translate-x-1/2 translate-y-1/2 bg-white border rounded-full bottom-12 left-1/2 border-zinc-200/80 dark:border-zinc-800 dark:bg-zinc-950" /> */}

      {/* 3. Tengah Kiri */}
      {/* <div className="absolute w-3 h-3 -translate-x-1/2 -translate-y-1/2 bg-white border rounded-full left-12 top-1/2 border-zinc-200/80 dark:border-zinc-800 dark:bg-zinc-950" /> */}

      {/* 4. Tengah Kanan */}
      {/* <div className="absolute w-3 h-3 translate-x-1/2 -translate-y-1/2 bg-white border rounded-full right-12 top-1/2 border-zinc-200/80 dark:border-zinc-800 dark:bg-zinc-950" /> */}

      {/* ================= KONTEN TEKS UTAMA DI TENGAH ================= */}
      <div className="relative z-10 px-4 py-2 text-sm font-medium tracking-wide bg-transparent text-zinc-800 dark:text-zinc-200">
        {children}
      </div>
    </div>
  );
};

export default DesignGridWrapper;
