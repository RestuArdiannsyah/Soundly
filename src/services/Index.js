import functions from "firebase-functions";
// Import fungsi share menggunakan gaya ES Modules (pastikan nama file sesuai besar kecilnya, misal: ./Share.js)
import { shareMessagePreview } from "./Share.js";

// Daftarkan fungsi ke Firebase dengan nama "share" menggunakan HTTPS onRequest v1/v2 kompatibel
export const share = functions.https.onRequest(shareMessagePreview);