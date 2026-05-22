const functions = require("firebase-functions");
// Import fungsi dari file share.js yang baru kita buat
const { shareMessagePreview } = require("./Share");

// Daftarkan fungsi ke Firebase dengan nama "share"
exports.share = functions.https.onRequest(shareMessagePreview);