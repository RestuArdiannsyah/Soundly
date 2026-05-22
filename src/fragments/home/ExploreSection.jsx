import { useEffect, useState } from "react";
import CardPreview from "../../components/CardPreview";

// IMPORT ENGINE FIRESTORE
import { db } from "../../services/Firebase"; // Sesuaikan jalur impor db Firebase kamu
import { collection, getDocs } from "firebase/firestore";

const ExploreSection = () => {
  const [randomCards, setRandomCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAndShuffleMessages = async () => {
      try {
        const CACHE_KEY = "soundly_explore_random_cache";
        const cachedData = sessionStorage.getItem(CACHE_KEY);

        if (cachedData) {
          setRandomCards(JSON.parse(cachedData));
          setIsLoading(false);
          return;
        }

        const messagesRef = collection(db, "messages");
        const querySnapshot = await getDocs(messagesRef);

        const allMessages = [];
        querySnapshot.forEach((doc) => {
          allMessages.push(doc.data());
        });

        if (allMessages.length > 0) {
          const shuffled = allMessages.sort(() => 0.5 - Math.random());
          const selectedData = shuffled.slice(0, 10);

          const cleanDataForCache = selectedData.map((msg) => {
            return {
              ...msg,
              createdAt:
                msg.createdAt && typeof msg.createdAt.toDate === "function"
                  ? msg.createdAt.toDate().getTime()
                  : msg.createdAt,
            };
          });

          setRandomCards(cleanDataForCache);
          sessionStorage.setItem(CACHE_KEY, JSON.stringify(cleanDataForCache));
        }
      } catch (error) {
        console.error("Error fetching messages for explore section:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAndShuffleMessages();
  }, []);

  const placeholderCards = Array.from({ length: 6 });

  return (
    <section className="relative py-20 space-y-8 overflow-hidden dark:bg-zinc-800">
      {/* Blur kiri */}
      <div className="absolute top-0 left-0 z-10 hidden w-64 h-full pointer-events-none md:block bg-linear-to-r from-white to-transparent dark:from-zinc-800" />

      {/* Blur kanan */}
      <div className="absolute top-0 right-0 z-10 hidden w-64 h-full pointer-events-none md:block bg-linear-to-l from-white to-transparent dark:from-zinc-800" />

      {/* Title */}
      <div className="relative z-20 mb-14">
        <h1 className="text-5xl font-semibold text-center font-reenie dark:text-zinc-100">
          What Do They Say?
        </h1>

        <p className="px-4 mt-3 text-lg text-center text-zinc-600 dark:text-zinc-300 lg:px-36">
          Every song carries a message. Explore the stories and emotions shared
          by others through music.
        </p>
      </div>

      {/* Marquee Area */}
      <div className="space-y-6 -rotate-1">
        {isLoading ? (
          /* TAMPILAN LOADING SKELETON */
          <>
            <div className="flex w-full gap-6 overflow-hidden">
              <div className="flex gap-6 animate-marquee shrink-0 w-max">
                {placeholderCards.map((_, index) => (
                  <div
                    key={index}
                    className="w-80 h-54.5 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl animate-pulse shrink-0"
                  />
                ))}
              </div>
              <div
                className="flex gap-6 animate-marquee shrink-0 w-max"
                aria-hidden="true"
              >
                {placeholderCards.map((_, index) => (
                  <div
                    key={`dup-${index}`}
                    className="w-80 h-54.5 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl animate-pulse shrink-0"
                  />
                ))}
              </div>
            </div>
          </>
        ) : randomCards.length === 0 ? (
          <div className="py-10 text-sm text-center text-zinc-400">
            No shared moments found. Be the first to share one!
          </div>
        ) : (
          /* TAMPILAN MARQUEE SEAMLESS TANPA JEDA */
          <>
            {/* BARIS ATAS → KIRI */}
            <div className="flex w-full gap-6 overflow-hidden select-none">
              {/* Blok Utama */}
              <div className="flex gap-6 animate-marquee shrink-0 w-max">
                {randomCards.map((message, index) => (
                  <CardPreview
                    className="w-80 shrink-0"
                    key={`top-1-${index}`}
                    data={message}
                    isLink={false}
                  />
                ))}
              </div>
              {/* Blok Duplikat (Ekor Penyambung) */}
              <div
                className="flex gap-6 animate-marquee shrink-0 w-max"
                aria-hidden="true"
              >
                {randomCards.map((message, index) => (
                  <CardPreview
                    className="w-80 shrink-0"
                    key={`top-2-${index}`}
                    data={message}
                    isLink={false}
                  />
                ))}
              </div>
            </div>

            {/* BARIS BAWAH → KANAN */}
            <div className="flex w-full gap-6 overflow-hidden select-none">
              {/* Blok Utama */}
              <div className="flex gap-6 animate-marquee-reverse shrink-0 w-max">
                {Array.from(randomCards)
                  .reverse()
                  .map((message, index) => (
                    <CardPreview
                      className="w-80 shrink-0"
                      key={`bottom-1-${index}`}
                      data={message}
                      isLink={false}
                    />
                  ))}
              </div>
              {/* Blok Duplikat (Ekor Penyambung) */}
              <div
                className="flex gap-6 animate-marquee-reverse shrink-0 w-max"
                aria-hidden="true"
              >
                {Array.from(randomCards)
                  .reverse()
                  .map((message, index) => (
                    <CardPreview
                      className="w-80 shrink-0"
                      key={`bottom-2-${index}`}
                      data={message}
                      isLink={false}
                    />
                  ))}
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default ExploreSection;
