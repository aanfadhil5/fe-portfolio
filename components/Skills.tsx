import React from "react";
import { motion } from "framer-motion";
import SkillReact from "./ElemSkill/SkillReact";
import SkillPython from "./ElemSkill/SkillPython";
import SkillHtml from "./ElemSkill/SkillHtml";
import SkillVSCode from "./ElemSkill/SkillVSCode";
import SkillTailwind from "./ElemSkill/SkillTailwind";
import SkillCss from "./ElemSkill/SkillCss";
import SkillGit from "./ElemSkill/SkillGit";
import SkillPostgres from "./ElemSkill/SkillPostgres";
import SkillJava from "./ElemSkill/SkillJava";
import SkillNext from "./ElemSkill/SkillNext";
import SkillMysql from "./ElemSkill/SkillMysql";
import SkillJs from "./ElemSkill/SkillJavascript";

type Props = {};

function Skills({}: Props) {
  return (
    <motion.div className="flex relative flex-col text-center md:text-left xl:flex-row max-w-[2000px] xl:px-10 min-h-screen justify-center xl:space-y-0 mx-auto items-center">
      <h3 className="absolute top-24 uppercase tracking-[20px] text-gray-500 text-2xl hidden md:block">
        Skills
      </h3>
      <h3 className="absolute bottom-16 md:top-32 uppercase tracking-[3px] text-gray-500 md:text-sm text-xs">
        hover over a skill for currency profieciency
      </h3>
      <div className="grid grid-cols-3 gap-2 md:grid-cols-4 md:gap-5">
        <SkillHtml />
        <SkillCss />
        <SkillJs />
        <SkillReact />
        <SkillNext />
        <SkillTailwind />
        <SkillVSCode />
        <SkillGit />
        <SkillMysql />
        <SkillPostgres />
        <SkillJava />
        <SkillPython />
      </div>
    </motion.div>
  );
}

export default Skills;
