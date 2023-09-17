import { usePlayerContext } from "../hooks/usePlayerContext";

const Cd = () => {
  const { currentSong, cdThumbRef, useCd } = usePlayerContext();
  return (
    <div className="cd" ref={useCd}>
      <div
        className="cd-thumb"
        ref={cdThumbRef}
        style={{
          backgroundImage: `url(${
            currentSong
              ? currentSong.cover
              : "https://i.ytimg.com/vi/jTLhQf5KJSc/maxresdefault.jpg"
          })`,
        }}
      ></div>
    </div>
  );
};

export default Cd;
