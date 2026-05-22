import { Link } from "react-router-dom";

const CardPreview = ({
  className = "w-full",
  data = {},
  isLink = true, // Defaultnya dipakai sebagai Link menuju detail
}) => {
  // Destructuring data dengan nilai fallback agar tidak error jika data kosong
  const {
    id = "",
    recipientName = "Name",
    message = "Lorem ipsum dolor sit amet...",
    music = null,
    createdAt,
  } = data;

  // FORMAT TANGGAL PINTAR: Mendukung Firebase Timestamp & Angka Timestamp hasil Cache
  const displayDate = (() => {
    if (!createdAt) return "Date";

    // Jika tipe datanya adalah objek Timestamp asli Firebase (punya fungsi toDate)
    if (typeof createdAt.toDate === "function") {
      return createdAt
        .toDate()
        .toLocaleDateString("en-US", { month: "short", day: "numeric" });
    }

    // Jika tipe datanya sudah berubah jadi angka milidetik (efek dari sessionStorage cache)
    return new Date(createdAt).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  })();

  // KUNCI PERBAIKAN: Mengubah fungsi () => menjadi variabel JSX murni biasa (Tanpa deklarasi komponen dalam komponen)
  const cardContentInner = (
    <div
      className={`p-6 group text-left transition-all duration-300 bg-white border shadow-sm border-zinc-200 rounded-2xl hover:shadow-md dark:bg-zinc-900 dark:border-zinc-800 ${className}`}
    >
      {/* Info Penerima & Tanggal */}
      <div className="flex items-baseline justify-between gap-4 mb-4">
        <h1 className="flex items-center gap-1 text-sm font-medium text-zinc-500 dark:text-zinc-400">
          To:
          <span className="font-semibold capitalize text-zinc-900 dark:text-zinc-100">
            {recipientName}
          </span>
        </h1>
        <p className="text-xs text-zinc-400 dark:text-zinc-500">
          {displayDate}
        </p>
      </div>

      {/* Isi Pesan Utama */}
      <p className="mb-6 text-4xl leading-snug tracking-wide truncate font-reenie text-zinc-800 dark:text-zinc-100">
        {message}
      </p>

      {/* Info Lagu */}
      {music ? (
        <div className="flex items-center gap-3.5">
          <img
            src={
              music.album?.images?.[2]?.url ||
              "https://i.scdn.co/image/ab67616d0000b2735bd00b369e89c5cbc74d827b"
            }
            alt="Album Art"
            className="object-cover w-12 h-12 transition duration-300 shadow-xs rounded-xl grayscale group-hover:grayscale-0"
          />
          <div className="flex flex-col flex-1 min-w-0">
            <p className="text-sm font-semibold truncate text-zinc-900 dark:text-zinc-100">
              {music.name}
            </p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate mt-0.5">
              {music.artists?.map((art) => art.name).join(", ")}
            </p>
          </div>
        </div>
      ) : (
        <p className="text-xs italic text-zinc-400">No song attached</p>
      )}
    </div>
  );

  // Jika properti isLink aktif dan id dokumen tersedia, bungkus dengan rute Link
  if (isLink && id) {
    return (
      <Link to={`/messages/${id}`} className="block w-full">
        {cardContentInner}
      </Link>
    );
  }

  // Jika isLink dinonaktifkan (seperti di Marquee), kembalikan variabel kartu polos saja
  return cardContentInner;
};

export default CardPreview;