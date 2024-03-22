import { HoverEffectCard } from "@/components/ui/card-hover-effect";
import { words } from "@/constants/words";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import GradientButton from "@/components/ui/gradient-button";
import { courses } from "@/constants/courses";

export default async function Home() {
  return (
    <>
      <section className="h-96 flex flex-col items-center justify-center space-y-6">
        <TypewriterEffectSmooth words={words} />
        <GradientButton textContent={"Explore"} />
      </section>

      <main>
        <HoverEffectCard items={courses} />
      </main>
    </>
  );
}
