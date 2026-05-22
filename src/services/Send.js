// Fungsi mengambil Access Token dari Spotify (Client Credentials Flow)
export const getSpotifyToken = async () => {
  const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
  const clientSecret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    console.error("Spotify Credentials are missing in .env file!");
    return null;
  }

  try {
    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Basic " + btoa(`${clientId}:${clientSecret}`),
      },
      body: "grant_type=client_credentials",
    });

    const data = await response.json();
    return data.access_token;
  } catch (error) {
    console.error("Error fetching Spotify token:", error);
    return null;
  }
};

// Fungsi mencari lagu berdasarkan query teks
export const searchSpotifyTracks = async (query, token) => {
  if (!query || !token) return [];

  try {
    const response = await fetch(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=5`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();
    
    /* SOLUSI AGAR STRUKTUR MURNI:
      Kita buat struktur pembungkus baru. 
      - 'rawTrack' akan berisi 100% objek asli bawaan Spotify Developer Docs.
      - 'uiAlbumArt' kita pisahkan agar tidak mengotori isi data asli lagunya.
    */
    return data.tracks?.items.map((track) => ({
      rawTrack: {
        album: track.album,
        artists: track.artists,
        available_markets: track.available_markets,
        disc_number: track.disc_number,
        duration_ms: track.duration_ms,
        explicit: track.explicit,
        external_ids: track.external_ids,
        external_urls: track.external_urls,
        href: track.href,
        id: track.id,
        is_playable: track.is_playable ?? true,
        linked_from: track.linked_from ?? {},
        restrictions: track.restrictions ?? null,
        name: track.name,
        popularity: track.popularity,
        preview_url: track.preview_url ?? null, // Akan bernilai null sesuai kebijakan baru Spotify
        track_number: track.track_number,
        type: track.type,
        uri: track.uri,
        is_local: track.is_local
      },
      uiAlbumArt: track.album.images[2]?.url || track.album.images[0]?.url, // Khusus untuk UI Dropdown
    })) || [];
  } catch (error) {
    console.error("Error searching Spotify tracks:", error);
    return [];
  }
};

// Helper Debounce: Mencegah spam request berlebihan ke server API saat mengetik
export const debounce = (func, delay) => {
  let timeoutId = null; 
  return (...args) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};