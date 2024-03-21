"use client";
import { fetchVideos } from "@/utils/helpers";
import { useEffect, useState } from "react";
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
  const [activeVideoStatus, setActiveVideoStatus] = useState<Boolean>(false);

  let [course, instructor] = params.slug;
  course = decodeURIComponent(course);
  instructor = decodeURIComponent(instructor);

  useEffect(() => {
    fetchVideos(instructor, course).then((data: any) => {
      setVideos(data);
      setActiveVideo(data[0].name);
    });
  }, [course, instructor]);

  const handleVideoPlayStatusChange = (name: string) => {
    if (activeVideo === name) {
      setActiveVideoStatus((prev) => !prev);
    } else {
      setActiveVideo(name);
      setActiveVideoStatus(true);
    }
  };

  return (
    <div>
      <div className="p-4 flex justify-evenly items-center rounded-md bg-gradient-to-r from-pink-500 to-purple-500">
        <h3 className="text-base mr-6 font-semibold">Playlist Progress:</h3>
        <ProgressBar progress={50} />
      </div>
      <main className="grid grid-cols-12">
        <section className="col-span-12 md:col-span-7">
          <div>
            <VideoPlayer />
          </div>
        </section>
        <section className="col-span-12 md:col-span-5">
          <div className="h-[550px]">
            {videos.map(({ name }, idx) => {
              return (
                <div
                  onClick={() => handleVideoPlayStatusChange(name)}
                  key={idx}
                  className="p-5 border-b-[0.5px] border-gray-700 transition-all cursor-pointer flex items-center bg-black  hover:bg-slate-900 font-semibold text-base rounded-md"
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
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Page;
