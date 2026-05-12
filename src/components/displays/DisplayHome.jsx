import { assets, albumsData, songsData } from "../../assets/assets";
import { Navbar } from "../navbar/Navbar";

const quickPicks = [
  { id: "liked", name: "Liked Songs", image: assets.like_icon },
  ...albumsData.slice(0, 5),
];

export const DisplayHome = ({ currentSong, isPlaying, onSongSelect }) => {
  return (
    <div className="home-page">
      <Navbar />

      <section className="greeting-section">
        <p className="eyebrow">Spotify clone</p>
        <h1>Good evening</h1>

        <div className="quick-grid">
          {quickPicks.map((item) => (
            <button className="quick-card" key={item.id} type="button">
              <img src={item.image} alt="" />
              <span>{item.name}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="content-section">
        <div className="section-heading">
          <h2>Made for you</h2>
          <button type="button">Show all</button>
        </div>

        <div className="album-grid">
          {albumsData.map((album) => (
            <article className="media-card" key={album.id}>
              <img src={album.image} alt="" />
              <div>
                <h3>{album.name}</h3>
                <p>{album.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

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

          {songsData.map((song, index) => (
            <button
              className={`track-row ${
                currentSong.id === song.id ? "active" : ""
              }`}
              key={song.id}
              onClick={() => onSongSelect(song)}
              type="button"
            >
              <span className="track-index">
                {currentSong.id === song.id && isPlaying ? (
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
                {albumsData[index % albumsData.length].name}
              </span>
              <span className="track-duration">{song.duration}</span>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
};
