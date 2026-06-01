import { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";
import { fetchSongs, fetchAlbums } from "./api/musicApi";
import { Display } from "./components/displays/Display";
import { Sidebar } from "./components/sidbar/Sidebar";
import { RightSidebar } from "./components/sidebar/RightSidebar";
import { Player } from "./components/player/Player";

const parseDuration = (duration) => {
  const [minutes = 0, seconds = 0] = duration.split(":").map(Number);
  return minutes * 60 + seconds;
};

export const App = () => {
  const audioRef = useRef(null);
  const shouldAutoPlayRef = useRef(false);
  const lastVolumeRef = useRef(0.76);

  const [songs, setSongs] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("pop");

  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.76);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);

  const startPlayback = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    shouldAutoPlayRef.current = true;
    audio.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
  }, []);

  const pausePlayback = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    shouldAutoPlayRef.current = false;
    audio.pause();
    setIsPlaying(false);
  }, []);

  const togglePlayback = useCallback(() => {
    if (isPlaying) pausePlayback();
    else startPlayback();
  }, [isPlaying, pausePlayback, startPlayback]);

  const loadAndPlaySong = useCallback((song) => {
    const audio = audioRef.current;
    shouldAutoPlayRef.current = true;
    setTime(0);
    setDuration(parseDuration(song.duration));
    setCurrentSong(song);
    setIsPlaying(true);
    if (!audio) return;
    audio.src = song.file;
    audio.load();
    audio.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
  }, []);

  const nextSong = useCallback(() => {
    if (!songs.length || !currentSong) return;
    const currentIndex = songs.findIndex((item) => item.id === currentSong.id);
    let nextIndex = (currentIndex + 1) % songs.length;
    if (isShuffle && songs.length > 1) {
      while (nextIndex === currentIndex) {
        nextIndex = Math.floor(Math.random() * songs.length);
      }
    }
    loadAndPlaySong(songs[nextIndex]);
  }, [currentSong, isShuffle, loadAndPlaySong, songs]);

  const previousSong = useCallback(() => {
    if (!songs.length || !currentSong) return;
    const audio = audioRef.current;
    if (audio && audio.currentTime > 4) {
      audio.currentTime = 0;
      setTime(0);
      return;
    }
    const currentIndex = songs.findIndex((item) => item.id === currentSong.id);
    const previousIndex = (currentIndex - 1 + songs.length) % songs.length;
    loadAndPlaySong(songs[previousIndex]);
  }, [currentSong, loadAndPlaySong, songs]);

  const selectSong = useCallback((song) => {
    const audio = audioRef.current;
    shouldAutoPlayRef.current = true;
    if (currentSong && song.id === currentSong.id && audio) {
      audio.currentTime = 0;
      setTime(0);
      setDuration(parseDuration(song.duration));
      startPlayback();
      return;
    }
    loadAndPlaySong(song);
  }, [currentSong, loadAndPlaySong, startPlayback]);

  const seekSong = useCallback((percentage) => {
    const audio = audioRef.current;
    if (!audio || !Number.isFinite(audio.duration)) return;
    const nextTime = (percentage / 100) * audio.duration;
    audio.currentTime = nextTime;
    setTime(nextTime);
  }, []);

  const changeVolume = useCallback((nextVolume) => {
    const normalizedVolume = Math.min(1, Math.max(0, nextVolume));
    if (normalizedVolume > 0) lastVolumeRef.current = normalizedVolume;
    setVolume(normalizedVolume);
  }, []);

  const toggleMute = useCallback(() => {
    setVolume((currentVolume) => {
      if (currentVolume === 0) return lastVolumeRef.current || 0.76;
      lastVolumeRef.current = currentVolume;
      return 0;
    });
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = volume;
  }, [volume]);

  useEffect(() => {
    const loadData = async () => {
      if (!searchTerm) return;
      
      setIsLoading(true);
      const fetchedSongs = await fetchSongs(searchTerm);
      const fetchedAlbums = await fetchAlbums(searchTerm);
      setSongs(fetchedSongs);
      setAlbums(fetchedAlbums);
      
      if (fetchedSongs.length > 0) {
        setCurrentSong(fetchedSongs[0]);
        setDuration(parseDuration(fetchedSongs[0].duration));
        const audio = audioRef.current;
        if (audio) {
          audio.src = fetchedSongs[0].file;
          audio.load();
        }
      }
      setIsLoading(false);
    };

    const timeoutId = setTimeout(() => {
      loadData();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleCanPlay = () => {
      if (shouldAutoPlayRef.current) {
        audio.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
      }
    };
    const handleLoadedMetadata = () => {
      setDuration(Number.isFinite(audio.duration) ? audio.duration : (currentSong ? parseDuration(currentSong.duration) : 0));
    };
    const handleTimeUpdate = () => setTime(audio.currentTime || 0);
    const handleEnded = () => {
      if (isRepeat) {
        audio.currentTime = 0;
        shouldAutoPlayRef.current = true;
        audio.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
        return;
      }
      nextSong();
    };

    audio.addEventListener("canplay", handleCanPlay);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("canplay", handleCanPlay);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [currentSong, isRepeat, nextSong, startPlayback]);

  if (isLoading) {
    return (
      <div className="app-shell" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <h2>Loading Music...</h2>
      </div>
    );
  }

  return (
    <div className="app-shell">
      <div className="app-main">
        <Sidebar 
          currentSong={currentSong} 
          onSongSelect={selectSong} 
          albums={albums} 
          songs={songs} 
        />
        <Display
          currentSong={currentSong}
          isPlaying={isPlaying}
          onSongSelect={selectSong}
          albums={albums}
          songs={songs}
          onSearch={setSearchTerm}
        />
        <RightSidebar currentSong={currentSong} />
      </div>

      {currentSong && (
        <Player
          currentSong={currentSong}
          currentTime={time}
          duration={duration}
          isPlaying={isPlaying}
          isRepeat={isRepeat}
          isShuffle={isShuffle}
          onNext={nextSong}
          onPrevious={previousSong}
          onSeek={seekSong}
          onToggleMute={toggleMute}
          onTogglePlayback={togglePlayback}
          onToggleRepeat={() => setIsRepeat((value) => !value)}
          onToggleShuffle={() => setIsShuffle((value) => !value)}
          onVolumeChange={changeVolume}
          volume={volume}
        />
      )}

      <audio ref={audioRef} preload="metadata" />
    </div>
  );
};
