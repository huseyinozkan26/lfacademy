import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import ReactPlayer from "react-player";
import { auth, getUserData, onScormChange } from "../firebase";

const VideoPlayer = ( scorm ) => {
  const [videoProgress, setVideoProgress] = useState(0);
  const [userValues, setUserValues] = useState({});


  const users = JSON.parse(localStorage.getItem("user"));


  useEffect (()=>{
    getUserData(users.uid).then((promiseResult)=>{
      setUserValues({...promiseResult});

    }).catch((error)=>{
      toast.error(error.message);
    })
  },[users.uid]);




  const handleProgress = (progress) => {
    setVideoProgress(progress.played);
    
    const scormProgress = {
      key: scorm.scormData.key,
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
