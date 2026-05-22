import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Untuk menangkap ID dari URL
import { db } from "../services/Firebase"; // Import konfigurasi Firebase kamu
import { doc, getDoc } from "firebase/firestore";
import MainLayouts from "../layouts/MainLayouts";
import Footer from "../fragments/Footer";

const Messages = () => {
  const { id } = useParams(); // Mengambil id dari URL misal: /messages/:id
  const [messageData, setMessageData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        if (!id) return;

        // Ambil rujukan dokumen berdasarkan ID dari koleksi "messages"
        const docRef = doc(db, "messages", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          // Jika data ada, simpan ke dalam state
          setMessageData(docSnap.data());
        } else {
          console.log("No such document found!");
        }
      } catch (error) {
        console.error("Error fetching message data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMessage();
  }, [id]);

  // Fungsi pembantu untuk memformat stempel waktu server (createdAt) menjadi teks yang rapi
  const formatSentDate = (timestamp) => {
    if (!timestamp) return "";
    // Mengubah format Firebase Timestamp ke JavaScript Date Object
    const date = timestamp.toDate();
    return date.toLocaleString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
      timeZoneName: "short",
    });
  };

  // 1. TAMPILAN LOADING SAAT MENGAMBIL DATA
  if (loading) {
    return (
      <MainLayouts>
        <div className="flex items-center justify-center min-h-[60vh]">
          <p className="text-zinc-500 animate-pulse font-body">
            Loading your message...
          </p>
        </div>
        <Footer />
      </MainLayouts>
    );
  }

  // 2. TAMPILAN JIKA PESAN TIDAK DITEMUKAN / URL SALAH
  if (!messageData) {
    return (
      <MainLayouts>
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4 font-body">
          <h1 className="text-2xl font-bold text-zinc-800 dark:text-zinc-200">
            Message Not Found
          </h1>
          <p className="mt-2 text-zinc-500">
            The link might be broken or the message has been deleted.
          </p>
        </div>
        <Footer />
      </MainLayouts>
    );
  }

  // 3. TAMPILAN UTAMA KETIKA DATA BERHASIL DI-LOAD
  return (
    <>
      <MainLayouts>
        <div className="text-center font-body">
          {/* Recipient Name dari Firestore */}
          <h1 className="mb-4 text-xl dark:text-zinc-100">
            Hello,{" "}
            <span className="text-4xl capitalize font-reenie ">
              {messageData.recipientName}
            </span>
          </h1>
          <p className="text-zinc-700 dark:text-zinc-400">
            Someone sent a song for you. Maybe this song says what she couldn’t
            say.
          </p>

          {/* PERUBAHAN DISINI: iframe polos tanpa tambahan border/padding, tapi full-responsive */}
          {messageData.music ? (
            <iframe
              data-testid="embed-iframe"
              src={`https://open.spotify.com/embed/track/${messageData.music.id}`}
              className="w-full px-4 mx-auto my-8 max-w-120"
              height="252"
              frameBorder="0"
              allowFullScreen
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            ></iframe>
          ) : (
            <div className="w-full p-6 mx-auto my-8 text-sm border max-w-120 rounded-xl bg-zinc-100 dark:bg-zinc-900 text-zinc-500">
              No track was attached to this message.
            </div>
          )}

          <p className="mb-2 text-zinc-700 dark:text-zinc-400">
            She left a message for you too:
          </p>

          {/* Pesan kustom dari Firestore */}
          <h2 className="max-w-xl mx-auto text-5xl leading-relaxed font-reenie text-zinc-900 dark:text-zinc-100">
            {messageData.message}
          </h2>

          {/* Tanggal kirim berbasis serverTimestamp() */}
          <p className="pb-8 mt-40 text-sm text-zinc-500 lg:pb-0">
            Sent on {formatSentDate(messageData.createdAt)}
          </p>
        </div>
      </MainLayouts>
      <Footer />
    </>
  );
};

export default Messages;
