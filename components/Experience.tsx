import React from "react";
import CardExperienceLabti from "./CardExperience/CardExperienceLabti";
import CardExperienceIntern from "./CardExperience/CardExperienceIntern";

type Props = {};

function Experience({}: Props) {
  return (
    <div className="h-screen flex relative flex-col text-left md:flex-row max-w-full px-10 justify-evenly mx-auto items-center">
      <h3 className="absolute top-24 uppercase tracking-[20px] text-gray-500 text-2xl">
        Experience
      </h3>

      <div className="w-full flex space-x-5 overflow-y-hidden p-10 snap-x snap-mandatory scrollbar-thin scrollbar-track-gray-400/20 scrollbar-thumb-teal-300/80">
        <CardExperienceIntern />
        <CardExperienceLabti />
      </div>
    </div>
  );
}

export default Experience;
