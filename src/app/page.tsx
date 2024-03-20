import { HoverEffectCard } from "@/components/ui/card-hover-effect";
import { words } from "@/constants/words";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import GradientButton from "@/components/ui/gradient-button";
import fs from "fs/promises";

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

async function fetchData() {
  try {
    const filePath = "./src/data/courses.json";
    const data = await fs.readFile(filePath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.log(error);
  }
}
