import admin from "firebase-admin";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Inisialisasi Firebase Admin jika belum berjalan
if (admin.apps.length === 0) {
  admin.initializeApp();
}

// TRIK ES MODULES: Membuat pengganti __dirname yang hilang di ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const shareMessagePreview = async (req, res) => {
  // Ambil ID pesan dari ujung URL
  const messageId = req.path.split("/").pop();
  
  try {
    // 1. Ambil data langsung dari Firestore secara Server-Side
    const doc = await admin.firestore().collection("messages").doc(messageId).get();
    
    // 2. Baca file index.html hasil build React kamu (disesuaikan dengan folder "dist" di firebase.json)
    let html = fs.readFileSync(path.join(__dirname, "../dist/index.html"), "utf8");
    
    if (doc.exists) {
      const data = doc.data();
      const recipientName = data.recipientName || "Seseorang";
      const musicName = data.music?.name || "Lagu Favorit";
      
      const artistName = data.music?.artists 
        ? data.music.artists.map(a => a.name).join(", ") 
        : "Artis";
        
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
    console.error("Error generating OG tags in Share.js:", error);
    // Jika eror, kembalikan file index.html kosongan asli agar web tetap bisa terbuka
    res.status(500).sendFile(path.join(__dirname, "../dist/index.html"));
  }
};