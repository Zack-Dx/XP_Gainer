export const VideoPlayer = () => {
  return (
    <video
      width="320"
      height="240"
      onEnded={() => {
        console.log("Khatam");
      }}
      controls
    >
      <source
        src="https://res.cloudinary.com/dvj8ajii0/video/upload/v1711044549/video_bxdvrr.mp4"
        type="video/mp4"
      />
    </video>
  );
};
