import { useState } from "react";
import { assets } from "../../assets/assets";

const formatTime = (seconds) => {
  if (!Number.isFinite(seconds)) return "0:00";
  const wholeSeconds = Math.floor(seconds);
  const minutes = Math.floor(wholeSeconds / 60);
  const remainingSeconds = wholeSeconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
};

export const Player = ({
  currentSong,
  currentTime,
  duration,
  isPlaying,
  isRepeat,
  isShuffle,
  onNext,
  onPrevious,
  onSeek,
  onToggleMute,
  onTogglePlayback,
  onToggleRepeat,
  onToggleShuffle,
  onVolumeChange,
  volume,
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [activeExtra, setActiveExtra] = useState(null);

  const toggleExtra = (control) => {
    setActiveExtra((prev) => (prev === control ? null : control));
  };

  const handleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.warn(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <footer className="player-bar">
      {/* NOW PLAYING */}
      <div className="now-playing">
        <img src={currentSong.image} alt="" />
        <div>
          <h2>{currentSong.name}</h2>
          <p>{currentSong.desc}</p>
        </div>
        <div className="now-playing-actions">
          <button 
            className="like-btn" 
            aria-label="Like" 
            type="button"
            onClick={() => setIsLiked(!isLiked)}
          >
            <img 
              src={assets.like_icon} 
              alt="" 
              style={{ filter: isLiked ? 'brightness(0) saturate(100%) invert(56%) sepia(85%) saturate(385%) hue-rotate(95deg) brightness(92%) contrast(89%)' : 'none' }}
            />
          </button>
        </div>
      </div>

      {/* CENTER CONTROLS */}
      <div className="player-center">
        <div className="player-controls">
          <button
            aria-label="Shuffle"
            aria-pressed={isShuffle}
            className={`control-button ${isShuffle ? "active" : ""}`}
            onClick={onToggleShuffle}
            type="button"
          >
            <img src={assets.shuffle_icon} alt="" />
          </button>

          <button
            aria-label="Previous"
            className="control-button"
            onClick={onPrevious}
            type="button"
          >
            <img src={assets.prev_icon} alt="" />
          </button>

          <button
            aria-label={isPlaying ? "Pause" : "Play"}
            className="play-button"
            onClick={onTogglePlayback}
            type="button"
          >
            <img src={isPlaying ? assets.pause_icon : assets.play_icon} alt="" />
          </button>

          <button
            aria-label="Next"
            className="control-button"
            onClick={onNext}
            type="button"
          >
            <img src={assets.next_icon} alt="" />
          </button>

          <button
            aria-label="Repeat"
            aria-pressed={isRepeat}
            className={`control-button ${isRepeat ? "active" : ""}`}
            onClick={onToggleRepeat}
            type="button"
          >
            <img src={assets.loop_icon} alt="" />
          </button>
        </div>

        <div className="progress-row">
          <span>{formatTime(currentTime)}</span>
          <input
            aria-label="Seek"
            className="range-input"
            max="100"
            min="0"
            onChange={(event) => onSeek(Number(event.target.value))}
            style={{ "--range-progress": `${progress}%` }}
            type="range"
            value={progress}
          />
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* EXTRA CONTROLS */}
      <div className="extra-controls">
        <button 
          aria-label="Now playing view" 
          type="button"
          onClick={() => toggleExtra('plays')}
        >
          <img src={assets.plays_icon} alt="" style={{ opacity: activeExtra === 'plays' ? 1 : 0.7 }} />
        </button>
        <button 
          aria-label="Lyrics" 
          type="button"
          onClick={() => toggleExtra('lyrics')}
        >
          <img src={assets.mic_icon} alt="" style={{ opacity: activeExtra === 'lyrics' ? 1 : 0.7 }} />
        </button>
        <button 
          aria-label="Queue" 
          type="button"
          onClick={() => toggleExtra('queue')}
        >
          <img src={assets.queue_icon} alt="" style={{ opacity: activeExtra === 'queue' ? 1 : 0.7 }} />
        </button>
        <button 
          aria-label="Devices" 
          type="button"
          onClick={() => toggleExtra('devices')}
        >
          <img src={assets.speaker_icon} alt="" style={{ filter: activeExtra === 'devices' ? 'brightness(0) saturate(100%) invert(56%) sepia(85%) saturate(385%) hue-rotate(95deg) brightness(92%) contrast(89%)' : 'opacity(0.7)' }} />
        </button>
        <button aria-label={volume === 0 ? "Unmute" : "Mute"} onClick={onToggleMute} type="button">
          <img src={assets.volume_icon} alt="" />
        </button>
        <input
          aria-label="Volume"
          className="range-input volume-range"
          max="1"
          min="0"
          onChange={(event) => onVolumeChange(Number(event.target.value))}
          step="0.01"
          style={{ "--range-progress": `${volume * 100}%` }}
          type="range"
          value={volume}
        />
        <button 
          aria-label="Mini player" 
          type="button"
          onClick={() => toggleExtra('mini')}
        >
          <img src={assets.mini_player_icon} alt="" style={{ opacity: activeExtra === 'mini' ? 1 : 0.7 }} />
        </button>
        <button aria-label="Full screen" type="button" onClick={handleFullscreen}>
          <img src={assets.zoom_icon} alt="" />
        </button>
      </div>
    </footer>
  );
};
