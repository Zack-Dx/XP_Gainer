export const ProgressBar = ({ progress }: { progress: number }) => {
  const textColor = progress >= 50 ? "text-pink-200" : "text-pink-500";

  return (
    <div className="relative w-52 h-8 bg-gray-200 rounded-lg overflow-hidden">
      <div
        className="absolute top-0 left-0 h-full bg-purple-900"
        style={{ width: `${progress}%` }}
      ></div>
      <div
        className={`absolute inset-0 flex items-center justify-center font-semibold ${textColor}`}
      >
        {Math.round(progress)}%
      </div>
    </div>
  );
};
