export const fetchSongs = async (term = "pop") => {
  try {
    const response = await fetch(
      `https://itunes.apple.com/search?term=${term}&limit=15&media=music&entity=song`
    );
    const data = await response.json();
    return data.results.map((track, index) => ({
      id: track.trackId || index,
      name: track.trackName,
      image: track.artworkUrl100?.replace('100x100', '300x300') || '',
      file: track.previewUrl,
      desc: track.artistName,
      duration: formatMillis(track.trackTimeMillis)
    })).filter(track => track.file); // Ensure they have a preview URL
  } catch (error) {
    console.error("Error fetching songs:", error);
    return [];
  }
};

export const fetchAlbums = async (term = "hits") => {
  try {
    const response = await fetch(
      `https://itunes.apple.com/search?term=${term}&limit=6&media=music&entity=album`
    );
    const data = await response.json();
    return data.results.map((album, index) => ({
      id: album.collectionId || index,
      name: album.collectionName,
      image: album.artworkUrl100?.replace('100x100', '600x600') || '',
      desc: album.artistName,
      bgColor: ["#2a4365", "#22543d", "#742a2a", "#44337a", "#234e52", "#744210"][index % 6]
    }));
  } catch (error) {
    console.error("Error fetching albums:", error);
    return [];
  }
};

const formatMillis = (millis) => {
  if (!millis) return "0:00";
  const totalSeconds = Math.floor(millis / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

export const fetchSearchSuggestions = async (term) => {
  if (!term || term.trim().length < 2) return { songs: [], albums: [], terms: [] };
  try {
    const [songsRes, albumsRes] = await Promise.all([
      fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(term)}&limit=4&media=music&entity=song`),
      fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(term)}&limit=3&media=music&entity=album`)
    ]);
    const songsData = await songsRes.json();
    const albumsData = await albumsRes.json();

    const songs = songsData.results.map((track, i) => ({
      id: track.trackId || i,
      name: track.trackName,
      image: track.artworkUrl100?.replace('100x100', '300x300') || '',
      file: track.previewUrl,
      desc: track.artistName,
      duration: formatMillis(track.trackTimeMillis),
      type: 'song'
    })).filter(t => t.file);

    const albums = albumsData.results.map((album, i) => ({
      id: album.collectionId || i,
      name: album.collectionName,
      image: album.artworkUrl100?.replace('100x100', '300x300') || '',
      desc: album.artistName,
      type: 'album'
    }));

    // Generate suggestion terms from the results
    const terms = [...new Set([
      `${term} songs`,
      `${term} hits`,
      `${term} music`,
      term
    ])].slice(0, 4);

    return { songs, albums, terms };
  } catch (error) {
    console.error("Error fetching suggestions:", error);
    return { songs: [], albums: [], terms: [] };
  }
};
