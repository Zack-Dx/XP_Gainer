import { HoverEffectCard } from "@/components/ui/card-hover-effect";
import { courses } from "@/constants/courses";
import { words } from "@/constants/words";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import GradientButton from "@/components/ui/gradient-button";

export default function Home() {
  return (
    <>
      <div className="h-96 flex flex-col items-center justify-center space-y-6">
        <TypewriterEffectSmooth words={words} />
        <GradientButton textContent={"Explore"} />
      </div>
      <HoverEffectCard items={courses} />
    </>
  );
}
