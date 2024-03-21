import { HoverEffectCard } from "@/components/ui/card-hover-effect";
import { words } from "@/constants/words";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import GradientButton from "@/components/ui/gradient-button";
import { fetchData } from "@/utils/helpers";

export default async function Home() {
  const courses = await fetchData();

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
