import React, { ButtonHTMLAttributes } from "react";

const GradientButton = ({
  textContent,
  ...props
}: { textContent: string } & ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button {...props} className="p-[3px] relative">
      <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 rounded-lg" />
      <div className="px-8 py-2  dark:bg-black bg-white text-black hover:text-white rounded-[6px]  relative group transition duration-500 dark:text-white  hover:bg-transparent">
        {textContent}
      </div>
    </button>
  );
};

export default GradientButton;
