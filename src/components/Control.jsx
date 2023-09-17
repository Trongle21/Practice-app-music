import { usePlayerContext } from "../hooks/usePlayerContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPause, faPlay } from "@fortawesome/free-solid-svg-icons";

const Control = () => {
  const {
    isPlaying,
    isRandom,
    isRepeat,
    togglePlay,
    toggleRandom,
    toggleRepeat,
    onPrev,
    onNext,
  } = usePlayerContext();

  return (
    <div className="control">
      {!isRepeat ? (
        <div className="btn btn-repeat">
          <i className="fas fa-redo" onClick={toggleRepeat} />
        </div>
      ) : (
        <div className="btn btn-repeat active">
          <i className="fas fa-redo" onClick={toggleRepeat} />
        </div>
      )}
      <div className="btn btn-prev" onClick={onPrev}>
        <i className="fas fa-step-backward" />
      </div>
      <div className="btn btn-toggle-play">
        {!isPlaying ? (
          <FontAwesomeIcon icon={faPlay} onClick={togglePlay} />
        ) : (
          <FontAwesomeIcon icon={faPause} onClick={togglePlay} />
        )}
      </div>
      <div className="btn btn-next" onClick={onNext}>
        <i className="fas fa-step-forward" />
      </div>
      {!isRandom ? (
        <div className="btn btn-random" onClick={toggleRandom}>
          <i className="fas fa-random button" />
        </div>
      ) : (
        <div className="btn btn-random active" onClick={toggleRandom}>
          <i className="fas fa-random" />
        </div>
      )}
    </div>
  );
};

export default Control;
