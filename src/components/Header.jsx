import { usePlayerContext } from "../hooks/usePlayerContext";

const Header = () => {
  const { songs, currentSong } = usePlayerContext();
  return (
    <header>
      <h4>Now playing:</h4>
      {currentSong ? (
        songs.map((song) => (
          <h2 key={song.id}>
            {currentSong && currentSong.id === song.id ? song.title : null}
          </h2>
        ))
      ) : (
        <h2>Song not run</h2>
      )}
    </header>
  );
};

export default Header;
