import { useState } from "react";
import { assets } from "../../assets/assets";

const libraryFilters = ["Playlists", "Albums", "Artists", "Podcasts"];

export const Sidebar = ({
  currentSong,
  onSongSelect,
  songs = [],
  albums = [],
  onSearch,
}) => {
  const [activeFilter, setActiveFilter] = useState("Playlists");
  const [isLibraryExpanded, setIsLibraryExpanded] = useState(true);

  return (
    <aside className="sidebar">
      {/* NAV */}
      <section className="sidebar-nav">
        <div className="brand-row">
          <img src="/logo/logosc.png" alt="Tunefy" style={{ width: '40px', height: '40px', objectFit: 'contain' }} />
          <span style={{ fontSize: '1.2rem', fontWeight: 800, letterSpacing: '-0.5px' }}>TUNEFY</span>
        </div>

        <button className="nav-item active" type="button">
          <img src={assets.home_icon} alt="" />
          <span>Home</span>
        </button>
      </section>

      {/* LIBRARY */}
      <section className="library-panel">
        <div className="library-heading">
          <div className="library-title">
            <img src={assets.stack_icon} alt="" />
            <span>Your Library</span>
          </div>

          <div className="library-actions">
            <button 
              aria-label="Collapse library" 
              type="button"
              onClick={() => setIsLibraryExpanded(!isLibraryExpanded)}
            >
              <img 
                src={assets.arrow_icon} 
                alt="" 
                style={{ transform: isLibraryExpanded ? 'none' : 'rotate(-90deg)', transition: 'transform 0.2s' }} 
              />
            </button>
            <button 
              aria-label="Create playlist" 
              type="button"
              onClick={() => alert("Create playlist feature coming soon!")}
            >
              <img src={assets.plus_icon} alt="" />
            </button>
          </div>
        </div>

        {/* Filter pills */}
        <div className="library-filters">
          {libraryFilters.map((f) => (
            <button 
              key={f} 
              className={`filter-pill ${activeFilter === f ? 'active' : ''}`} 
              type="button"
              onClick={() => setActiveFilter(f)}
              style={{
                background: activeFilter === f ? '#fff' : 'rgba(255, 255, 255, 0.1)',
                color: activeFilter === f ? '#000' : '#fff'
              }}
            >
              {f}
            </button>
          ))}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: "8px",
            background: "rgba(255,255,255,0.1)",
            borderRadius: "6px",
            marginBottom: "16px",
            cursor: "pointer",
          }}
        >
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "4px",
              background: "linear-gradient(135deg, #7033ff 0%, #a4eedb 100%)",
              display: "grid",
              placeItems: "center",
              marginRight: "12px",
              flexShrink: 0,
            }}
          >
            <img
              src={assets.like_icon}
              alt="Liked"
              style={{ width: "20px", filter: "brightness(0) invert(1)" }}
            />
          </div>
          <div style={{ flex: 1 }}>
            <h4
              style={{
                margin: 0,
                fontSize: "1rem",
                fontWeight: 700,
                color: "#fff",
              }}
            >
              Liked Songs
            </h4>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                marginTop: "4px",
              }}
            >
              <img
                src={assets.like_icon}
                alt=""
                style={{
                  width: "12px",
                  filter:
                    "brightness(0) saturate(100%) invert(56%) sepia(85%) saturate(385%) hue-rotate(95deg) brightness(92%) contrast(89%)",
                }}
              />
              <span style={{ fontSize: "0.8rem", color: "#a7a7a7" }}>
                Playlist • 266 Songs
              </span>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              gap: "2px",
              height: "14px",
              alignItems: "flex-end",
              marginLeft: "12px",
            }}
          >
            <div
              style={{
                width: "3px",
                height: "8px",
                background: "var(--sp-green)",
                borderRadius: "1px",
              }}
            ></div>
            <div
              style={{
                width: "3px",
                height: "14px",
                background: "var(--sp-green)",
                borderRadius: "1px",
              }}
            ></div>
            <div
              style={{
                width: "3px",
                height: "6px",
                background: "var(--sp-green)",
                borderRadius: "1px",
              }}
            ></div>
          </div>
        </div>

        <div className="library-list">
          <p className="sidebar-label">Recently played</p>

          {songs.slice(0, 6).map((song) => (
            <button
              className={`library-track ${song.id === currentSong.id ? "active" : ""}`}
              key={song.id}
              onClick={() => onSongSelect(song)}
              type="button"
            >
              <img src={song.image} alt="" />
              <span>
                <strong>{song.name}</strong>
                <small>Song • Artist</small>
              </span>
            </button>
          ))}
        </div>

        <div className="playlist-pills">
          {albums.slice(0, 4).map((album) => (
            <span key={album.id}>{album.name}</span>
          ))}
        </div>
      </section>
    </aside>
  );
};
