import { useEffect, useRef, useState } from "react";
import { PlayerContext } from "../context/PlayerContext";
import Control from "./Control";
import Header from "./Header";
import Input from "./Input";
import PlayList from "./PlayList";
import Cd from "./cd";

const songs = [
  {
    id: 1,
    title: "The Scientist",
    artist: {
      name: "Coldplay",
      avatar:
        "https://i.scdn.co/image/ab6761610000e5eb989ed05e1f0570cc4726c2d3",
    },
    cover:
      "https://upload.wikimedia.org/wikipedia/en/6/60/Coldplay_-_A_Rush_of_Blood_to_the_Head_Cover.png",
    src: "Coldplay-The-Scientist.mp3",
  },
  {
    id: 2,
    title: "Strawberry Fields Forever",
    artist: {
      name: "The Beatles",
      avatar:
        "https://cdn.britannica.com/18/136518-050-CD0E49C6/The-Beatles-Ringo-Starr-Paul-McCartney-George.jpg",
    },
    cover: "https://i.scdn.co/image/ab67616d0000b273692d9189b2bd75525893f0c1",
    src: "The Beatles-Strawberry Fields Forever.mp3",
  },
  {
    id: 3,
    title: "Bohemian Rhapsody",
    artist: {
      name: "Queen",
      avatar:
        "https://upload.wikimedia.org/wikipedia/commons/3/33/Queen_%E2%80%93_montagem_%E2%80%93_new.png",
    },
    cover: "https://i.scdn.co/image/ab67616d0000b27328581cfe196c266c132a9d62",
    src: "Queen – Bohemian Rhapsody (Official Video Remastered).mp3",
  },
  {
    id: 4,
    title: "A Sky Full Of Stars (Lyrics)",
    artist: {
      name: "ColdPlay",
      avatar:
        "https://i.scdn.co/image/ab6761610000e5eb989ed05e1f0570cc4726c2d3",
    },
    cover:
      "https://upload.wikimedia.org/wikipedia/vi/8/8d/Coldplay_-_A_Sky_Full_of_Stars_%28Single%29.png",
    src: "Coldplay - A Sky Full Of Stars (Lyrics).mp3",
  },
  {
    id: 5,
    title: "Wish You Were Here",
    artist: {
      name: "Pink Floyd",
      avatar:
        "https://upload.wikimedia.org/wikipedia/en/thumb/d/d6/Pink_Floyd_-_all_members.jpg/250px-Pink_Floyd_-_all_members.jpg",
    },
    cover:
      "https://w7.pngwing.com/pngs/688/569/png-transparent-wish-you-were-here-pink-floyd-song-album-animals-best-of-pink-floyd-a-foot-in-the-door-album-wish-animals-thumbnail.png",
    src: "Pink Floyd - Wish You Were Here.mp3",
  },
  {
    id: 6,
    title: "In My Life",
    artist: {
      name: "The Beatles",
      avatar:
        "https://cdn.britannica.com/18/136518-050-CD0E49C6/The-Beatles-Ringo-Starr-Paul-McCartney-George.jpg",
    },
    cover:
      "https://www.soundwave-art-prints.com/cdn/shop/products/Beatles-In-My-Life-Wall-Art_530x@2x.jpg?v=1583725592",
    src: "The Beatles - In My Life.mp3",
  },
];

const Player = () => {
  const audioRef = useRef(new Audio());

  const [isPlaying, setIsPlaying] = useState(false);
  const [isRandom, setIsRandom] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const [isCurrentTimeChange, setIsCurrentTimeChange] = useState(false);
  const [currentIndexSong, setCurrentIndexSong] = useState(-1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volumeChange, setVolumeChange] = useState(1);

  useEffect(() => {
    if (currentIndexSong !== -1) {
      const currentSong = songs[currentIndexSong];
      audioRef.current.src = currentSong.src;
    }
  }, [currentIndexSong]);

  useEffect(() => {
    if (isCurrentTimeChange && !audioRef.current.paused) {
      audioRef.current.pause();
    } else if (currentIndexSong !== -1 && isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, currentIndexSong, isCurrentTimeChange]);

  useEffect(() => {
    const audio = audioRef.current;

    const handleCurrentTimeChange = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleDurationChange = () => {
      setDuration(audio.duration);
    };

    const handleEnd = () => {
      if (isRepeat) {
        handleRepeat();
      } else if (isRandom) {
        handleRadom();
      } else {
        setCurrentIndexSong((prev) =>
          prev + 1 === songs.length ? 0 : prev + 1
        );
      }
    };

    const handleVolumeChange = () => {
      setVolumeChange(audio.volume);
    };

    audio.addEventListener("loadedmetadata", handleDurationChange);
    audio.addEventListener("timeupdate", handleCurrentTimeChange);
    audio.addEventListener("ended", handleEnd);
    audio.addEventListener("volumechange", handleVolumeChange);

    return () => {
      audio.removeEventListener("timeupdate", handleCurrentTimeChange);
      audio.removeEventListener("loadedmetadata", handleDurationChange);
      audio.removeEventListener("ended", handleEnd);
      audio.removeEventListener("volumechange", handleVolumeChange);
    };
  }, [audioRef, isRepeat, isRandom]);

  const togglePlay = () => {
    if (currentIndexSong === -1) {
      setCurrentIndexSong(0);
    }
    setIsPlaying(!isPlaying);
  };

  const toggleRandom = () => {
    setIsRandom(!isRandom);
  };

  const toggleRepeat = () => {
    setIsRepeat(!isRepeat);
  };

  const handleRadom = () => {
    if (isRandom) {
      const randomSong = Math.floor(Math.random() * songs.length);
      setCurrentIndexSong(randomSong);
    }
  };

  const handleRepeat = () => {
    audioRef.current.currentTime = 0;
    if (isPlaying) {
      audioRef.current.play();
    }
  };

  const handlePrev = () => {
    if (isRepeat) {
      handleRepeat();
    } else if (isRandom) {
      handleRadom();
    } else {
      if (currentIndexSong >= 0) {
        setCurrentIndexSong((prev) =>
          prev - 1 < 0 ? songs.length - 1 : prev - 1
        );
      }
    }
  };

  const handleNext = () => {
    if (isRepeat) {
      handleRepeat();
    } else if (isRandom) {
      handleRadom();
    } else {
      setCurrentIndexSong((prev) => (prev + 1 === songs.length ? 0 : prev + 1));
    }
  };

  const handleSelectSong = (id) => {
    setCurrentIndexSong(id - 1);
    audioRef.current.play();
  };

  const handleTimeChange = (e) => {
    const newValue = parseFloat(e);
    setCurrentTime(newValue);
    audioRef.current.currentTime = newValue;
  };

  const handleVolumeChange = (e) => {
    audioRef.current.volume = e;
  };

  const currentSong = songs[currentIndexSong];

  const cdThumbRef = useRef();

  const cdThumbAnimateRef = useRef(null);

  useEffect(() => {
    if (isPlaying) {
      const cdThumbAnimate = cdThumbRef.current.animate(
        [{ transform: "rotate(360deg)" }],
        {
          duration: 10000,
          iterations: Infinity,
        }
      );
      cdThumbAnimateRef.current = cdThumbAnimate;
      cdThumbAnimate.play();
    } else {
      if (cdThumbAnimateRef.current) {
        cdThumbAnimateRef.current.pause();
      }
    }
  }, [isPlaying]);

  const useCd = useRef();

  useEffect(() => {
    const cdWidth = useCd.current.offsetWidth;

    document.addEventListener("scroll", function () {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const newCdWidth = cdWidth - scrollTop;

      useCd.current.style.width = newCdWidth > 0 ? newCdWidth + "px" : 0;
      useCd.current.style.opacity = newCdWidth / scrollTop;
    });
  }, []);

  return (
    <PlayerContext.Provider
      value={{
        songs,
        audioRef,
        isPlaying,
        isRandom,
        isRepeat,
        togglePlay,
        toggleRandom,
        toggleRepeat,
        currentIndexSong,
        currentSong,
        onPrev: handlePrev,
        onNext: handleNext,
        onSelectSong: handleSelectSong,
        cdThumbRef,
        useCd,
      }}
    >
      <div className="player">
        <div
          className="dashboard"
          style={{
            backgroundImage: `url(${
              currentSong
                ? currentSong.artist.avatar
                : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSduiLcLwhwETd13_-8bmRh7skszYvf5lvwrA&usqp=CAU"
            })`,
          }}
        >
          <div className="background-image"></div>
          <Header />
          <Cd />
          <Control />
          <Input
            type="range"
            className="progress"
            value={currentTime}
            min={0}
            step={1}
            max={duration}
            onChange={(e) => handleTimeChange(e.target.value)}
          />
          <Input
            type="range"
            className="volume"
            value={volumeChange}
            min={0}
            step={0.1}
            max={1}
            onChange={(e) => handleVolumeChange(e.target.value)}
          />
        </div>

        <PlayList />
      </div>
    </PlayerContext.Provider>
  );
};

Player.propTypes = {};

export default Player;
