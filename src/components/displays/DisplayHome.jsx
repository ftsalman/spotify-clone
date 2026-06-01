import { assets } from "../../assets/assets";
import { Navbar } from "../navbar/Navbar";

const timeOfDay = () => {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 18) return "Good afternoon";
  return "Good evening";
};

export const DisplayHome = ({ currentSong, isPlaying, onSongSelect, songs = [], albums = [], onSearch }) => {
  const quickPicks = [
    { id: "liked", name: "Liked Songs", image: assets.like_icon },
    ...albums.slice(0, 5),
  ];
  return (
    <div className="home-page">
      <Navbar onSearch={onSearch} onSongSelect={onSongSelect} />



      {albums.length > 0 && songs.length > 0 && (
      <section className="content-section" style={{ padding: 0 }}>
        <div className="featured-hero" style={{ 
          background: `linear-gradient(180deg, #6c1616 0%, rgba(18, 18, 18, 0.5) 100%)`,
          borderRadius: '16px 16px 0 0',
          padding: '40px 32px 24px',
          alignItems: 'flex-end',
          minHeight: '260px'
        }}>
          <div className="featured-hero-art" style={{ flex: '0 0 190px' }}>
            <img src={albums[0].image} alt={albums[0].name} style={{ width: '190px', height: '190px', boxShadow: '0 8px 24px rgba(0,0,0,0.5)' }} />
          </div>
          <div className="featured-hero-info">
            <p className="featured-label" style={{ fontSize: '0.8rem', textTransform: 'none', fontWeight: 500 }}>My Playlist</p>
            <h2 className="featured-title" style={{ fontSize: '4.5rem', marginBottom: '16px' }}>Chris Breezy (G.O.A.T)</h2>
            <p className="featured-desc" style={{ fontSize: '0.9rem', marginBottom: '8px' }}>My Personal Chris Brown's Playlist</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.85rem' }}>
              <strong>Ibromax</strong>
              <span style={{ color: 'var(--sp-text-subdued)' }}>• 123 songs, 7hr 40mins</span>
            </div>
          </div>
        </div>
        
        {/* ACTION ROW */}
        <div style={{ padding: '24px 32px', display: 'flex', alignItems: 'center', gap: '24px' }}>
          <button
            style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'var(--sp-green)', display: 'grid', placeItems: 'center' }}
            onClick={() => onSongSelect(songs[0])}
          >
            <img src={assets.play_icon} alt="Play" style={{ width: '24px', filter: 'brightness(0)' }} />
          </button>
          <img src={assets.shuffle_icon} alt="Shuffle" style={{ width: '24px', opacity: 0.7 }} />
          <div style={{ width: '32px', height: '32px', borderRadius: '50%', border: '2px solid rgba(255,255,255,0.7)', display: 'grid', placeItems: 'center' }}>
            <img src={assets.arrow_icon} alt="Download" style={{ width: '16px', transform: 'rotate(90deg)', opacity: 0.7 }} />
          </div>
          <span style={{ fontSize: '24px', letterSpacing: '4px', opacity: 0.7, marginLeft: '8px' }}>...</span>
        </div>
      </section>
      )}

      {/* ── MADE FOR YOU (ALBUMS) ── */}
      <section className="content-section">
        <div className="section-heading">
          <h2>Made for you</h2>
          <button type="button">Show all</button>
        </div>

        <div className="album-grid">
          {albums.map((album) => (
            <article className="media-card" key={album.id}>
              <div className="media-card-image-wrap">
                <img src={album.image} alt={album.name} />
                <button className="media-card-play-btn" type="button" onClick={() => onSongSelect(songs[0])}>
                  <img src={assets.play_icon} alt="Play" />
                </button>
              </div>
              <h3>{album.name}</h3>
              <p>{album.desc}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ── TODAY'S TOP TRACKS ── */}
      <section className="content-section">
        <div className="section-heading">
          <h2>Today's top tracks</h2>
          <button type="button">Show all</button>
        </div>

        <div className="track-table">
          <div className="track-header">
            <span>#</span>
            <span>Title</span>
            <span>Album</span>
            <span>
              <img src={assets.clock_icon} alt="Duration" />
            </span>
          </div>

          {songs.map((song, index) => (
            <button
              className={`track-row ${currentSong && currentSong.id === song.id ? "active" : ""}`}
              key={song.id}
              onClick={() => onSongSelect(song)}
              type="button"
            >
              <span className="track-index">
                {currentSong && currentSong.id === song.id && isPlaying ? (
                  <img src={assets.pause_icon} alt="Playing" />
                ) : (
                  index + 1
                )}
              </span>

              <span className="track-title-cell">
                <img src={song.image} alt="" />
                <span>
                  <strong>{song.name}</strong>
                  <small>{song.desc}</small>
                </span>
              </span>

              <span className="track-album">
                {albums.length > 0 ? albums[index % albums.length].name : "Unknown Album"}
              </span>
              <span className="track-duration">{song.duration}</span>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
};
