import { usePlayerContext } from "../hooks/usePlayerContext";

const Cd = () => {
  const { currentSong } = usePlayerContext();
  return (
    <div className="cd">
      <div
        className="cd-thumb"
        style={{
          backgroundImage: `url(${
            currentSong
              ? currentSong.artist.avatar
              : "https://i.ytimg.com/vi/jTLhQf5KJSc/maxresdefault.jpg"
          })`,
        }}
      ></div>
    </div>
  );
};

export default Cd;
