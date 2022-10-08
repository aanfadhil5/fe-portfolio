import React from "react";
import { motion } from "framer-motion";

type Props = {};

export default function About({}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="flex flex-col relative h-screen text-center md:text-left md:flex-row max-w-7xl px-10 justify-evenly mx-auto items-center"
    >
      <h3 className="absolute top-24 uppercase tracking-[20px] text-gray-500 text-2xl">
        About
      </h3>
      <motion.img
        src="https://ik.imagekit.io/osw9g36vxc/ProfilePicturePhoto_K-yxgD4tt.jpg?ik-sdk-version=javascript-1.4.3&updatedAt=1665200412579"
        initial={{
          x: -200,
          opacity: 0,
        }}
        transition={{
          duration: 1.2,
        }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="-mb-20 md:mb-0 flex-shrink-0 w-56 h-56 rounded-full object-cover md:rounded-lg md:w-64 md:h-95 xl:w-[500px] xl:h-[600px]"
      />

      <div className="space-y-10 px-0 md:px-10">
        <h4 className="text-4xl font-semibold">
          Here is a{" "}
          <span className="underline decoration-teal-300/60">little</span>{" "}
          background.
        </h4>
        <p className="text-lg text-justify">
          I am a Bogor-based front-end practitioner developer passionate about
          building a website with accessibility and mobile-first design. I am
          currently an front-end developer intern at{" "}
          <a href="https://gunadarma.ac.id/" className="text-white/40">
            IBC Gunadarma
          </a>
          .
        </p>
      </div>
    </motion.div>
  );
}
