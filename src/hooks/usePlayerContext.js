import { useContext } from "react";
import { PlayerContext } from "../context/PlayerContext";

const usePlayerContext = () => {
  const context = useContext(PlayerContext);

  return { ...context };
};

export { usePlayerContext };
