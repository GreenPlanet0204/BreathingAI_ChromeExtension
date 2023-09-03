import React, { useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import BreaksVideoPlayerControlPanel from './breaksPlayerControlPanel';
import Ratings from '../ratings';
import { BreakEvent } from '../../../../../../lib/api/breaks/types';
import i18n from '../../../../../../lib/config/i18n';
import { AVAILABLE_LANGUAGES } from '../../../../../../lib/context/App/storage';

export interface BreaksPlayerModel {
  url: string | undefined;
  openModal: boolean;
  setShowRatings: () => void;
  showRatings: boolean;
  completeBreak: (event: BreakEvent) => void;
  language: AVAILABLE_LANGUAGES;
}

const BreaksPlayer = (props: BreaksPlayerModel) => {
  const {
    url,
    openModal,
    setShowRatings,
    showRatings,
    completeBreak,
    language,
  } = props;
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isPlay, setIsPlay] = useState(false);

  const [currentSeek, setCurrentSeek] = useState(0);
  const [volumeBar, setVolumeBar] = useState(50);
  const [volume, setVolume] = useState(0.5);
  const [totalDurationOfVideo, setTotalDurationOfVideo] = useState(0);
  const hostVideo = useRef<any>(null);

  const onLoadedData = () => {
    setIsVideoLoaded(true);
    setTotalDurationOfVideo(hostVideo.current?.getDuration());
  };

  const handleVolumeChange = (e: any) => {
    setVolume(e.target.value / 100);
    setVolumeBar(e.target.value);
  };

  const handleOnProgress = (e: any) => {
    setCurrentSeek(e.playedSeconds);
  };

  const handleSeekChange = (e: any) => {
    setCurrentSeek(e.target.value);
    if (hostVideo.current) {
      hostVideo?.current.seekTo(e.target.value);
    }
  };

  const handlePlay = () => {
    if (totalDurationOfVideo === 0) {
      setTotalDurationOfVideo(
        hostVideo.current ? hostVideo.current?.getDuration() : 0
      );
    }
    setIsPlay(true);
  };

  const handlePause = () => {
    setIsPlay(false);
  };

  useEffect(() => {
    if (!openModal) {
      setIsPlay(false);
      setCurrentSeek(0);
      hostVideo?.current.seekTo(0);
      setTotalDurationOfVideo(0);
    }
  }, [openModal]);

  return showRatings ? (
    <Ratings
      language={language}
      showRatings={showRatings}
      completeBreak={(rating) =>
        completeBreak({
          rating,
          contentUrl: url ?? '',
          completed: true,
          lang:
            (i18n.language as AVAILABLE_LANGUAGES) ?? AVAILABLE_LANGUAGES.EN,
        })
      }
    />
  ) : (
    <>
      <ReactPlayer
        id="break_video"
        url={`${url}`}
        ref={hostVideo}
        volume={volume}
        className="w-full"
        muted={false}
        playing={isPlay}
        width="360px"
        // controls={true}
        onProgress={(e) => handleOnProgress(e)}
        loop={false}
        playsinline={true}
        onReady={onLoadedData}
        onEnded={() => {
          setShowRatings();
        }}
      />
      <BreaksVideoPlayerControlPanel
        currentSeek={currentSeek}
        playing={isPlay}
        volume={volumeBar}
        handlePause={handlePause}
        handlePlay={handlePlay}
        handleSeekChange={handleSeekChange}
        totalDurationOfVideo={totalDurationOfVideo}
        handleVolumeChange={handleVolumeChange}
      />
    </>
  );
};

export default BreaksPlayer;
