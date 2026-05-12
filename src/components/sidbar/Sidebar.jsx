import { assets, albumsData, songsData } from "../../assets/assets";

export const Sidebar = ({ currentSong, onSongSelect }) => {
  return (
    <aside className="sidebar">
      <section className="sidebar-nav">
        <div className="brand-row">
          <img src={assets.spotify_logo} alt="Spotify" />
          <span>Spotify</span>
        </div>

        <button className="nav-item active" type="button">
          <img src={assets.home_icon} alt="" />
          <span>Home</span>
        </button>

        <button className="nav-item" type="button">
          <img src={assets.search_icon} alt="" />
          <span>Search</span>
        </button>
      </section>

      <section className="library-panel">
        <div className="library-heading">
          <div className="library-title">
            <img src={assets.stack_icon} alt="" />
            <span>Your Library</span>
          </div>

          <div className="library-actions">
            <button aria-label="Collapse library" type="button">
              <img src={assets.arrow_icon} alt="" />
            </button>
            <button aria-label="Create playlist" type="button">
              <img src={assets.plus_icon} alt="" />
            </button>
          </div>
        </div>

        <div className="library-callout">
          <h2>Create your first playlist</h2>
          <p>It is easy, and we will help you.</p>
          <button type="button">Create playlist</button>
        </div>

        <div className="library-callout">
          <h2>Find podcasts to follow</h2>
          <p>We will keep you updated on new episodes.</p>
          <button type="button">Browse podcasts</button>
        </div>

        <div className="library-list">
          <p className="sidebar-label">Recently played</p>

          {songsData.slice(0, 5).map((song) => (
            <button
              className={`library-track ${
                song.id === currentSong.id ? "active" : ""
              }`}
              key={song.id}
              onClick={() => onSongSelect(song)}
              type="button"
            >
              <img src={song.image} alt="" />
              <span>
                <strong>{song.name}</strong>
                <small>{song.desc}</small>
              </span>
            </button>
          ))}
        </div>

        <div className="playlist-pills">
          {albumsData.slice(0, 4).map((album) => (
            <span key={album.id}>{album.name}</span>
          ))}
        </div>
      </section>
    </aside>
  );
};
