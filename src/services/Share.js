const admin = require("firebase-admin");
const fs = require("fs");
const path = require("path");

// Inisialisasi Firebase Admin jika belum diinisialisasi di tempat lain
if (admin.apps.length === 0) {
  admin.initializeApp();
}

const shareMessagePreview = async (req, res) => {
  // Ambil ID pesan dari ujung URL (contoh: GQocFQFfafePTTfEEBjc)
  const messageId = req.path.split("/").pop();
  
  try {
    // 1. Ambil data langsung dari Firestore secara Server-Side
    const doc = await admin.firestore().collection("messages").doc(messageId).get();
    
    // 2. Baca file index.html hasil build React kamu
    // Catatan: Saat di-deploy, Firebase Functions akan membaca index.html dari folder hosting proyekmu
    let html = fs.readFileSync(path.join(__dirname, "../hosting/index.html"), "utf8");
    
    if (doc.exists) {
      const data = doc.data();
      const recipientName = data.recipientName || "Seseorang";
      const musicName = data.music?.name || "Lagu Favorit";
      
      // Gabungkan nama-nama artis jika lebih dari satu
      const artistName = data.music?.artists 
        ? data.music.artists.map(a => a.name).join(", ") 
        : "Artis";
        
      // Ambil gambar album art Spotify (Gunakan resolusi besar index 0)
      const albumArt = data.music?.album?.images?.[0]?.url || "https://thesoundly.web.app/default-og.png";

      // 3. RANCANG KONTEN RICH PREVIEW UNTUK WHATSAPP
      const ogTitle = `To: ${recipientName}`;
      const ogDesc = `Ada orang yang mengirimmu pesan dengan musik "${musicName}" oleh ${artistName}. Klik untuk mendengarkan!`;

      // 4. SUSUN TAG META OPEN GRAPH (OG)
      const metaTags = `
        <title>${ogTitle}</title>
        <meta property="og:title" content="${ogTitle}" />
        <meta property="og:description" content="${ogDesc}" />
        <meta property="og:image" content="${albumArt}" />
        <meta property="og:image:width" content="300" />
        <meta property="og:image:height" content="300" />
        <meta property="og:type" content="music.song" />
        <meta property="og:site_name" content="Soundly" />
        <meta name="twitter:card" content="summary_large_image" />
      `;
      
      // 5. Suntikkan tag meta tepat sebelum penutup </head> di HTML
      html = html.replace("</head>", `${metaTags}</head>`);
    }
    
    // Kirim HTML yang sudah dimodifikasi ke bot WhatsApp / Browser User
    res.status(200).send(html);

  } catch (error) {
    console.error("Error generating OG tags in share.js:", error);
    // Jika eror atau mati lampu, kembalikan file index.html kosongan asli agar web tetap bisa terbuka
    res.status(500).sendFile(path.join(__dirname, "../hosting/index.html"));
  }
};

// Export fungsi agar bisa dibaca oleh index.js
module.exports = { shareMessagePreview };