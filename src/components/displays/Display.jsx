import { Route, Routes } from "react-router-dom";
import { DisplayHome } from "./DisplayHome";

export const Display = ({ currentSong, isPlaying, onSongSelect }) => {
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
            />
          }
        />
      </Routes>
    </main>
  );
};
