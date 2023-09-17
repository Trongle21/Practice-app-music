import { usePlayerContext } from "../hooks/usePlayerContext";

const PlayList = () => {
  const { songs, currentSong, onSelectSong } = usePlayerContext();

  return (
    <>
      <div className="playlist">
        {songs.map((song) => (
          <div
            key={song.id}
            className={`song ${
              currentSong && currentSong.id === song.id ? "active" : ""
            }`}
            onClick={() => onSelectSong(song.id)}
          >
            <div
              className="thumb"
              style={{ backgroundImage: `url(${song.artist.avatar}` }}
            ></div>
            <div className="body">
              <h3 className="title">{song.title}</h3>
              <p className="author">{song.artist.name}</p>
            </div>
            <div className="option">
              <i className="fas fa-ellipsis-h"></i>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default PlayList;
