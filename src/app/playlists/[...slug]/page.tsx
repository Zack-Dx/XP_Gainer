"use client";
import { fetchVideos } from "@/utils/helpers";
import { useEffect, useState, useRef } from "react";
import { FaPlay, FaPause } from "react-icons/fa";
import { Video } from "@/interfaces";
import { VideoPlayer } from "@/components/ui/video-player";
import { ProgressBar } from "@/components/ui/progress-bar";
import Confetti from "react-confetti";

interface PageProps {
  params: {
    slug: string[];
  };
}

const Page = ({ params }: PageProps) => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [activeVideo, setActiveVideo] = useState<string>("");
  const [activeVideoStatus, setActiveVideoStatus] = useState<boolean>(false);
  const [completedVideos, setCompletedVideos] = useState<string[]>([]);
  const [resetVideo, setResetVideo] = useState<boolean>(false);
  const [celebrate, setCelebrate] = useState(false);

  const progress = videos.length
    ? (completedVideos.length / videos.length) * 100
    : 0;

  let [course, instructor] = params.slug;
  course = decodeURIComponent(course);
  instructor = decodeURIComponent(instructor);

  useEffect(() => {
    if (progress !== 100) {
      return;
    }

    // Celebration timeout for 5 seconds
    setCelebrate(true);
    const timeoutId = setTimeout(() => {
      setCelebrate(false);
    }, 5000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [progress]);

  useEffect(() => {
    if (resetVideo) {
      setResetVideo(false);
    }
  }, [resetVideo]);

  useEffect(() => {
    fetchVideos(instructor, course).then((data: any) => {
      setVideos(data);
      setActiveVideo(data[0].name);
    });
  }, [course, instructor]);

  const handleVideoPlayStatusChange = (name: string): void => {
    if (activeVideo === name) {
      setActiveVideoStatus((prev) => !prev);
    } else {
      setActiveVideo(name);
      setResetVideo(true);
      setActiveVideoStatus(true);
    }
  };

  const handlePlaylistProgress = (name: string) => {
    if (!completedVideos.includes(name)) {
      setCompletedVideos((prev) => [...prev, name]);
    } else {
      setCompletedVideos((prev) => prev.filter((video) => video !== name));
    }
  };

  return (
    <div>
      {celebrate && <Confetti />}
      <div className="p-4 flex flex-col md:flex-row md:justify-between items-center rounded-md bg-gradient-to-r from-pink-500 to-purple-500">
        <h1 className="text-base font-semibold text-white mb-4 md:mb-0 md:mr-6">
          Instructor: {instructor} ({course.toUpperCase()})
        </h1>
        <div className="flex items-center flex-wrap">
          <h3 className="text-base font-semibold text-white mr-4 md:mr-6">
            Playlist Progress:
          </h3>
          <ProgressBar progress={progress} />
        </div>
      </div>

      <main className="grid grid-cols-12 h-screen">
        <section className="col-span-12 md:col-span-7">
          <div className="relative">
            <VideoPlayer
              src="https://res.cloudinary.com/dvj8ajii0/video/upload/v1711044549/video_bxdvrr.mp4"
              activeVideoStatus={activeVideoStatus}
              resetVideo={resetVideo}
            />
          </div>
        </section>
        <section className="col-span-12 md:col-span-5">
          <div className="h-[550px]">
            {videos.map(({ name }, idx) => {
              return (
                <div
                  key={idx}
                  className="p-5 border-b-[0.5px] border-gray-700 transition-all cursor-pointer flex items-center hover:bg-pink-100 dark:bg-black dark:hover:bg-slate-900 font-semibold text-base rounded-md"
                >
                  <div className="mr-2">
                    {progress < 100 ? (
                      <input
                        onChange={() => handlePlaylistProgress(name)}
                        type="checkbox"
                      />
                    ) : null}
                  </div>

                  <div
                    onClick={() => handleVideoPlayStatusChange(name)}
                    className="flex items-center w-full"
                  >
                    <div className="space-x-4">
                      <span className="text-purple-400">{idx + 1}.</span>
                      <span>{name}</span>
                    </div>

                    {activeVideo === name && activeVideoStatus ? (
                      <FaPause className="text-pink-500 ml-auto" />
                    ) : (
                      <FaPlay className="text-pink-500 ml-auto" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Page;
