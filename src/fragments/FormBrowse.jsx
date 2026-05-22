import { useState } from "react";
import { Search } from "lucide-react";
import InputLabel from "../components/InputLabel";
import Button from "../components/Button";
import DesignGridWrapper from "../components/DesignGridWrapper";
import CardPreview from "../components/CardPreview";

// IMPORT ENGINE FIRESTORE (KUNCI 1: Menghapus query dan where yang tidak terpakai)
import { db } from "../services/Firebase";
import { collection, getDocs } from "firebase/firestore";

const FormBrowse = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // KUNCI 2: Menghapus state hasSearched yang menganggur
  const [infoMessage, setInfoMessage] = useState(
    "Explore the latest shared moments or search by recipient name to find your moments.",
  );

  const handleSearch = async (e) => {
    e.preventDefault();
    // Ambil kata kunci pencarian dari user, lalu bersihkan dan ubah ke huruf kecil
    const queryKeyword = e.target.name.value.trim().toLowerCase();

    if (!queryKeyword) {
      alert("Please enter a name or keyword to search.");
      return;
    }

    setIsLoading(true);

    try {
      const messagesRef = collection(db, "messages");

      // 1. Ambil SEMUA dokumen dari koleksi messages di Firebase
      const querySnapshot = await getDocs(messagesRef);

      const allMessages = [];
      querySnapshot.forEach((doc) => {
        allMessages.push(doc.data());
      });

      // 2. LOGIKA PENCARIAN CANGGIH DI FRONTEND:
      // Kita saring menggunakan .filter() dan .includes() agar bisa membaca teks di posisi mana pun
      const filteredResults = allMessages.filter((message) => {
        if (!message.recipientName) return false;

        // Ubah nama penerima dari database ke huruf kecil agar pencarian adil (Case-Insensitive)
        const recipientNameLower = message.recipientName.toLowerCase();

        // Cek apakah kata kunci dari user ada di DALAM nama penerima tersebut
        return recipientNameLower.includes(queryKeyword);
      });

      // 3. Urutkan hasil pencarian berdasarkan tanggal terbaru
      filteredResults.sort(
        (a, b) => b.createdAt?.toDate() - a.createdAt?.toDate(),
      );

      // Simpan hasil saringan ke state untuk ditampilkan
      setSearchResults(filteredResults);

      if (filteredResults.length === 0) {
        setInfoMessage(
          `No messages found containing "${e.target.name.value}". Try another keyword!`,
        );
      }
    } catch (error) {
      console.error("Error searching documents: ", error);
      setInfoMessage("Something went wrong while searching. Please try again.");
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="mt-6">
        <form
          onSubmit={handleSearch}
          className="flex flex-col items-stretch w-full gap-2 sm:flex-row sm:items-center sm:gap-4 font-body"
        >
          <div className="flex-1">
            <InputLabel
              id="name"
              type="text"
              placeholder="Enter the recipient's name"
              name="name"
            />
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full h-10 sm:w-max"
          >
            <Search className="w-4 h-4" />{" "}
            {isLoading ? "Searching..." : "Search"}
          </Button>
        </form>

        {/* CONDITION 1: Tampilkan DesignGridWrapper HANYA jika data kosong atau belum dicari */}
        {(searchResults.length === 0 || isLoading) && (
          <DesignGridWrapper>
            <p className="text-zinc-500 dark:text-zinc-400">
              {isLoading ? "Looking for shared moments..." : infoMessage}
            </p>
          </DesignGridWrapper>
        )}

        {/* CONDITION 2: Jika data pencarian ada, sembunyikan DesignGridWrapper dan render hasilnya */}
        {!isLoading && searchResults.length > 0 && (
          <div className="grid w-full grid-cols-1 gap-4 mt-8 md:grid-cols-1 lg:grid-cols-2 lg:gap-6 animate-fadeIn">
            {searchResults.map((message) => (
              <CardPreview
                key={message.id}
                data={message}
                isLink={true} // Default bernilai true (bisa diklik menuju link dokumen)
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default FormBrowse;