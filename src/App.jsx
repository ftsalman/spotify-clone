import { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";
import { songsData } from "./assets/assets";
import { Display } from "./components/displays/Display";
import { Sidebar } from "./components/sidbar/Sidebar";
import { Player } from "./components/player/Player";

const parseDuration = (duration) => {
  const [minutes = 0, seconds = 0] = duration.split(":").map(Number);
  return minutes * 60 + seconds;
};

export const App = () => {
  const audioRef = useRef(null);
  const shouldAutoPlayRef = useRef(false);
  const lastVolumeRef = useRef(0.76);

  const [currentSong, setCurrentSong] = useState(songsData[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(parseDuration(songsData[0].duration));
  const [volume, setVolume] = useState(0.76);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);

  const startPlayback = useCallback(() => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    shouldAutoPlayRef.current = true;
    audio
      .play()
      .then(() => setIsPlaying(true))
      .catch(() => setIsPlaying(false));
  }, []);

  const pausePlayback = useCallback(() => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    shouldAutoPlayRef.current = false;
    audio.pause();
    setIsPlaying(false);
  }, []);

  const togglePlayback = useCallback(() => {
    if (isPlaying) {
      pausePlayback();
    } else {
      startPlayback();
    }
  }, [isPlaying, pausePlayback, startPlayback]);

  const loadAndPlaySong = useCallback((song) => {
    const audio = audioRef.current;

    shouldAutoPlayRef.current = true;
    setTime(0);
    setDuration(parseDuration(song.duration));
    setCurrentSong(song);
    setIsPlaying(true);

    if (!audio) {
      return;
    }

    audio.src = song.file;
    audio.load();
    audio
      .play()
      .then(() => setIsPlaying(true))
      .catch(() => setIsPlaying(false));
  }, []);

  const nextSong = useCallback(() => {
    const currentIndex = songsData.findIndex((item) => item.id === currentSong.id);
    let nextIndex = (currentIndex + 1) % songsData.length;

    if (isShuffle && songsData.length > 1) {
      while (nextIndex === currentIndex) {
        nextIndex = Math.floor(Math.random() * songsData.length);
      }
    }

    const song = songsData[nextIndex];

    loadAndPlaySong(song);
  }, [currentSong.id, isShuffle, loadAndPlaySong]);

  const previousSong = useCallback(() => {
    const audio = audioRef.current;

    if (audio && audio.currentTime > 4) {
      audio.currentTime = 0;
      setTime(0);
      return;
    }

    const currentIndex = songsData.findIndex((item) => item.id === currentSong.id);
    const previousIndex =
      (currentIndex - 1 + songsData.length) % songsData.length;
    const song = songsData[previousIndex];

    loadAndPlaySong(song);
  }, [currentSong.id, loadAndPlaySong]);

  const selectSong = useCallback(
    (song) => {
      const audio = audioRef.current;
      shouldAutoPlayRef.current = true;

      if (song.id === currentSong.id && audio) {
        audio.currentTime = 0;
        setTime(0);
        setDuration(parseDuration(song.duration));
        startPlayback();
        return;
      }

      loadAndPlaySong(song);
    },
    [currentSong.id, loadAndPlaySong, startPlayback],
  );

  const seekSong = useCallback((percentage) => {
    const audio = audioRef.current;

    if (!audio || !Number.isFinite(audio.duration)) {
      return;
    }

    const nextTime = (percentage / 100) * audio.duration;
    audio.currentTime = nextTime;
    setTime(nextTime);
  }, []);

  const changeVolume = useCallback((nextVolume) => {
    const normalizedVolume = Math.min(1, Math.max(0, nextVolume));

    if (normalizedVolume > 0) {
      lastVolumeRef.current = normalizedVolume;
    }

    setVolume(normalizedVolume);
  }, []);

  const toggleMute = useCallback(() => {
    setVolume((currentVolume) => {
      if (currentVolume === 0) {
        return lastVolumeRef.current || 0.76;
      }

      lastVolumeRef.current = currentVolume;
      return 0;
    });
  }, []);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    audio.volume = volume;
  }, [volume]);

  // Set initial audio src on mount
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.src = songsData[0].file;
    audio.load();
  }, []);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    const handleCanPlay = () => {
      if (shouldAutoPlayRef.current) {
        audio
          .play()
          .then(() => setIsPlaying(true))
          .catch(() => setIsPlaying(false));
      }
    };
    const handleLoadedMetadata = () => {
      setDuration(
        Number.isFinite(audio.duration)
          ? audio.duration
          : parseDuration(currentSong.duration),
      );
    };
    const handleTimeUpdate = () => setTime(audio.currentTime || 0);
    const handleEnded = () => {
      if (isRepeat) {
        audio.currentTime = 0;
        shouldAutoPlayRef.current = true;
        audio
          .play()
          .then(() => setIsPlaying(true))
          .catch(() => setIsPlaying(false));
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
  }, [currentSong.duration, isRepeat, nextSong, startPlayback]);

  return (
    <div className="app-shell">
      <div className="app-main">
        <Sidebar currentSong={currentSong} onSongSelect={selectSong} />
        <Display
          currentSong={currentSong}
          isPlaying={isPlaying}
          onSongSelect={selectSong}
        />
      </div>

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

      <audio ref={audioRef} preload="metadata" />
    </div>
  );
};
