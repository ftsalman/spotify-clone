import { Route, Routes } from "react-router-dom";
import { DisplayHome } from "./DisplayHome";

export const Display = ({ currentSong, isPlaying, onSongSelect, songs = [], albums = [], onSearch }) => {
  return (
    <main className="display-panel">
      <Routes>
        <Route
          path="/"
          element={
            <DisplayHome
              currentSong={currentSong}
              isPlaying={isPlaying}
              onSongSelect={onSongSelect}
              songs={songs}
              albums={albums}
              onSearch={onSearch}
            />
          }
        />
        <Route
          path="*"
          element={
            <DisplayHome
              currentSong={currentSong}
              isPlaying={isPlaying}
              onSongSelect={onSongSelect}
              songs={songs}
              albums={albums}
              onSearch={onSearch}
            />
          }
        />
      </Routes>
    </main>
  );
};
