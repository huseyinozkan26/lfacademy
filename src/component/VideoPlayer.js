import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import { onScormChange, getProgress } from "../firebase";
import { MdPause, MdPlayArrow, MdVolumeDown, MdVolumeUp,MdRestartAlt } from "react-icons/md";

const VideoPlayer = (scorm) => {
  const [videoProgress, setVideoProgress] = useState(0);
  const [startTimeInSeconds, setStartTimeInSeconds] = useState(0);
  const [isPlaybarVisible, setIsPlaybarVisible] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5); // Başlangıçta varsayılan ses seviyesi

  const playerRef = React.useRef();


  useEffect(() => {
    function handleContextMenu(e) {
      e.preventDefault(); // Sağ tıklama menüsünü engelle
    }

    const rootElement = document.getElementById("player_area");
    rootElement.addEventListener("contextmenu", handleContextMenu);

    return () => {
      rootElement.removeEventListener("contextmenu", handleContextMenu);
    };
  }, []);

  useEffect(() => {
    const scormProgress = {
      key: scorm.scormData.key,
      lessonCode: scorm.scormData.lessonCode,
    };
    getProgress(scormProgress).then((promiseResult) => {
      setVideoProgress(promiseResult.progress);
      setStartTimeInSeconds(promiseResult.progressSeconds);
    });
  }, [scorm.scormData.key, scorm.scormData.lessonCode]);

  const handleProgress = (progress) => {
    setIsPlaybarVisible(true);
    if (isPlaying) {
      setVideoProgress(progress.played);
      const scormProgress = {
        key: scorm.scormData.key,
        name: scorm.scormData.name,
        lessonCode: scorm.scormData.lessonCode,
        progress: progress.played,
        progressSeconds: progress.playedSeconds,
      };
      onScormChange(scormProgress);
    }
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleVolumeUp = () => {
    if (volume < 0.9) {
      setVolume(volume + 0.1);
    }
  };

  const handleVolumeDown = () => {
    if (volume > 0.1) {
      setVolume(volume - 0.1);
    }
  };

  const handleRestart = () => {
    if (playerRef.current) {
      setIsPlaying(false);
      setStartTimeInSeconds(0);
      setVideoProgress(0);
      playerRef.current.seekTo(0, "seconds");
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    if (startTimeInSeconds > 0 && playerRef.current) {
      playerRef.current.seekTo(startTimeInSeconds, "seconds");
      setIsPlaying(true);
    }
  }, [startTimeInSeconds]);

  return (
    <div className="video-player-wrapper" id="player_area">
      <ReactPlayer
        ref={playerRef}
        url={scorm.scormData.url}
        playing={isPlaying}
        controls={false}
        onProgress={handleProgress}
        progress={videoProgress}
        volume={volume}
        width="100%"
        height="100%"
      />
      <div className={`playbar ${isPlaybarVisible ? "" : "playbar-hidden"}`}>
      <div className="playbar-icon" onClick={handleRestart}>
          <MdRestartAlt size={32} />
        </div>
        <div className="playbar-icon" onClick={handlePlayPause}>
          {isPlaying ? <MdPause size={32} /> : <MdPlayArrow size={32} />}
        </div>
        <div className="playbar-icon" onClick={handleVolumeDown}>
          <MdVolumeDown size={32} />
        </div>
        <div className="playbar-icon" onClick={handleVolumeUp}>
          <MdVolumeUp size={32} />
        </div>
        <div className="progress-text">
          <p>%{(videoProgress * 100).toFixed(2)} tamamlandı</p>
        </div>
        <div className="volume-text">
          <p>Ses %{(volume * 100).toFixed(0)}</p>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
