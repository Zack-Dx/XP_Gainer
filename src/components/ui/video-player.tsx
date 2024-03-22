import { useEffect, useRef } from "react";
import { VideoPlayerProps } from "@/interfaces";

export const VideoPlayer = ({
  src,
  activeVideoStatus,
  resetVideo,
}: VideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current && resetVideo) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    }
  }, [resetVideo]);

  useEffect(() => {
    if (videoRef.current) {
      if (activeVideoStatus) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  }, [activeVideoStatus]);

  return (
    <video ref={videoRef} width="100%" height="100%" controls>
      <source src={src} type="video/mp4" />
    </video>
  );
};
