import React, {useState } from "react";
import ReactPlayer from "react-player";
import {onScormChange } from "../firebase";

const VideoPlayer = ( scorm ) => {
  const [videoProgress, setVideoProgress] = useState(0);


  const handleProgress = (progress) => {
    setVideoProgress(progress.played);
    const scormProgress = {
      key: scorm.scormData.key,
      name: scorm.scormData.name,
      lessonCode: scorm.scormData.lessonCode,
      progress: progress.played
    }
    onScormChange(scormProgress);
  };


  return (
    <div className="video-player-wrapper">
      <ReactPlayer
        url={scorm.scormData.url}
        controls={true}
        onProgress={handleProgress}
        progress = {videoProgress}
        width="100%"
        height="100%"
      />
    </div>
  );
};

export default VideoPlayer;
