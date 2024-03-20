"use client";
import { cn } from "@/utils/cn";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import GradientButton from "./gradient-button";
import { AnimatedTooltip } from "./animated-tooltip";
import { Item, InstructorsCategory } from "@/interfaces";

export const HoverEffectCard = ({
  items,
  className,
}: {
  items: Item[];
  className?: string;
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [showInstructorsCategory, setShowInstructorsCategory] =
    useState<InstructorsCategory>({
      web: false,
      ai: false,
      blockchain: false,
    });

  const handleShowInstructors = (identifier: keyof InstructorsCategory) => {
    setShowInstructorsCategory((prev) => ({
      ...prev,
      [identifier]: !prev[identifier],
    }));
  };

  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-10 mx-10",
        className
      )}
    >
      {items?.map((item, idx) => (
        <div
          key={idx}
          className="relative group  block p-2 h-full w-full"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-full bg-pink-100 dark:bg-pink-500/[0.8] block  rounded-3xl"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }}
              />
            )}
          </AnimatePresence>
          <Card>
            <CardTitle>{item.title}</CardTitle>
            <CardDescription>{item.description}</CardDescription>
            <div className="flex justify-center mt-10">
              <GradientButton
                onClick={() =>
                  handleShowInstructors(
                    item.identifier as keyof InstructorsCategory
                  )
                }
                textContent={
                  showInstructorsCategory[
                    item.identifier as keyof InstructorsCategory
                  ]
                    ? "Minimise"
                    : "Learn"
                }
              />
            </div>
            {showInstructorsCategory[
              item.identifier as keyof typeof showInstructorsCategory
            ] ? (
              <div className="flex flex-wrap justify-center gap-6 mt-5">
                <AnimatedTooltip items={item.instructors} />
              </div>
            ) : null}
          </Card>
        </div>
      ))}
    </div>
  );
};

export const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "rounded-2xl h-full w-full p-4 overflow-hidden bg-transparent dark:text-white dark:bg-black border border-black  dark:border-white/[0.2] group-hover:border-purple-700   dark:group-hover:border-slate-700 relative z-20",
        className
      )}
    >
      <div className="relative z-50">
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};
export const CardTitle = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <h4
      className={cn(
        "dark:text-zinc-100 text-black font-bold tracking-wide mt-4",
        className
      )}
    >
      {children}
    </h4>
  );
};
export const CardDescription = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <p
      className={cn(
        "mt-8 dark:text-zinc-400 text-black tracking-wide leading-relaxed text-sm",
        className
      )}
    >
      {children}
    </p>
  );
};
