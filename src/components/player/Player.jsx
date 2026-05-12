import { assets } from "../../assets/assets";

const formatTime = (seconds) => {
  if (!Number.isFinite(seconds)) {
    return "0:00";
  }

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
  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <footer className="player-bar">
      <div className="now-playing">
        <img src={currentSong.image} alt="" />
        <div>
          <h2>{currentSong.name}</h2>
          <p>{currentSong.desc}</p>
        </div>
      </div>

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

      <div className="extra-controls">
        <button aria-label="Now playing view" type="button">
          <img src={assets.plays_icon} alt="" />
        </button>
        <button aria-label="Lyrics" type="button">
          <img src={assets.mic_icon} alt="" />
        </button>
        <button aria-label="Queue" type="button">
          <img src={assets.queue_icon} alt="" />
        </button>
        <button aria-label="Devices" type="button">
          <img src={assets.speaker_icon} alt="" />
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
        <button aria-label="Mini player" type="button">
          <img src={assets.mini_player_icon} alt="" />
        </button>
        <button aria-label="Full screen" type="button">
          <img src={assets.zoom_icon} alt="" />
        </button>
      </div>
    </footer>
  );
};
