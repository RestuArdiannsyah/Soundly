import { useState, useEffect, useCallback, useRef } from "react";
import InputLabel from "../components/InputLabel";
import Button from "../components/Button";
import {
  getSpotifyToken,
  searchSpotifyTracks,
  debounce,
} from "../services/Send";

// IMPORT CONFIG DAN ENGINE FIRESTORE
import { db } from "../services/Firebase";
import { collection, doc, setDoc, serverTimestamp } from "firebase/firestore";

const FormSend = () => {
  const [token, setToken] = useState("");
  const [results, setResults] = useState([]);
  const [selectedTrack, setSelectedTrack] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Ambil Access Token Spotify di awal komponen dimuat
  useEffect(() => {
    const fetchToken = async () => {
      const accessToken = await getSpotifyToken();
      if (accessToken) setToken(accessToken);
    };
    fetchToken();
  }, []);

  // Fungsi penembak API Spotify
  const searchTracks = async (query, currentToken) => {
    if (query.trim() === "") {
      setResults([]);
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    const tracks = await searchSpotifyTracks(query, currentToken);
    setResults(tracks);
    setIsLoading(false);
    setShowDropdown(true);
  };

  // Simpan instance penunda waktu debounce ke dalam useRef agar memori tetap konstan
  const debouncedSearchRef = useRef(
    debounce((query, currentToken) => {
      searchTracks(query, currentToken);
    }, 500),
  );

  // Fungsi pembungkus callback pencarian agar patuh aturan linter React
  const debouncedSearch = useCallback((query, currentToken) => {
    debouncedSearchRef.current(query, currentToken);
  }, []);

  // Dipicu hanya saat kolom pencarian lagu diketik oleh user
  const handleSongChange = (e) => {
    const value = e.target.value;
    if (value === "") {
      setSelectedTrack(null);
      setResults([]);
      setShowDropdown(false);
      return;
    }
    debouncedSearch(value, token);
  };

  // Dipicu saat user memilih salah satu item lagu dari dropdown menu
  const handleSelectTrack = (item) => {
    setSelectedTrack(item);
    setShowDropdown(false);

    const songInput = document.getElementById("song");
    if (songInput) {
      songInput.value = item.rawTrack.name;
    }
  };

  // Mengubah semua nilai 'undefined' bawaan Spotify menjadi 'null' agar tidak dicrash oleh Firestore
  const cleanUndefinedValues = (obj) => {
    if (obj === null || obj === undefined) return null;
    if (Array.isArray(obj)) return obj.map(cleanUndefinedValues);
    if (typeof obj === "object") {
      return Object.fromEntries(
        Object.entries(obj).map(([key, value]) => [
          key,
          cleanUndefinedValues(value),
        ]),
      );
    }
    return obj;
  };

  // Handler pengiriman data ke Firebase Firestore
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return;

    const recipientName = e.target.name.value.trim();
    const message = e.target.message.value.trim();

    if (!recipientName || !message) {
      alert("Please fill in all fields.");
      return;
    }

    setIsSubmitting(true);

    try {
      // 1. Ambil rujukan ke lokasi nama koleksi target "messages"
      const messagesCollectionRef = collection(db, "messages");

      // 2. Buat dokumen kosong terlebih dahulu untuk mengunci ID uniknya di awal
      const newDocRef = doc(messagesCollectionRef);
      const messageId = newDocRef.id;

      // 3. Susun URL kustom dinamis memanfaatkan ID dokumen tersebut
      const messageUrl = `https://thesoundly/messages/${messageId}`;

      // Bersihkan struktur data musik dari properti undefined
      const spotifyMusicData = selectedTrack
        ? cleanUndefinedValues(selectedTrack.rawTrack)
        : null;

      // 4. Gabungkan seluruh data ke dalam satu kesatuan objek dokumen
      const docData = {
        id: messageId,
        url: messageUrl,
        recipientName: recipientName,
        message: message,
        music: spotifyMusicData,
        createdAt: serverTimestamp(),
      };

      // 5. Eksekusi penyimpanan data permanen menggunakan perintah setDoc
      await setDoc(newDocRef, docData);

      // === TAMBAHKAN LOGIKA INI DI BAWAHNYA ===
      const existingHistory =
        JSON.parse(localStorage.getItem("soundly_history_ids")) || [];
      existingHistory.push(messageId);
      localStorage.setItem(
        "soundly_history_ids",
        JSON.stringify(existingHistory),
      );
      // ========================================

      console.log("Document successfully written with ID: ", messageId);
      console.log("Generated Link URL: ", messageUrl);

      alert("Message sent successfully!");

      // Reset form dan state ke kondisi kosong bawaan
      e.target.reset();
      setSelectedTrack(null);
      setResults([]);
    } catch (error) {
      console.error("Error adding document to Firestore: ", error);
      alert("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="mt-12 space-y-5 font-body">
        <InputLabel
          label="Recipient Name"
          id="name"
          type="text"
          placeholder="Enter the recipient's name"
          name="name"
        />

        <InputLabel
          label="Message"
          id="message"
          type="textarea"
          placeholder="Write your message here"
          name="message"
        />

        <div className="relative">
          <InputLabel
            label="Search Song"
            id="song"
            type="text"
            placeholder="Type the song you want to send"
            name="song"
            onChange={handleSongChange}
            onFocus={() => results.length > 0 && setShowDropdown(true)}
            autoComplete="off"
          />

          {isLoading && (
            <div className="absolute text-xs pointer-events-none right-3 top-9 text-zinc-400 animate-pulse">
              Searching...
            </div>
          )}

          {showDropdown && results.length > 0 && (
            <div className="absolute z-50 w-full mt-2 overflow-y-auto bg-white border divide-y shadow-lg border-zinc-200 rounded-xl max-h-64 divide-zinc-100 dark:bg-zinc-950 dark:border-zinc-800 dark:divide-zinc-900">
              {results.map((item) => (
                <div
                  key={item.rawTrack.id}
                  onClick={() => handleSelectTrack(item)}
                  className="flex items-center gap-3 p-2 transition-colors cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-900"
                >
                  <img
                    src={item.uiAlbumArt}
                    alt={item.rawTrack.name}
                    className="object-cover w-10 h-10 rounded-lg shadow-xs"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold truncate text-zinc-900 dark:text-zinc-100">
                      {item.rawTrack.name}
                    </p>
                    <p className="text-xs truncate text-zinc-500 dark:text-zinc-400">
                      {item.rawTrack.artists.map((art) => art.name).join(", ")}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {selectedTrack && (
          <div className="w-full mt-2 transition-all duration-300">
            <iframe
              src={`https://open.spotify.com/embed/track/${selectedTrack.rawTrack.id}`}
              width="50%"
              height="80"
              frameBorder="0"
              allowFullScreen=""
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            ></iframe>
          </div>
        )}

        <div className="pt-2">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Sending..." : "Send"}
          </Button>
        </div>
      </form>

      {showDropdown && (
        <div
          className="fixed inset-0 z-40 bg-transparent"
          onClick={() => setShowDropdown(false)}
        />
      )}
    </>
  );
};

export default FormSend;
