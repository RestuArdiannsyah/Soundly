import { useEffect, useState } from "react";
import Stack from "../../components/Stack";
import { getSpotifyToken } from "../../services/Send"; // Import fungsi token yang sudah kita buat

// KUNCI PERBAIKAN: Pindahkan default images ke luar komponen agar tidak dibuat ulang setiap render
const DEFAULT_IMAGES = [
  "https://i.scdn.co/image/ab67616d0000b2735bd00b369e89c5cbc74d827b",
  "https://i.scdn.co/image/ab67616d00001e02bc755429117cac056edd2bf7",
  "https://cdn-images.dzcdn.net/images/cover/23cc662ac90d414741c26754e0105d9d/1900x1900-000000-80-0-0.jpg",
  "https://images.genius.com/a2a3e14697c360bbcdab89c90a76cfac.1000x1000x1.png",
];

const LeftSection = () => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTopIndonesiaTracks = async () => {
      try {
        const LOCAL_STORAGE_KEY = "soundly_top_tracks_images";
        const LOCAL_STORAGE_DATE_KEY = "soundly_top_tracks_date";

        const todayDate = new Date().toDateString(); // Contoh hasil: "Fri May 22 2026"
        const savedDate = localStorage.getItem(LOCAL_STORAGE_DATE_KEY);
        const savedImages = localStorage.getItem(LOCAL_STORAGE_KEY);

        // CEK 1 HARI SEKALI: Jika hari ini sama dengan hari penyimpanan, gunakan data lokal (Cache)
        if (savedDate === todayDate && savedImages) {
          setImages(JSON.parse(savedImages));
          setIsLoading(false);
          return;
        }

        // JIKA BERBEDA HARI: Ambil data baru dari Spotify API
        const token = await getSpotifyToken();
        if (!token) throw new Error("Failed to get Spotify Token");

        // Mencari trek terpopuler di Indonesia menggunakan query spesifik kawasan 'tag:new' atau genre pop populer
        const response = await fetch(
          "https://api.spotify.com/v1/search?q=$?q=year:2026&type=track&market=ID&limit=6",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const data = await response.json();
        const tracks = data.tracks?.items || [];

        if (tracks.length > 0) {
          // Ambil gambar album resolusi sedang/tinggi (index 1 atau 0) dari lagu-lagu tersebut
          const albumImages = tracks.map(
            (track) => track.album.images[1]?.url || track.album.images[0]?.url,
          );

          // Simpan hasil ke state dan simpan ke localStorage agar awet selama 24 jam
          setImages(albumImages);
          localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(albumImages));
          localStorage.setItem(LOCAL_STORAGE_DATE_KEY, todayDate);
        } else {
          setImages(DEFAULT_IMAGES);
        }
      } catch (error) {
        console.error("Error fetching daily Spotify tracks:", error);
        setImages(DEFAULT_IMAGES); // Gunakan gambar bawaan jika error
      } finally {
        setIsLoading(false);
      }
    };

    fetchTopIndonesiaTracks();
  }, []); // Array kosong sekarang 100% aman dan tidak memicu warning lagi

  // Tampilkan efek loading tipis selagi mengecek/mengambil data gambar
  if (isLoading) {
    return (
      <div
        className="w-full max-w-md overflow-hidden rounded-3xl bg-zinc-100 dark:bg-zinc-800/50 animate-pulse"
        style={{ width: 350, height: 350 }}
      />
    );
  }

  return (
    <div className="w-full max-w-md overflow-hidden">
      <div style={{ width: 350, height: 350 }}>
        <Stack
          randomRotation={false}
          sensitivity={200}
          sendToBackOnClick={true}
          cards={images.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`card-${i + 1}`}
              // style={{ width: "100%", height: "100%", objectFit: "cover" }}
              className="object-cover h-70 w-70 lg:h-full lg:w-full rounded-3xl"
            />
          ))}
          autoplay={false}
          autoplayDelay={3000}
          pauseOnHover={false}
        />
      </div>
    </div>
  );
};

export default LeftSection;
