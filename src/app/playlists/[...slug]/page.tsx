"use client";
import { fetchVideos } from "@/utils/helpers";
import { useEffect, useState, useRef } from "react";
import { FaPlay, FaPause } from "react-icons/fa";
import { Video } from "@/interfaces";
import { VideoPlayer } from "@/components/ui/video-player";
import { ProgressBar } from "@/components/ui/progress-bar";

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

  let [course, instructor] = params.slug;
  course = decodeURIComponent(course);
  instructor = decodeURIComponent(instructor);

  useEffect(() => {
    // Reset resetVideo state after the video has been reset
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

  const progress = (completedVideos.length / videos.length) * 100 || 0;

  return (
    <div>
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

      <main className="grid grid-cols-12">
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
                  className="p-5 border-b-[0.5px] border-gray-700 transition-all cursor-pointer flex items-center bg-black hover:bg-slate-900 font-semibold text-base rounded-md"
                >
                  <div className="mr-2">
                    <input
                      onChange={() => handlePlaylistProgress(name)}
                      type="checkbox"
                    />
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
