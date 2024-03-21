export const ProgressBar = ({ progress }: { progress: number }) => {
  return (
    <div className="w-52 h-2 bg-gray-200 rounded-lg overflow-hidden">
      <div
        className="h-full bg-purple-900"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};
