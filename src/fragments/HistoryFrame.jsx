import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DesignGridWrapper from "../components/DesignGridWrapper";
import InfoPage from "../components/InfoPage";

// IMPORT ENGINE FIRESTORE
import { db } from "../services/Firebase";
import { doc, getDoc } from "firebase/firestore";

const HistoryFrame = () => {
  const [historyList, setHistoryList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchHistoryAndFilter = async () => {
      try {
        // 1. Cek apakah di session storage laptop sudah ada cache data history sebelumnya
        const cachedHistory = sessionStorage.getItem("soundly_history_cache");
        const savedIds =
          JSON.parse(localStorage.getItem("soundly_history_ids")) || [];

        // STRATEGI INSTAN: Jika ada cache dan jumlah ID lokal tidak bertambah, langsung pakai data cache!
        if (cachedHistory && savedIds.length > 0) {
          const parsedCache = JSON.parse(cachedHistory);

          // Pastikan jumlah data di cache sama dengan jumlah ID lokal agar tahu tidak ada pesan baru
          if (parsedCache.length === savedIds.length) {
            setHistoryList(parsedCache);
            setIsLoading(false);
            return; // Hentikan fungsi di sini, hindari loading ulang!
          }
        }

        // 2. JIKA KOSONG ATAU ADA DATA BARU: Lakukan penarikan data dari Firebase
        if (savedIds.length === 0) {
          setHistoryList([]);
          sessionStorage.removeItem("soundly_history_cache");
          setIsLoading(false);
          return;
        }

        const validHistory = [];
        const activeIdsStillValid = [];

        const SEVEN_DAYS_IN_MS = 7 * 24 * 60 * 60 * 1000;
        const now = new Date().getTime();

        for (const id of savedIds) {
          const docRef = doc(db, "messages", id);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const data = docSnap.data();

            const createdAtMs = data.createdAt
              ? data.createdAt.toDate().getTime()
              : now;

            if (now - createdAtMs < SEVEN_DAYS_IN_MS) {
              // Untuk cache session storage, kita ubah timestamp firebase menjadi milidetik biasa agar aman di-stringified
              validHistory.push({
                ...data,
                displayDate: createdAtMs, // Disimpan sementara untuk keperluan sortir cache
              });
              activeIdsStillValid.push(id);
            }
          }
        }

        // 3. Sinkronisasi ulang id lokal
        localStorage.setItem(
          "soundly_history_ids",
          JSON.stringify(activeIdsStillValid),
        );

        // Urutkan dari yang paling baru
        validHistory.sort((a, b) => b.displayDate - a.displayDate);

        // 4. AMANKAN CACHE: Simpan hasil akhir filter ke session storage
        setHistoryList(validHistory);
        sessionStorage.setItem(
          "soundly_history_cache",
          JSON.stringify(validHistory),
        );
      } catch (error) {
        console.error("Error loading or cleaning message history:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHistoryAndFilter();
  }, []);

  if (isLoading) {
    return (
      <>
        <InfoPage
          title="History"
          description="View the history of your shared moments. All history is automatically removed after 7 days to keep every moment temporary and meaningful."
        />
        <div className="flex items-center justify-center py-20 font-body">
          <p className="text-sm text-zinc-400 animate-pulse">
            Checking history status...
          </p>
        </div>
      </>
    );
  }

  return (
    <>
      <InfoPage
        title="History"
        description="View the history of your shared moments. All history is automatically removed after 7 days to keep every moment temporary and meaningful."
      />

      {historyList.length === 0 ? (
        <DesignGridWrapper>
          <p className="font-body text-zinc-600 dark:text-zinc-400">
            Looks like there's no history yet! Start by sending your message{" "}
            <Link
              to="/send"
              className="font-semibold underline text-zinc-900 dark:text-zinc-100"
            >
              here
            </Link>
            .
          </p>
        </DesignGridWrapper>
      ) : (
        <div className="w-full py-2 mx-auto mt-8 font-body">
          <div className="w-full overflow-hidden bg-white border divide-y shadow-xs dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 rounded-2xl divide-zinc-100 dark:divide-zinc-800/60">
            {historyList.map((item) => (
              <div
                key={item.id}
                className="flex flex-col justify-between gap-4 p-5 transition-all sm:flex-row sm:items-center hover:bg-zinc-50/50 dark:hover:bg-zinc-800/20"
              >
                <div className="flex-1 min-w-0">
                  <p className="mb-1 text-xs tracking-wider uppercase text-zinc-400">
                    To:{" "}
                    <span className="font-semibold capitalize text-zinc-600 dark:text-zinc-300">
                      {item.recipientName}
                    </span>
                  </p>
                  <p className="max-w-md text-sm font-medium truncate text-zinc-800 dark:text-zinc-200">
                    Song: {item.music ? item.music.name : "No song attached"}
                  </p>
                </div>

                <a
                  href={`/messages/${item.id}`}
                  className="inline-flex items-center justify-center px-4 py-2 text-xs font-medium transition border rounded-lg text-zinc-900 dark:text-zinc-100 border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 shrink-0"
                >
                  Open Link
                </a>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default HistoryFrame;
